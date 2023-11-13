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
    <div className='relative'>
      {title &&
        <p className='mb-8 text-zinc-700 text-sm font-mono'>{title}</p>
      }
      <Image
          src={path}
          alt='Art by Margaux De Pauw'
          width={650}
          height={600}
      />
    </div>
  )
}
