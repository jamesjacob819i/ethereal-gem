<template>
  <div id="app" class="min-h-screen bg-gray-50">
    <Navbar />
    <main>
      <router-view />
    </main>
    <Footer />
    <CartSidebar />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import Navbar from './components/layout/Navbar.vue'
import Footer from './components/layout/Footer.vue'
import CartSidebar from './components/cart/CartSidebar.vue'
import { useAuthStore } from './stores/auth'
import { useProductStore } from './stores/products'

const authStore = useAuthStore()
const productStore = useProductStore()

onMounted(() => {
  authStore.checkAuth()
  productStore.fetchProducts()
})
</script>
