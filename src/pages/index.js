import React from 'react'
import config from "../../config"
import ArtSection from 'src/components/ArtSection'
import Layout from 'src/components/Layout'


export default function Index({ art }) {
  return (
    <>
      <Layout title={"Home"} />
      <main className='px-8 py-12'>
        <ArtSection 
          art={art}
          compact={false}
        />
      </main>
    </>
  )
}

export async function getStaticProps() {
  const res = await fetch(config.url + "/api/getImages")
  const art = await res.json()
  return{
    props: { art },
    revalidate: 60
  }
}