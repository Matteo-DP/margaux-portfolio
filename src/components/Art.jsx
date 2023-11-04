import React from 'react'
import Image from 'next/image'

export default function Art({ path, title, compact = false}) {
  
  if(compact) {
    return(
      <Image 
        src={path}
        alt='Art by Margaux De Pauw'
        width={400}
        height={600}
      />
    )
  }

  return (
    <div className='inline-block max-w-[800px] h-auto'>
        <p className='mb-8 text-zinc-700 text-md font-mono inline-block'>{title}</p>
        <Image 
            src={path}
            alt='Art by Margaux De Pauw'
            width={800}
            height={600}
        />
    </div>
  )
}
