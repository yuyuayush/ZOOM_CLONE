import CallList from '@/components/CallList'
import React from 'react'

const page = () => {
  return (
    <div className='flex size-full flex-col gap-10'>
      <h1 className="text-3xl font-bold text-white">recording</h1>
      <CallList type='recordings'/>
    </div>
  )
}

export default page
