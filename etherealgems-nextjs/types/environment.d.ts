declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_API_URL: string
    NEXT_PUBLIC_APP_TITLE: string
    NEXT_PUBLIC_DEMO_MODE: string
    NODE_ENV: 'development' | 'production' | 'test'
  }
}