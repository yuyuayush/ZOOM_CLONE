import { SignIn } from '@clerk/nextjs'
import React from 'react'

const SignInPage = () => {
  return (
    <div>
    <div className='w-full h-screen flex items-center justify-center'>
        <SignIn/>
      </div>
    </div>
  )
}

export default SignInPage
