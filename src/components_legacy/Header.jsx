import React, { useState, useContext } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import MobileMenu from '@/components/MobileMenu'

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
    
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false) // Mobile menu open state

    return (
        <>
            <nav className='w-56 h-screen p-12 hidden md:block'>
                <div className='fixed'>
                    <ul className='flex flex-col gap-4 text-md'>    
                        <li className='mb-4'>
                            <Link href="/" className='text-2xl font-bold font-mono'>
                                Margaux 
                                <br />
                                De Pauw
                            </Link>
                        </li>
                        <li>
                            <Link href="/" className={`hover:text-zinc-500 ease-in duration-75 ${checkActive("/") && "text-zinc-500"}`}>
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link href="#about" className={`hover:text-zinc-500 ease-in duration-75 ${checkActive("/about") && "text-zinc-500"}`}>
                                About
                            </Link>
                        </li>
                        <li>
                            <Link href="#contact" className={`hover:text-zinc-500 ease-in duration-75 ${checkActive("/contact") && "text-zinc-500"}`}>
                                Contact
                            </Link>
                        </li>
                        <li>
                            <Link href="/exhibitions" className={`hover:text-zinc-500 ease-in duration-75 ${checkActive("/exhibitions") && "text-zinc-500"}`}>
                                Exhibitions
                            </Link>
                        </li>
                        {collections?.map((e, i) => !e.hidden &&
                            <li key={i}>
                                <Link href={`/collection/${e.handle}`} className={`hover:text-zinc-500 ease-in duration-75 ${checkActive(`/collection/${e.handle}`) && "text-zinc-500"}`}>
                                    {e.name}
                                </Link>
                            </li>
                        )}
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