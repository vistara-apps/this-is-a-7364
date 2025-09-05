import OpenAI from 'openai'

const apiKey = import.meta.env.VITE_OPENAI_API_KEY

let openai = null

if (apiKey) {
  openai = new OpenAI({
    apiKey,
    dangerouslyAllowBrowser: true // Note: In production, API calls should go through your backend
  })
} else {
  console.warn('OpenAI API key not found. AI features will be disabled.')
}

// Generate de-escalation scripts based on context
export const generateDeEscalationScript = async (context) => {
  if (!openai) {
    throw new Error('OpenAI not initialized')
  }

  try {
    const prompt = `Generate a calm, respectful de-escalation script for a police encounter. 
    Context: ${context}
    
    Requirements:
    - Keep it concise (2-3 sentences max)
    - Use respectful, non-confrontational language
    - Focus on de-escalation and safety
    - Include specific phrases that can be easily remembered
    - Avoid legal advice
    
    Format the response as a JSON object with:
    - "script": the main de-escalation text
    - "tone": description of how to deliver it
    - "context": when to use this script`

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are an expert in police-civilian interactions and de-escalation techniques. Generate helpful, safe, and legally sound de-escalation scripts."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: 300,
      temperature: 0.7
    })

    const response = completion.choices[0]?.message?.content
    if (!response) {
      throw new Error('No response from OpenAI')
    }

    return JSON.parse(response)
  } catch (error) {
    console.error('Error generating de-escalation script:', error)
    throw error
  }
}

// Generate state-specific legal summary
export const generateStateLegalSummary = async (state, specificTopic = null) => {
  if (!openai) {
    throw new Error('OpenAI not initialized')
  }

  try {
    const topicFilter = specificTopic ? ` focusing on ${specificTopic}` : ''
    const prompt = `Generate a concise legal summary for police encounters in ${state}${topicFilter}.
    
    Requirements:
    - Focus on citizen rights during police encounters
    - Include state-specific laws and procedures
    - Keep it factual and legally accurate
    - Use simple, understandable language
    - Include key differences from federal law if any
    - Maximum 500 words
    
    Format as JSON with:
    - "summary": main legal information
    - "keyRights": array of 3-5 key rights
    - "importantNotes": array of 2-3 state-specific notes
    - "lastUpdated": current date`

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a legal expert specializing in state laws regarding police encounters and citizen rights. Provide accurate, helpful information while noting that this is not legal advice."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: 800,
      temperature: 0.3
    })

    const response = completion.choices[0]?.message?.content
    if (!response) {
      throw new Error('No response from OpenAI')
    }

    return JSON.parse(response)
  } catch (error) {
    console.error('Error generating state legal summary:', error)
    throw error
  }
}

// Generate encounter summary for documentation
export const generateEncounterSummary = async (encounterData) => {
  if (!openai) {
    throw new Error('OpenAI not initialized')
  }

  try {
    const prompt = `Generate a professional summary of a police encounter for documentation purposes.
    
    Encounter Data:
    - Date/Time: ${encounterData.timestamp}
    - Location: ${encounterData.location || 'Not specified'}
    - Officer Details: ${JSON.stringify(encounterData.officerDetails || {})}
    - Notes: ${encounterData.notes || 'No additional notes'}
    
    Requirements:
    - Create a clear, factual summary
    - Use professional, objective language
    - Include all relevant details
    - Format for easy sharing/printing
    - Keep it concise but comprehensive
    
    Format as JSON with:
    - "title": brief title for the encounter
    - "summary": detailed summary paragraph
    - "keyDetails": array of important facts
    - "recommendations": suggested next steps if any`

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a professional documentation assistant. Create clear, factual summaries of police encounters for record-keeping purposes."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: 500,
      temperature: 0.2
    })

    const response = completion.choices[0]?.message?.content
    if (!response) {
      throw new Error('No response from OpenAI')
    }

    return JSON.parse(response)
  } catch (error) {
    console.error('Error generating encounter summary:', error)
    throw error
  }
}

// Mock functions for development when API key is not available
export const mockGenerateDeEscalationScript = async (context) => {
  await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate API delay
  
  return {
    script: "Officer, I understand you're doing your job. I want to cooperate and ensure everyone's safety. May I ask what this is regarding?",
    tone: "Speak calmly and clearly, maintain eye contact, keep hands visible",
    context: "Use when initially approached by an officer to establish cooperative tone"
  }
}

export const mockGenerateStateLegalSummary = async (state) => {
  await new Promise(resolve => setTimeout(resolve, 1500)) // Simulate API delay
  
  return {
    summary: `In ${state}, citizens have specific rights during police encounters that are protected by both federal and state law. You have the right to remain silent, the right to refuse searches of your person or vehicle without a warrant, and the right to ask if you are free to leave.`,
    keyRights: [
      "Right to remain silent",
      "Right to refuse consent searches",
      "Right to ask if you're free to leave",
      "Right to have an attorney present during questioning",
      "Right to record police interactions in public"
    ],
    importantNotes: [
      `${state} has specific laws regarding recording police officers`,
      "Stop and identify laws may apply in certain situations",
      "Vehicle searches have different rules than person searches"
    ],
    lastUpdated: new Date().toISOString().split('T')[0]
  }
}

export const mockGenerateEncounterSummary = async (encounterData) => {
  await new Promise(resolve => setTimeout(resolve, 800)) // Simulate API delay
  
  return {
    title: "Police Encounter Documentation",
    summary: `On ${new Date(encounterData.timestamp).toLocaleDateString()}, an encounter occurred at ${encounterData.location || 'an unspecified location'}. The interaction was documented for record-keeping purposes.`,
    keyDetails: [
      `Date: ${new Date(encounterData.timestamp).toLocaleDateString()}`,
      `Time: ${new Date(encounterData.timestamp).toLocaleTimeString()}`,
      `Location: ${encounterData.location || 'Not specified'}`,
      `Duration: ${encounterData.duration || 'Not recorded'}`
    ],
    recommendations: [
      "Keep this documentation in a safe place",
      "Consider sharing with legal counsel if needed",
      "Review local laws regarding police encounters"
    ]
  }
}
