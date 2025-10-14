import React, { useState } from 'react'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle newsletter subscription
    console.log('Newsletter subscription:', email)
    setSubscribed(true)
    setEmail('')
    setTimeout(() => setSubscribed(false), 3000)
  }

  return (
    <section className="bg-gradient-to-r from-primary-600 via-primary-700 to-purple-800 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-poppins">
            Stay in Touch
          </h2>
          <p className="text-lg text-primary-100 mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter and be the first to know about new collections and exclusive offers
          </p>
          
          {subscribed ? (
            <div className="max-w-md mx-auto">
              <div className="bg-secondary-500 text-white px-6 py-3 rounded-lg font-medium">
                ✨ Thank you for subscribing!
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
              <div className="flex shadow-lg">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="flex-1 px-4 py-3 rounded-l-lg border-0 focus:ring-2 focus:ring-secondary-400 focus:outline-none"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-gradient-to-r from-secondary-500 to-secondary-600 text-white rounded-r-lg hover:from-secondary-600 hover:to-secondary-700 transition-all duration-200 font-medium transform hover:scale-105"
                >
                  Subscribe
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}