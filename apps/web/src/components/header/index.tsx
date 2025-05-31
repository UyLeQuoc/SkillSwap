'use client'

import React from 'react'
import { Logo } from './logo'
import { ConnectButton } from '@mysten/dapp-kit'
import { ModeToggle } from './toggle-theme'
import { ScrollProgress } from '../magicui/scroll-progress'
export const Header = () => {
  return (
    <div className=' flex justify-between items-center py-4 sticky top-0 z-50 bg-background/5 backdrop-blur-md'>
        <div className='container mx-auto flex justify-between items-center'>
          <Logo />
          <div className='flex items-center gap-2'>
              <ModeToggle />
              <ConnectButton />
          </div>
        </div>
        <ScrollProgress className="top-[72px]" />
    </div>
  )
}
