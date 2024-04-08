import Image from 'next/image'
import React from 'react'

const Loader = () => {
  return (
    <div className='h-screen w-screen flex items-center justify-center'>
        <Image
        src="/icons/loading-circle.svg"
        width={50}
        height={50}
        alt='loading...'
        />
      
    </div>
  )
}

export default Loader
