import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Shield, Users, FileText, Mic, History, CreditCard } from 'lucide-react'
import useAppStore from '../store/useAppStore'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)
  const location = useLocation()
  const { subscriptionStatus, language, setLanguage } = useAppStore()
  
  const navigation = [
    { name: 'Rights Guide', href: '/rights', icon: Shield },
    { name: 'De-escalation Scripts', href: '/scripts', icon: Users },
    { name: 'State Guides', href: '/state-guides', icon: FileText },
    { name: 'Record Encounter', href: '/record', icon: Mic },
    { name: 'My Encounters', href: '/encounters', icon: History },
    { name: 'Subscription', href: '/subscription', icon: CreditCard },
  ]
  
  return (
    <header className="sticky top-0 z-50 bg-surface shadow-card">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Shield className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold text-text-primary">KnowYourRights.io</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            {navigation.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    location.pathname === item.href
                      ? 'bg-primary text-white'
                      : 'text-text-secondary hover:text-text-primary hover:bg-gray-100'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </Link>
              )
            })}
          </nav>
          
          {/* Language Toggle & Mobile Menu Button */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setLanguage(language === 'en' ? 'es' : 'en')}
              className="px-3 py-1 text-sm font-medium rounded-md border-2 border-primary text-primary hover:bg-primary hover:text-white transition-colors"
            >
              {language === 'en' ? 'ES' : 'EN'}
            </button>
            
            {subscriptionStatus !== 'free' && (
              <span className="hidden sm:inline-flex px-2 py-1 text-xs font-medium bg-accent text-white rounded-full">
                {subscriptionStatus === 'premium' ? 'Premium' : 'Basic'}
              </span>
            )}
            
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-md text-text-secondary hover:text-text-primary hover:bg-gray-100"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden pb-4 border-t border-gray-200">
            <nav className="grid grid-cols-2 gap-2 mt-4">
              {navigation.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center space-x-2 px-3 py-3 rounded-md text-sm font-medium transition-colors ${
                      location.pathname === item.href
                        ? 'bg-primary text-white'
                        : 'text-text-secondary hover:text-text-primary hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </Link>
                )
              })}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header