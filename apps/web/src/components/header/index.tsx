'use client'

import React, { useEffect } from 'react'
import { Logo } from './logo'
import { ConnectButton } from '@mysten/dapp-kit'
import { ModeToggle } from './toggle-theme'
import { ScrollProgress } from '../magicui/scroll-progress'
import { useCurrentWallet } from '@mysten/dapp-kit'
import { useLoginWithWalletMutation, useGetCurrentUserQuery } from '@/graphql/generated/graphql'
import Link from 'next/link'
export const Header = () => {
  const { currentWallet, isConnected } = useCurrentWallet()
  const [loginWithWallet, { loading }] = useLoginWithWalletMutation()
  // const { mutate: signPersonalMessage } = useSignPersonalMessage()
  const { data: userData } = useGetCurrentUserQuery()
  useEffect(() => {
    if (isConnected) {
      loginWithWallet({
        variables: {
          input: {
              wallet: currentWallet.accounts[0].address || '',
              message: "Login access to SkillSwap",
              signature: "Login access to SkillSwap",
          },
        },
        onCompleted: (data) => {
          //set the token in local storage
          console.log(data)
          localStorage.setItem('token', data.loginWithWallet.accessToken)
        },
        onError: (error) => {
          console.error(error)
          localStorage.removeItem('token')
        },
      })
    }else{
      localStorage.removeItem('token')
    }
  }, [isConnected])

  return (
    <div className=' flex justify-between items-center py-4 sticky top-0 z-50 bg-background/5 backdrop-blur-md'>
        <div className='container mx-auto flex justify-between items-center'>
          <div className='flex items-center gap-10'>
            <Logo />
            <nav className='flex items-center gap-5'>
              <Link href="/explore">Explore</Link>
              {
                currentWallet?.accounts[0].address && (
                  <>
                    <Link href={"/wallet/"+ currentWallet?.accounts[0].address}>Your Profile</Link>
                    <Link href="/deal">Your Deals</Link>
                    <Link href="/create-post">Create Post</Link>
                  </>
                )
              }
            </nav>
          </div>
          <div className='flex items-center gap-2'>
              <ModeToggle />
              <ConnectButton />
          </div>
        </div>
        <ScrollProgress className="top-[72px]" />
    </div>
  )
}
