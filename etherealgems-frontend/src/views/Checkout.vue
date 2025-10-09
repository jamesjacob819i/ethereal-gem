<template>
  <div class="bg-gray-50 min-h-screen py-8">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-8">
        <h1 class="text-3xl font-extrabold text-gray-900 font-poppins">Checkout</h1>
        <p class="mt-2 text-gray-600">Complete your order</p>
      </div>

      <div class="lg:grid lg:grid-cols-2 lg:gap-8">
        <!-- Checkout Form -->
        <div class="lg:col-span-1">
          <form @submit.prevent="processOrder" class="space-y-6">
            <!-- Contact Information -->
            <div class="bg-white rounded-lg shadow-md p-6">
              <h2 class="text-lg font-medium text-gray-900 mb-4">Contact Information</h2>
              <div class="space-y-4">
                <div>
                  <label for="email" class="block text-sm font-medium text-gray-700">Email address</label>
                  <input
                    id="email"
                    v-model="orderForm.email"
                    type="email"
                    required
                    class="input-field mt-1"
                    placeholder="Enter your email"
                  />
                </div>
                <div>
                  <label for="phone" class="block text-sm font-medium text-gray-700">Phone number</label>
                  <input
                    id="phone"
                    v-model="orderForm.phone"
                    type="tel"
                    required
                    class="input-field mt-1"
                    placeholder="Enter your phone number"
                  />
                </div>
              </div>
            </div>

            <!-- Shipping Address -->
            <div class="bg-white rounded-lg shadow-md p-6">
              <h2 class="text-lg font-medium text-gray-900 mb-4">Shipping Address</h2>
              <div class="space-y-4">
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label for="firstName" class="block text-sm font-medium text-gray-700">First name</label>
                    <input
                      id="firstName"
                      name="firstName"
                      v-model="orderForm.firstName"
                      type="text"
                      required
                      autocomplete="given-name"
                      class="input-field mt-1"
                    />
                  </div>
                  <div>
                    <label for="lastName" class="block text-sm font-medium text-gray-700">Last name</label>
                    <input
                      id="lastName"
                      name="lastName"
                      v-model="orderForm.lastName"
                      type="text"
                      required
                      autocomplete="family-name"
                      class="input-field mt-1"
                    />
                  </div>
                </div>
                
                <div>
                  <label for="address" class="block text-sm font-medium text-gray-700">Address</label>
                  <input
                    id="address"
                    name="address"
                    v-model="orderForm.address"
                    type="text"
                    required
                    autocomplete="street-address"
                    class="input-field mt-1"
                    placeholder="Street address"
                  />
                </div>
                
                <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label for="city" class="block text-sm font-medium text-gray-700">City</label>
                    <input
                      id="city"
                      name="city"
                      v-model="orderForm.city"
                      type="text"
                      required
                      autocomplete="address-level2"
                      class="input-field mt-1"
                    />
                  </div>
                  <div>
                    <label for="state" class="block text-sm font-medium text-gray-700">State</label>
                    <select
                      id="state"
                      name="state"
                      v-model="orderForm.state"
                      required
                      autocomplete="address-level1"
                      class="input-field mt-1"
                    >
                      <option value="">Select State</option>
                      <option value="Maharashtra">Maharashtra</option>
                      <option value="Delhi">Delhi</option>
                      <option value="Karnataka">Karnataka</option>
                      <option value="Gujarat">Gujarat</option>
                      <option value="Tamil Nadu">Tamil Nadu</option>
                      <option value="West Bengal">West Bengal</option>
                      <!-- Add more states as needed -->
                    </select>
                  </div>
                  <div>
                    <label for="pincode" class="block text-sm font-medium text-gray-700">PIN Code</label>
                    <input
                      id="pincode"
                      name="pincode"
                      v-model="orderForm.pincode"
                      type="text"
                      required
                      autocomplete="postal-code"
                      class="input-field mt-1"
                      pattern="[0-9]{6}"
                      maxlength="6"
                    />
                  </div>
                </div>
              </div>
            </div>

            <!-- Payment Method -->
            <div class="bg-white rounded-lg shadow-md p-6">
              <h2 class="text-lg font-medium text-gray-900 mb-4">Payment Method</h2>
              <div class="space-y-4">
                <div class="flex items-center">
                  <input
                    id="upi"
                    name="paymentMethod"
                    v-model="orderForm.paymentMethod"
                    type="radio"
                    value="upi"
                    class="text-primary-600 focus:ring-primary-500"
                  />
                  <label for="upi" class="ml-3 block text-sm font-medium text-gray-700">
                    UPI (Google Pay, PhonePe, Paytm)
                  </label>
                </div>
                <div class="flex items-center">
                  <input
                    id="card"
                    name="paymentMethod"
                    v-model="orderForm.paymentMethod"
                    type="radio"
                    value="card"
                    class="text-primary-600 focus:ring-primary-500"
                  />
                  <label for="card" class="ml-3 block text-sm font-medium text-gray-700">
                    Credit/Debit Card
                  </label>
                </div>
                <div class="flex items-center">
                  <input
                    id="cod"
                    name="paymentMethod"
                    v-model="orderForm.paymentMethod"
                    type="radio"
                    value="cod"
                    class="text-primary-600 focus:ring-primary-500"
                  />
                  <label for="cod" class="ml-3 block text-sm font-medium text-gray-700">
                    Cash on Delivery
                  </label>
                </div>
              </div>
            </div>

            <!-- Order Notes -->
            <div class="bg-white rounded-lg shadow-md p-6">
              <h2 class="text-lg font-medium text-gray-900 mb-4">Order Notes (Optional)</h2>
              <textarea
                id="orderNotes"
                name="orderNotes"
                v-model="orderForm.notes"
                rows="3"
                autocomplete="off"
                class="input-field"
                placeholder="Any special instructions for your order..."
              ></textarea>
            </div>
          </form>
        </div>

        <!-- Order Summary -->
        <div class="lg:col-span-1 mt-8 lg:mt-0">
          <div class="bg-white rounded-lg shadow-md p-6 sticky top-8">
            <h2 class="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>
            
            <!-- Order Items -->
            <div class="space-y-4 mb-6">
              <div
                v-for="item in cartStore.cartItems"
                :key="item.id"
                class="flex items-center space-x-4"
              >
                <div class="flex-shrink-0">
                  <img
                    :src="item.image"
                    :alt="item.name"
                    class="w-16 h-16 object-center object-cover rounded-md border border-gray-200"
                  />
                </div>
                <div class="flex-1">
                  <h3 class="text-sm font-medium text-gray-900">{{ item.name }}</h3>
                  <p class="text-sm text-gray-500">Qty: {{ item.quantity }}</p>
                </div>
                <div class="text-sm font-medium text-gray-900">
                  ₹{{ (item.price * item.quantity).toLocaleString() }}
                </div>
              </div>
            </div>
            
            <!-- Pricing Details -->
            <div class="border-t border-gray-200 pt-4 space-y-3">
              <div class="flex justify-between text-sm">
                <span class="text-gray-600">Subtotal</span>
                <span class="text-gray-900">₹{{ cartStore.totalPrice.toLocaleString() }}</span>
              </div>
              
              <div class="flex justify-between text-sm">
                <span class="text-gray-600">Shipping</span>
                <span class="text-green-600">Free</span>
              </div>
              
              <div class="flex justify-between text-sm">
                <span class="text-gray-600">Tax (18% GST)</span>
                <span class="text-gray-900">₹{{ Math.round(cartStore.totalPrice * 0.18).toLocaleString() }}</span>
              </div>
              
              <div class="border-t border-gray-200 pt-3">
                <div class="flex justify-between text-base font-medium">
                  <span class="text-gray-900">Total</span>
                  <span class="text-gray-900">₹{{ orderTotal.toLocaleString() }}</span>
                </div>
              </div>
            </div>
            
            <!-- Place Order Button -->
            <button
              @click="processOrder"
              :disabled="!isFormValid || processing"
              class="w-full mt-6 bg-primary-600 text-white py-3 px-4 rounded-md font-medium hover:bg-primary-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200"
            >
              <span v-if="processing" class="flex items-center justify-center">
                <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </span>
              <span v-else>Place Order - ₹{{ orderTotal.toLocaleString() }}</span>
            </button>
            
            <!-- Security Badge -->
            <div class="mt-4 flex items-center justify-center text-sm text-gray-500">
              <svg class="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
              </svg>
              Secure checkout powered by Razorpay
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '../stores/cart'

const router = useRouter()
const cartStore = useCartStore()

const processing = ref(false)

const orderForm = ref({
  email: '',
  phone: '',
  firstName: '',
  lastName: '',
  address: '',
  city: '',
  state: '',
  pincode: '',
  paymentMethod: 'upi',
  notes: ''
})

const orderTotal = computed(() => {
  return Math.round(cartStore.totalPrice * 1.18) // Including 18% GST
})

const isFormValid = computed(() => {
  const form = orderForm.value
  return form.email && form.phone && form.firstName && form.lastName && 
         form.address && form.city && form.state && form.pincode && 
         form.paymentMethod && cartStore.cartItems.length > 0
})

const processOrder = async () => {
  if (!isFormValid.value) {
    alert('Please fill in all required fields')
    return
  }
  
  processing.value = true
  
  try {
    // Simulate order processing
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Here you would integrate with Razorpay for payment processing
    console.log('Order processed:', {
      items: cartStore.cartItems,
      total: orderTotal.value,
      customer: orderForm.value
    })
    
    // Clear cart after successful order
    cartStore.clearCart()
    
    // Redirect to success page or show success message
    alert('Order placed successfully! You will receive a confirmation email shortly.')
    router.push('/')
    
  } catch (error) {
    console.error('Order processing failed:', error)
    alert('Order processing failed. Please try again.')
  } finally {
    processing.value = false
  }
}
</script>