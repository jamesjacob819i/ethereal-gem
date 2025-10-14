// Utility function for consistent price formatting across server and client
export function formatPrice(price: number): string {
  // Use fixed formatting to avoid SSR/client mismatch
  return new Intl.NumberFormat('en-IN', {
    style: 'decimal',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price)
}

// Alternative simple format that's consistent
export function formatPriceSimple(price: number): string {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}