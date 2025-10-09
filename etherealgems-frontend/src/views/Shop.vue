<template>
  <div class="bg-white">
    <!-- Header -->
    <div class="bg-gray-50 border-b border-gray-200">
      <div class="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h1 class="text-3xl font-extrabold text-gray-900 font-poppins">Shop Our Collection</h1>
          <p class="mt-4 text-lg text-gray-500">
            Discover our beautiful range of handcrafted jewelry
          </p>
        </div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="lg:grid lg:grid-cols-4 lg:gap-8">
        <!-- Filters Sidebar -->
        <div class="lg:col-span-1">
          <div class="bg-white p-6 rounded-lg shadow-md">
            <h3 class="text-lg font-medium text-gray-900 mb-4">Filters</h3>
            
            <!-- Category Filter -->
            <div class="mb-6">
              <h4 class="text-sm font-medium text-gray-900 mb-3">Category</h4>
              <div class="space-y-2">
                <label class="flex items-center">
                  <input
                    type="radio"
                    :value="'All'"
                    v-model="selectedCategory"
                    class="text-primary-600 focus:ring-primary-500"
                  />
                  <span class="ml-2 text-sm text-gray-700">All Categories</span>
                </label>
                <label
                  v-for="category in productStore.categories"
                  :key="category"
                  class="flex items-center"
                >
                  <input
                    type="radio"
                    :value="category"
                    v-model="selectedCategory"
                    class="text-primary-600 focus:ring-primary-500"
                  />
                  <span class="ml-2 text-sm text-gray-700">{{ category }}</span>
                </label>
              </div>
            </div>
            
            <!-- Price Filter -->
            <div class="mb-6">
              <h4 class="text-sm font-medium text-gray-900 mb-3">Price Range</h4>
              <div class="space-y-2">
                <label class="flex items-center">
                  <input
                    type="radio"
                    value="all"
                    v-model="selectedPriceRange"
                    class="text-primary-600 focus:ring-primary-500"
                  />
                  <span class="ml-2 text-sm text-gray-700">All Prices</span>
                </label>
                <label class="flex items-center">
                  <input
                    type="radio"
                    value="0-1000"
                    v-model="selectedPriceRange"
                    class="text-primary-600 focus:ring-primary-500"
                  />
                  <span class="ml-2 text-sm text-gray-700">Under ₹1,000</span>
                </label>
                <label class="flex items-center">
                  <input
                    type="radio"
                    value="1000-5000"
                    v-model="selectedPriceRange"
                    class="text-primary-600 focus:ring-primary-500"
                  />
                  <span class="ml-2 text-sm text-gray-700">₹1,000 - ₹5,000</span>
                </label>
                <label class="flex items-center">
                  <input
                    type="radio"
                    value="5000-15000"
                    v-model="selectedPriceRange"
                    class="text-primary-600 focus:ring-primary-500"
                  />
                  <span class="ml-2 text-sm text-gray-700">₹5,000 - ₹15,000</span>
                </label>
                <label class="flex items-center">
                  <input
                    type="radio"
                    value="15000+"
                    v-model="selectedPriceRange"
                    class="text-primary-600 focus:ring-primary-500"
                  />
                  <span class="ml-2 text-sm text-gray-700">Above ₹15,000</span>
                </label>
              </div>
            </div>
            
            <!-- Sort Options -->
            <div class="mb-6">
              <h4 class="text-sm font-medium text-gray-900 mb-3">Sort By</h4>
              <select
                v-model="sortBy"
                class="w-full border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name">Name A-Z</option>
                <option value="newest">Newest First</option>
              </select>
            </div>
            
            <!-- Clear Filters -->
            <button
              @click="clearFilters"
              class="w-full text-sm text-primary-600 hover:text-primary-700 font-medium"
            >
              Clear All Filters
            </button>
          </div>
        </div>
        
        <!-- Products Grid -->
        <div class="lg:col-span-3 mt-8 lg:mt-0">
          <!-- Search Results Header -->
          <div v-if="searchQuery" class="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div class="flex items-center justify-between">
              <div>
                <h3 class="text-sm font-medium text-blue-800">Search Results</h3>
                <p class="text-sm text-blue-600">
                  Showing results for "<strong>{{ searchQuery }}</strong>"
                </p>
              </div>
              <button
                @click="searchQuery = ''"
                class="text-blue-500 hover:text-blue-700"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
          
          <!-- Results header -->
          <div class="flex items-center justify-between mb-6">
            <p class="text-sm text-gray-700">
              Showing {{ filteredProducts.length }} of {{ productStore.products.length }} products
            </p>
            
            <!-- View toggle (grid/list) -->
            <div class="flex items-center space-x-2">
              <button
                @click="viewMode = 'grid'"
                :class="{
                  'text-primary-600': viewMode === 'grid',
                  'text-gray-400': viewMode !== 'grid'
                }"
                class="p-2 hover:text-primary-600 transition-colors duration-200"
              >
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </button>
              <button
                @click="viewMode = 'list'"
                :class="{
                  'text-primary-600': viewMode === 'list',
                  'text-gray-400': viewMode !== 'list'
                }"
                class="p-2 hover:text-primary-600 transition-colors duration-200"
              >
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
          
          <!-- Loading state -->
          <div v-if="productStore.loading" class="text-center py-12">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
            <p class="mt-4 text-gray-500">Loading products...</p>
          </div>
          
          <!-- No products found -->
          <div v-else-if="filteredProducts.length === 0" class="text-center py-12">
            <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2m13-8l-4 4-4-4m-3 8h.01" />
            </svg>
            <h3 class="mt-2 text-sm font-medium text-gray-900">No products found</h3>
            <p class="mt-1 text-sm text-gray-500">Try adjusting your filters or search criteria.</p>
          </div>
          
          <!-- Products Grid -->
          <div
            v-else
            :class="{
              'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6': viewMode === 'grid',
              'space-y-6': viewMode === 'list'
            }"
          >
            <ProductCard
              v-for="product in filteredProducts"
              :key="product.id"
              :product="product"
              :view-mode="viewMode"
            />
          </div>
          
          <!-- Load More / Pagination -->
          <div v-if="filteredProducts.length > 0" class="mt-12 text-center">
            <button class="btn-primary">
              Load More Products
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useProductStore } from '../stores/products'
import ProductCard from '../components/product/ProductCard.vue'

const route = useRoute()
const productStore = useProductStore()

const selectedCategory = ref('All')
const selectedPriceRange = ref('all')
const sortBy = ref('featured')
const viewMode = ref('grid')
const searchQuery = ref('')

// Computed property for filtered products
const filteredProducts = computed(() => {
  let products = [...productStore.products]
  
  // Filter by search query
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase().trim()
    products = products.filter(product => 
      product.name.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query)
    )
  }
  
  // Filter by category
  if (selectedCategory.value !== 'All') {
    products = products.filter(product => product.category === selectedCategory.value)
  }
  
  // Filter by price range
  if (selectedPriceRange.value !== 'all') {
    const [min, max] = selectedPriceRange.value.includes('+') 
      ? [parseInt(selectedPriceRange.value.replace('+', '')), Infinity]
      : selectedPriceRange.value.split('-').map(p => parseInt(p))
    
    products = products.filter(product => product.price >= min && product.price <= max)
  }
  
  // Sort products
  switch (sortBy.value) {
    case 'price-low':
      products.sort((a, b) => a.price - b.price)
      break
    case 'price-high':
      products.sort((a, b) => b.price - a.price)
      break
    case 'name':
      products.sort((a, b) => a.name.localeCompare(b.name))
      break
    case 'newest':
      products.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))
      break
    case 'featured':
    default:
      products.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
      break
  }
  
  return products
})

// Watch for category changes from store (coming from home page)
watch(
  () => productStore.selectedCategory,
  (newCategory) => {
    if (newCategory && newCategory !== 'All') {
      selectedCategory.value = newCategory
    }
  },
  { immediate: true }
)

// Clear all filters
const clearFilters = () => {
  selectedCategory.value = 'All'
  selectedPriceRange.value = 'all'
  sortBy.value = 'featured'
  searchQuery.value = ''
  productStore.setCategory('All')
}

onMounted(() => {
  // Fetch products only if not already initialized
  if (!productStore.initialized) {
    productStore.fetchProducts()
  }
  
  // Check if we're coming from a category link
  const category = route.query.category
  if (category) {
    selectedCategory.value = category
  }
  
  // Check if we're coming from a search
  const search = route.query.search
  if (search) {
    searchQuery.value = search
  }
})
</script>