import React from 'react'
import Layout from '@/components/Layout'

export default function Contact() {
  return (
    <>
      <Layout title={"Contact"} />
      <div className='px-8 py-12 font-mono'>
          <p className='mb-4 text-2xl font-semibold'>
            contact
          </p>
          <a href="mailto:margauxdepauw@yahoo.com" className='underline underline-offset-1 text-orange-500'>margauxdepauw@yahoo.com</a>
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
            <i class="fa-brands fa-instagram mr-2"></i>
            INSTRAGRAM: 
          </p>
          <a className='inline text-orange-500 underline underline-offset-1' href="https://www.instagram.com/marchieff/" target='_blank' rel='noreferrer'>
            @marchieff
          </a>
      </div>
    </>
  )
}
