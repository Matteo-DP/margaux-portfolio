import '@/styles/tailwind.css'
import Header from '@/components/Header.jsx'
import Script from 'next/script'
import { Analytics } from '@vercel/analytics/react';

export default function App({ Component, pageProps }) {
  
  return(
    <>
      <Script src='https://kit.fontawesome.com/2ad3ea3c29.js' crossOrigin='anonymous'></Script>
      <Script src='smoothScroll.js'></Script>
      <Header/>
      <main className='pt-20 scroll-smooth'>
        <Component {...pageProps} />
      </main>
      <Analytics />
    </>
  )
}