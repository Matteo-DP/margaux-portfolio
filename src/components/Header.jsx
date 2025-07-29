import React, { useState, useEffect, useContext } from 'react'
import Link  from 'next/link'
import MobileMenu from '@/components/MobileMenu'
import { CollectionsContext } from '@/pages/_app'

const items = 
[
    {
        title: 'HOME',
        handle: '/'
    },
    {
        title: 'ABOUT',
        handle: '/#about'
    },
    {
        title: 'CONTACT',
        handle: '/#contact'
    },
    {
        title: 'WORKS',
        handle: undefined
    },
    {
        title: 'EXHIBITIONS',
        handle: '/exhibitions'
    }
]

const NavItem = ({item, collections}) => {

    if(item.handle === undefined) return (
        <div className='text-zinc-500 tracking-wide relative group cursor-pointer hover:text-red-400 transition-colors duration-300 font-quicksand'>
            {item.title}
            <WorksMenu collections={collections} />
        </div>
    )

    return (
        <div className='text-zinc-500 tracking-wider hover:text-red-400 transition-colors duration-300 font-quicksand'>
            <Link href={item.handle} key={item.handle}>
                {item.title}
            </Link>
        </div>
    )
}

const WorksMenu = ({ collections }) => {
    if(collections) return (
        <div>
            <div className={`z-10 absolute top-8 -left-10 w-max invisible group-hover:visible bg-zinc-50 shadow-sm h-auto max-h-0 group-hover:max-h-[1000px] group-hover:max-h transition-all ease-in duration-500 overflow-hidden`}>
                <div className='flex flex-col gap-4 px-8 py-4 uppercase tracking-wider text-zinc-700'>
                    {collections.map((c) =>
                        c.hidden ? null :
                            <Link href={`/collection/${c.handle}`} key={c.handle} className='hover:text-red-400 duration-300 transition-colors'>
                                {c.name}
                            </Link>
                    )}
                </div>
            </div>
        </div>
    )
}

export default function Header() {

    const collections = useContext(CollectionsContext);

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false) // Mobile menu open state
    
    return (
        <>
            <div className='w-full fixed z-10 bg-zinc-100 hidden md:block'>
                <div className='flex flex-row justify-center px-8 py-6'>
                    <nav className='max-w-7xl flex flex-row gap-8 items-baseline'>
                        {items.map((item) =>
                            <NavItem item={item} key={item.handle} collections={collections} />
                        )}
                        <p className='text-2xl'>
                            <Link href="/">
                                Margaux De Pauw
                            </Link>
                        </p>
                    </nav>
                </div>
            </div>

            <MobileMenu isOpen={mobileMenuOpen} closeMenu={() => setMobileMenuOpen(false)} items={items} collections={collections} />
            <nav className='fixed md:hidden w-full py-6 px-8 z-10 bg-zinc-100'>
                <ul className='flex flex-row justify-between gap-4'>
                    <Link href="/" className='text-2xl'>
                        Margaux De Pauw
                    </Link>
                    {/* Mobile menu icon */}
                    <li className='block md:hidden'>
                        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-zinc-900">
                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 50 50">
                            <path d="M 0 9 L 0 11 L 50 11 L 50 9 Z M 0 24 L 0 26 L 50 26 L 50 24 Z M 0 39 L 0 41 L 50 41 L 50 39 Z"></path>
                            </svg>
                        </button>
                    </li>
                </ul>
            </nav>
        </>
    )
}