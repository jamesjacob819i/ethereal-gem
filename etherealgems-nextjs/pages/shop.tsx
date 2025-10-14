import { useEffect, useState } from 'react'
import Head from 'next/head'
import Layout from '@/components/Layout'
import ProductGrid from '@/components/ProductGrid'
import { useProductStore } from '@/stores/useProductStore'

const categories = ['All', 'Necklaces', 'Earrings', 'Rings', 'Bangles', 'Bridal Sets']
const priceRanges = [
  { label: 'All Prices', min: 0, max: Infinity },
  { label: 'Under ₹50,000', min: 0, max: 50000 },
  { label: '₹50,000 - ₹1,00,000', min: 50000, max: 100000 },
  { label: 'Above ₹1,00,000', min: 100000, max: Infinity }
]

export default function Shop() {
  const { fetchProducts, products, loading } = useProductStore()
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedPriceRange, setSelectedPriceRange] = useState(priceRanges[0])
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    fetchProducts()
  }, [])

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory
    const matchesPrice = product.price >= selectedPriceRange.min && product.price <= selectedPriceRange.max
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         product.description.toLowerCase().includes(searchTerm.toLowerCase())
    
    return matchesCategory && matchesPrice && matchesSearch
  })

  return (
    <>
      <Head>
        <title>Shop - EtherealGems</title>
        <meta name="description" content="Browse our complete collection of premium jewelry pieces." />
      </Head>
      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4 font-poppins">Our Collection</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover our exquisite selection of handcrafted jewelry, each piece designed to capture 
              the essence of elegance and timeless beauty.
            </p>
          </div>
          
          {/* Filters */}
          <div className="mb-8 space-y-4 lg:space-y-0 lg:flex lg:items-center lg:space-x-6">
            {/* Search */}
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search jewelry..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
            
            {/* Category Filter */}
            <div className="flex space-x-2 overflow-x-auto">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
                    selectedCategory === category
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
            
            {/* Price Filter */}
            <div>
              <select
                value={priceRanges.findIndex(range => range === selectedPriceRange)}
                onChange={(e) => setSelectedPriceRange(priceRanges[parseInt(e.target.value)])}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                {priceRanges.map((range, index) => (
                  <option key={index} value={index}>
                    {range.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          {/* Results Count */}
          <div className="mb-6">
            <p className="text-gray-600">
              Showing {filteredProducts.length} of {products.length} products
            </p>
          </div>
          
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            </div>
          ) : (
            <ProductGrid products={filteredProducts} />
          )}
        </div>
      </Layout>
    </>
  )
}