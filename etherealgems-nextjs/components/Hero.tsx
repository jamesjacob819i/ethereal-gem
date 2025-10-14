import React from 'react'
import Link from 'next/link'

export default function Hero() {
  return (
    <div className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-purple-900 text-white overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-secondary-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 font-poppins">
            Discover <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary-300 to-secondary-500">Ethereal</span> Beauty
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-primary-100 max-w-3xl mx-auto leading-relaxed">
            Exquisite jewelry pieces that capture the essence of elegance and timeless sophistication
          </p>
          <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
            <Link 
              href="/shop" 
              className="inline-block bg-gradient-to-r from-secondary-400 to-secondary-500 text-white px-8 py-4 rounded-lg font-semibold hover:from-secondary-500 hover:to-secondary-600 transform hover:scale-105 transition-all duration-200 shadow-lg"
            >
              Shop Collection
            </Link>
            <Link 
              href="/about" 
              className="inline-block border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transform hover:scale-105 transition-all duration-200"
            >
              Our Story
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}