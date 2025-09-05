import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useAppStore = create(
  persist(
    (set, get) => ({
      // User state
      user: null,
      subscriptionStatus: 'free', // 'free', 'basic', 'premium'
      selectedState: null,
      language: 'en', // 'en', 'es'
      
      // Encounters
      encounters: [],
      currentRecording: null,
      isRecording: false,
      
      // Actions
      setUser: (user) => set({ user }),
      setSubscriptionStatus: (status) => set({ subscriptionStatus: status }),
      setSelectedState: (state) => set({ selectedState: state }),
      setLanguage: (language) => set({ language }),
      
      addEncounter: (encounter) => set((state) => ({
        encounters: [...state.encounters, { ...encounter, id: Date.now() }]
      })),
      
      setCurrentRecording: (recording) => set({ currentRecording: recording }),
      setIsRecording: (isRecording) => set({ isRecording }),
      
      // Get premium status
      isPremium: () => {
        const { subscriptionStatus } = get()
        return subscriptionStatus === 'premium' || subscriptionStatus === 'basic'
      },
      
      // Clear user data
      clearUserData: () => set({
        user: null,
        subscriptionStatus: 'free',
        encounters: [],
        currentRecording: null,
        isRecording: false
      })
    }),
    {
      name: 'knowyourrights-storage',
    }
  )
)

export default useAppStore