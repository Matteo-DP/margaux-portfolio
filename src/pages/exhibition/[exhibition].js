import React from 'react'
import { getExhibitions, getImagesByExhibitionId } from '@/services/pbService'
import Layout from '@/components/Layout';
import Art from '@/components/Art';
import Link from 'next/link';

//const ImagesSection = ({ images }) => {
//   return (
//       <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
//           {images.map((e, i) => (
//               <div key={i} className='relative'>
//                   <img src={process.env.NEXT_PUBLIC_POCKETBASE_URL + "/api/files/" + e.collectionId + "/" + e.id + "/" + e.img + "?thumb=300x300"} className='w-full h-full object-cover' />
//                   <div className='absolute top-0 left-0 w-full h-full bg-black opacity-0 hover:opacity-50 transition-opacity duration-200'></div>
//               </div>
//           ))}
//       </div>
//   )
//}

const ImagesSection = ({ images }) => {
    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            {images.map((e, i) => (
                <Art 
                    key={i}
                    path={process.env.NEXT_PUBLIC_POCKETBASE_URL + "/api/files/" + e.collectionId + "/" + e.id + "/" + e.img + "?thumb=300x300"}
                />
            )
            )}
        </div>
    )
}

export default function _Exhibition({ exhibition, images }) {
  return (
    <>
        <Layout title={exhibition.title}/>
        <main className='px-8 py-12'>
            <div className='justify-center flex w-full'>
                <div className='max-w-7xl w-full'>
                    <div className='mb-8 font-quicksand text-zinc-700'>
                        <Link href="/exhibitions">
                            <p className='inline mr-2 text-sm underline hover:text-blue-600'>Exhibitions</p>
                        </Link>
                        <p className='inline mr-2 text-sm'>&gt;</p>
                        <Link href="#">
                            <p className='inline text-sm underline hover:text-blue-600'>{exhibition.title}</p>
                        </Link>
                    </div>
                    <div className='mb-8'>
                        <h1 className='text-2xl inline tracking-wide'>{exhibition.title}</h1>
                        {
                            exhibition.date &&
                                <p className=' text-zinc-800'>{exhibition.date}</p>
                        }
                        {
                            exhibition.description &&
                                <p className='text-zinc-700 font-quicksand mt-6'>{exhibition.description}</p>
                        }
                    </div>
                </div>
            </div>
            <ImagesSection images={images} />
        </main>
    </>
  )
}

export async function getStaticProps(ctx) {

    var { exhibition } = ctx.params; // Exhibition handle

    if(!exhibition) return {
        notFound: true,
        revalidate: 60
    }

    const exhibitions = await getExhibitions();
    exhibition = exhibitions.find(e => e.handle == exhibition); // Exhibition object
    const images = await getImagesByExhibitionId(exhibition.id)
    
    return {
        props: { exhibition, images },
        revalidate: 60
    }

}

export async function getStaticPaths() {
    const exhibitions = await getExhibitions();
    const paths = exhibitions.map((e) => ({
        params: { exhibition: e.handle }
    }))
    return {
        paths,
        fallback: 'blocking'
    }
}