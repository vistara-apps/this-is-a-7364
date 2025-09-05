import { loadStripe } from '@stripe/stripe-js'

const stripePublishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY

if (!stripePublishableKey) {
  console.warn('Stripe publishable key not found. Payment functionality will be disabled.')
}

let stripePromise = null

if (stripePublishableKey) {
  stripePromise = loadStripe(stripePublishableKey)
}

export const getStripe = () => stripePromise

// Subscription plans configuration
export const SUBSCRIPTION_PLANS = {
  free: {
    id: 'free',
    name: 'Free',
    price: 0,
    priceId: null,
    features: [
      'Basic rights information',
      'Limited de-escalation scripts',
      'Basic encounter recording'
    ]
  },
  basic: {
    id: 'basic',
    name: 'Basic',
    price: 1.99,
    priceId: 'price_basic_monthly', // Replace with actual Stripe price ID
    features: [
      'All Free features',
      'Multi-language scripts',
      'Enhanced documentation',
      'Email support'
    ]
  },
  premium: {
    id: 'premium',
    name: 'Premium',
    price: 4.99,
    priceId: 'price_premium_monthly', // Replace with actual Stripe price ID
    features: [
      'All Basic features',
      'State-specific deep dives',
      'Advanced documentation',
      'Priority support',
      'AI-powered script generation'
    ]
  }
}

// Create checkout session
export const createCheckoutSession = async (priceId, successUrl, cancelUrl) => {
  try {
    // In a real implementation, this would call your backend API
    // which would create a Stripe checkout session
    const response = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        priceId,
        successUrl,
        cancelUrl,
      }),
    })

    if (!response.ok) {
      throw new Error('Failed to create checkout session')
    }

    const { sessionId } = await response.json()
    
    const stripe = await getStripe()
    if (!stripe) {
      throw new Error('Stripe not initialized')
    }

    const { error } = await stripe.redirectToCheckout({
      sessionId,
    })

    if (error) {
      throw error
    }
  } catch (error) {
    console.error('Error creating checkout session:', error)
    throw error
  }
}

// Create customer portal session
export const createCustomerPortalSession = async (returnUrl) => {
  try {
    const response = await fetch('/api/create-customer-portal-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        returnUrl,
      }),
    })

    if (!response.ok) {
      throw new Error('Failed to create customer portal session')
    }

    const { url } = await response.json()
    window.location.href = url
  } catch (error) {
    console.error('Error creating customer portal session:', error)
    throw error
  }
}

// Mock functions for development (remove in production)
export const mockSubscribe = async (planId) => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  // Mock successful subscription
  return {
    success: true,
    subscriptionId: `sub_mock_${Date.now()}`,
    planId,
    status: 'active'
  }
}

export const mockCancelSubscription = async (subscriptionId) => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  return {
    success: true,
    subscriptionId,
    status: 'canceled'
  }
}
