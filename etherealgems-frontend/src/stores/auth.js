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
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(credentials)
        })
        
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