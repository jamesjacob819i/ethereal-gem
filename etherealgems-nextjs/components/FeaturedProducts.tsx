import React from 'react'
import { useProductStore } from '@/stores/useProductStore'
import ProductCard from './ProductCard'

export default function FeaturedProducts() {
  const { products } = useProductStore()
  const featuredProducts = products.filter(product => product.featured).slice(0, 4)

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Featured Collection
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our handpicked selection of the most exquisite jewelry pieces
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
        
        {featuredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">Loading featured products...</p>
          </div>
        )}
      </div>
    </section>
  )
}