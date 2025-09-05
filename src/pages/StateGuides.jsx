import React, { useState } from 'react'
import { FileText, MapPin, Search, Lock } from 'lucide-react'
import useAppStore from '../store/useAppStore'

const StateGuides = () => {
  const { language, subscriptionStatus, selectedState, setSelectedState } = useAppStore()
  const [searchTerm, setSearchTerm] = useState('')
  
  const isPremium = subscriptionStatus !== 'free'
  
  const states = [
    'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut',
    'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa',
    'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan',
    'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire',
    'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio',
    'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota',
    'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia',
    'Wisconsin', 'Wyoming'
  ]
  
  const filteredStates = states.filter(state =>
    state.toLowerCase().includes(searchTerm.toLowerCase())
  )
  
  const content = {
    en: {
      title: "State-Specific Legal Guides",
      subtitle: "Localized legal information for your jurisdiction",
      searchPlaceholder: "Search for your state...",
      selectState: "Select Your State",
      noState: "Please select a state to view specific legal information",
      premiumRequired: "Premium subscription required for detailed state guides"
    },
    es: {
      title: "Guías Legales Específicas del Estado",
      subtitle: "Información legal localizada para tu jurisdicción",
      searchPlaceholder: "Busca tu estado...",
      selectState: "Selecciona Tu Estado",
      noState: "Por favor selecciona un estado para ver información legal específica",
      premiumRequired: "Se requiere suscripción premium para guías estatales detalladas"
    }
  }
  
  const text = content[language]
  
  // Sample state-specific information (would be expanded with real data)
  const stateInfo = {
    California: {
      en: {
        stopAndId: "California is not a 'Stop and Identify' state. You are not required to provide identification unless you are driving or under arrest.",
        recording: "Recording police is legal in California as long as you don't interfere with their duties.",
        search: "Police need reasonable suspicion for a pat-down and probable cause or consent for a full search.",
        specialNotes: [
          "California has strong privacy protections",
          "Digital privacy laws are more restrictive",
          "Cannabis laws differ from federal law"
        ]
      },
      es: {
        stopAndId: "California no es un estado de 'Parar e Identificar'. No se requiere que proporciones identificación a menos que estés conduciendo o bajo arresto.",
        recording: "Grabar a la policía es legal en California siempre que no interfieras con sus deberes.",
        search: "La policía necesita sospecha razonable para un cacheo y causa probable o consentimiento para un registro completo.",
        specialNotes: [
          "California tiene fuertes protecciones de privacidad",
          "Las leyes de privacidad digital son más restrictivas",
          "Las leyes de cannabis difieren de la ley federal"
        ]
      }
    },
    Texas: {
      en: {
        stopAndId: "Texas is a 'Stop and Identify' state. You must provide your name if lawfully arrested, but not during a mere detention.",
        recording: "Recording police is generally legal in Texas in public spaces.",
        search: "Police need reasonable suspicion for investigative detention and probable cause for arrest.",
        specialNotes: [
          "Open carry laws are more permissive",
          "Castle Doctrine and Stand Your Ground laws apply",
          "Different rules in border regions"
        ]
      },
      es: {
        stopAndId: "Texas es un estado de 'Parar e Identificar'. Debes proporcionar tu nombre si eres arrestado legalmente, pero no durante una mera detención.",
        recording: "Grabar a la policía es generalmente legal en Texas en espacios públicos.",
        search: "La policía necesita sospecha razonable para detención investigativa y causa probable para arresto.",
        specialNotes: [
          "Las leyes de portación abierta son más permisivas",
          "Aplican las leyes de Doctrina del Castillo y Defender Tu Terreno",
          "Diferentes reglas en regiones fronterizas"
        ]
      }
    }
  }
  
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <FileText className="h-12 w-12 text-primary mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-text-primary mb-2">{text.title}</h1>
        <p className="text-lg text-text-secondary">{text.subtitle}</p>
      </div>
      
      {/* State Selection */}
      <div className="card mb-8">
        <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center">
          <MapPin className="h-5 w-5 mr-2" />
          {text.selectState}
        </h3>
        
        {/* Search Input */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-text-secondary" />
          <input
            type="text"
            placeholder={text.searchPlaceholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
        
        {/* State Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 max-h-60 overflow-y-auto">
          {filteredStates.map((state) => (
            <button
              key={state}
              onClick={() => setSelectedState(state)}
              className={`p-2 text-sm rounded-md transition-colors ${
                selectedState === state
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-text-primary hover:bg-gray-200'
              }`}
            >
              {state}
            </button>
          ))}
        </div>
      </div>
      
      {/* State Information */}
      {selectedState ? (
        <div className="space-y-6">
          {/* Premium Check */}
          {!isPremium ? (
            <div className="card-elevated bg-gradient-to-r from-primary to-blue-600 text-white">
              <div className="flex items-center space-x-3 mb-3">
                <Lock className="h-6 w-6" />
                <h3 className="text-lg font-semibold">{text.premiumRequired}</h3>
              </div>
              <p className="text-blue-100 mb-4">
                {language === 'en'
                  ? `Upgrade to access detailed legal information for ${selectedState} and all other states.`
                  : `Actualiza para acceder a información legal detallada para ${selectedState} y todos los otros estados.`
                }
              </p>
              <button className="btn-secondary bg-white text-primary hover:bg-gray-100">
                {language === 'en' ? 'Upgrade Now' : 'Actualizar Ahora'}
              </button>
            </div>
          ) : (
            // Premium content
            <div className="space-y-6">
              <div className="card">
                <h3 className="text-xl font-semibold text-text-primary mb-4">
                  {selectedState} {language === 'en' ? 'Legal Guide' : 'Guía Legal'}
                </h3>
                
                {stateInfo[selectedState] ? (
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold text-text-primary mb-2">
                        {language === 'en' ? 'Stop and Identify Laws' : 'Leyes de Parar e Identificar'}
                      </h4>
                      <p className="text-text-secondary">
                        {stateInfo[selectedState][language].stopAndId}
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-text-primary mb-2">
                        {language === 'en' ? 'Recording Rights' : 'Derechos de Grabación'}
                      </h4>
                      <p className="text-text-secondary">
                        {stateInfo[selectedState][language].recording}
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-text-primary mb-2">
                        {language === 'en' ? 'Search and Seizure' : 'Registro e Incautación'}
                      </h4>
                      <p className="text-text-secondary">
                        {stateInfo[selectedState][language].search}
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-text-primary mb-2">
                        {language === 'en' ? 'Special Considerations' : 'Consideraciones Especiales'}
                      </h4>
                      <ul className="space-y-1">
                        {stateInfo[selectedState][language].specialNotes.map((note, index) => (
                          <li key={index} className="flex items-start">
                            <span className="mr-2 mt-1.5 h-1.5 w-1.5 bg-primary rounded-full flex-shrink-0"></span>
                            <span className="text-text-secondary">{note}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ) : (
                  <p className="text-text-secondary">
                    {language === 'en'
                      ? `Detailed information for ${selectedState} is being updated. Check back soon.`
                      : `La información detallada para ${selectedState} se está actualizando. Revisa pronto.`
                    }
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="card text-center py-12">
          <MapPin className="h-12 w-12 text-text-secondary mx-auto mb-4" />
          <p className="text-text-secondary">{text.noState}</p>
        </div>
      )}
    </div>
  )
}

export default StateGuides