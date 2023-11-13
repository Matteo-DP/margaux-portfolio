import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function Exhibition({ exhibition }) {
  return (
    <>
      <Link
          href={`/exhibition/${exhibition.handle}`}
      >
          <div className='mb-4'>
            <p className='text-zinc-800 font-mono inline mr-2'>{exhibition.title}</p>
            {
              exhibition.date &&
                <p className='text-zinc-700 text-sm font-mono inline'>{exhibition.date}</p>
            }
          </div>
          <div className='relative'>
            <Image
                src={process.env.NEXT_PUBLIC_POCKETBASE_URL + "/api/files/" + exhibition.collectionId + "/" + exhibition.id + "/" + exhibition.folder + "?thumb=300x300"}
                alt='Exhibition by Margaux De Pauw'
                width={400}
                height={600}
            />
            <div className='absolute top-0 left-0 w-full h-full bg-black opacity-0 group-hover:opacity-50 transition-opacity duration-200'></div>
          </div>
      </Link>
    </>
  )
}