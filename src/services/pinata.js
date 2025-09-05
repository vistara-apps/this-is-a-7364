import axios from 'axios'

const PINATA_API_KEY = import.meta.env.VITE_PINATA_API_KEY
const PINATA_SECRET_API_KEY = import.meta.env.VITE_PINATA_SECRET_API_KEY
const PINATA_BASE_URL = 'https://api.pinata.cloud'

// Check if Pinata is configured
const isPinataConfigured = PINATA_API_KEY && PINATA_SECRET_API_KEY

if (!isPinataConfigured) {
  console.warn('Pinata API keys not found. IPFS storage will be disabled.')
}

// Create axios instance with Pinata authentication
const pinataAPI = axios.create({
  baseURL: PINATA_BASE_URL,
  headers: {
    'pinata_api_key': PINATA_API_KEY,
    'pinata_secret_api_key': PINATA_SECRET_API_KEY,
  },
})

// Upload file to IPFS via Pinata
export const uploadFileToIPFS = async (file, metadata = {}) => {
  if (!isPinataConfigured) {
    throw new Error('Pinata not configured')
  }

  try {
    const formData = new FormData()
    formData.append('file', file)
    
    // Add metadata
    const pinataMetadata = {
      name: metadata.name || file.name,
      keyvalues: {
        app: 'KnowYourRights.io',
        type: metadata.type || 'encounter-file',
        timestamp: new Date().toISOString(),
        ...metadata.keyvalues
      }
    }
    
    formData.append('pinataMetadata', JSON.stringify(pinataMetadata))
    
    // Add options
    const pinataOptions = {
      cidVersion: 1,
      ...metadata.options
    }
    
    formData.append('pinataOptions', JSON.stringify(pinataOptions))

    const response = await pinataAPI.post('/pinning/pinFileToIPFS', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })

    return {
      success: true,
      ipfsHash: response.data.IpfsHash,
      pinSize: response.data.PinSize,
      timestamp: response.data.Timestamp,
      url: `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`
    }
  } catch (error) {
    console.error('Error uploading file to IPFS:', error)
    throw error
  }
}

// Upload JSON data to IPFS via Pinata
export const uploadJSONToIPFS = async (jsonData, metadata = {}) => {
  if (!isPinataConfigured) {
    throw new Error('Pinata not configured')
  }

  try {
    const pinataMetadata = {
      name: metadata.name || 'encounter-data.json',
      keyvalues: {
        app: 'KnowYourRights.io',
        type: metadata.type || 'encounter-json',
        timestamp: new Date().toISOString(),
        ...metadata.keyvalues
      }
    }

    const pinataOptions = {
      cidVersion: 1,
      ...metadata.options
    }

    const data = {
      pinataContent: jsonData,
      pinataMetadata,
      pinataOptions
    }

    const response = await pinataAPI.post('/pinning/pinJSONToIPFS', data)

    return {
      success: true,
      ipfsHash: response.data.IpfsHash,
      pinSize: response.data.PinSize,
      timestamp: response.data.Timestamp,
      url: `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`
    }
  } catch (error) {
    console.error('Error uploading JSON to IPFS:', error)
    throw error
  }
}

// Get file from IPFS
export const getFileFromIPFS = async (ipfsHash) => {
  try {
    const response = await axios.get(`https://gateway.pinata.cloud/ipfs/${ipfsHash}`)
    return response.data
  } catch (error) {
    console.error('Error getting file from IPFS:', error)
    throw error
  }
}

// List pinned files
export const listPinnedFiles = async (filters = {}) => {
  if (!isPinataConfigured) {
    throw new Error('Pinata not configured')
  }

  try {
    const params = {
      status: 'pinned',
      ...filters
    }

    const response = await pinataAPI.get('/data/pinList', { params })
    return response.data
  } catch (error) {
    console.error('Error listing pinned files:', error)
    throw error
  }
}

// Unpin file from IPFS
export const unpinFile = async (ipfsHash) => {
  if (!isPinataConfigured) {
    throw new Error('Pinata not configured')
  }

  try {
    const response = await pinataAPI.delete(`/pinning/unpin/${ipfsHash}`)
    return { success: true, message: 'File unpinned successfully' }
  } catch (error) {
    console.error('Error unpinning file:', error)
    throw error
  }
}

// Create shareable encounter card and upload to IPFS
export const createAndUploadEncounterCard = async (encounterData) => {
  try {
    // Create HTML content for the encounter card
    const cardHTML = generateEncounterCardHTML(encounterData)
    
    // Convert HTML to blob
    const blob = new Blob([cardHTML], { type: 'text/html' })
    const file = new File([blob], `encounter-${Date.now()}.html`, { type: 'text/html' })
    
    // Upload to IPFS
    const result = await uploadFileToIPFS(file, {
      name: `Encounter Card - ${new Date(encounterData.timestamp).toLocaleDateString()}`,
      type: 'encounter-card',
      keyvalues: {
        userId: encounterData.userId,
        timestamp: encounterData.timestamp,
        location: encounterData.location || 'unknown'
      }
    })
    
    return result
  } catch (error) {
    console.error('Error creating and uploading encounter card:', error)
    throw error
  }
}

// Generate HTML for encounter card
const generateEncounterCardHTML = (encounterData) => {
  const date = new Date(encounterData.timestamp)
  
  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Police Encounter Documentation</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f5f5f5;
        }
        .card {
            background: white;
            border-radius: 8px;
            padding: 24px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .header {
            text-align: center;
            border-bottom: 2px solid #3b82f6;
            padding-bottom: 16px;
            margin-bottom: 24px;
        }
        .title {
            color: #1e40af;
            font-size: 24px;
            font-weight: bold;
            margin: 0;
        }
        .subtitle {
            color: #6b7280;
            margin: 8px 0 0 0;
        }
        .section {
            margin-bottom: 20px;
        }
        .section-title {
            font-weight: bold;
            color: #374151;
            margin-bottom: 8px;
            font-size: 16px;
        }
        .info-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 16px;
            margin-bottom: 16px;
        }
        .info-item {
            background: #f9fafb;
            padding: 12px;
            border-radius: 6px;
        }
        .info-label {
            font-weight: bold;
            color: #6b7280;
            font-size: 12px;
            text-transform: uppercase;
            margin-bottom: 4px;
        }
        .info-value {
            color: #374151;
        }
        .notes {
            background: #f9fafb;
            padding: 16px;
            border-radius: 6px;
            border-left: 4px solid #3b82f6;
        }
        .footer {
            text-align: center;
            margin-top: 24px;
            padding-top: 16px;
            border-top: 1px solid #e5e7eb;
            color: #6b7280;
            font-size: 12px;
        }
    </style>
</head>
<body>
    <div class="card">
        <div class="header">
            <h1 class="title">Police Encounter Documentation</h1>
            <p class="subtitle">Generated by KnowYourRights.io</p>
        </div>
        
        <div class="info-grid">
            <div class="info-item">
                <div class="info-label">Date</div>
                <div class="info-value">${date.toLocaleDateString()}</div>
            </div>
            <div class="info-item">
                <div class="info-label">Time</div>
                <div class="info-value">${date.toLocaleTimeString()}</div>
            </div>
            <div class="info-item">
                <div class="info-label">Location</div>
                <div class="info-value">${encounterData.location || 'Not specified'}</div>
            </div>
            <div class="info-item">
                <div class="info-label">Duration</div>
                <div class="info-value">${encounterData.duration || 'Not recorded'}</div>
            </div>
        </div>
        
        ${encounterData.officerDetails ? `
        <div class="section">
            <div class="section-title">Officer Information</div>
            <div class="info-grid">
                ${encounterData.officerDetails.badgeNumber ? `
                <div class="info-item">
                    <div class="info-label">Badge Number</div>
                    <div class="info-value">${encounterData.officerDetails.badgeNumber}</div>
                </div>
                ` : ''}
                ${encounterData.officerDetails.department ? `
                <div class="info-item">
                    <div class="info-label">Department</div>
                    <div class="info-value">${encounterData.officerDetails.department}</div>
                </div>
                ` : ''}
            </div>
        </div>
        ` : ''}
        
        ${encounterData.notes ? `
        <div class="section">
            <div class="section-title">Additional Notes</div>
            <div class="notes">${encounterData.notes}</div>
        </div>
        ` : ''}
        
        <div class="footer">
            <p>This document was generated for record-keeping purposes.</p>
            <p>Generated on ${new Date().toLocaleString()}</p>
        </div>
    </div>
</body>
</html>
  `
}

// Mock functions for development
export const mockUploadFileToIPFS = async (file, metadata = {}) => {
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  const mockHash = `Qm${Math.random().toString(36).substring(2, 15)}`
  
  return {
    success: true,
    ipfsHash: mockHash,
    pinSize: file.size,
    timestamp: new Date().toISOString(),
    url: `https://gateway.pinata.cloud/ipfs/${mockHash}`
  }
}

export const mockUploadJSONToIPFS = async (jsonData, metadata = {}) => {
  await new Promise(resolve => setTimeout(resolve, 800))
  
  const mockHash = `Qm${Math.random().toString(36).substring(2, 15)}`
  
  return {
    success: true,
    ipfsHash: mockHash,
    pinSize: JSON.stringify(jsonData).length,
    timestamp: new Date().toISOString(),
    url: `https://gateway.pinata.cloud/ipfs/${mockHash}`
  }
}
