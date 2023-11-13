import React from 'react'
import Layout from 'src/components/Layout'
import Image from 'next/image'

export default function Index({ art }) {
  return (
    <>
      <Layout title={"Home"} />
        <main className='px-8 py-12 pb-32'>
          <div className='max-w-7xl w-full flex justify-end'>
            <Image
              src="/index_images/image1.png"
              width={600}
              height={500}
              alt='image1'
            />
          </div>
          <p className='font-mono text-zinc-800 mt-24'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse at nunc eros. Suspendisse potenti. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nam dictum quam quis sollicitudin venenatis. Mauris at purus lorem. Mauris sapien enim, rutrum quis tempor eget, ultricies quis dolor. Donec ac enim libero. Nam tortor lacus, fermentum ac tellus id, iaculis tempor lacus. Suspendisse mattis ex consequat augue laoreet, at commodo risus faucibus. Cras malesuada neque sit amet dolor molestie, facilisis tempus libero consequat.
          </p>
          <Image
            className='mt-24 lg:ml-12'
            src="/index_images/image2.jpeg"
            width={600}
            height={500}
            alt='image1'
          />
          <p className='font-mono text-zinc-800 pt-32 text-3xl' id="about">
            About
          </p>
          <p className='font-mono text-zinc-800 mt-8'>
            Aenean pellentesque elementum lobortis. Etiam eu risus porttitor, tristique nisl sit amet, efficitur felis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Aliquam efficitur lacinia sapien, vel elementum ipsum pellentesque et. Vivamus vehicula augue eros, non convallis dui commodo condimentum. Etiam sed magna nunc. Ut dapibus, felis ut condimentum consectetur, neque augue dictum enim, at fermentum ligula diam id tortor. Duis ut fringilla ante, et tempor ante. Phasellus commodo lectus augue, eu tempor enim efficitur non. Aenean nec mollis dolor, ut sodales turpis. Pellentesque placerat ut leo sed fermentum. Aenean fringilla viverra magna, et tincidunt justo commodo vehicula. Curabitur blandit a felis nec blandit. Etiam consequat justo quis erat euismod gravida.
          </p>
          <div className='flex justify-center w-full'>
            <Image
                className='mt-24'
                src="/index_images/image3.jpeg"
                width={700}
                height={500}
                alt='image3'
            />
          </div>
          <div className='mt-24 font-mono' id='contact'>
            <p className='mb-12 text-3xl text-zinc-800'>
              Contact
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
        </main>
    </>
  )
}