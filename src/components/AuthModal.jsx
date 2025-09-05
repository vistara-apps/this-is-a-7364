import React, { useState } from 'react'
import { X, Mail, Lock, User, AlertCircle, Loader2 } from 'lucide-react'
import { signUp, signIn } from '../services/supabase'
import useAppStore from '../store/useAppStore'
import toast from 'react-hot-toast'

const AuthModal = ({ isOpen, onClose, initialMode = 'signin' }) => {
  const [mode, setMode] = useState(initialMode) // 'signin' or 'signup'
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})
  
  const { setUser, language } = useAppStore()

  const text = {
    en: {
      signin: 'Sign In',
      signup: 'Sign Up',
      email: 'Email',
      password: 'Password',
      confirmPassword: 'Confirm Password',
      signinButton: 'Sign In',
      signupButton: 'Create Account',
      switchToSignup: "Don't have an account? Sign up",
      switchToSignin: 'Already have an account? Sign in',
      emailRequired: 'Email is required',
      passwordRequired: 'Password is required',
      passwordTooShort: 'Password must be at least 6 characters',
      passwordsNoMatch: 'Passwords do not match',
      invalidEmail: 'Please enter a valid email address',
      signinError: 'Failed to sign in. Please check your credentials.',
      signupError: 'Failed to create account. Please try again.',
      signupSuccess: 'Account created successfully! Please check your email to verify your account.',
      signinSuccess: 'Welcome back!'
    },
    es: {
      signin: 'Iniciar Sesión',
      signup: 'Registrarse',
      email: 'Correo Electrónico',
      password: 'Contraseña',
      confirmPassword: 'Confirmar Contraseña',
      signinButton: 'Iniciar Sesión',
      signupButton: 'Crear Cuenta',
      switchToSignup: '¿No tienes cuenta? Regístrate',
      switchToSignin: '¿Ya tienes cuenta? Inicia sesión',
      emailRequired: 'El correo electrónico es requerido',
      passwordRequired: 'La contraseña es requerida',
      passwordTooShort: 'La contraseña debe tener al menos 6 caracteres',
      passwordsNoMatch: 'Las contraseñas no coinciden',
      invalidEmail: 'Por favor ingresa un correo electrónico válido',
      signinError: 'Error al iniciar sesión. Verifica tus credenciales.',
      signupError: 'Error al crear cuenta. Inténtalo de nuevo.',
      signupSuccess: '¡Cuenta creada exitosamente! Revisa tu correo para verificar tu cuenta.',
      signinSuccess: '¡Bienvenido de vuelta!'
    }
  }

  const t = text[language]

  const validateForm = () => {
    const newErrors = {}

    // Email validation
    if (!formData.email) {
      newErrors.email = t.emailRequired
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t.invalidEmail
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = t.passwordRequired
    } else if (formData.password.length < 6) {
      newErrors.password = t.passwordTooShort
    }

    // Confirm password validation (only for signup)
    if (mode === 'signup') {
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = t.passwordsNoMatch
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setLoading(true)
    
    try {
      if (mode === 'signin') {
        const { data, error } = await signIn(formData.email, formData.password)
        
        if (error) {
          toast.error(t.signinError)
          console.error('Sign in error:', error)
        } else {
          setUser(data.user)
          toast.success(t.signinSuccess)
          onClose()
        }
      } else {
        const { data, error } = await signUp(formData.email, formData.password)
        
        if (error) {
          toast.error(t.signupError)
          console.error('Sign up error:', error)
        } else {
          toast.success(t.signupSuccess)
          setMode('signin')
          setFormData({ email: formData.email, password: '', confirmPassword: '' })
        }
      }
    } catch (error) {
      console.error('Auth error:', error)
      toast.error(mode === 'signin' ? t.signinError : t.signupError)
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-surface rounded-lg shadow-modal w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-text-primary">
            {mode === 'signin' ? t.signin : t.signup}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-5 w-5 text-text-secondary" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              {t.email}
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-text-secondary" />
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className={`w-full pl-10 pr-4 py-3 border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="your@email.com"
                disabled={loading}
              />
            </div>
            {errors.email && (
              <div className="flex items-center mt-1 text-red-600 text-sm">
                <AlertCircle className="h-4 w-4 mr-1" />
                {errors.email}
              </div>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              {t.password}
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-text-secondary" />
              <input
                type="password"
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                className={`w-full pl-10 pr-4 py-3 border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent ${
                  errors.password ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="••••••••"
                disabled={loading}
              />
            </div>
            {errors.password && (
              <div className="flex items-center mt-1 text-red-600 text-sm">
                <AlertCircle className="h-4 w-4 mr-1" />
                {errors.password}
              </div>
            )}
          </div>

          {/* Confirm Password Field (only for signup) */}
          {mode === 'signup' && (
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                {t.confirmPassword}
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-text-secondary" />
                <input
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent ${
                    errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="••••••••"
                  disabled={loading}
                />
              </div>
              {errors.confirmPassword && (
                <div className="flex items-center mt-1 text-red-600 text-sm">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.confirmPassword}
                </div>
              )}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {loading ? (
              <>
                <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                {mode === 'signin' ? t.signinButton : t.signupButton}
              </>
            ) : (
              mode === 'signin' ? t.signinButton : t.signupButton
            )}
          </button>

          {/* Mode Switch */}
          <div className="text-center">
            <button
              type="button"
              onClick={() => {
                setMode(mode === 'signin' ? 'signup' : 'signin')
                setErrors({})
                setFormData({ email: '', password: '', confirmPassword: '' })
              }}
              className="text-primary hover:text-blue-700 text-sm font-medium"
              disabled={loading}
            >
              {mode === 'signin' ? t.switchToSignup : t.switchToSignin}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AuthModal
