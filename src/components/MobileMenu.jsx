import React from 'react'
import { slide as Menu } from 'react-burger-menu'
import Link from 'next/link'

export default function MobileMenu({ isOpen, closeMenu, items, collections }) {
  return (
    <Menu styles={styles} isOpen={isOpen} customBurgerIcon={false} right>
      <ul className='text-md'>
        <li className='mb-4 font-quicksand'>
            <Link href="/" className='text-2xl' onClick={() => closeMenu()}>
                Margaux De Pauw
            </Link>
        </li>
        {items.map((item) =>
          item.handle &&
            <li key={item.handle}>
                <Link href={item.handle} className='hover:text-zinc-500 ease-in duration-75 mt-4' onClick={() => closeMenu()}>
                    {item.title}
                </Link>
            </li>
        )}
        {collections?.map((e, i) => !e.hidden &&
            <li key={i}>
                <Link href={`/collection/${e.handle}`} className='hover:text-zinc-500 ease-in duration-7 uppercase mt-4' onClick={() => closeMenu()}>
                    {e.name}
                </Link>
            </li>
        )}
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
    bmOverlay: {
      background: 'rgba(0, 0, 0, 0.3)'
    }
}  