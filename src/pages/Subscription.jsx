import React from 'react'
import { CreditCard, Check, Star, Lock } from 'lucide-react'
import useAppStore from '../store/useAppStore'

const Subscription = () => {
  const { language, subscriptionStatus, setSubscriptionStatus } = useAppStore()
  
  const content = {
    en: {
      title: "Choose Your Plan",
      subtitle: "Get the protection and knowledge you need",
      currentPlan: "Current Plan",
      free: "Free",
      basic: "Basic",
      premium: "Premium",
      monthly: "/month",
      upgrade: "Upgrade Now",
      downgrade: "Downgrade",
      features: {
        free: [
          "Basic rights guide",
          "Essential de-escalation scripts",
          "Basic encounter recording",
          "Community support"
        ],
        basic: [
          "Everything in Free",
          "Bilingual scripts (English/Spanish)",
          "Extended recording time",
          "Encounter history",
          "Email support"
        ],
        premium: [
          "Everything in Basic",
          "State-specific legal guides",
          "Advanced de-escalation scripts",
          "Unlimited recording storage",
          "Shareable encounter summaries",
          "Priority support",
          "Legal resource directory"
        ]
      },
      popular: "Most Popular",
      recommended: "Recommended"
    },
    es: {
      title: "Elige Tu Plan",
      subtitle: "Obtén la protección y conocimiento que necesitas",
      currentPlan: "Plan Actual",
      free: "Gratis",
      basic: "Básico",
      premium: "Premium",
      monthly: "/mes",
      upgrade: "Actualizar Ahora",
      downgrade: "Degradar",
      features: {
        free: [
          "Guía básica de derechos",
          "Guiones esenciales de desescalada",
          "Grabación básica de encuentros",
          "Soporte comunitario"
        ],
        basic: [
          "Todo en Gratis",
          "Guiones bilingües (Inglés/Español)",
          "Tiempo de grabación extendido",
          "Historial de encuentros",
          "Soporte por email"
        ],
        premium: [
          "Todo en Básico",
          "Guías legales específicas del estado",
          "Guiones avanzados de desescalada",
          "Almacenamiento ilimitado de grabaciones",
          "Resúmenes compartibles de encuentros",
          "Soporte prioritario",
          "Directorio de recursos legales"
        ]
      },
      popular: "Más Popular",
      recommended: "Recomendado"
    }
  }
  
  const text = content[language]
  
  const plans = [
    {
      id: 'free',
      name: text.free,
      price: 0,
      features: text.features.free,
      buttonText: subscriptionStatus === 'free' ? text.currentPlan : text.downgrade,
      isActive: subscriptionStatus === 'free',
      isRecommended: false
    },
    {
      id: 'basic',
      name: text.basic,
      price: 1.99,
      features: text.features.basic,
      buttonText: subscriptionStatus === 'basic' ? text.currentPlan : text.upgrade,
      isActive: subscriptionStatus === 'basic',
      isRecommended: false,
      badge: text.popular
    },
    {
      id: 'premium',
      name: text.premium,
      price: 4.99,
      features: text.features.premium,
      buttonText: subscriptionStatus === 'premium' ? text.currentPlan : text.upgrade,
      isActive: subscriptionStatus === 'premium',
      isRecommended: true,
      badge: text.recommended
    }
  ]
  
  const handleSubscribe = (planId) => {
    // In a real app, this would integrate with Stripe
    if (planId !== subscriptionStatus) {
      setSubscriptionStatus(planId)
      alert(language === 'en' 
        ? `Successfully ${planId === 'free' ? 'downgraded to' : 'upgraded to'} ${planId} plan!`
        : `¡${planId === 'free' ? 'Degradado a' : 'Actualizado a'} plan ${planId} exitosamente!`
      )
    }
  }
  
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <CreditCard className="h-12 w-12 text-primary mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-text-primary mb-2">{text.title}</h1>
        <p className="text-lg text-text-secondary">{text.subtitle}</p>
      </div>
      
      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`relative card-elevated transition-all duration-300 ${
              plan.isRecommended 
                ? 'ring-2 ring-primary scale-105' 
                : plan.isActive 
                  ? 'ring-2 ring-accent' 
                  : 'hover:shadow-modal'
            }`}
          >
            {/* Badge */}
            {plan.badge && (
              <div className={`absolute -top-3 left-1/2 transform -translate-x-1/2 px-4 py-1 text-xs font-medium rounded-full text-white ${
                plan.isRecommended ? 'bg-primary' : 'bg-accent'
              }`}>
                {plan.badge}
              </div>
            )}
            
            {/* Plan Header */}
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-text-primary mb-2">{plan.name}</h3>
              <div className="flex items-center justify-center">
                <span className="text-3xl font-bold text-text-primary">${plan.price}</span>
                {plan.price > 0 && <span className="text-text-secondary ml-1">{text.monthly}</span>}
              </div>
            </div>
            
            {/* Features */}
            <ul className="space-y-3 mb-8">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <Check className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                  <span className="text-text-secondary text-sm">{feature}</span>
                </li>
              ))}
            </ul>
            
            {/* Action Button */}
            <button
              onClick={() => handleSubscribe(plan.id)}
              disabled={plan.isActive}
              className={`w-full py-3 px-4 rounded-md font-semibold transition-colors ${
                plan.isActive
                  ? 'bg-gray-100 text-text-secondary cursor-not-allowed'
                  : plan.isRecommended
                    ? 'bg-primary text-white hover:bg-blue-600'
                    : 'bg-accent text-white hover:bg-green-600'
              }`}
            >
              {plan.buttonText}
            </button>
          </div>
        ))}
      </div>
      
      {/* Features Comparison */}
      <div className="card">
        <h3 className="text-xl font-semibold text-text-primary mb-6 text-center">
          {language === 'en' ? 'Feature Comparison' : 'Comparación de Características'}
        </h3>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-text-primary">
                  {language === 'en' ? 'Feature' : 'Característica'}
                </th>
                <th className="text-center py-3 px-4 font-medium text-text-primary">{text.free}</th>
                <th className="text-center py-3 px-4 font-medium text-text-primary">{text.basic}</th>
                <th className="text-center py-3 px-4 font-medium text-text-primary">{text.premium}</th>
              </tr>
            </thead>
            <tbody className="space-y-2">
              {[
                { 
                  name: language === 'en' ? 'Rights Guide' : 'Guía de Derechos', 
                  free: true, basic: true, premium: true 
                },
                { 
                  name: language === 'en' ? 'De-escalation Scripts' : 'Guiones de Desescalada', 
                  free: true, basic: true, premium: true 
                },
                { 
                  name: language === 'en' ? 'Encounter Recording' : 'Grabación de Encuentros', 
                  free: true, basic: true, premium: true 
                },
                { 
                  name: language === 'en' ? 'Bilingual Support' : 'Soporte Bilingüe', 
                  free: false, basic: true, premium: true 
                },
                { 
                  name: language === 'en' ? 'State-Specific Guides' : 'Guías Específicas del Estado', 
                  free: false, basic: false, premium: true 
                },
                { 
                  name: language === 'en' ? 'Advanced Scripts' : 'Guiones Avanzados', 
                  free: false, basic: false, premium: true 
                },
                { 
                  name: language === 'en' ? 'Unlimited Storage' : 'Almacenamiento Ilimitado', 
                  free: false, basic: false, premium: true 
                }
              ].map((feature, index) => (
                <tr key={index} className="border-b border-gray-100">
                  <td className="py-3 px-4 text-text-primary">{feature.name}</td>
                  <td className="py-3 px-4 text-center">
                    {feature.free ? (
                      <Check className="h-5 w-5 text-accent mx-auto" />
                    ) : (
                      <Lock className="h-5 w-5 text-gray-300 mx-auto" />
                    )}
                  </td>
                  <td className="py-3 px-4 text-center">
                    {feature.basic ? (
                      <Check className="h-5 w-5 text-accent mx-auto" />
                    ) : (
                      <Lock className="h-5 w-5 text-gray-300 mx-auto" />
                    )}
                  </td>
                  <td className="py-3 px-4 text-center">
                    {feature.premium ? (
                      <Check className="h-5 w-5 text-accent mx-auto" />
                    ) : (
                      <Lock className="h-5 w-5 text-gray-300 mx-auto" />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* FAQ Section */}
      <div className="mt-12 card">
        <h3 className="text-xl font-semibold text-text-primary mb-6 text-center">
          {language === 'en' ? 'Frequently Asked Questions' : 'Preguntas Frecuentes'}
        </h3>
        
        <div className="space-y-4">
          <div>
            <h4 className="font-medium text-text-primary mb-2">
              {language === 'en' 
                ? 'Can I cancel my subscription at any time?' 
                : '¿Puedo cancelar mi suscripción en cualquier momento?'
              }
            </h4>
            <p className="text-text-secondary text-sm">
              {language === 'en'
                ? 'Yes, you can cancel your subscription at any time. You will continue to have access to premium features until the end of your current billing period.'
                : 'Sí, puedes cancelar tu suscripción en cualquier momento. Continuarás teniendo acceso a las funciones premium hasta el final de tu período de facturación actual.'
              }
            </p>
          </div>
          
          <div>
            <h4 className="font-medium text-text-primary mb-2">
              {language === 'en' 
                ? 'Is my data secure?' 
                : '¿Están seguros mis datos?'
              }
            </h4>
            <p className="text-text-secondary text-sm">
              {language === 'en'
                ? 'Yes, we use industry-standard encryption to protect your data. Your encounter records are stored securely and privately.'
                : 'Sí, usamos cifrado estándar de la industria para proteger tus datos. Tus registros de encuentros se almacenan de forma segura y privada.'
              }
            </p>
          </div>
          
          <div>
            <h4 className="font-medium text-text-primary mb-2">
              {language === 'en' 
                ? 'What happens to my recordings if I downgrade?' 
                : '¿Qué pasa con mis grabaciones si degrado?'
              }
            </h4>
            <p className="text-text-secondary text-sm">
              {language === 'en'
                ? 'Your recordings remain accessible, but you may have limited storage for new recordings on the free plan.'
                : 'Tus grabaciones permanecen accesibles, pero puedes tener almacenamiento limitado para nuevas grabaciones en el plan gratuito.'
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Subscription