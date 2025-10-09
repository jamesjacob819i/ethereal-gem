<template>
  <!-- Cart Sidebar Overlay -->
  <div v-if="cartStore.isOpen" class="fixed inset-0 z-50 overflow-hidden">
    <div class="absolute inset-0 overflow-hidden">
      <!-- Background overlay -->
      <div 
        @click="cartStore.toggleCart()" 
        class="absolute inset-0 bg-black bg-opacity-50 transition-opacity"
      ></div>
      
      <!-- Slide-over panel -->
      <div class="fixed inset-y-0 right-0 pl-10 max-w-full flex">
        <div class="w-screen max-w-md">
          <div class="h-full flex flex-col bg-white shadow-xl">
            <div class="flex-1 py-6 overflow-y-auto px-4 sm:px-6">
              <div class="flex items-start justify-between">
                <h2 class="text-lg font-medium text-gray-900">Shopping Cart</h2>
                <div class="ml-3 h-7 flex items-center">
                  <button
                    @click="cartStore.toggleCart()"
                    class="-m-2 p-2 text-gray-400 hover:text-gray-500 transition-colors duration-200"
                  >
                    <span class="sr-only">Close panel</span>
                    <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              <div class="mt-8">
                <div class="flow-root">
                  <ul v-if="cartStore.cartItems.length > 0" class="-my-6 divide-y divide-gray-200">
                    <li v-for="item in cartStore.cartItems" :key="item.id" class="py-6 flex">
                      <div class="flex-shrink-0 w-24 h-24 border border-gray-200 rounded-md overflow-hidden">
                        <img
                          :src="item.image"
                          :alt="item.name"
                          class="w-full h-full object-center object-cover"
                        />
                      </div>

                      <div class="ml-4 flex-1 flex flex-col">
                        <div>
                          <div class="flex justify-between text-base font-medium text-gray-900">
                            <h3>{{ item.name }}</h3>
                            <p class="ml-4">₹{{ item.price.toLocaleString() }}</p>
                          </div>
                        </div>
                        <div class="flex-1 flex items-end justify-between text-sm">
                          <div class="flex items-center">
                            <button
                              @click="cartStore.updateQuantity(item.id, item.quantity - 1)"
                              class="text-gray-500 hover:text-gray-700 transition-colors duration-200"
                            >
                              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />
                              </svg>
                            </button>
                            <span class="mx-2 text-gray-700">{{ item.quantity }}</span>
                            <button
                              @click="cartStore.updateQuantity(item.id, item.quantity + 1)"
                              class="text-gray-500 hover:text-gray-700 transition-colors duration-200"
                            >
                              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                              </svg>
                            </button>
                          </div>

                          <div class="flex">
                            <button
                              @click="cartStore.removeFromCart(item.id)"
                              class="font-medium text-primary-600 hover:text-primary-500 transition-colors duration-200"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                  
                  <!-- Empty cart state -->
                  <div v-else class="text-center py-12">
                    <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6.5M7 13v6a2 2 0 002 2h8a2 2 0 002-2v-6" />
                    </svg>
                    <h3 class="mt-2 text-sm font-medium text-gray-900">Your cart is empty</h3>
                    <p class="mt-1 text-sm text-gray-500">Start adding some beautiful jewelry!</p>
                    <div class="mt-6">
                      <router-link
                        to="/shop"
                        @click="cartStore.toggleCart()"
                        class="btn-primary"
                      >
                        Continue Shopping
                      </router-link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Cart Footer -->
            <div v-if="cartStore.cartItems.length > 0" class="border-t border-gray-200 py-6 px-4 sm:px-6">
              <div class="flex justify-between text-base font-medium text-gray-900">
                <p>Subtotal</p>
                <p>₹{{ cartStore.totalPrice.toLocaleString() }}</p>
              </div>
              <p class="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
              <div class="mt-6">
                <router-link
                  to="/checkout"
                  @click="cartStore.toggleCart()"
                  class="flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-primary-600 hover:bg-primary-700 transition-colors duration-200 w-full"
                >
                  Checkout
                </router-link>
              </div>
              <div class="mt-6 flex justify-center text-sm text-center text-gray-500">
                <p>
                  or
                  <button
                    @click="cartStore.toggleCart()"
                    class="text-primary-600 font-medium hover:text-primary-500 transition-colors duration-200"
                  >
                    Continue Shopping
                    <span aria-hidden="true"> &rarr;</span>
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from '../../stores/cart'

const cartStore = useCartStore()
</script>