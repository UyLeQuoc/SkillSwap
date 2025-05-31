'use client'

import React, { useEffect } from 'react'
import { Logo } from './logo'
import { ConnectButton } from '@mysten/dapp-kit'
import { ModeToggle } from './toggle-theme'
import { ScrollProgress } from '../magicui/scroll-progress'
import { useCurrentWallet } from '@mysten/dapp-kit'
import { useLoginWithWalletMutation } from '@/graphql/generated/graphql'

export const Header = () => {
  const { currentWallet, isConnected } = useCurrentWallet()
  const [loginWithWallet, { loading }] = useLoginWithWalletMutation()
  // const { mutate: signPersonalMessage } = useSignPersonalMessage()

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
        },
      })
    }
  }, [isConnected])

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
