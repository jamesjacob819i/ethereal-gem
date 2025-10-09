<template>
  <nav class="bg-white shadow-md sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo -->
        <div class="flex-shrink-0">
          <router-link to="/" class="flex items-center">
            <span class="text-2xl font-bold text-primary-600 font-poppins">EtherealGems</span>
          </router-link>
        </div>

        <!-- Desktop Navigation -->
        <div class="hidden md:block">
          <div class="ml-10 flex items-baseline space-x-4">
            <router-link
              v-for="item in navigation"
              :key="item.name"
              :to="item.href"
              class="text-gray-700 hover:text-primary-600 px-3 py-2 text-sm font-medium transition-colors duration-200"
              :class="{ 'text-primary-600': $route.path === item.href }"
            >
              {{ item.name }}
            </router-link>
          </div>
        </div>

        <!-- Right side buttons -->
        <div class="hidden md:flex items-center space-x-4">
          <!-- Search -->
          <button @click="showSearch = !showSearch" class="text-gray-500 hover:text-gray-700 transition-colors duration-200">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>

          <!-- User Account -->
          <div v-if="authStore.isLoggedIn" class="relative">
            <button @click="showUserMenu = !showUserMenu" class="text-gray-500 hover:text-gray-700 transition-colors duration-200">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </button>
            
            <!-- User Dropdown -->
            <div v-if="showUserMenu" class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
              <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile</a>
              <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Orders</a>
              <button @click="authStore.logout" class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                Sign out
              </button>
            </div>
          </div>
          
          <div v-else class="flex space-x-2">
            <button @click="showAuthModal = true" class="text-primary-600 hover:text-primary-700 font-medium">
              Sign In
            </button>
          </div>

          <!-- Cart -->
          <button @click="cartStore.toggleCart()" class="relative text-gray-500 hover:text-gray-700 transition-colors duration-200">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6.5M7 13v6a2 2 0 002 2h8a2 2 0 002-2v-6" />
            </svg>
            <span v-if="cartStore.itemCount > 0" class="absolute -top-2 -right-2 bg-primary-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {{ cartStore.itemCount }}
            </span>
          </button>
        </div>

        <!-- Mobile menu button -->
        <div class="md:hidden">
          <button @click="showMobileMenu = !showMobileMenu" class="text-gray-500 hover:text-gray-700 transition-colors duration-200">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path v-if="!showMobileMenu" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile Navigation -->
      <div v-if="showMobileMenu" class="md:hidden">
        <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-200">
          <router-link
            v-for="item in navigation"
            :key="item.name"
            :to="item.href"
            @click="showMobileMenu = false"
            class="text-gray-700 hover:text-primary-600 block px-3 py-2 text-base font-medium transition-colors duration-200"
            :class="{ 'text-primary-600': $route.path === item.href }"
          >
            {{ item.name }}
          </router-link>
          
          <div class="pt-4 pb-3 border-t border-gray-200">
            <div class="flex items-center justify-between px-3">
              <button @click="cartStore.toggleCart()" class="flex items-center text-gray-700 hover:text-primary-600">
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6.5M7 13v6a2 2 0 002 2h8a2 2 0 002-2v-6" />
                </svg>
                Cart ({{ cartStore.itemCount }})
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Authentication Modal -->
    <div v-if="showAuthModal" class="fixed inset-0 z-50 overflow-y-auto">
      <div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <!-- Background overlay -->
        <div @click="showAuthModal = false" class="fixed inset-0 bg-black bg-opacity-50 transition-opacity"></div>

        <!-- Modal panel -->
        <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="flex justify-between items-center mb-4">
              <h3 class="text-lg font-medium text-gray-900 font-poppins">
                {{ isLogin ? 'Sign In' : 'Create Account' }}
              </h3>
              <button @click="showAuthModal = false" class="text-gray-400 hover:text-gray-600">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form @submit.prevent="handleAuth" class="space-y-4">
              <div v-if="!isLogin">
                <label for="auth-name" class="block text-sm font-medium text-gray-700">Full Name</label>
                <input
                  id="auth-name"
                  name="fullName"
                  v-model="authForm.name"
                  type="text"
                  required
                  autocomplete="name"
                  class="mt-1 input-field"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label for="auth-email" class="block text-sm font-medium text-gray-700">Email</label>
                <input
                  id="auth-email"
                  name="email"
                  v-model="authForm.email"
                  type="email"
                  required
                  autocomplete="email"
                  class="mt-1 input-field"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label for="auth-password" class="block text-sm font-medium text-gray-700">Password</label>
                <input
                  id="auth-password"
                  name="password"
                  v-model="authForm.password"
                  type="password"
                  required
                  :autocomplete="isLogin ? 'current-password' : 'new-password'"
                  class="mt-1 input-field"
                  placeholder="Enter your password"
                />
              </div>

              <div v-if="!isLogin">
                <label for="auth-phone" class="block text-sm font-medium text-gray-700">Phone Number</label>
                <input
                  id="auth-phone"
                  name="phone"
                  v-model="authForm.phone"
                  type="tel"
                  required
                  autocomplete="tel"
                  class="mt-1 input-field"
                  placeholder="Enter your phone number"
                />
              </div>

              <div v-if="authError" class="text-red-600 text-sm">
                {{ authError }}
              </div>

              <button
                type="submit"
                :disabled="authLoading"
                class="w-full btn-primary disabled:opacity-50"
              >
                {{ authLoading ? 'Please wait...' : (isLogin ? 'Sign In' : 'Create Account') }}
              </button>
            </form>

            <div class="mt-4 text-center">
              <button
                @click="isLogin = !isLogin"
                class="text-primary-600 hover:text-primary-700 text-sm font-medium"
              >
                {{ isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in" }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '../../stores/cart'
import { useAuthStore } from '../../stores/auth'

const router = useRouter()
const cartStore = useCartStore()
const authStore = useAuthStore()

const showMobileMenu = ref(false)
const showUserMenu = ref(false)
const showAuthModal = ref(false)
const showSearch = ref(false)
const isLogin = ref(true)
const authLoading = ref(false)
const authError = ref('')
const searchQuery = ref('')

const authForm = ref({
  name: '',
  email: '',
  password: '',
  phone: ''
})

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Shop', href: '/shop' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' }
]

const handleAuth = async () => {
  authLoading.value = true
  authError.value = ''

  try {
    let result
    if (isLogin.value) {
      result = await authStore.login({
        email: authForm.value.email,
        password: authForm.value.password
      })
    } else {
      result = await authStore.register({
        name: authForm.value.name,
        email: authForm.value.email,
        password: authForm.value.password,
        phone: authForm.value.phone
      })
    }

    if (result.success) {
      showAuthModal.value = false
      // Reset form
      authForm.value = {
        name: '',
        email: '',
        password: '',
        phone: ''
      }
    } else {
      authError.value = result.message
    }
  } catch (error) {
    authError.value = 'An error occurred. Please try again.'
  } finally {
    authLoading.value = false
  }
}

const performSearch = () => {
  if (searchQuery.value.trim()) {
    router.push({ path: '/shop', query: { search: searchQuery.value.trim() } })
    showSearch.value = false
    searchQuery.value = ''
  }
}
</script>

<style scoped>
.input-field {
  @apply block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500;
}

.btn-primary {
  @apply bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200;
}
</style>