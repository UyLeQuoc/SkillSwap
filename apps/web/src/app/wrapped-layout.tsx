import React from 'react'
import { ApolloClientProvider } from '@/providers'

const WrappedLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
        <ApolloClientProvider>
            {children}
        </ApolloClientProvider>
    </div>
  )
}

export default WrappedLayout