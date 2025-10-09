<template>
  <div class="loading-container">
    <div class="loading-spinner">
      <div class="spinner-ring"></div>
      <div class="spinner-text">{{ text }}</div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  text: {
    type: String,
    default: 'Loading...'
  }
})
</script>

<style scoped>
.loading-container {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3rem 0;
  animation: fadeInUp 0.3s ease-out;
}

.loading-spinner {
  text-align: center;
}

.spinner-ring {
  animation: spin 1s linear infinite;
  border-radius: 50%;
  height: 3rem;
  width: 3rem;
  border: 2px solid transparent;
  border-bottom: 2px solid #667eea;
  margin: 0 auto;
}

.spinner-text {
  margin-top: 1rem;
  color: #6b7280;
  font-size: 0.875rem;
}

/* Custom animations */
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>