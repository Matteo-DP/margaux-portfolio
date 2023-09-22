import Header from 'src/components/Header'
import '@/styles/tailwind.css'
import useSWR from 'swr'
import Script from 'next/script'


export default function App({ Component, pageProps }) {

  const fetcher = (url) => fetch(url).then(res => res.json())
  const { data } = useSWR("/api/getCollections", fetcher)
 
  return(
    <>
      <Script src='https://kit.fontawesome.com/2ad3ea3c29.js' crossOrigin='anonymous'></Script>

      <div className='flex flex-row'>
        <Header 
          collections={data}
        />
        <div className='w-full'>
          <div className='block h-16 md:hidden' />
          <Component {...pageProps} />
        </div>
      </div>
    </>
  )
}