import React, { useState } from 'react'
import { History, Play, Download, Share, Calendar, MapPin, User, FileText, Trash2 } from 'lucide-react'
import useAppStore from '../store/useAppStore'

const MyEncounters = () => {
  const { language, encounters } = useAppStore()
  const [selectedEncounter, setSelectedEncounter] = useState(null)
  const [playingAudio, setPlayingAudio] = useState(null)
  
  const content = {
    en: {
      title: "My Encounters",
      subtitle: "View and manage your documented encounters",
      noEncounters: "No encounters recorded yet",
      noEncountersDesc: "Use the Record Encounter feature to document your interactions",
      viewDetails: "View Details",
      playAudio: "Play Audio",
      downloadAudio: "Download Audio",
      shareEncounter: "Share Encounter",
      deleteEncounter: "Delete",
      encounterDetails: "Encounter Details",
      recordingTime: "Recording Time",
      location: "Location",
      officerBadge: "Officer Badge",
      officerName: "Officer Name",
      reason: "Reason for Stop",
      notes: "Notes",
      timestamp: "Date & Time"
    },
    es: {
      title: "Mis Encuentros",
      subtitle: "Ver y administrar tus encuentros documentados",
      noEncounters: "No hay encuentros registrados aún",
      noEncountersDesc: "Usa la función Grabar Encuentro para documentar tus interacciones",
      viewDetails: "Ver Detalles",
      playAudio: "Reproducir Audio",
      downloadAudio: "Descargar Audio",
      shareEncounter: "Compartir Encuentro",
      deleteEncounter: "Eliminar",
      encounterDetails: "Detalles del Encuentro",
      recordingTime: "Tiempo de Grabación",
      location: "Ubicación",
      officerBadge: "Placa del Oficial",
      officerName: "Nombre del Oficial",
      reason: "Razón de la Parada",
      notes: "Notas",
      timestamp: "Fecha y Hora"
    }
  }
  
  const text = content[language]
  
  const formatDate = (isoString) => {
    const date = new Date(isoString)
    return date.toLocaleString(language === 'en' ? 'en-US' : 'es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }
  
  const handlePlayAudio = (encounter) => {
    if (encounter.audioURL) {
      if (playingAudio === encounter.id) {
        setPlayingAudio(null)
      } else {
        setPlayingAudio(encounter.id)
        // In a real app, you'd implement actual audio playback
      }
    }
  }
  
  const handleDownloadAudio = (encounter) => {
    if (encounter.audioURL) {
      const link = document.createElement('a')
      link.href = encounter.audioURL
      link.download = `encounter-${encounter.id}-audio.webm`
      link.click()
    }
  }
  
  const generateShareableSummary = (encounter) => {
    const summary = `
${text.encounterDetails}
${text.timestamp}: ${formatDate(encounter.timestamp)}
${text.location}: ${encounter.location || 'Not specified'}
${text.officerBadge}: ${encounter.officerBadge || 'Not provided'}
${text.officerName}: ${encounter.officerName || 'Not provided'}
${text.reason}: ${encounter.reason || 'Not specified'}
${text.recordingTime}: ${encounter.recordingTime || 'N/A'}
${text.notes}: ${encounter.notes || 'None'}
    `.trim()
    
    if (navigator.share) {
      navigator.share({
        title: `${text.encounterDetails} - ${formatDate(encounter.timestamp)}`,
        text: summary
      })
    } else {
      navigator.clipboard.writeText(summary).then(() => {
        alert(language === 'en' ? 'Summary copied to clipboard' : 'Resumen copiado al portapapeles')
      })
    }
  }
  
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <History className="h-12 w-12 text-primary mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-text-primary mb-2">{text.title}</h1>
        <p className="text-lg text-text-secondary">{text.subtitle}</p>
      </div>
      
      {encounters.length === 0 ? (
        /* No Encounters State */
        <div className="card text-center py-12">
          <FileText className="h-16 w-16 text-text-secondary mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-text-primary mb-2">{text.noEncounters}</h3>
          <p className="text-text-secondary mb-6">{text.noEncountersDesc}</p>
          <button className="btn-primary">
            {language === 'en' ? 'Record Your First Encounter' : 'Graba Tu Primer Encuentro'}
          </button>
        </div>
      ) : (
        /* Encounters List */
        <div className="space-y-6">
          {encounters.map((encounter) => (
            <div key={encounter.id} className="card">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <div className="flex items-center space-x-3 mb-4 md:mb-0">
                  <div className="p-2 bg-primary bg-opacity-10 rounded-full">
                    <Calendar className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-text-primary">
                      {formatDate(encounter.timestamp)}
                    </h3>
                    <p className="text-sm text-text-secondary">
                      {encounter.location || language === 'en' ? 'Location not specified' : 'Ubicación no especificada'}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setSelectedEncounter(selectedEncounter === encounter.id ? null : encounter.id)}
                    className="btn-outline text-xs px-3 py-1"
                  >
                    {text.viewDetails}
                  </button>
                  
                  {encounter.audioURL && (
                    <button
                      onClick={() => handlePlayAudio(encounter)}
                      className="p-2 text-text-secondary hover:text-primary transition-colors"
                      title={text.playAudio}
                    >
                      <Play className="h-4 w-4" />
                    </button>
                  )}
                  
                  <button
                    onClick={() => generateShareableSummary(encounter)}
                    className="p-2 text-text-secondary hover:text-primary transition-colors"
                    title={text.shareEncounter}
                  >
                    <Share className="h-4 w-4" />
                  </button>
                </div>
              </div>
              
              {/* Quick Info */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                {encounter.officerBadge && (
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4 text-text-secondary" />
                    <span className="text-text-secondary">Badge: {encounter.officerBadge}</span>
                  </div>
                )}
                
                {encounter.recordingTime && (
                  <div className="flex items-center space-x-2">
                    <Play className="h-4 w-4 text-text-secondary" />
                    <span className="text-text-secondary">{encounter.recordingTime}</span>
                  </div>
                )}
                
                {encounter.reason && (
                  <div className="flex items-center space-x-2">
                    <FileText className="h-4 w-4 text-text-secondary" />
                    <span className="text-text-secondary truncate">{encounter.reason}</span>
                  </div>
                )}
              </div>
              
              {/* Expanded Details */}
              {selectedEncounter === encounter.id && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h4 className="font-semibold text-text-primary mb-4">{text.encounterDetails}</h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-text-primary">{text.timestamp}:</span>
                      <br />
                      <span className="text-text-secondary">{formatDate(encounter.timestamp)}</span>
                    </div>
                    
                    <div>
                      <span className="font-medium text-text-primary">{text.location}:</span>
                      <br />
                      <span className="text-text-secondary">{encounter.location || 'Not specified'}</span>
                    </div>
                    
                    <div>
                      <span className="font-medium text-text-primary">{text.officerBadge}:</span>
                      <br />
                      <span className="text-text-secondary">{encounter.officerBadge || 'Not provided'}</span>
                    </div>
                    
                    <div>
                      <span className="font-medium text-text-primary">{text.officerName}:</span>
                      <br />
                      <span className="text-text-secondary">{encounter.officerName || 'Not provided'}</span>
                    </div>
                    
                    <div className="md:col-span-2">
                      <span className="font-medium text-text-primary">{text.reason}:</span>
                      <br />
                      <span className="text-text-secondary">{encounter.reason || 'Not specified'}</span>
                    </div>
                    
                    {encounter.notes && (
                      <div className="md:col-span-2">
                        <span className="font-medium text-text-primary">{text.notes}:</span>
                        <br />
                        <span className="text-text-secondary">{encounter.notes}</span>
                      </div>
                    )}
                  </div>
                  
                  {/* Audio Actions */}
                  {encounter.audioURL && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <div className="flex items-center space-x-4">
                        <button
                          onClick={() => handlePlayAudio(encounter)}
                          className="flex items-center space-x-2 btn-secondary"
                        >
                          <Play className="h-4 w-4" />
                          <span>{text.playAudio}</span>
                        </button>
                        
                        <button
                          onClick={() => handleDownloadAudio(encounter)}
                          className="flex items-center space-x-2 btn-outline"
                        >
                          <Download className="h-4 w-4" />
                          <span>{text.downloadAudio}</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default MyEncounters