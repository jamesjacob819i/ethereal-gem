import { defineStore } from 'pinia'

const API_BASE_URL = 'http://localhost:5000/api'

// Cache for products to avoid unnecessary refetches
let productsCache = null
let lastFetchTime = 0
const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes

export const useProductStore = defineStore('products', {
  state: () => ({
    products: [],
    categories: ['Necklaces', 'Bangles', 'Earrings', 'Bridal Sets', 'Rings'],
    selectedCategory: 'All',
    loading: false,
    error: null,
    initialized: false
  }),
  
  getters: {
    filteredProducts: (state) => {
      if (state.selectedCategory === 'All') {
        return state.products
      }
      return state.products.filter(product => product.category === state.selectedCategory)
    },
    
    featuredProducts: (state) => {
      return state.products.filter(product => product.featured).slice(0, 6)
    },
    
    getProductById: (state) => {
      return (id) => state.products.find(product => product._id === id || product.id === id)
    }
  },
  
  actions: {
    async fetchProducts() {
      // Check cache first
      const now = Date.now()
      if (productsCache && (now - lastFetchTime) < CACHE_DURATION) {
        this.products = productsCache
        this.initialized = true
        return
      }

      // If already loading, don't start another request
      if (this.loading) return

      this.loading = true
      this.error = null
      
      try {
        // Use Promise.race for timeout
        const timeoutPromise = new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Request timeout')), 8000)
        )
        
        const fetchPromise = fetch(`${API_BASE_URL}/products`, {
          headers: {
            'Content-Type': 'application/json'
          }
        })
        
        const response = await Promise.race([fetchPromise, timeoutPromise])
        const data = await response.json()
        
        if (response.ok && data.success) {
          this.products = data.products || []
          productsCache = this.products
          lastFetchTime = now
        } else {
          throw new Error(data.message || 'Failed to fetch products')
        }
      } catch (error) {
        console.error('Fetch products error:', error)
        // Quick fallback to mock data
        this.products = this.getMockProductsSync()
        this.error = 'Using demo data - server response slow'
      } finally {
        this.loading = false
        this.initialized = true
      }
    },
    
    async fetchCategories() {
      try {
        const response = await fetch(`${API_BASE_URL}/products/categories`)
        const data = await response.json()
        
        if (response.ok && data.success) {
          this.categories = ['All', ...data.categories]
        }
      } catch (error) {
        console.error('Fetch categories error:', error)
        // Keep default categories
      }
    },
    
    setCategory(category) {
      this.selectedCategory = category
    },
    
    
    getMockProductsSync() {
      // Synchronous mock data for instant loading
      return [
        {
          _id: 'mock-1',
          name: 'Elegant Diamond Necklace',
          description: 'A stunning diamond necklace perfect for special occasions.',
          price: 15999,
          originalPrice: 18999,
          category: 'Necklaces',
          images: [{ url: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' }],
          inStock: true,
          featured: true,
          onSale: true,
          rating: 4.8,
          reviewCount: 24
        },
        {
          _id: 'mock-2',
          name: 'Gold Plated Bangles Set',
          description: 'Beautiful set of 4 gold plated bangles with intricate traditional designs.',
          price: 2999,
          category: 'Bangles',
          images: [{ url: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' }],
          inStock: true,
          featured: true,
          rating: 4.6,
          reviewCount: 18
        },
        {
          _id: 'mock-3',
          name: 'Pearl Drop Earrings',
          description: 'Classic pearl drop earrings for elegant occasions.',
          price: 1899,
          category: 'Earrings',
          images: [{ url: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' }],
          inStock: true,
          featured: true,
          rating: 4.7,
          reviewCount: 15
        },
        {
          _id: 'mock-4',
          name: 'Royal Bridal Set',
          description: 'Complete bridal jewelry set with necklace, earrings, and maang tikka.',
          price: 45999,
          originalPrice: 52999,
          category: 'Bridal Sets',
          images: [{ url: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' }],
          inStock: true,
          featured: true,
          onSale: true,
          rating: 4.9,
          reviewCount: 12
        }
      ]
    },

    async getMockProducts() {
      // Mock data for development/demo
      return [
        {
          id: 1,
          _id: '1',
          name: "Elegant Diamond Necklace",
          description: "A stunning diamond necklace perfect for special occasions",
          price: 15999,
          originalPrice: 18999,
          category: "Necklaces",
          images: ["https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"],
          inStock: true,
          featured: true,
          onSale: true,
          rating: 4.8,
          reviewCount: 24
        },
        {
          id: 2,
          _id: '2',
          name: "Gold Plated Bangles Set",
          description: "Beautiful set of 4 gold plated bangles",
          price: 2999,
          category: "Bangles",
          images: ["https://images.unsplash.com/photo-1611591437281-460bfbe1220a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"],
          inStock: true,
          featured: true,
          rating: 4.6,
          reviewCount: 18
        },
        {
          id: 3,
          _id: '3',
          name: "Pearl Drop Earrings",
          description: "Classic pearl drop earrings for elegant occasions",
          price: 1899,
          category: "Earrings",
          images: ["https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"],
          inStock: true,
          featured: true,
          rating: 4.7,
          reviewCount: 15
        },
        {
          id: 4,
          _id: '4',
          name: "Royal Bridal Set",
          description: "Complete bridal jewelry set with necklace, earrings, and maang tikka",
          price: 45999,
          originalPrice: 52999,
          category: "Bridal Sets",
          images: ["https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"],
          inStock: true,
          featured: true,
          onSale: true,
          rating: 4.9,
          reviewCount: 12
        },
        {
          id: 5,
          _id: '5',
          name: "Silver Chain Necklace",
          description: "Delicate silver chain perfect for everyday wear",
          price: 899,
          category: "Necklaces",
          images: ["https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"],
          inStock: true,
          featured: false,
          rating: 4.4,
          reviewCount: 28
        },
        {
          id: 6,
          _id: '6',
          name: "Kundan Earrings",
          description: "Traditional Kundan earrings with intricate designs",
          price: 3499,
          category: "Earrings",
          images: ["https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"],
          inStock: true,
          featured: false,
          rating: 4.5,
          reviewCount: 22
        },
        {
          id: 7,
          _id: '7',
          name: "Rose Gold Ring",
          description: "Elegant rose gold ring with contemporary design",
          price: 5999,
          category: "Rings",
          images: ["https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"],
          inStock: true,
          featured: false,
          rating: 4.3,
          reviewCount: 10
        },
        {
          id: 8,
          _id: '8',
          name: "Temple Jewelry Set",
          description: "Traditional temple jewelry set with South Indian designs",
          price: 12999,
          category: "Bridal Sets",
          images: ["https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"],
          inStock: true,
          featured: true,
          rating: 4.7,
          reviewCount: 16
        }
      ]
    }
  }
})