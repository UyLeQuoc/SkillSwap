"use client"

import { Header } from "@/components/header"
import Loading from "@/components/loading"
import { useCurrentAccount } from "@mysten/dapp-kit"
import React from 'react'

export default function CreatePostPage() {
   const currentAccount = useCurrentAccount()


  return (
    <div>
        <Header />
        <main className="container mx-auto">
            {
                currentAccount ? (
                    <div>
                        <h1>Create Post</h1>
                    </div>
                ) : (
                    <Loading />
                )
            }
        </main>
    </div>
  )
}
