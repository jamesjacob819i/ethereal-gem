import { useEffect } from 'react'
import Head from 'next/head'
import Layout from '@/components/Layout'
import Hero from '@/components/Hero'
import FeaturedProducts from '@/components/FeaturedProducts'
import Newsletter from '@/components/Newsletter'
import { useProductStore } from '@/stores/useProductStore'

export default function Home() {
  const { fetchProducts, loading } = useProductStore()

  useEffect(() => {
    fetchProducts()
  }, [])

  return (
    <>
      <Head>
        <title>EtherealGems - Premium Jewelry Collection</title>
        <meta name="description" content="Discover the beauty of ethereal jewelry. Premium rings, necklaces, and earrings for every occasion." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Layout>
        <Hero />
        <FeaturedProducts />
        <Newsletter />
      </Layout>
    </>
  )
}