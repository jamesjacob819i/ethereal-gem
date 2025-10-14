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

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://etherealgems-backend.onrender.com'

export const useProductStore = create<ProductStore>((set, get) => ({
  products: [],
  loading: false,
  error: null,

  fetchProducts: async () => {
    set({ loading: true, error: null })
    try {
      const response = await axios.get(`${API_URL}/api/products`)
      set({ products: response.data.products, loading: false })
    } catch (error: any) {
      set({ 
        error: error.response?.data?.message || 'Failed to fetch products',
        loading: false 
      })
    }
  },

  getProductById: (id: string) => {
    return get().products.find(product => product._id === id)
  }
}))