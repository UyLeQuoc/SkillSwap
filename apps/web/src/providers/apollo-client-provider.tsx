'use client';

import client from '@/graphql/apollo-client';
import { ApolloProvider } from '@apollo/client';
import React from 'react';


export const ApolloClientProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}