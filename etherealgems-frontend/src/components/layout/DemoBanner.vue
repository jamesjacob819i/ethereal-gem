<template>
  <div v-if="showDemoBanner" class="bg-blue-600 text-white px-4 py-2 text-center text-sm relative">
    <div class="max-w-7xl mx-auto flex items-center justify-center">
      <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
      </svg>
      <span>
        <strong>Demo Mode:</strong> 
        {{ message }} 
        <span class="ml-2">
          Login: admin@etherealgems.com / admin123456
        </span>
      </span>
      <button 
        @click="hideBanner" 
        class="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-blue-200"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useProductStore } from '../../stores/products'

const productStore = useProductStore()
const dismissed = ref(false)

const isDemoMode = computed(() => import.meta.env.VITE_DEMO_MODE === 'true')
const showDemoBanner = computed(() => isDemoMode.value && !dismissed.value)

const message = computed(() => {
  if (productStore.error && productStore.error.includes('demo')) {
    return 'Showing sample products'
  }
  return 'No backend connected - using sample data'
})

const hideBanner = () => {
  dismissed.value = true
}
</script>