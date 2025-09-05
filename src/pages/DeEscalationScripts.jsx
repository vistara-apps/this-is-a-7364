import React, { useState } from 'react'
import { Users, Copy, CheckCircle, Lock } from 'lucide-react'
import useAppStore from '../store/useAppStore'

const DeEscalationScripts = () => {
  const { language, subscriptionStatus } = useAppStore()
  const [copiedIndex, setCopiedIndex] = useState(null)
  
  const copyToClipboard = async (text, index) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedIndex(index)
      setTimeout(() => setCopiedIndex(null), 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }
  
  const scriptsData = {
    en: {
      title: "De-escalation Scripts",
      subtitle: "Effective phrases to manage police interactions calmly and safely",
      categories: [
        {
          title: "Initial Contact",
          scripts: [
            "Good morning/afternoon/evening, officer.",
            "I understand you're doing your job.",
            "I want to cooperate within my rights.",
            "How can I help you today?"
          ]
        },
        {
          title: "Asserting Rights",
          scripts: [
            "I am exercising my right to remain silent.",
            "I do not consent to any searches.",
            "Am I free to go?",
            "I would like to speak with an attorney."
          ]
        },
        {
          title: "De-escalation",
          scripts: [
            "I understand your concerns, officer.",
            "I'm not trying to be difficult.",
            "I'm complying with lawful orders.",
            "I don't want any trouble."
          ]
        },
        {
          title: "Documentation",
          scripts: [
            "I am recording this interaction for both our protection.",
            "May I have your name and badge number?",
            "What is the reason for this stop?",
            "I would like a copy of any report filed."
          ]
        }
      ],
      premiumCategories: [
        {
          title: "Specific Situations - Traffic Stops",
          scripts: [
            "I'm reaching for my license and registration now.",
            "My hands are visible and I'm not reaching for anything.",
            "I was not aware I was speeding/breaking any laws.",
            "I understand you stopped me for [reason]. I don't have any questions about that right now."
          ]
        },
        {
          title: "Specific Situations - Street Encounters",
          scripts: [
            "I'm just walking home/to [destination].",
            "I live/work in this neighborhood.",
            "I haven't done anything wrong.",
            "I don't have any weapons or contraband on me."
          ]
        }
      ]
    },
    es: {
      title: "Guiones de Desescalada",
      subtitle: "Frases efectivas para manejar interacciones policiales con calma y seguridad",
      categories: [
        {
          title: "Contacto Inicial",
          scripts: [
            "Buenos días/tardes/noches, oficial.",
            "Entiendo que está haciendo su trabajo.",
            "Quiero cooperar dentro de mis derechos.",
            "¿Cómo puedo ayudarle hoy?"
          ]
        },
        {
          title: "Afirmando Derechos",
          scripts: [
            "Estoy ejerciendo mi derecho a permanecer en silencio.",
            "No consiento a ningún registro.",
            "¿Soy libre de irme?",
            "Me gustaría hablar con un abogado."
          ]
        },
        {
          title: "Desescalada",
          scripts: [
            "Entiendo sus preocupaciones, oficial.",
            "No estoy tratando de ser difícil.",
            "Estoy cumpliendo con órdenes legales.",
            "No quiero ningún problema."
          ]
        },
        {
          title: "Documentación",
          scripts: [
            "Estoy grabando esta interacción para la protección de ambos.",
            "¿Puedo tener su nombre y número de placa?",
            "¿Cuál es la razón de esta parada?",
            "Me gustaría una copia de cualquier reporte presentado."
          ]
        }
      ],
      premiumCategories: [
        {
          title: "Situaciones Específicas - Paradas de Tráfico",
          scripts: [
            "Estoy alcanzando mi licencia y registro ahora.",
            "Mis manos están visibles y no estoy alcanzando nada.",
            "No sabía que estaba excediendo la velocidad/rompiendo leyes.",
            "Entiendo que me detuvo por [razón]. No tengo preguntas sobre eso ahora."
          ]
        },
        {
          title: "Situaciones Específicas - Encuentros Callejeros",
          scripts: [
            "Solo estoy caminando a casa/a [destino].",
            "Vivo/trabajo en este vecindario.",
            "No he hecho nada malo.",
            "No tengo armas o contrabando conmigo."
          ]
        }
      ]
    }
  }
  
  const content = scriptsData[language]
  const isPremium = subscriptionStatus !== 'free'
  
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <Users className="h-12 w-12 text-primary mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-text-primary mb-2">{content.title}</h1>
        <p className="text-lg text-text-secondary">{content.subtitle}</p>
      </div>
      
      {/* Basic Scripts */}
      <div className="space-y-8 mb-8">
        {content.categories.map((category, categoryIndex) => (
          <div key={categoryIndex} className="card">
            <h3 className="text-lg font-semibold text-text-primary mb-4">{category.title}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {category.scripts.map((script, scriptIndex) => (
                <div
                  key={scriptIndex}
                  className="p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-primary transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <p className="text-text-primary text-sm flex-1 mr-2">"{script}"</p>
                    <button
                      onClick={() => copyToClipboard(script, `${categoryIndex}-${scriptIndex}`)}
                      className="p-1 text-text-secondary hover:text-primary transition-colors flex-shrink-0"
                      title={language === 'en' ? 'Copy to clipboard' : 'Copiar al portapapeles'}
                    >
                      {copiedIndex === `${categoryIndex}-${scriptIndex}` ? (
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      {/* Premium Scripts */}
      <div className="space-y-8">
        {content.premiumCategories.map((category, categoryIndex) => (
          <div key={categoryIndex} className={`card ${!isPremium ? 'opacity-60' : ''}`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-text-primary">{category.title}</h3>
              {!isPremium && <Lock className="h-5 w-5 text-text-secondary" />}
            </div>
            
            {!isPremium && (
              <div className="bg-gradient-to-r from-primary to-blue-600 text-white p-4 rounded-lg mb-4">
                <p className="text-sm font-medium mb-2">
                  {language === 'en' ? 'Premium Feature' : 'Función Premium'}
                </p>
                <p className="text-xs text-blue-100">
                  {language === 'en'
                    ? 'Upgrade to access situation-specific scripts and advanced de-escalation techniques.'
                    : 'Actualiza para acceder a guiones específicos de situaciones y técnicas avanzadas de desescalada.'
                  }
                </p>
              </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {category.scripts.map((script, scriptIndex) => (
                <div
                  key={scriptIndex}
                  className={`p-4 bg-gray-50 rounded-lg border border-gray-200 ${
                    isPremium ? 'hover:border-primary transition-colors' : ''
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <p className="text-text-primary text-sm flex-1 mr-2">"{script}"</p>
                    {isPremium && (
                      <button
                        onClick={() => copyToClipboard(script, `premium-${categoryIndex}-${scriptIndex}`)}
                        className="p-1 text-text-secondary hover:text-primary transition-colors flex-shrink-0"
                        title={language === 'en' ? 'Copy to clipboard' : 'Copiar al portapapeles'}
                      >
                        {copiedIndex === `premium-${categoryIndex}-${scriptIndex}` ? (
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      {/* Tips Section */}
      <div className="mt-8 card bg-blue-50">
        <h3 className="text-lg font-semibold text-blue-800 mb-4">
          {language === 'en' ? 'Usage Tips' : 'Consejos de Uso'}
        </h3>
        <ul className="space-y-2 text-sm text-blue-700">
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>
              {language === 'en'
                ? 'Speak clearly and calmly. Maintain a respectful tone.'
                : 'Habla claramente y con calma. Mantén un tono respetuoso.'
              }
            </span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>
              {language === 'en'
                ? 'Keep your hands visible at all times.'
                : 'Mantén las manos visibles en todo momento.'
              }
            </span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>
              {language === 'en'
                ? 'Repeat your rights assertion if necessary.'
                : 'Repite la afirmación de tus derechos si es necesario.'
              }
            </span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>
              {language === 'en'
                ? 'Do not argue about the legality of the stop during the encounter.'
                : 'No discutas sobre la legalidad de la parada durante el encuentro.'
              }
            </span>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default DeEscalationScripts