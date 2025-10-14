import Head from 'next/head'
import Layout from '@/components/Layout'

export default function About() {
  return (
    <>
      <Head>
        <title>About Us - EtherealGems</title>
        <meta name="description" content="Learn about EtherealGems and our commitment to creating beautiful, high-quality jewelry." />
      </Head>
      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">About EtherealGems</h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We are passionate about creating jewelry that tells your story and celebrates life's precious moments.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  Founded with a vision to make luxury jewelry accessible to everyone, EtherealGems 
                  combines traditional craftsmanship with contemporary design. Each piece in our 
                  collection is carefully selected for its beauty, quality, and unique character.
                </p>
                <p>
                  We believe that jewelry should be more than just an accessory – it should be a 
                  reflection of your personality and a celebration of your individual style. From 
                  elegant everyday pieces to statement jewelry for special occasions, we have 
                  something for every moment in your life.
                </p>
              </div>
            </div>
            <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Values</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <span className="text-primary-600 mr-2">✓</span>
                  Quality craftsmanship in every piece
                </li>
                <li className="flex items-start">
                  <span className="text-primary-600 mr-2">✓</span>
                  Ethically sourced materials
                </li>
                <li className="flex items-start">
                  <span className="text-primary-600 mr-2">✓</span>
                  Exceptional customer service
                </li>
                <li className="flex items-start">
                  <span className="text-primary-600 mr-2">✓</span>
                  Timeless designs that last
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}