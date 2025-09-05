import React, { useState, useRef } from 'react'
import { Mic, MicOff, Square, Play, Pause, MapPin, User, Calendar, Clock } from 'lucide-react'
import useAppStore from '../store/useAppStore'

const EncounterRecorder = () => {
  const { language, addEncounter, setCurrentRecording, setIsRecording, isRecording } = useAppStore()
  const [mediaRecorder, setMediaRecorder] = useState(null)
  const [audioURL, setAudioURL] = useState(null)
  const [recordingTime, setRecordingTime] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [encounterDetails, setEncounterDetails] = useState({
    location: '',
    officerBadge: '',
    officerName: '',
    reason: '',
    notes: ''
  })
  
  const audioRef = useRef(null)
  const timerRef = useRef(null)
  const chunksRef = useRef([])
  
  const content = {
    en: {
      title: "Document Your Encounter",
      subtitle: "Record audio and capture important details",
      startRecording: "Start Recording",
      stopRecording: "Stop Recording",
      playAudio: "Play Audio",
      pauseAudio: "Pause Audio",
      location: "Location",
      officerBadge: "Officer Badge Number",
      officerName: "Officer Name (if provided)",
      reason: "Stated reason for stop",
      notes: "Additional notes",
      saveEncounter: "Save Encounter",
      encounterSaved: "Encounter saved successfully!",
      locationPlaceholder: "Enter street address or general area",
      reasonPlaceholder: "e.g., Traffic violation, suspicious activity...",
      notesPlaceholder: "Any additional details you want to remember",
      time: "Recording time"
    },
    es: {
      title: "Documenta Tu Encuentro",
      subtitle: "Graba audio y captura detalles importantes",
      startRecording: "Comenzar Grabación",
      stopRecording: "Detener Grabación",
      playAudio: "Reproducir Audio",
      pauseAudio: "Pausar Audio",
      location: "Ubicación",
      officerBadge: "Número de Placa del Oficial",
      officerName: "Nombre del Oficial (si se proporciona)",
      reason: "Razón declarada para la parada",
      notes: "Notas adicionales",
      saveEncounter: "Guardar Encuentro",
      encounterSaved: "¡Encuentro guardado exitosamente!",
      locationPlaceholder: "Ingresa dirección o área general",
      reasonPlaceholder: "ej., Violación de tráfico, actividad sospechosa...",
      notesPlaceholder: "Cualquier detalle adicional que quieras recordar",
      time: "Tiempo de grabación"
    }
  }
  
  const text = content[language]
  
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const recorder = new MediaRecorder(stream)
      
      chunksRef.current = []
      
      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data)
        }
      }
      
      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' })
        const url = URL.createObjectURL(blob)
        setAudioURL(url)
        setCurrentRecording(blob)
        
        // Stop all tracks to release microphone
        stream.getTracks().forEach(track => track.stop())
      }
      
      recorder.start()
      setMediaRecorder(recorder)
      setIsRecording(true)
      setRecordingTime(0)
      
      // Start timer
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1)
      }, 1000)
      
    } catch (error) {
      console.error('Error accessing microphone:', error)
      alert(language === 'en' ? 'Unable to access microphone' : 'No se puede acceder al micrófono')
    }
  }
  
  const stopRecording = () => {
    if (mediaRecorder && mediaRecorder.state === 'recording') {
      mediaRecorder.stop()
      setMediaRecorder(null)
      setIsRecording(false)
      
      if (timerRef.current) {
        clearInterval(timerRef.current)
        timerRef.current = null
      }
    }
  }
  
  const togglePlayback = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }
  
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }
  
  const handleInputChange = (field, value) => {
    setEncounterDetails(prev => ({
      ...prev,
      [field]: value
    }))
  }
  
  const saveEncounter = () => {
    const encounter = {
      timestamp: new Date().toISOString(),
      recordingTime: formatTime(recordingTime),
      audioURL,
      ...encounterDetails
    }
    
    addEncounter(encounter)
    
    // Reset form
    setEncounterDetails({
      location: '',
      officerBadge: '',
      officerName: '',
      reason: '',
      notes: ''
    })
    setAudioURL(null)
    setRecordingTime(0)
    setCurrentRecording(null)
    
    alert(text.encounterSaved)
  }
  
  const getCurrentDateTime = () => {
    const now = new Date()
    return now.toLocaleString(language === 'en' ? 'en-US' : 'es-ES')
  }
  
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <Mic className="h-12 w-12 text-primary mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-text-primary mb-2">{text.title}</h1>
        <p className="text-lg text-text-secondary">{text.subtitle}</p>
      </div>
      
      {/* Current Date/Time */}
      <div className="card mb-6 bg-blue-50">
        <div className="flex items-center space-x-4">
          <Calendar className="h-5 w-5 text-blue-600" />
          <div>
            <p className="text-sm text-blue-800 font-medium">
              {language === 'en' ? 'Current Date & Time' : 'Fecha y Hora Actual'}
            </p>
            <p className="text-blue-600">{getCurrentDateTime()}</p>
          </div>
        </div>
      </div>
      
      {/* Recording Controls */}
      <div className="card mb-6">
        <div className="text-center">
          <div className="mb-6">
            {isRecording ? (
              <div className="flex flex-col items-center space-y-4">
                <div className="relative">
                  <button
                    onClick={stopRecording}
                    className="w-20 h-20 bg-red-600 hover:bg-red-700 text-white rounded-full flex items-center justify-center transition-colors shadow-lg"
                  >
                    <Square className="h-8 w-8" />
                  </button>
                  <div className="absolute -inset-2 border-4 border-red-300 rounded-full animate-pulse"></div>
                </div>
                <div className="flex items-center space-x-2 text-red-600">
                  <div className="w-3 h-3 bg-red-600 rounded-full animate-pulse"></div>
                  <span className="font-mono text-lg">{formatTime(recordingTime)}</span>
                </div>
                <p className="text-text-secondary">{text.stopRecording}</p>
              </div>
            ) : (
              <div className="flex flex-col items-center space-y-4">
                <button
                  onClick={startRecording}
                  className="w-20 h-20 bg-primary hover:bg-blue-600 text-white rounded-full flex items-center justify-center transition-colors shadow-lg"
                >
                  <Mic className="h-8 w-8" />
                </button>
                <p className="text-text-secondary">{text.startRecording}</p>
              </div>
            )}
          </div>
          
          {/* Audio Playback */}
          {audioURL && (
            <div className="pt-6 border-t border-gray-200">
              <div className="flex items-center justify-center space-x-4 mb-4">
                <button
                  onClick={togglePlayback}
                  className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  {isPlaying ? (
                    <>
                      <Pause className="h-4 w-4" />
                      <span>{text.pauseAudio}</span>
                    </>
                  ) : (
                    <>
                      <Play className="h-4 w-4" />
                      <span>{text.playAudio}</span>
                    </>
                  )}
                </button>
                <div className="flex items-center space-x-2 text-text-secondary">
                  <Clock className="h-4 w-4" />
                  <span>{text.time}: {formatTime(recordingTime)}</span>
                </div>
              </div>
              <audio
                ref={audioRef}
                src={audioURL}
                onEnded={() => setIsPlaying(false)}
                className="hidden"
              />
            </div>
          )}
        </div>
      </div>
      
      {/* Encounter Details Form */}
      <div className="card">
        <h3 className="text-lg font-semibold text-text-primary mb-6">
          {language === 'en' ? 'Encounter Details' : 'Detalles del Encuentro'}
        </h3>
        
        <div className="space-y-4">
          {/* Location */}
          <div>
            <label className="flex items-center space-x-2 text-sm font-medium text-text-primary mb-2">
              <MapPin className="h-4 w-4" />
              <span>{text.location}</span>
            </label>
            <input
              type="text"
              value={encounterDetails.location}
              onChange={(e) => handleInputChange('location', e.target.value)}
              placeholder={text.locationPlaceholder}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          
          {/* Officer Badge */}
          <div>
            <label className="flex items-center space-x-2 text-sm font-medium text-text-primary mb-2">
              <User className="h-4 w-4" />
              <span>{text.officerBadge}</span>
            </label>
            <input
              type="text"
              value={encounterDetails.officerBadge}
              onChange={(e) => handleInputChange('officerBadge', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          
          {/* Officer Name */}
          <div>
            <label className="text-sm font-medium text-text-primary mb-2 block">
              {text.officerName}
            </label>
            <input
              type="text"
              value={encounterDetails.officerName}
              onChange={(e) => handleInputChange('officerName', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          
          {/* Reason */}
          <div>
            <label className="text-sm font-medium text-text-primary mb-2 block">
              {text.reason}
            </label>
            <input
              type="text"
              value={encounterDetails.reason}
              onChange={(e) => handleInputChange('reason', e.target.value)}
              placeholder={text.reasonPlaceholder}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          
          {/* Notes */}
          <div>
            <label className="text-sm font-medium text-text-primary mb-2 block">
              {text.notes}
            </label>
            <textarea
              value={encounterDetails.notes}
              onChange={(e) => handleInputChange('notes', e.target.value)}
              placeholder={text.notesPlaceholder}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
        </div>
        
        {/* Save Button */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <button
            onClick={saveEncounter}
            disabled={!audioURL && !encounterDetails.location}
            className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {text.saveEncounter}
          </button>
        </div>
      </div>
    </div>
  )
}

export default EncounterRecorder