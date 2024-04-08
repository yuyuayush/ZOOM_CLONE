import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import MobileNav from './MobileNav'
import { SignedIn, UserButton } from '@clerk/nextjs'

const Navbar = () => {
  return (
    <nav className='flex justify-between items-center w-full py-4 lg:px-10 px-6 bg-dark-1'>
        <Link href="/" className='flex items-center gap-1 '>
        <Image src="/icons/logo.svg" alt="icon" width={32} height={32}
        />
        <p className="text-[26px] font-extrabold sm:flex hidden text-white ">
            YOOM
        </p>
        </Link>

        <div className="flex-between gap-1">
        <SignedIn>
          <UserButton afterSignOutUrl="/sign-in" />
        </SignedIn>
        <MobileNav/>
        </div>



      
    </nav>
  )
}

export default Navbar
