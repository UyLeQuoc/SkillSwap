'use client'

import React from 'react'
import { ApolloClientProvider } from '@/providers'
import { createNetworkConfig, SuiClientProvider, WalletProvider } from '@mysten/dapp-kit';
import { getFullnodeUrl } from '@mysten/sui/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '@mysten/dapp-kit/dist/index.css';
import { ThemeProvider } from '@/providers/theme-provider';

const { networkConfig } = createNetworkConfig({
	testnet: { url: getFullnodeUrl('testnet') },
});
const queryClient = new QueryClient();

const WrappedLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
          <ApolloClientProvider>
            <QueryClientProvider client={queryClient}>
              <SuiClientProvider networks={networkConfig} defaultNetwork="testnet">
                <WalletProvider>
                    {children}
                </WalletProvider>
              </SuiClientProvider>
            </QueryClientProvider>
          </ApolloClientProvider>
        </ThemeProvider>
    </div>
  )
}

export default WrappedLayout