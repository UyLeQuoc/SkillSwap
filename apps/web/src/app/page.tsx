"use client"

import { useCurrentWallet, useSuiClientQuery } from "@mysten/dapp-kit";
import { useExampleQueryQuery } from "../graphql/generated/graphql"
import { Header } from "@/components/header"
export default function Home() {
  const { data, loading, error } = useExampleQueryQuery()
  return (
    <main>
      <Header />
      <div>
        <h1>
          Welcome to the home page
        </h1>
        <MyComponent />
      </div>
    </main>
  );
}

function MyComponent() {
  const { currentWallet, connectionStatus } = useCurrentWallet();
 
	return (
    <div>
      {connectionStatus === 'connected' ? (
				<div>
					<h2>Current wallet:</h2>
					<div>Name: {currentWallet.name}</div>
					<div>
						Accounts:
						<ul>
							{currentWallet.accounts.map((account) => (
								<li key={account.address}>- {account.address}</li>
							))}
						</ul>
					</div>
				</div>
			) : (
				<div>Connection status: {connectionStatus}</div>
			)}
    </div>
  )
}