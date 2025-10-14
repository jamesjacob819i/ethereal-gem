import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Inter } from 'next/font/google'
import { StoreProvider } from '@/stores/StoreProvider'

const inter = Inter({ subsets: ['latin'] })

export default function App({ Component, pageProps }: AppProps) {
  return (
    <StoreProvider>
      <div className={inter.className}>
        <Component {...pageProps} />
      </div>
    </StoreProvider>
  )
}