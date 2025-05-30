"use client"

import { useExampleQueryQuery } from "../graphql/generated/graphql"

export default function Home() {
  const { data, loading, error } = useExampleQueryQuery()
  return (
    <div>
      asdasadsd
      {
        data?.findAll.map((user) => (
          <div key={user.id}>
            <h1>{user.name}</h1>
            <p>{user.email}</p>
          </div>
        ))
      }
    </div>
  );
}
