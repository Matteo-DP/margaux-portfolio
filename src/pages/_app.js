import '@/styles/tailwind.css'
import Header from '@/components/Header.jsx'
import Script from 'next/script'
import { Analytics } from '@vercel/analytics/react';
import React from 'react';
import { useState, useEffect } from 'react';

export const CollectionsContext = React.createContext([])

export default function App({ Component, pageProps }) {

    const [collections, setCollections] = useState([]);
    useEffect(() => {
        const fetchCollections = async () => {
            const res = await fetch('/api/getCollections');
            if (res.ok) {
              const collections = await res.json();
              setCollections(collections);
            }
        }
        fetchCollections();
    }, [])
  
  return(
    <>
      <Script src='https://kit.fontawesome.com/2ad3ea3c29.js' crossOrigin='anonymous'></Script>
      <Script src='smoothScroll.js'></Script>
      <CollectionsContext.Provider value={collections}>
        <Header/>
        <main className='pt-20 scroll-smooth'>
          <Component {...pageProps} />
        </main>
        </CollectionsContext.Provider>
      <Analytics />
    </>
  )
}