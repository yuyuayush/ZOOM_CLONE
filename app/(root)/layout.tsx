import React,{ReactNode}from 'react'
import { ClerkProvider } from '@clerk/nextjs'
import { StreamVideoProvider } from '@/Provider/StreamClientProvider'

const RootLayout = ({children}:{children:ReactNode}) => {
  return (
  
    <>
    <main>
      <StreamVideoProvider>
    {children}
      </StreamVideoProvider>
    </main>
      
    </>
   
  )
}
export default RootLayout
