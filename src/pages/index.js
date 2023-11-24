import React from 'react'
import Layout from '@/components/Layout'
import Image from 'next/image'

// Fix on mobile

export default function Home() {

  return(
    <>
      <Layout title={"Home"} />
      <div className='flex justify-center p-4 h-[90vh] items-center'>
        <Image 
          src="/index_images/image1.jpeg"
          alt="Hero"
          width={1000}
          height={400}
        />
      </div>
      <div className='flex justify-center mb-32 px-8 pt-32' id="about">
        <div className='max-w-[1000px]'>
          <p className='text-zinc-800 text-4xl mb-4'>About</p>
          <p className='font-quicksand text-zinc-700 text-justify inline-block first-letter:text-2xl first-letter:text-red-400'>
            Margaux De Pauw is a painter who works with oil on canvas or paper. She paints imaginary landscapes composed from compositions she finds in everyday life. Here, direction and line play are very important. So walking, sketching and taking photos are definitely a crucial part of her creative process. For Margaux, a painting can rarely start without a colour study. For her, colour and space are enormously close. So understanding colours is essential for this. She often starts a painting on the ground. This way, intuition and movement can help determine the composition. While painting, Margaux constantly questions the limitations of her medium: how can you depict a space without adhering to conventions? For Margaux, the creation of a new painting is each time a reinvention of herself and the world. A quest to recreate a landscape in a way that breaks through space. For Margaux, it is important that she can put her fascination with the world onto canvas. Nature and human intervention on nature are Margaux&apos;s greatest sources of inspiration. For her, painting is a way of understanding the world.
          </p>
        </div>
      </div>
      <div className='justify-center flex mb-32 p-4'>
        <Image 
          src="/index_images/image2.jpeg"
          alt="Hero"
          width={400}
          height={400}
        />
      </div>
      <div className='flex justify-center mb-32' id="contact">
        <div className='grid grid-cols-1 sm:grid-cols-2 justify-center max-w-7xl w-full'>
          <div className='px-8 text-end text-zinc-700 font-quicksand flex flex-col justify-between mb-24 sm:mb-0'>
            <p className='text-4xl mb-4 text-zinc-800'>Contact</p>
            <a href="mailto:margauxdepauw@yahoo.com" className='underline underline-offset-1 text-red-400'>margauxdepauw@yahoo.com</a>
            <p>
              0493 79 36 56
            </p>
            <p>
              KASK kunsttoren
            </p>
            <p>
              Offerlaan 5
            </p>
            <p className='mb-4'>
              9000 Gent
            </p>
            <p className='inline mr-2'>
              <i className="fa-brands fa-instagram mr-2"></i>
              INSTRAGRAM: 
            </p>
            <a className='inline text-red-400 underline underline-offset-1' href="https://www.instagram.com/marchieff/" target='_blank' rel='noreferrer'>
              @margaux.depauww
            </a>
          </div>
          <div className='px-4'>
            <Image 
              src="/index_images/image3.jpg"
              alt="Hero"
              width={400}
              height={400}
            />
          </div>
        </div>
      </div>
    </>      
  )
}