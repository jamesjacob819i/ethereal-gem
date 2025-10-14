import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { useCartStoreSSR } from '@/stores/useCartStore'
import { formatPriceSimple } from '@/utils/formatPrice'

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

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCartStoreSSR()
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const handleAddToCart = () => {
    addToCart({
      _id: product._id,
      name: product.name,
      price: product.price,
      image: product.images[0] || '/placeholder.jpg'
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200">
      <Link href={`/product/${product._id}`}>
        <div className="aspect-w-1 aspect-h-1 w-full">
          <img
            src={product.images[0] || '/placeholder.jpg'}
            alt={product.name}
            className="w-full h-64 object-cover object-center group-hover:opacity-75"
          />
        </div>
      </Link>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          <Link href={`/product/${product._id}`} className="hover:text-primary-600">
            {product.name}
          </Link>
        </h3>
        
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-primary-600">
            {isClient ? `₹${formatPriceSimple(product.price)}` : `₹${product.price}`}
          </span>
          
          <button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
              product.inStock
                ? 'bg-primary-600 text-white hover:bg-primary-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {product.inStock ? 'Add to Cart' : 'Out of Stock'}
          </button>
        </div>
      </div>
    </div>
  )
}