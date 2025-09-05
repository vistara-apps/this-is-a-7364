import React from 'react'
import { Shield, AlertTriangle, CheckCircle, Info } from 'lucide-react'
import useAppStore from '../store/useAppStore'

const RightsGuide = () => {
  const { language, subscriptionStatus } = useAppStore()
  
  const rightsData = {
    en: {
      title: "Your Constitutional Rights",
      subtitle: "Know these fundamental rights during any police encounter",
      rights: [
        {
          title: "Right to Remain Silent",
          description: "You have the right to remain silent. You do not have to answer questions about where you are going, where you are traveling from, what you are doing, or where you live.",
          script: "I am exercising my right to remain silent."
        },
        {
          title: "Right to Refuse Search",
          description: "You have the right to refuse a search of yourself, your car, or your home unless the officer has a warrant or probable cause.",
          script: "I do not consent to any searches."
        },
        {
          title: "Right to Leave",
          description: "You have the right to leave if you are not under arrest. You can ask: 'Am I free to go?'",
          script: "Am I free to go? I would like to leave now."
        },
        {
          title: "Right to an Attorney",
          description: "You have the right to an attorney. If you cannot afford one, one will be provided for you.",
          script: "I want to speak with an attorney before answering any questions."
        },
        {
          title: "Right to Record",
          description: "You generally have the right to record police in public spaces, as long as you don't interfere with their duties.",
          script: "I am recording this interaction for my protection and yours."
        }
      ],
      dosList: [
        "Stay calm and keep your hands visible",
        "Clearly state your rights",
        "Ask if you are free to leave",
        "Record the interaction if possible",
        "Remember officer details (badge number, patrol car, etc.)"
      ],
      dontsList: [
        "Don't resist, even if you believe the stop is unfair",
        "Don't argue or raise your voice",
        "Don't consent to searches",
        "Don't lie or provide false information",
        "Don't reach for anything without permission"
      ]
    },
    es: {
      title: "Tus Derechos Constitucionales",
      subtitle: "Conoce estos derechos fundamentales durante cualquier encuentro policial",
      rights: [
        {
          title: "Derecho a Permanecer en Silencio",
          description: "Tienes derecho a permanecer en silencio. No tienes que responder preguntas sobre adónde vas, de dónde vienes, qué estás haciendo o dónde vives.",
          script: "Estoy ejerciendo mi derecho a permanecer en silencio."
        },
        {
          title: "Derecho a Rechazar Registro",
          description: "Tienes derecho a rechazar un registro de tu persona, tu auto o tu hogar, a menos que el oficial tenga una orden o causa probable.",
          script: "No consiento a ningún registro."
        },
        {
          title: "Derecho a Irte",
          description: "Tienes derecho a irte si no estás bajo arresto. Puedes preguntar: '¿Soy libre de irme?'",
          script: "¿Soy libre de irme? Me gustaría irme ahora."
        },
        {
          title: "Derecho a un Abogado",
          description: "Tienes derecho a un abogado. Si no puedes pagar uno, se te proporcionará uno.",
          script: "Quiero hablar con un abogado antes de responder cualquier pregunta."
        },
        {
          title: "Derecho a Grabar",
          description: "Generalmente tienes derecho a grabar a la policía en espacios públicos, siempre que no interfiera con sus deberes.",
          script: "Estoy grabando esta interacción para mi protección y la suya."
        }
      ],
      dosList: [
        "Mantén la calma y mantén las manos visibles",
        "Declara claramente tus derechos",
        "Pregunta si eres libre de irte",
        "Graba la interacción si es posible",
        "Recuerda detalles del oficial (número de placa, patrulla, etc.)"
      ],
      dontsList: [
        "No resistas, incluso si crees que la parada es injusta",
        "No discutas o alces la voz",
        "No consientas a registros",
        "No mientas o proporciones información falsa",
        "No alcances nada sin permiso"
      ]
    }
  }
  
  const content = rightsData[language]
  
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-text-primary mb-2">{content.title}</h1>
        <p className="text-lg text-text-secondary">{content.subtitle}</p>
      </div>
      
      {/* Rights Cards */}
      <div className="space-y-6 mb-12">
        {content.rights.map((right, index) => (
          <div key={index} className="card">
            <div className="flex items-start space-x-4">
              <div className="p-2 bg-primary bg-opacity-10 rounded-full">
                <CheckCircle className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-text-primary mb-2">{right.title}</h3>
                <p className="text-text-secondary mb-4">{right.description}</p>
                <div className="bg-gray-50 p-3 rounded-md border-l-4 border-l-primary">
                  <p className="text-sm font-medium text-text-primary">
                    💬 "{right.script}"
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Do's and Don'ts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Do's */}
        <div className="card bg-green-50">
          <div className="flex items-center space-x-2 mb-4">
            <CheckCircle className="h-6 w-6 text-green-600" />
            <h3 className="text-lg font-semibold text-green-800">
              {language === 'en' ? "DO's" : "SÍ Haz"}
            </h3>
          </div>
          <ul className="space-y-2">
            {content.dosList.map((item, index) => (
              <li key={index} className="flex items-start space-x-2">
                <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-green-800">{item}</span>
              </li>
            ))}
          </ul>
        </div>
        
        {/* Don'ts */}
        <div className="card bg-red-50">
          <div className="flex items-center space-x-2 mb-4">
            <AlertTriangle className="h-6 w-6 text-red-600" />
            <h3 className="text-lg font-semibold text-red-800">
              {language === 'en' ? "DON'Ts" : "NO Hagas"}
            </h3>
          </div>
          <ul className="space-y-2">
            {content.dontsList.map((item, index) => (
              <li key={index} className="flex items-start space-x-2">
                <AlertTriangle className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-red-800">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      {/* Premium Upgrade */}
      {subscriptionStatus === 'free' && (
        <div className="mt-8 card-elevated bg-gradient-to-r from-primary to-blue-600 text-white">
          <div className="flex items-center space-x-3 mb-3">
            <Info className="h-6 w-6" />
            <h3 className="text-lg font-semibold">
              {language === 'en' ? 'Upgrade for State-Specific Rights' : 'Actualiza para Derechos Específicos del Estado'}
            </h3>
          </div>
          <p className="text-blue-100 mb-4">
            {language === 'en'
              ? 'Get detailed, state-specific legal information and advanced features with our premium subscription.'
              : 'Obtén información legal detallada y específica del estado con funciones avanzadas con nuestra suscripción premium.'
            }
          </p>
          <button className="btn-secondary bg-white text-primary hover:bg-gray-100">
            {language === 'en' ? 'Learn More' : 'Saber Más'}
          </button>
        </div>
      )}
    </div>
  )
}

export default RightsGuide