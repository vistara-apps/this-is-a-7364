import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Shield, Users, FileText, Mic, History, CreditCard, User, LogOut, LogIn } from 'lucide-react'
import useAppStore from '../store/useAppStore'
import AuthModal from './AuthModal'
import { getCurrentUser, signOut } from '../services/supabase'
import toast from 'react-hot-toast'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const location = useLocation()
  const { user, subscriptionStatus, language, setLanguage, setUser, clearUserData } = useAppStore()

  // Check for existing user session on mount
  useEffect(() => {
    const checkUser = async () => {
      try {
        const { user: currentUser } = await getCurrentUser()
        if (currentUser) {
          setUser(currentUser)
        }
      } catch (error) {
        console.error('Error checking user session:', error)
      }
    }
    
    checkUser()
  }, [])
  
  const navigation = [
    { name: 'Rights Guide', href: '/rights', icon: Shield },
    { name: 'De-escalation Scripts', href: '/scripts', icon: Users },
    { name: 'State Guides', href: '/state-guides', icon: FileText },
    { name: 'Record Encounter', href: '/record', icon: Mic },
    { name: 'My Encounters', href: '/encounters', icon: History },
    { name: 'Subscription', href: '/subscription', icon: CreditCard },
  ]

  const handleSignOut = async () => {
    try {
      const { error } = await signOut()
      if (error) {
        toast.error('Error signing out')
        console.error('Sign out error:', error)
      } else {
        clearUserData()
        toast.success('Signed out successfully')
        setUserMenuOpen(false)
      }
    } catch (error) {
      console.error('Sign out error:', error)
      toast.error('Error signing out')
    }
  }

  const text = {
    en: {
      signIn: 'Sign In',
      signOut: 'Sign Out',
      account: 'Account',
      profile: 'Profile'
    },
    es: {
      signIn: 'Iniciar Sesión',
      signOut: 'Cerrar Sesión',
      account: 'Cuenta',
      profile: 'Perfil'
    }
  }

  const t = text[language]
  
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
          
          {/* Language Toggle, Auth & Mobile Menu Button */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setLanguage(language === 'en' ? 'es' : 'en')}
              className="px-3 py-1 text-sm font-medium rounded-md border-2 border-primary text-primary hover:bg-primary hover:text-white transition-colors"
            >
              {language === 'en' ? 'ES' : 'EN'}
            </button>

            {/* Authentication */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-gray-100 transition-colors"
                >
                  <User className="h-4 w-4" />
                  <span className="hidden sm:inline">{user.email}</span>
                </button>
                
                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-surface rounded-md shadow-modal border border-gray-200 py-1 z-50">
                    <div className="px-4 py-2 text-sm text-text-secondary border-b border-gray-200">
                      {t.account}
                    </div>
                    <button
                      onClick={handleSignOut}
                      className="flex items-center w-full px-4 py-2 text-sm text-text-secondary hover:bg-gray-100 hover:text-text-primary transition-colors"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      {t.signOut}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium bg-primary text-white hover:bg-blue-700 transition-colors"
              >
                <LogIn className="h-4 w-4" />
                <span className="hidden sm:inline">{t.signIn}</span>
              </button>
            )}
            
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

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialMode="signin"
      />
    </header>
  )
}

export default Header
