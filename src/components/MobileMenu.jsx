import React from 'react'
import { slide as Menu } from 'react-burger-menu'
import Link from 'next/link'

export default function MobileMenu({ isOpen, closeMenu, checkActive, collections }) {
  return (
    <Menu styles={styles} isOpen={isOpen} customBurgerIcon={false} right>
      <ul className='flex flex-col gap-4 text-md'>
        <li className='mb-4'>
            <Link href="/" className='text-2xl font-bold font-mono' onClick={() => closeMenu()}>
                Margaux 
                <br />
                De Pauw
            </Link>
        </li>
        <li>
            <Link href="/" className={`hover:text-zinc-500 ease-in duration-75 ${checkActive("/") && "text-zinc-500"}`} onClick={() => closeMenu()}>
                Home
            </Link>
        </li>
        <li>
            <Link href="/about" className={`hover:text-zinc-500 ease-in duration-75 ${checkActive("/about") && "text-zinc-500"}`} onClick={() => closeMenu()}>
                About
            </Link>
        </li>
        <li>
            <Link href="/contact" className={`hover:text-zinc-500 ease-in duration-75 ${checkActive("/contact") && "text-zinc-500"}`} onClick={() => closeMenu()}>
                Contact
            </Link>
        </li>
        <ul className='flex flex-col gap-2 mt-4'>
            {collections?.map((e, i) => !e.hidden &&
                <li key={i}>
                    <Link href={`/collection/${e.handle}`} className={`hover:text-zinc-500 ease-in duration-75 ${checkActive(`/collection/${e.handle}`) && "text-zinc-500"}`} onClick={() => closeMenu()}>
                        {e.name}
                    </Link>
                </li>
            )}
        </ul>
      </ul>
    </Menu>
  )
}

var styles = {
    bmBurgerButton: {
        position: 'fixed',
        width: '36px',
        height: '30px',
        left: '36px',
        top: '36px'
    },
    bmBurgerBars: {
      background: '#373a47'
    },
    bmBurgerBarsHover: {
      background: '#a90000'
    },
    bmCrossButton: {
      height: '36px',
      width: '36px',
    },
    bmCross: {
      background: '#000000'
    },
    bmMenuWrap: {
      position: 'fixed',
      height: '100%'
    },
    bmMenu: {
      background: '#fff',
      padding: '2.5em 1.5em 0',
      fontSize: '1.15em'
    },
    bmMorphShape: {
      fill: '#373a47'
    },
    bmItemList: {
        padding: '0.8em',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75em'
    },
    bmItem: {
      display: 'inline-block'
    },
    bmOverlay: {
      background: 'rgba(0, 0, 0, 0.3)'
    }
}  