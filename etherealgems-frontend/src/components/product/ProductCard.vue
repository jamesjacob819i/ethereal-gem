<template>
  <div class="group relative bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
    <div class="aspect-w-1 aspect-h-1 w-full overflow-hidden bg-gray-200">
      <img
        :src="getImageUrl(product.images[0])"
        :alt="product.name"
        loading="lazy"
        class="w-full h-64 object-center object-cover group-hover:scale-105 transition-transform duration-300"
        @error="handleImageError"
      />
      
      <!-- Quick add to cart button -->
      <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300 flex items-center justify-center">
        <button
          @click.stop="addToCart"
          class="opacity-0 group-hover:opacity-100 bg-white text-primary-600 px-4 py-2 rounded-md font-medium hover:bg-primary-50 transition-all duration-200 transform translate-y-2 group-hover:translate-y-0"
        >
          Quick Add
        </button>
      </div>
      
      <!-- Sale badge if applicable -->
      <div v-if="product.onSale" class="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 text-xs font-medium rounded">
        Sale
      </div>
      
      <!-- Featured badge -->
      <div v-if="product.featured" class="absolute top-2 right-2 bg-gold-500 text-white px-2 py-1 text-xs font-medium rounded">
        Featured
      </div>
    </div>
    
    <div class="p-4">
      <div class="flex justify-between items-start">
        <div class="flex-1">
          <h3 class="text-sm font-medium text-gray-900 group-hover:text-primary-600 transition-colors duration-200">
            <router-link :to="`/product/${product.id}`" class="focus:outline-none">
              <span class="absolute inset-0" aria-hidden="true"></span>
              {{ product.name }}
            </router-link>
          </h3>
          <p class="mt-1 text-sm text-gray-500">{{ product.category }}</p>
        </div>
      </div>
      
      <div class="mt-2 flex items-center justify-between">
        <div class="flex items-center">
          <p class="text-lg font-medium text-gray-900">
            ₹{{ product.price.toLocaleString() }}
          </p>
          <p v-if="product.originalPrice" class="ml-2 text-sm text-gray-500 line-through">
            ₹{{ product.originalPrice.toLocaleString() }}
          </p>
        </div>
        
        <!-- Stock status -->
        <div class="flex items-center">
          <div
            :class="{
              'bg-green-100 text-green-800': product.inStock,
              'bg-red-100 text-red-800': !product.inStock
            }"
            class="px-2 py-1 text-xs font-medium rounded-full"
          >
            {{ product.inStock ? 'In Stock' : 'Out of Stock' }}
          </div>
        </div>
      </div>
      
      <!-- Rating if available -->
      <div v-if="product.rating" class="mt-2 flex items-center">
        <div class="flex items-center">
          <svg
            v-for="star in 5"
            :key="star"
            class="h-4 w-4"
            :class="star <= product.rating ? 'text-yellow-400' : 'text-gray-300'"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        </div>
        <span class="ml-1 text-sm text-gray-500">({{ product.reviewCount || 0 }})</span>
      </div>
      
      <!-- Add to cart button -->
      <button
        @click="addToCart"
        :disabled="!product.inStock"
        class="mt-4 w-full bg-primary-600 text-white py-2 px-4 rounded-md font-medium hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200"
      >
        {{ product.inStock ? 'Add to Cart' : 'Out of Stock' }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from '../../stores/cart'

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

const cartStore = useCartStore()

const getImageUrl = (imageObj) => {
  if (typeof imageObj === 'string') return imageObj
  return imageObj?.url || 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
}

const handleImageError = (event) => {
  event.target.src = 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
}

const addToCart = () => {
  if (props.product.inStock) {
    cartStore.addToCart(props.product)
    // Optional: Show a toast notification
    console.log(`Added ${props.product.name} to cart`)
  }
}
</script>