import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import CartSidebar from './CartSidebar'

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-grow bg-white">
        {children}
      </main>
      <Footer />
      <CartSidebar />
    </div>
  )
}