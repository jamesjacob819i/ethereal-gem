import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import axios from 'axios'

interface User {
  _id: string
  name: string
  email: string
  role: string
}

interface AuthStore {
  user: User | null
  token: string | null
  isLoggedIn: boolean
  loading: boolean
  login: (email: string, password: string) => Promise<boolean>
  register: (name: string, email: string, password: string) => Promise<boolean>
  logout: () => void
}

// Environment variable with fallback
const getApiUrl = () => {
  if (typeof window !== 'undefined') {
    return (window as any).__NEXT_DATA__?.env?.NEXT_PUBLIC_API_URL || 'https://etherealgems-backend.onrender.com'
  }
  return 'https://etherealgems-backend.onrender.com'
}

const API_URL = getApiUrl()

export const useAuthStore = create<AuthStore>()((
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isLoggedIn: false,
      loading: false,

      login: async (email: string, password: string) => {
        set({ loading: true })
        try {
          const response = await axios.post(`${API_URL}/api/auth/login`, {
            email,
            password
          })
          
          const { user, token } = response.data
          
          set({
            user,
            token,
            isLoggedIn: true,
            loading: false
          })
          
          return true
        } catch (error) {
          set({ loading: false })
          return false
        }
      },

      register: async (name: string, email: string, password: string) => {
        set({ loading: true })
        try {
          const response = await axios.post(`${API_URL}/api/auth/register`, {
            name,
            email,
            password
          })
          
          const { user, token } = response.data
          
          set({
            user,
            token,
            isLoggedIn: true,
            loading: false
          })
          
          return true
        } catch (error) {
          set({ loading: false })
          return false
        }
      },

      logout: () => {
        set({
          user: null,
          token: null,
          isLoggedIn: false
        })
      }
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ 
        user: state.user, 
        token: state.token, 
        isLoggedIn: state.isLoggedIn 
      })
    }
  )
))