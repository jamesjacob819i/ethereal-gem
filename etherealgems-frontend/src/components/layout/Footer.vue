<template>
  <footer class="bg-gray-900 text-white">
    <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
      <div class="xl:grid xl:grid-cols-3 xl:gap-8">
        <div class="space-y-8 xl:col-span-1">
          <div class="flex items-center">
            <span class="text-2xl font-bold text-primary-400 font-poppins">EtherealGems</span>
          </div>
          <p class="text-gray-300 text-base">
            Discover the beauty of ethereal jewelry. Each piece is crafted with love and attention to detail, 
            bringing elegance and grace to your special moments.
          </p>
          <div class="flex space-x-6">
            <a href="#" class="text-gray-400 hover:text-gray-300 transition-colors duration-200">
              <span class="sr-only">Facebook</span>
              <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path fill-rule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clip-rule="evenodd" />
              </svg>
            </a>
            <a href="#" class="text-gray-400 hover:text-gray-300 transition-colors duration-200">
              <span class="sr-only">Instagram</span>
              <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path fill-rule="evenodd" d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987s11.987-5.367 11.987-11.987C24.014 5.367 18.647.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.328-1.297L1.4 18.404l2.713-3.721c-.808-.88-1.297-2.031-1.297-3.328 0-2.577 2.089-4.666 4.666-4.666s4.666 2.089 4.666 4.666-2.089 4.666-4.666 4.666z" clip-rule="evenodd" />
              </svg>
            </a>
            <a href="#" class="text-gray-400 hover:text-gray-300 transition-colors duration-200">
              <span class="sr-only">Twitter</span>
              <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </a>
          </div>
        </div>
        <div class="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
          <div class="md:grid md:grid-cols-2 md:gap-8">
            <div>
              <h3 class="text-sm font-semibold text-gray-400 tracking-wider uppercase">Shop</h3>
              <ul class="mt-4 space-y-4">
                <li>
                  <router-link to="/shop" class="text-base text-gray-300 hover:text-white transition-colors duration-200">
                    All Products
                  </router-link>
                </li>
                <li>
                  <a href="#" class="text-base text-gray-300 hover:text-white transition-colors duration-200">
                    Necklaces
                  </a>
                </li>
                <li>
                  <a href="#" class="text-base text-gray-300 hover:text-white transition-colors duration-200">
                    Earrings
                  </a>
                </li>
                <li>
                  <a href="#" class="text-base text-gray-300 hover:text-white transition-colors duration-200">
                    Bangles
                  </a>
                </li>
                <li>
                  <a href="#" class="text-base text-gray-300 hover:text-white transition-colors duration-200">
                    Bridal Sets
                  </a>
                </li>
              </ul>
            </div>
            <div class="mt-12 md:mt-0">
              <h3 class="text-sm font-semibold text-gray-400 tracking-wider uppercase">Support</h3>
              <ul class="mt-4 space-y-4">
                <li>
                  <router-link to="/contact" class="text-base text-gray-300 hover:text-white transition-colors duration-200">
                    Contact Us
                  </router-link>
                </li>
                <li>
                  <a href="#" class="text-base text-gray-300 hover:text-white transition-colors duration-200">
                    Size Guide
                  </a>
                </li>
                <li>
                  <a href="#" class="text-base text-gray-300 hover:text-white transition-colors duration-200">
                    Shipping Info
                  </a>
                </li>
                <li>
                  <a href="#" class="text-base text-gray-300 hover:text-white transition-colors duration-200">
                    Returns
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div class="md:grid md:grid-cols-2 md:gap-8">
            <div>
              <h3 class="text-sm font-semibold text-gray-400 tracking-wider uppercase">Company</h3>
              <ul class="mt-4 space-y-4">
                <li>
                  <router-link to="/about" class="text-base text-gray-300 hover:text-white transition-colors duration-200">
                    About Us
                  </router-link>
                </li>
                <li>
                  <a href="#" class="text-base text-gray-300 hover:text-white transition-colors duration-200">
                    Our Story
                  </a>
                </li>
                <li>
                  <a href="#" class="text-base text-gray-300 hover:text-white transition-colors duration-200">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" class="text-base text-gray-300 hover:text-white transition-colors duration-200">
                    Press
                  </a>
                </li>
              </ul>
            </div>
            <div class="mt-12 md:mt-0">
              <h3 class="text-sm font-semibold text-gray-400 tracking-wider uppercase">Legal</h3>
              <ul class="mt-4 space-y-4">
                <li>
                  <a href="#" class="text-base text-gray-300 hover:text-white transition-colors duration-200">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" class="text-base text-gray-300 hover:text-white transition-colors duration-200">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" class="text-base text-gray-300 hover:text-white transition-colors duration-200">
                    Refund Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="mt-12 border-t border-gray-700 pt-8">
        <p class="text-base text-gray-400 xl:text-center">
          &copy; 2025 EtherealGems. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup>
// No reactive data needed for footer
</script>