import React from 'react'

export default function Loading({
    text = "Please connect your wallet to continue"
}: {
    text?: string
}) {
  return (
    <div className="flex justify-center items-center h-screen gap-2">
        <div className="w-10 h-10 border-t-2 border-b-2 border-gray-900 rounded-full animate-spin"></div>
        <p className="ml-3 text-sm text-gray-500">{text}</p>
    </div>
  )
}
