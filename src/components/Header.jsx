import React, { useState, useContext } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import MobileMenu from 'src/components/MobileMenu'

export default function Header({ collections }) {

    const router = useRouter()
    const slug = router.query.collection
    const checkActive = (check) => {
        if(slug) {
            return check == `/collection/${slug}`
        } else {
            return router.pathname == check
        }
    }

    const activeString = 'underline underline-offset-2'
    const hoverString = 'underline'
    
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false) // Mobile menu open state

    return (
        <>
            <nav className='w-56 h-screen p-12 hidden md:block text-lg text-zinc-800'>
                <div className='fixed'>
                    <ul className='flex flex-col gap-3 text-md text-end'>    
                        <li className='mb-4 text-black'>
                            <Link href="/" className='text-3xl font-bold font-mono uppercase'>
                                Margaux 
                                <br />
                                De Pauw
                            </Link>
                        </li>
                        <li>
                            <Link href="/" className={`hover:${hoverString} ease-in duration-75 ${checkActive("/") && activeString}`}>
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link href="/about" className={`hover:${hoverString} ease-in duration-75 ${checkActive("/about") && activeString}`}>
                                About
                            </Link>
                        </li>
                        <li>
                            <Link href="/contact" className={`hover:${hoverString} ease-in duration-75 ${checkActive("/contact") && activeString}`}>
                                Contact
                            </Link>
                        </li>
                        <ul className='flex flex-col gap-3 mt-4'>
                            {collections?.map((e, i) => !e.hidden &&
                                <li key={i}>
                                    <Link href={`/collection/${e.handle}`} className={`hover:${hoverString} ease-in duration-75 ${checkActive(`/collection/${e.handle}`) && activeString}`}>
                                        {e.name}
                                    </Link>
                                </li>
                            )}
                        </ul>
                    </ul>
                </div>
            </nav>

            <MobileMenu isOpen={mobileMenuOpen} closeMenu={() => setMobileMenuOpen(false)} checkActive={checkActive} collections={collections} />
            <nav className='fixed md:hidden w-full py-6 px-8'>
                <ul className='flex flex-row justify-between gap-4'>
                    <Link href="/" className='text-xl font-bold font-mono'>
                        Margaux De Pauw
                    </Link>
                    {/* Mobile menu icon */}
                    <li className='block md:hidden'>
                        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                            <i className="fa-solid fa-bars fa-2xl"></i>
                        </button>
                    </li>
                </ul>
            </nav>
        </>
    )
}