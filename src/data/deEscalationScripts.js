// Comprehensive de-escalation scripts for various police encounter scenarios
// These scripts are designed to promote safety and reduce tension

export const DE_ESCALATION_SCRIPTS = {
  // Initial Contact Scripts
  initialContact: {
    en: {
      title: 'Initial Contact',
      scenarios: [
        {
          situation: 'Officer approaches you',
          script: 'Good [morning/afternoon/evening], Officer. I want to cooperate and ensure everyone\'s safety. May I ask what this is regarding?',
          tone: 'Speak calmly and clearly, maintain respectful eye contact, keep hands visible',
          context: 'Use when first approached by an officer to establish a cooperative tone'
        },
        {
          situation: 'Traffic stop',
          script: 'Officer, I understand you\'ve stopped me. I want to comply with your instructions. May I ask the reason for the stop?',
          tone: 'Keep hands on steering wheel, speak clearly, avoid sudden movements',
          context: 'Use immediately after being pulled over in a vehicle'
        },
        {
          situation: 'Street encounter',
          script: 'Officer, I\'m happy to speak with you. I want to be respectful and follow your instructions. What can I help you with?',
          tone: 'Stand still, keep hands visible, maintain calm demeanor',
          context: 'Use when approached by police while walking or in public'
        }
      ]
    },
    es: {
      title: 'Contacto Inicial',
      scenarios: [
        {
          situation: 'El oficial se acerca a ti',
          script: 'Buenos [días/tardes/noches], Oficial. Quiero cooperar y asegurar la seguridad de todos. ¿Puedo preguntar de qué se trata esto?',
          tone: 'Habla con calma y claridad, mantén contacto visual respetuoso, mantén las manos visibles',
          context: 'Úsalo cuando un oficial se acerque por primera vez para establecer un tono cooperativo'
        },
        {
          situation: 'Parada de tráfico',
          script: 'Oficial, entiendo que me ha detenido. Quiero cumplir con sus instrucciones. ¿Puedo preguntar la razón de la parada?',
          tone: 'Mantén las manos en el volante, habla claramente, evita movimientos bruscos',
          context: 'Úsalo inmediatamente después de ser detenido en un vehículo'
        },
        {
          situation: 'Encuentro en la calle',
          script: 'Oficial, me complace hablar con usted. Quiero ser respetuoso y seguir sus instrucciones. ¿En qué puedo ayudarle?',
          tone: 'Mantente quieto, mantén las manos visibles, mantén la calma',
          context: 'Úsalo cuando la policía se acerque mientras caminas o estás en público'
        }
      ]
    }
  },

  // Rights Assertion Scripts
  rightsAssertion: {
    en: {
      title: 'Asserting Your Rights',
      scenarios: [
        {
          situation: 'Invoking right to remain silent',
          script: 'Officer, I respect your authority and want to cooperate. I\'m choosing to exercise my right to remain silent. I would like to speak with an attorney.',
          tone: 'Speak clearly and firmly but respectfully, maintain calm demeanor',
          context: 'Use when you want to invoke your Fifth Amendment right to remain silent'
        },
        {
          situation: 'Refusing consent to search',
          script: 'Officer, I understand you\'re doing your job. I do not consent to any searches of my person, belongings, or vehicle. I\'m not resisting, but I do not give permission.',
          tone: 'Be clear and firm but not confrontational, keep hands visible',
          context: 'Use when officer requests permission to search you or your property'
        },
        {
          situation: 'Asking if you\'re free to leave',
          script: 'Officer, I want to be respectful of your time and mine. Am I free to leave, or am I being detained?',
          tone: 'Ask politely and clearly, remain calm regardless of answer',
          context: 'Use to clarify your legal status during the encounter'
        }
      ]
    },
    es: {
      title: 'Afirmando Tus Derechos',
      scenarios: [
        {
          situation: 'Invocando el derecho a permanecer en silencio',
          script: 'Oficial, respeto su autoridad y quiero cooperar. Elijo ejercer mi derecho a permanecer en silencio. Me gustaría hablar con un abogado.',
          tone: 'Habla clara y firmemente pero con respeto, mantén la calma',
          context: 'Úsalo cuando quieras invocar tu derecho de la Quinta Enmienda a permanecer en silencio'
        },
        {
          situation: 'Negándose al consentimiento para registrar',
          script: 'Oficial, entiendo que está haciendo su trabajo. No consiento ningún registro de mi persona, pertenencias o vehículo. No me estoy resistiendo, pero no doy permiso.',
          tone: 'Sé claro y firme pero no confrontativo, mantén las manos visibles',
          context: 'Úsalo cuando el oficial solicite permiso para registrarte a ti o tu propiedad'
        },
        {
          situation: 'Preguntando si eres libre de irte',
          script: 'Oficial, quiero ser respetuoso de su tiempo y el mío. ¿Soy libre de irme, o estoy siendo detenido?',
          tone: 'Pregunta educadamente y con claridad, mantén la calma sin importar la respuesta',
          context: 'Úsalo para aclarar tu estatus legal durante el encuentro'
        }
      ]
    }
  },

  // De-escalation Scripts
  deEscalation: {
    en: {
      title: 'De-escalation Phrases',
      scenarios: [
        {
          situation: 'Officer seems agitated',
          script: 'Officer, I can see this is a serious situation. I want to help resolve this peacefully. Please let me know how I can best cooperate with you.',
          tone: 'Speak slowly and calmly, use a lower tone of voice, show open body language',
          context: 'Use when you sense tension rising or the officer appears stressed'
        },
        {
          situation: 'Misunderstanding occurs',
          script: 'Officer, I think there may be a misunderstanding. I want to clear this up respectfully. Can we talk through what\'s happening?',
          tone: 'Remain calm, speak clearly, avoid defensive body language',
          context: 'Use when there seems to be confusion about the situation'
        },
        {
          situation: 'Officer raises voice',
          script: 'Officer, I hear you and I want to understand. I\'m listening carefully to your instructions. Please help me know what you need from me.',
          tone: 'Keep your voice calm and steady, do not match their volume',
          context: 'Use when officer becomes louder or more aggressive in tone'
        }
      ]
    },
    es: {
      title: 'Frases de Desescalada',
      scenarios: [
        {
          situation: 'El oficial parece agitado',
          script: 'Oficial, puedo ver que esta es una situación seria. Quiero ayudar a resolver esto pacíficamente. Por favor, dígame cómo puedo cooperar mejor con usted.',
          tone: 'Habla lenta y calmadamente, usa un tono de voz más bajo, muestra lenguaje corporal abierto',
          context: 'Úsalo cuando sientas que la tensión aumenta o el oficial parece estresado'
        },
        {
          situation: 'Ocurre un malentendido',
          script: 'Oficial, creo que puede haber un malentendido. Quiero aclarar esto respetuosamente. ¿Podemos hablar sobre lo que está pasando?',
          tone: 'Mantén la calma, habla claramente, evita el lenguaje corporal defensivo',
          context: 'Úsalo cuando parece haber confusión sobre la situación'
        },
        {
          situation: 'El oficial alza la voz',
          script: 'Oficial, lo escucho y quiero entender. Estoy escuchando cuidadosamente sus instrucciones. Por favor, ayúdeme a saber qué necesita de mí.',
          tone: 'Mantén tu voz calmada y estable, no iguales su volumen',
          context: 'Úsalo cuando el oficial se vuelve más fuerte o agresivo en el tono'
        }
      ]
    }
  },

  // Specific Situation Scripts
  specificSituations: {
    en: {
      title: 'Specific Situations',
      scenarios: [
        {
          situation: 'Asked for identification',
          script: 'Officer, I understand you\'re asking for my ID. I want to comply with the law. May I reach for my identification slowly?',
          tone: 'Ask permission before reaching for ID, move slowly and deliberately',
          context: 'Use when officer requests identification documents'
        },
        {
          situation: 'Recording the encounter',
          script: 'Officer, I\'m recording this interaction for both of our protection. I\'m not interfering with your duties. I have the right to record in public.',
          tone: 'State this clearly but not confrontationally, continue recording',
          context: 'Use when you want to record the encounter (where legal)'
        },
        {
          situation: 'Passenger in vehicle',
          script: 'Officer, I\'m a passenger in this vehicle. I want to be respectful. Do I need to provide identification or am I free to remain silent?',
          tone: 'Speak clearly, remain calm, keep hands visible',
          context: 'Use when you\'re a passenger during a traffic stop'
        },
        {
          situation: 'Asked about others',
          script: 'Officer, I want to be helpful, but I can only speak for myself. I don\'t have information about other people\'s actions or whereabouts.',
          tone: 'Be honest but don\'t speculate or guess about others',
          context: 'Use when asked about friends, family, or other people'
        }
      ]
    },
    es: {
      title: 'Situaciones Específicas',
      scenarios: [
        {
          situation: 'Se solicita identificación',
          script: 'Oficial, entiendo que está pidiendo mi identificación. Quiero cumplir con la ley. ¿Puedo alcanzar mi identificación lentamente?',
          tone: 'Pide permiso antes de alcanzar la identificación, muévete lenta y deliberadamente',
          context: 'Úsalo cuando el oficial solicite documentos de identificación'
        },
        {
          situation: 'Grabando el encuentro',
          script: 'Oficial, estoy grabando esta interacción para la protección de ambos. No estoy interfiriendo con sus deberes. Tengo el derecho de grabar en público.',
          tone: 'Declara esto claramente pero no de manera confrontativa, continúa grabando',
          context: 'Úsalo cuando quieras grabar el encuentro (donde sea legal)'
        },
        {
          situation: 'Pasajero en vehículo',
          script: 'Oficial, soy pasajero en este vehículo. Quiero ser respetuoso. ¿Necesito proporcionar identificación o soy libre de permanecer en silencio?',
          tone: 'Habla claramente, mantén la calma, mantén las manos visibles',
          context: 'Úsalo cuando seas pasajero durante una parada de tráfico'
        },
        {
          situation: 'Preguntado sobre otros',
          script: 'Oficial, quiero ser útil, pero solo puedo hablar por mí mismo. No tengo información sobre las acciones o paradero de otras personas.',
          tone: 'Sé honesto pero no especules o adivines sobre otros',
          context: 'Úsalo cuando te pregunten sobre amigos, familia u otras personas'
        }
      ]
    }
  },

  // Emergency Scripts
  emergency: {
    en: {
      title: 'Emergency Situations',
      scenarios: [
        {
          situation: 'Feeling unsafe',
          script: 'Officer, I want to cooperate fully. I\'m feeling concerned for my safety. Can we please resolve this calmly? I\'m not resisting.',
          tone: 'Speak clearly but show you\'re not a threat, keep hands visible',
          context: 'Use if you feel the situation is escalating dangerously'
        },
        {
          situation: 'Medical emergency',
          script: 'Officer, I have a medical condition that requires attention. I need medical assistance. I\'m not resisting, but I need help.',
          tone: 'Speak clearly and urgently but remain as calm as possible',
          context: 'Use if you or someone else has a medical emergency'
        },
        {
          situation: 'Witness present',
          script: 'Officer, I want to cooperate. There are witnesses present who can see this interaction. Let\'s handle this professionally.',
          tone: 'State factually without being threatening, remain respectful',
          context: 'Use when there are bystanders who can witness the encounter'
        }
      ]
    },
    es: {
      title: 'Situaciones de Emergencia',
      scenarios: [
        {
          situation: 'Sintiéndose inseguro',
          script: 'Oficial, quiero cooperar completamente. Me siento preocupado por mi seguridad. ¿Podemos resolver esto con calma, por favor? No me estoy resistiendo.',
          tone: 'Habla claramente pero muestra que no eres una amenaza, mantén las manos visibles',
          context: 'Úsalo si sientes que la situación se está escalando peligrosamente'
        },
        {
          situation: 'Emergencia médica',
          script: 'Oficial, tengo una condición médica que requiere atención. Necesito asistencia médica. No me estoy resistiendo, pero necesito ayuda.',
          tone: 'Habla clara y urgentemente pero mantén la calma tanto como sea posible',
          context: 'Úsalo si tú o alguien más tiene una emergencia médica'
        },
        {
          situation: 'Testigo presente',
          script: 'Oficial, quiero cooperar. Hay testigos presentes que pueden ver esta interacción. Manejemos esto profesionalmente.',
          tone: 'Declara factualmente sin ser amenazante, mantén el respeto',
          context: 'Úsalo cuando hay espectadores que pueden presenciar el encuentro'
        }
      ]
    }
  }
}

// Helper function to get scripts by category and language
export const getScriptsByCategory = (category, language = 'en') => {
  return DE_ESCALATION_SCRIPTS[category]?.[language] || null
}

// Helper function to get all categories
export const getScriptCategories = () => {
  return Object.keys(DE_ESCALATION_SCRIPTS)
}

// Helper function to search scripts by situation
export const searchScripts = (searchTerm, language = 'en') => {
  const results = []
  
  Object.entries(DE_ESCALATION_SCRIPTS).forEach(([category, data]) => {
    const languageData = data[language]
    if (languageData) {
      languageData.scenarios.forEach(scenario => {
        if (
          scenario.situation.toLowerCase().includes(searchTerm.toLowerCase()) ||
          scenario.script.toLowerCase().includes(searchTerm.toLowerCase()) ||
          scenario.context.toLowerCase().includes(searchTerm.toLowerCase())
        ) {
          results.push({
            category,
            categoryTitle: languageData.title,
            ...scenario
          })
        }
      })
    }
  })
  
  return results
}

// Helper function to get random script for practice
export const getRandomScript = (language = 'en') => {
  const categories = Object.keys(DE_ESCALATION_SCRIPTS)
  const randomCategory = categories[Math.floor(Math.random() * categories.length)]
  const categoryData = DE_ESCALATION_SCRIPTS[randomCategory][language]
  
  if (categoryData && categoryData.scenarios.length > 0) {
    const randomScenario = categoryData.scenarios[Math.floor(Math.random() * categoryData.scenarios.length)]
    return {
      category: randomCategory,
      categoryTitle: categoryData.title,
      ...randomScenario
    }
  }
  
  return null
}
