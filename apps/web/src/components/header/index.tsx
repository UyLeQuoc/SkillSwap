'use client'

import React from 'react'
import { Logo } from './logo'
import { ConnectButton } from '@mysten/dapp-kit'
import { ModeToggle } from './toggle-theme'
export const Header = () => {
  return (
    <div className='container mx-auto flex justify-between items-center py-4'>
        <Logo />
        <div className='flex items-center gap-2'>
            <ModeToggle />
            <ConnectButton />
        </div>
    </div>
  )
}
