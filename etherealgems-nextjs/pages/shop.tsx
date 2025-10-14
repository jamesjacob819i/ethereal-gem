import { useEffect } from 'react'
import Head from 'next/head'
import Layout from '@/components/Layout'
import ProductGrid from '@/components/ProductGrid'
import { useProductStore } from '@/stores/useProductStore'

export default function Shop() {
  const { fetchProducts, products, loading } = useProductStore()

  useEffect(() => {
    fetchProducts()
  }, [])

  return (
    <>
      <Head>
        <title>Shop - EtherealGems</title>
        <meta name="description" content="Browse our complete collection of premium jewelry pieces." />
      </Head>
      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Collection</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover our exquisite selection of handcrafted jewelry, each piece designed to capture 
              the essence of elegance and timeless beauty.
            </p>
          </div>
          
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            </div>
          ) : (
            <ProductGrid products={products} />
          )}
        </div>
      </Layout>
    </>
  )
}