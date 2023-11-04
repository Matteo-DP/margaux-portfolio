import React from 'react'
import config from '../../../config'
import ArtSection from 'src/components/ArtSection'
import Layout from 'src/components/Layout'
import { getArt, getCollections } from "src/services/pbService"

export default function Collection({ art, collection }) {

  return (
    <>
      <Layout title={collection.name} />
      <main className='px-8 py-12'>
        <div className='mb-12'>
          <h1 className='text-4xl font-bold uppercase text-end'>{collection.name}</h1>
          {collection.description &&
            <p className='mt-4 text-zinc-700 text-sm font-mono text-end'>{collection.description}</p>
          }
        </div>
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

    const [art, collections] = await Promise.all([
        await getArt(collection),
        await getCollections()
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
    const data = await getCollections();
    const paths = data.map((e) => ({
        params: { collection: e.handle }
    }))
    return { paths, fallback: 'blocking' }
}