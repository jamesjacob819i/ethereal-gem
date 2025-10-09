<template>
  <div class="bg-white">
    <!-- Deployment Status -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
      <DeploymentStatus />
    </div>
    
    <!-- Hero Section -->
    <section class="relative bg-gradient-to-r from-primary-50 to-purple-50 overflow-hidden">
      <div class="max-w-7xl mx-auto">
        <div class="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          <main class="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div class="sm:text-center lg:text-left">
              <h1 class="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl font-poppins">
                <span class="block xl:inline">Discover the</span>
                <span class="block text-primary-600 xl:inline">Ethereal Beauty</span>
              </h1>
              <p class="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                Exquisite jewelry that captures the essence of elegance and grace. Each piece is carefully crafted to make your special moments truly magical.
              </p>
              <div class="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <div class="rounded-md shadow">
                  <router-link
                    to="/shop"
                    class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 md:py-4 md:text-lg md:px-10 transition-colors duration-200"
                  >
                    Shop Now
                  </router-link>
                </div>
                <div class="mt-3 sm:mt-0 sm:ml-3">
                  <router-link
                    to="/about"
                    class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-primary-700 bg-primary-100 hover:bg-primary-200 md:py-4 md:text-lg md:px-10 transition-colors duration-200"
                  >
                    Our Story
                  </router-link>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      <div class="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <img
          class="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
          src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
          alt="Beautiful jewelry collection"
        />
      </div>
    </section>

    <!-- Categories Section -->
    <section class="py-16 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h2 class="text-3xl font-extrabold text-gray-900 font-poppins">Shop by Category</h2>
          <p class="mt-4 text-lg text-gray-500">
            Discover our curated collections of fine jewelry
          </p>
        </div>
        
        <div class="mt-12 grid grid-cols-1 gap-y-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-8 lg:gap-y-0">
          <div
            v-for="category in categories"
            :key="category.name"
            class="group relative bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
            @click="goToCategory(category.name)"
          >
            <div class="aspect-w-4 aspect-h-3 bg-gray-200">
              <img
                :src="category.image"
                :alt="category.name"
                class="w-full h-48 object-center object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div class="p-6">
              <h3 class="text-lg font-medium text-gray-900 group-hover:text-primary-600 transition-colors duration-200">
                {{ category.name }}
              </h3>
              <p class="mt-2 text-sm text-gray-500">{{ category.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Products Section -->
    <section class="py-16 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h2 class="text-3xl font-extrabold text-gray-900 font-poppins">Featured Products</h2>
          <p class="mt-4 text-lg text-gray-500">
            Handpicked pieces that showcase the finest craftsmanship
          </p>
        </div>
        
        <!-- Loading State -->
        <LoadingSpinner 
          v-if="isLoading" 
          text="Loading beautiful jewelry..." 
        />
        
        <!-- Products Grid -->
        <div v-else-if="hasProducts" class="mt-12 grid grid-cols-1 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-x-6">
          <ProductCard
            v-for="product in productStore.featuredProducts"
            :key="product._id || product.id"
            :product="product"
          />
        </div>
        
        <!-- No Products State -->
        <div v-else class="mt-12 text-center py-12">
          <p class="text-gray-500">No products available at the moment.</p>
        </div>
        
        <div class="mt-12 text-center">
          <router-link
            to="/shop"
            class="btn-primary"
          >
            View All Products
          </router-link>
        </div>
      </div>
    </section>

    <!-- Testimonials Section -->
    <section class="py-16 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h2 class="text-3xl font-extrabold text-gray-900 font-poppins">What Our Customers Say</h2>
        </div>
        
        <div class="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div
            v-for="testimonial in testimonials"
            :key="testimonial.id"
            class="bg-white rounded-lg shadow-md p-6"
          >
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <img class="h-10 w-10 rounded-full" :src="testimonial.avatar" :alt="testimonial.name" />
              </div>
              <div class="ml-4">
                <div class="text-sm font-medium text-gray-900">{{ testimonial.name }}</div>
                <div class="text-sm text-gray-500">{{ testimonial.location }}</div>
              </div>
            </div>
            <div class="mt-4">
              <div class="flex items-center">
                <div class="flex items-center">
                  <svg
                    v-for="star in 5"
                    :key="star"
                    class="h-4 w-4 text-yellow-400"
                    :class="star <= testimonial.rating ? 'text-yellow-400' : 'text-gray-300'"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
              </div>
              <p class="mt-2 text-gray-600">{{ testimonial.comment }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Newsletter Section -->
    <section class="bg-primary-600">
      <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center">
        <div class="lg:w-0 lg:flex-1">
          <h2 class="text-3xl font-extrabold tracking-tight text-white font-poppins">
            Stay updated with our latest collections
          </h2>
          <p class="mt-4 max-w-3xl text-lg text-primary-100">
            Be the first to know about new arrivals, exclusive offers, and special events.
          </p>
        </div>
        <div class="mt-12 sm:w-full sm:max-w-md lg:mt-0 lg:ml-8 lg:flex-shrink-0">
          <form class="sm:flex">
            <label for="email" class="sr-only">Email address</label>
            <input
              id="email"
              name="email"
              type="email"
              autocomplete="email"
              required
              class="w-full border-white px-5 py-3 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary-600 focus:ring-white rounded-md"
              placeholder="Enter your email"
            />
            <button
              type="submit"
              class="mt-3 w-full bg-primary-500 border border-transparent rounded-md py-3 px-5 flex items-center justify-center text-base font-medium text-white hover:bg-primary-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary-600 focus:ring-white sm:mt-0 sm:ml-3 sm:w-auto sm:flex-shrink-0 transition-colors duration-200"
            >
              Subscribe
            </button>
          </form>
          <p class="mt-3 text-sm text-primary-100">
            We care about your data. Read our 
            <a href="#" class="text-white font-medium underline">Privacy Policy</a>.
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useProductStore } from '../stores/products'
import ProductCard from '../components/product/ProductCard.vue'
import LoadingSpinner from '../components/layout/LoadingSpinner.vue'
import DeploymentStatus from '../components/layout/DeploymentStatus.vue'

const router = useRouter()
const productStore = useProductStore()

// Computed property to show loading state
const isLoading = computed(() => productStore.loading && !productStore.initialized)
const hasProducts = computed(() => productStore.products.length > 0)

// Fetch products when component mounts (only if not already initialized)
onMounted(() => {
  if (!productStore.initialized) {
    productStore.fetchProducts()
  }
})

const categories = [
  {
    name: 'Necklaces',
    description: 'Elegant necklaces for every occasion',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
  },
  {
    name: 'Earrings',
    description: 'Beautiful earrings to complement your style',
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
  },
  {
    name: 'Bangles',
    description: 'Traditional and modern bangles',
    image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
  },
  {
    name: 'Bridal Sets',
    description: 'Complete sets for your special day',
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
  }
]

const testimonials = [
  {
    id: 1,
    name: 'Priya Sharma',
    location: 'Mumbai',
    rating: 5,
    comment: 'Absolutely beautiful jewelry! The quality is exceptional and the designs are stunning. Highly recommended!',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 2,
    name: 'Anjali Patel',
    location: 'Delhi',
    rating: 5,
    comment: 'Perfect for my wedding! The bridal set was exactly what I was looking for. Amazing craftsmanship.',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 3,
    name: 'Meera Reddy',
    location: 'Bangalore',
    rating: 5,
    comment: 'Great customer service and fast delivery. The earrings are even more beautiful in person!',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80'
  }
]

const goToCategory = (categoryName) => {
  productStore.setCategory(categoryName)
  router.push('/shop')
}
</script>