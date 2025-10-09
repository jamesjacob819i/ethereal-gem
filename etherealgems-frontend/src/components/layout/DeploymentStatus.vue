<template>
  <div v-if="showStatus" class="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
    <div class="flex items-start">
      <div class="flex-shrink-0">
        <svg class="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
        </svg>
      </div>
      <div class="ml-3">
        <h3 class="text-sm font-medium text-yellow-800">
          Backend Deployment In Progress
        </h3>
        <div class="mt-2 text-sm text-yellow-700">
          <p>
            We're currently setting up the backend server. In the meantime, you can:
          </p>
          <ul class="mt-2 list-disc list-inside space-y-1">
            <li>Browse our sample jewelry collection</li>
            <li>Test the shopping cart functionality</li>
            <li>Try the demo login: <code class="bg-yellow-100 px-1 rounded">admin@etherealgems.com</code> / <code class="bg-yellow-100 px-1 rounded">admin123456</code></li>
            <li>Explore all the features with sample data</li>
          </ul>
        </div>
        <div class="mt-3">
          <button
            @click="hideStatus"
            class="text-sm font-medium text-yellow-800 hover:text-yellow-600"
          >
            Got it, continue with demo →
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const showStatus = ref(true)

const hideStatus = () => {
  showStatus.value = false
  localStorage.setItem('hideDeploymentStatus', 'true')
}

// Check if user has already dismissed this message
if (localStorage.getItem('hideDeploymentStatus') === 'true') {
  showStatus.value = false
}
</script>