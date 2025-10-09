<template>
  <div class="bg-gray-50 min-h-screen py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-8">
        <h1 class="text-3xl font-extrabold text-gray-900 font-poppins">Shopping Cart</h1>
        <p class="mt-2 text-gray-600">Review your items before checkout</p>
      </div>

      <div v-if="cartStore.cartItems.length > 0" class="lg:grid lg:grid-cols-3 lg:gap-8">
        <!-- Cart Items -->
        <div class="lg:col-span-2">
          <div class="bg-white rounded-lg shadow-md overflow-hidden">
            <div class="px-6 py-4 border-b border-gray-200">
              <h2 class="text-lg font-medium text-gray-900">Items in your cart</h2>
            </div>
            
            <ul class="divide-y divide-gray-200">
              <li v-for="item in cartStore.cartItems" :key="item.id" class="p-6">
                <div class="flex items-center">
                  <div class="flex-shrink-0 w-20 h-20">
                    <img
                      :src="item.image"
                      :alt="item.name"
                      class="w-full h-full object-center object-cover rounded-md border border-gray-200"
                    />
                  </div>
                  
                  <div class="ml-6 flex-1">
                    <div class="flex justify-between">
                      <div class="flex-1">
                        <h3 class="text-base font-medium text-gray-900">{{ item.name }}</h3>
                        <p class="mt-1 text-sm text-gray-500">Product ID: #{{ item.id }}</p>
                      </div>
                      <div class="text-right">
                        <p class="text-base font-medium text-gray-900">₹{{ item.price.toLocaleString() }}</p>
                        <p class="text-sm text-gray-500">per item</p>
                      </div>
                    </div>
                    
                    <div class="mt-4 flex items-center justify-between">
                      <!-- Quantity Controls -->
                      <div class="flex items-center">
                        <span class="text-sm text-gray-700 mr-4">Quantity:</span>
                        <div class="flex items-center border border-gray-300 rounded-md">
                          <button
                            @click="cartStore.updateQuantity(item.id, item.quantity - 1)"
                            class="p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                          >
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />
                            </svg>
                          </button>
                          <span class="px-4 py-2 text-gray-900 font-medium">{{ item.quantity }}</span>
                          <button
                            @click="cartStore.updateQuantity(item.id, item.quantity + 1)"
                            class="p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                          >
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                          </button>
                        </div>
                      </div>
                      
                      <!-- Remove Button -->
                      <button
                        @click="cartStore.removeFromCart(item.id)"
                        class="text-red-600 hover:text-red-700 text-sm font-medium transition-colors duration-200"
                      >
                        Remove
                      </button>
                    </div>
                    
                    <!-- Item Total -->
                    <div class="mt-2 text-right">
                      <p class="text-lg font-medium text-gray-900">
                        Total: ₹{{ (item.price * item.quantity).toLocaleString() }}
                      </p>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        
        <!-- Order Summary -->
        <div class="lg:col-span-1 mt-8 lg:mt-0">
          <div class="bg-white rounded-lg shadow-md p-6">
            <h2 class="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>
            
            <div class="space-y-3">
              <div class="flex justify-between text-sm">
                <span class="text-gray-600">Subtotal ({{ cartStore.itemCount }} items)</span>
                <span class="text-gray-900">₹{{ cartStore.totalPrice.toLocaleString() }}</span>
              </div>
              
              <div class="flex justify-between text-sm">
                <span class="text-gray-600">Shipping</span>
                <span class="text-gray-900">Free</span>
              </div>
              
              <div class="flex justify-between text-sm">
                <span class="text-gray-600">Tax</span>
                <span class="text-gray-900">₹{{ Math.round(cartStore.totalPrice * 0.18).toLocaleString() }}</span>
              </div>
              
              <div class="border-t border-gray-200 pt-3">
                <div class="flex justify-between text-base font-medium">
                  <span class="text-gray-900">Total</span>
                  <span class="text-gray-900">₹{{ Math.round(cartStore.totalPrice * 1.18).toLocaleString() }}</span>
                </div>
              </div>
            </div>
            
            <div class="mt-6">
              <router-link
                to="/checkout"
                class="w-full bg-primary-600 text-white py-3 px-4 rounded-md font-medium hover:bg-primary-700 transition-colors duration-200 block text-center"
              >
                Proceed to Checkout
              </router-link>
            </div>
            
            <div class="mt-4">
              <router-link
                to="/shop"
                class="w-full bg-gray-100 text-gray-900 py-3 px-4 rounded-md font-medium hover:bg-gray-200 transition-colors duration-200 block text-center"
              >
                Continue Shopping
              </router-link>
            </div>
            
            <!-- Promo Code -->
            <div class="mt-6 border-t border-gray-200 pt-6">
              <h3 class="text-sm font-medium text-gray-900 mb-3">Promo Code</h3>
              <div class="flex">
                <input
                  v-model="promoCode"
                  type="text"
                  placeholder="Enter code"
                  class="flex-1 border border-gray-300 rounded-l-md px-3 py-2 text-sm focus:ring-primary-500 focus:border-primary-500"
                />
                <button
                  @click="applyPromoCode"
                  class="bg-gray-100 text-gray-700 px-4 py-2 rounded-r-md text-sm font-medium hover:bg-gray-200 transition-colors duration-200 border border-l-0 border-gray-300"
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
          
          <!-- Security Info -->
          <div class="mt-6 bg-gray-50 rounded-lg p-4">
            <div class="flex items-center">
              <svg class="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
              </svg>
              <span class="text-sm text-gray-600">Secure checkout guaranteed</span>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Empty Cart State -->
      <div v-else class="text-center py-16">
        <svg class="mx-auto h-24 w-24 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6.5M7 13v6a2 2 0 002 2h8a2 2 0 002-2v-6" />
        </svg>
        <h2 class="mt-4 text-2xl font-bold text-gray-900 font-poppins">Your cart is empty</h2>
        <p class="mt-2 text-gray-600">Looks like you haven't added any items to your cart yet.</p>
        <div class="mt-8">
          <router-link
            to="/shop"
            class="btn-primary"
          >
            Start Shopping
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useCartStore } from '../stores/cart'

const cartStore = useCartStore()
const promoCode = ref('')

const applyPromoCode = () => {
  // Implement promo code logic here
  console.log('Applying promo code:', promoCode.value)
  // For now, just show an alert
  if (promoCode.value) {
    alert('Promo code feature coming soon!')
  }
}
</script>