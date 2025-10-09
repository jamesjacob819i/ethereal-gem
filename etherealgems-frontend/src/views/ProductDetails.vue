<template>
  <div class="bg-white">
    <!-- Breadcrumb -->
    <nav class="bg-gray-50 border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <ol class="flex items-center space-x-2 text-sm">
          <li>
            <router-link to="/" class="text-gray-500 hover:text-gray-700">Home</router-link>
          </li>
          <li class="text-gray-400">/</li>
          <li>
            <router-link to="/shop" class="text-gray-500 hover:text-gray-700">Shop</router-link>
          </li>
          <li class="text-gray-400">/</li>
          <li class="text-gray-900 font-medium">{{ product?.name }}</li>
        </ol>
      </div>
    </nav>

    <div v-if="product" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="lg:grid lg:grid-cols-2 lg:gap-8">
        <!-- Product Images -->
        <div class="lg:col-span-1">
          <div class="aspect-w-1 aspect-h-1 w-full">
            <img
              :src="currentImage"
              :alt="product.name"
              class="w-full h-96 object-center object-cover rounded-lg"
            />
          </div>
          
          <!-- Thumbnail Images -->
          <div v-if="product.images.length > 1" class="mt-4 grid grid-cols-4 gap-2">
            <button
              v-for="(image, index) in product.images"
              :key="index"
              @click="currentImage = image"
              :class="{
                'ring-2 ring-primary-500': currentImage === image,
                'ring-1 ring-gray-300': currentImage !== image
              }"
              class="aspect-w-1 aspect-h-1 rounded-md overflow-hidden"
            >
              <img
                :src="image"
                :alt="`${product.name} ${index + 1}`"
                class="w-full h-20 object-center object-cover"
              />
            </button>
          </div>
        </div>

        <!-- Product Info -->
        <div class="lg:col-span-1 mt-8 lg:mt-0">
          <h1 class="text-3xl font-extrabold text-gray-900 font-poppins">{{ product.name }}</h1>
          <p class="mt-2 text-lg text-gray-500">{{ product.category }}</p>
          
          <!-- Rating -->
          <div v-if="product.rating" class="mt-4 flex items-center">
            <div class="flex items-center">
              <svg
                v-for="star in 5"
                :key="star"
                class="h-5 w-5"
                :class="star <= product.rating ? 'text-yellow-400' : 'text-gray-300'"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
            <span class="ml-2 text-sm text-gray-500">({{ product.reviewCount || 0 }} reviews)</span>
          </div>
          
          <!-- Price -->
          <div class="mt-6">
            <div class="flex items-center">
              <p class="text-3xl font-bold text-gray-900">₹{{ product.price.toLocaleString() }}</p>
              <p v-if="product.originalPrice" class="ml-4 text-lg text-gray-500 line-through">
                ₹{{ product.originalPrice.toLocaleString() }}
              </p>
            </div>
            <p v-if="product.originalPrice" class="mt-1 text-sm text-green-600 font-medium">
              Save ₹{{ (product.originalPrice - product.price).toLocaleString() }}
            </p>
          </div>
          
          <!-- Stock Status -->
          <div class="mt-4">
            <div
              :class="{
                'text-green-600': product.inStock,
                'text-red-600': !product.inStock
              }"
              class="flex items-center text-sm font-medium"
            >
              <div
                :class="{
                  'bg-green-400': product.inStock,
                  'bg-red-400': !product.inStock
                }"
                class="w-2 h-2 rounded-full mr-2"
              ></div>
              {{ product.inStock ? 'In Stock' : 'Out of Stock' }}
            </div>
          </div>
          
          <!-- Description -->
          <div class="mt-6">
            <h3 class="text-lg font-medium text-gray-900">Description</h3>
            <p class="mt-2 text-gray-600">{{ product.description }}</p>
          </div>
          
          <!-- Quantity Selector -->
          <div class="mt-6">
            <h3 class="text-sm font-medium text-gray-900">Quantity</h3>
            <div class="mt-2 flex items-center">
              <button
                @click="quantity > 1 && quantity--"
                :disabled="quantity <= 1"
                class="p-2 text-gray-400 hover:text-gray-600 disabled:cursor-not-allowed"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />
                </svg>
              </button>
              <span class="mx-4 w-12 text-center font-medium">{{ quantity }}</span>
              <button
                @click="quantity++"
                class="p-2 text-gray-400 hover:text-gray-600"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </button>
            </div>
          </div>
          
          <!-- Add to Cart -->
          <div class="mt-8 flex space-x-4">
            <button
              @click="addToCart"
              :disabled="!product.inStock"
              class="flex-1 bg-primary-600 text-white py-3 px-6 rounded-md font-medium hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200"
            >
              {{ product.inStock ? 'Add to Cart' : 'Out of Stock' }}
            </button>
            <button
              @click="buyNow"
              :disabled="!product.inStock"
              class="flex-1 bg-gold-500 text-white py-3 px-6 rounded-md font-medium hover:bg-gold-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200"
            >
              Buy Now
            </button>
          </div>
          
          <!-- Product Details -->
          <div class="mt-8 border-t border-gray-200 pt-8">
            <h3 class="text-lg font-medium text-gray-900">Product Details</h3>
            <div class="mt-4 space-y-2">
              <div class="flex justify-between">
                <span class="text-sm text-gray-500">Category:</span>
                <span class="text-sm text-gray-900">{{ product.category }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-sm text-gray-500">Material:</span>
                <span class="text-sm text-gray-900">{{ product.material || 'Gold Plated' }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-sm text-gray-500">Weight:</span>
                <span class="text-sm text-gray-900">{{ product.weight || '15g' }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-sm text-gray-500">Care Instructions:</span>
                <span class="text-sm text-gray-900">Store in dry place</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Related Products -->
      <div class="mt-16">
        <h2 class="text-2xl font-bold text-gray-900 font-poppins">You May Also Like</h2>
        <div class="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <ProductCard
            v-for="relatedProduct in relatedProducts"
            :key="relatedProduct.id"
            :product="relatedProduct"
          />
        </div>
      </div>
    </div>
    
    <!-- Loading State -->
    <div v-else class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div class="text-center">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
        <p class="mt-4 text-gray-500">Loading product...</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useProductStore } from '../stores/products'
import { useCartStore } from '../stores/cart'
import ProductCard from '../components/product/ProductCard.vue'

const route = useRoute()
const router = useRouter()
const productStore = useProductStore()
const cartStore = useCartStore()

const quantity = ref(1)
const currentImage = ref('')

const product = computed(() => {
  const id = parseInt(route.params.id)
  return productStore.getProductById(id)
})

const relatedProducts = computed(() => {
  if (!product.value) return []
  return productStore.products
    .filter(p => p.category === product.value.category && p.id !== product.value.id)
    .slice(0, 4)
})

const addToCart = () => {
  if (product.value && product.value.inStock) {
    for (let i = 0; i < quantity.value; i++) {
      cartStore.addToCart(product.value)
    }
    // Show success message or animation
    console.log(`Added ${quantity.value} ${product.value.name} to cart`)
  }
}

const buyNow = () => {
  addToCart()
  router.push('/checkout')
}

onMounted(() => {
  if (product.value) {
    currentImage.value = product.value.images[0]
  }
})
</script>