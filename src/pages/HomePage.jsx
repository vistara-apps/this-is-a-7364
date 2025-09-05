import React from 'react'
import { Link } from 'react-router-dom'
import { Shield, Users, FileText, Mic, ArrowRight, Star } from 'lucide-react'
import useAppStore from '../store/useAppStore'

const HomePage = () => {
  const { subscriptionStatus, language } = useAppStore()
  
  const features = [
    {
      icon: Shield,
      title: language === 'en' ? 'Know Your Rights' : 'Conoce Tus Derechos',
      description: language === 'en' 
        ? 'Instant access to your constitutional rights during police encounters'
        : 'Acceso instantáneo a tus derechos constitucionales durante encuentros policiales',
      href: '/rights',
      color: 'text-blue-600'
    },
    {
      icon: Users,
      title: language === 'en' ? 'De-escalation Scripts' : 'Guiones de Desescalada',
      description: language === 'en'
        ? 'Effective phrases to manage interactions calmly and safely'
        : 'Frases efectivas para manejar interacciones con calma y seguridad',
      href: '/scripts',
      color: 'text-green-600'
    },
    {
      icon: FileText,
      title: language === 'en' ? 'State-Specific Guides' : 'Guías Específicas del Estado',
      description: language === 'en'
        ? 'Localized legal information for your jurisdiction'
        : 'Información legal localizada para tu jurisdicción',
      href: '/state-guides',
      color: 'text-purple-600'
    },
    {
      icon: Mic,
      title: language === 'en' ? 'Document Encounters' : 'Documentar Encuentros',
      description: language === 'en'
        ? 'Record and document police encounters for accountability'
        : 'Graba y documenta encuentros policiales para responsabilidad',
      href: '/record',
      color: 'text-red-600'
    }
  ]
  
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <div className="flex justify-center mb-4">
          <Shield className="h-16 w-16 text-primary" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">
          {language === 'en' ? 'Know Your Rights' : 'Conoce Tus Derechos'}
        </h1>
        <p className="text-lg text-text-secondary mb-8 max-w-2xl mx-auto">
          {language === 'en' 
            ? 'Instant legal knowledge in your pocket during police encounters. Stay informed, stay safe, know your rights.'
            : 'Conocimiento legal instantáneo en tu bolsillo durante encuentros policiales. Mantente informado, mantente seguro, conoce tus derechos.'
          }
        </p>
        
        {subscriptionStatus === 'free' && (
          <div className="bg-accent text-white p-4 rounded-lg mb-8 max-w-md mx-auto">
            <div className="flex items-center justify-center mb-2">
              <Star className="h-5 w-5 mr-2" />
              <span className="font-semibold">
                {language === 'en' ? 'Upgrade for Full Access' : 'Actualiza para Acceso Completo'}
              </span>
            </div>
            <p className="text-sm mb-3">
              {language === 'en'
                ? 'Get unlimited access to all features for just $4.99/month'
                : 'Obtén acceso ilimitado a todas las funciones por solo $4.99/mes'
              }
            </p>
            <Link to="/subscription" className="btn-secondary bg-white text-accent hover:bg-gray-100">
              {language === 'en' ? 'View Plans' : 'Ver Planes'}
            </Link>
          </div>
        )}
      </div>
      
      {/* Quick Access Features */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
        {features.map((feature) => {
          const Icon = feature.icon
          return (
            <Link key={feature.href} to={feature.href} className="group">
              <div className="card hover:shadow-modal transition-shadow duration-250 h-full">
                <div className="flex items-start space-x-4">
                  <div className={`p-3 rounded-lg bg-gray-50 ${feature.color}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-text-primary mb-2 group-hover:text-primary transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-text-secondary text-sm mb-3">
                      {feature.description}
                    </p>
                    <div className="flex items-center text-primary text-sm font-medium">
                      <span>
                        {language === 'en' ? 'Learn more' : 'Saber más'}
                      </span>
                      <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          )
        })}
      </div>
      
      {/* Emergency Actions */}
      <div className="card-elevated bg-red-50 border-l-4 border-l-red-500">
        <h2 className="text-xl font-bold text-red-800 mb-4">
          {language === 'en' ? 'Emergency Quick Actions' : 'Acciones Rápidas de Emergencia'}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link to="/record" className="flex items-center space-x-3 p-4 bg-white rounded-lg hover:shadow-card transition-shadow">
            <div className="p-2 bg-red-100 rounded-full">
              <Mic className="h-5 w-5 text-red-600" />
            </div>
            <div>
              <div className="font-semibold text-red-800">
                {language === 'en' ? 'Start Recording' : 'Comenzar Grabación'}
              </div>
              <div className="text-sm text-red-600">
                {language === 'en' ? 'Document this encounter' : 'Documentar este encuentro'}
              </div>
            </div>
          </Link>
          
          <Link to="/rights" className="flex items-center space-x-3 p-4 bg-white rounded-lg hover:shadow-card transition-shadow">
            <div className="p-2 bg-blue-100 rounded-full">
              <Shield className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <div className="font-semibold text-blue-800">
                {language === 'en' ? 'My Rights' : 'Mis Derechos'}
              </div>
              <div className="text-sm text-blue-600">
                {language === 'en' ? 'Quick reference guide' : 'Guía de referencia rápida'}
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default HomePage