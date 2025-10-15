import { create } from 'zustand'
import axios from 'axios'

interface Product {
  _id: string
  name: string
  description: string
  price: number
  images: string[]
  category: string
  inStock: boolean
  featured: boolean
}

interface ProductStore {
  products: Product[]
  loading: boolean
  error: string | null
  fetchProducts: () => Promise<void>
  getProductById: (id: string) => Product | undefined
}

// Environment variable with fallback
const getApiUrl = () => {
  if (typeof window !== 'undefined') {
    return (window as any).__NEXT_DATA__?.env?.NEXT_PUBLIC_API_URL || 'http://localhost:5000'
  }
  return 'http://localhost:5000'
}

const API_URL = getApiUrl()

// Sample products for development
const sampleProducts: Product[] = [
  {
    _id: '1',
    name: 'Ethereal Diamond Necklace',
    description: 'A stunning diamond necklace crafted with premium quality diamonds and 18k gold.',
    price: 125000,
    images: ['https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'],
    category: 'Necklaces',
    inStock: true,
    featured: true
  },
  {
    _id: '2',
    name: 'Royal Emerald Earrings',
    description: 'Elegant emerald earrings set in pure gold with intricate craftsmanship.',
    price: 85000,
    images: ['https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'],
    category: 'Earrings',
    inStock: true,
    featured: true
  },
  {
    _id: '3',
    name: 'Celestial Gold Bangles',
    description: 'Traditional gold bangles with modern celestial patterns.',
    price: 65000,
    images: ['https://images.unsplash.com/photo-1611652022419-a9419f74343d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'],
    category: 'Bangles',
    inStock: true,
    featured: false
  },
  {
    _id: '4',
    name: 'Vintage Ruby Ring',
    description: 'A vintage-inspired ruby ring with diamond accents.',
    price: 95000,
    images: ['https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'],
    category: 'Rings',
    inStock: true,
    featured: true
  },
  {
    _id: '5',
    name: 'Bridal Pearl Set',
    description: 'Complete bridal jewelry set with pearls and gold work.',
    price: 185000,
    images: ['https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'],
    category: 'Bridal Sets',
    inStock: true,
    featured: true
  },
  {
    _id: '6',
    name: 'Diamond Pendant',
    description: 'Elegant diamond pendant perfect for everyday wear.',
    price: 55000,
    images: ['https://images.unsplash.com/photo-1588444645272-e9a8a2b9f8b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'],
    category: 'Necklaces',
    inStock: true,
    featured: false
  }
]

export const useProductStore = create<ProductStore>((set, get) => ({
  products: sampleProducts, // Start with sample products
  loading: false,
  error: null,

  fetchProducts: async () => {
    set({ loading: true, error: null })
    try {
      const response = await axios.get(`${API_URL}/api/products`)
      set({ products: response.data.products, loading: false })
    } catch (error: any) {
      // Fallback to sample products if API fails
      console.warn('API failed, using sample products:', error.message)
      set({ 
        products: sampleProducts,
        error: null, // Don't show error since we have fallback data
        loading: false 
      })
    }
  },

  getProductById: (id: string) => {
    return get().products.find(product => product._id === id)
  }
}))