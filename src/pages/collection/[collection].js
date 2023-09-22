import React from 'react'
import config from '../../../config'
import ArtSection from 'src/components/ArtSection'
import Layout from 'src/components/Layout'

export default function Collection({ art, collection }) {

  return (
    <>
      <Layout title={collection.name} />
      <main className='px-8 py-12'>
        {collection.description &&
          <p className='mb-8 text-zinc-700 text-sm font-mono'>{collection.description}</p>
        }
        <ArtSection 
          art={art}
          compact={collection.compact}
        />
      </main>
    </>
  )
}

export async function getStaticProps(ctx) {
  
    var { collection } = ctx.params
    const imagesUrl = config.url + "/api/getImages?collection=" + collection
    const collectionsUrl = config.url + "/api/getCollections"

    const [artRes, collectionsRes] = await Promise.all([
        fetch(imagesUrl),
        fetch(collectionsUrl)
    ])
    const [art, collections] = await Promise.all([
        artRes.json(),
        collectionsRes.json()
    ])

    collection = collections.find(c =>
        c.handle == collection
    )

    if(!collection || collection.hidden) return {
        notFound: true,
        revalidate: 60
    }

    return{
        props: { art, collection },
        revalidate: 60
    }
}

export async function getStaticPaths() {
    const url = config.url + "/api/getCollections"
    const res = await fetch(url)
    const data = await res.json()
    const paths = data.map((e) => ({
        params: { collection: e.handle }
    }))
    return { paths, fallback: 'blocking' }
}