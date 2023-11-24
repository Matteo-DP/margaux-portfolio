import React, { useState } from 'react'
import Image from 'next/image'


export default function Art({ path, title, compact = false}) {
  
  const [open, setOpen] = useState(false);
  const ShowImage = () => {
    return (
      <div className='fixed top-0 left-0 w-full h-full z-20'>
        <div className='m-4 bg-zinc-50 shadow-sm flex items-center justify-center relative h-full'>
          <button className='absolute text-zinc-800 top-0 right-0 p-4' onClick={() => setOpen(false)}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="#000000" width="40px" height="40px" viewBox="0 0 256 256" id="Flat">
              <path d="M202.82861,197.17188a3.99991,3.99991,0,1,1-5.65722,5.65624L128,133.65723,58.82861,202.82812a3.99991,3.99991,0,0,1-5.65722-5.65624L122.343,128,53.17139,58.82812a3.99991,3.99991,0,0,1,5.65722-5.65624L128,122.34277l69.17139-69.17089a3.99991,3.99991,0,0,1,5.65722,5.65624L133.657,128Z"/>
            </svg>
          </button>
          <Image
            src={path}
            alt='Art by Margaux De Pauw'
            width={500}
            height={500}
            placeholder="blur"
            blurDataURL={`/_next/image?url=${path}&w=1&q=1`}
            />
        </div>
      </div>
    )
  }
  
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
        <p className='mb-8 text-zinc-800 text-center font-quicksand'>{title}</p>
      }
      <button onClick={() => setOpen(true)}>
        <Image
          src={path}
          alt='Art by Margaux De Pauw'
          width={600}
          height={600}
          placeholder="blur"
          blurDataURL={`/_next/image?url=${path}&w=1&q=1`}
        />
      </button>
      {open &&
        <ShowImage />
      }
    </div>
  )
}
