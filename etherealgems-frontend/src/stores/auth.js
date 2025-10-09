import { defineStore } from 'pinia'

const API_BASE_URL = `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api`

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: localStorage.getItem('token') || null,
    isAuthenticated: false
  }),
  
  getters: {
    isLoggedIn: (state) => !!state.token && !!state.user
  },
  
  actions: {
    async login(credentials) {
      try {
        // Check if we're in demo mode
        const isDemoMode = import.meta.env.VITE_DEMO_MODE === 'true'
        
        if (isDemoMode) {
          // Demo mode - simulate login for admin credentials
          if (credentials.email === 'admin@etherealgems.com' && credentials.password === 'admin123456') {
            const mockUser = {
              _id: 'demo-admin',
              name: 'Demo Admin',
              email: 'admin@etherealgems.com',
              role: 'admin'
            }
            const mockToken = 'demo-jwt-token'
            
            this.user = mockUser
            this.token = mockToken
            this.isAuthenticated = true
            localStorage.setItem('token', mockToken)
            localStorage.setItem('user', JSON.stringify(mockUser))
            
            return { success: true, message: 'Demo login successful' }
          } else {
            return { success: false, message: 'Demo mode: Use admin@etherealgems.com / admin123456' }
          }
        }
        
        // Regular API login with timeout
        const timeoutPromise = new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Login timeout')), 5000)
        )
        
        const loginPromise = fetch(`${API_BASE_URL}/auth/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(credentials)
        })
        
        const response = await Promise.race([loginPromise, timeoutPromise])
        
        const data = await response.json()
        
        if (response.ok && data.success) {
          this.token = data.token
          this.user = data.user
          this.isAuthenticated = true
          localStorage.setItem('token', data.token)
          return { success: true }
        } else {
          return { success: false, message: data.message || 'Login failed' }
        }
      } catch (error) {
        console.error('Login error:', error)
        return { success: false, message: 'Network error' }
      }
    },
    
    async register(userData) {
      try {
        const response = await fetch(`${API_BASE_URL}/auth/register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(userData)
        })
        
        const data = await response.json()
        
        if (response.ok && data.success) {
          this.token = data.token
          this.user = data.user
          this.isAuthenticated = true
          localStorage.setItem('token', data.token)
          return { success: true }
        } else {
          return { success: false, message: data.message || 'Registration failed' }
        }
      } catch (error) {
        console.error('Registration error:', error)
        return { success: false, message: 'Network error' }
      }
    },
    
    logout() {
      this.user = null
      this.token = null
      this.isAuthenticated = false
      localStorage.removeItem('token')
    },
    
    async checkAuth() {
      if (this.token) {
        try {
          const response = await fetch(`${API_BASE_URL}/auth/profile`, {
            headers: {
              'Authorization': `Bearer ${this.token}`
            }
          })
          
          if (response.ok) {
            const data = await response.json()
            if (data.success) {
              this.user = data.user
              this.isAuthenticated = true
            } else {
              this.logout()
            }
          } else {
            this.logout()
          }
        } catch (error) {
          console.error('Auth check error:', error)
          this.logout()
        }
      }
    }
  }
})