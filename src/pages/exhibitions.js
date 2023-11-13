import React from 'react'
import { getExhibitions } from 'src/services/pbService'
import Layout from '@/components/Layout';
import ExhibitionSection from '@/components/ExhibitionSection';

export default function Exhibitions({ exhibitions }) {
  return (
    <>
        <Layout title="Exhibitions"/>
        <main className='px-8 py-12'>
            <ExhibitionSection 
                exhibitions={exhibitions}
            />
        </main>
    </>
  )
}

export async function getStaticProps(ctx) {

    const exhibitions = await getExhibitions();
    return {
        props: { exhibitions, revalidate: 60 }
    }
}