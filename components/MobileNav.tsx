"use client"
import React from 'react'
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
import Image from 'next/image'
import Link from 'next/link'
import { sidebarLinks } from '@/constants'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
  
const MobileNav = () => {
    const pathname = usePathname();

  return (
    <section className='w-full max-w-[264px]'>
     <Sheet>
  <SheetTrigger asChild>
    <Image 
        src="/icons/hamburger.svg"
        alt="hamburger"
        width={36}
        height={36}
        className='cursor-pointer sm:hidden'
    />
  </SheetTrigger>
  <SheetContent side="left" className='bg-dark-1 border-none'>
    <Link href="/" className='flex items-center  gap-2'>
        <Image src="/icons/logo.svg"
        width={32}
        height={32}
        alt="image logo"
        />
        <p className="text-[26px] font-extrabold text-white ">ZOOM</p>
    </Link>
    <div className="text-[26px] flex h-[calc(100vh-72px)] overflow-y-auto justify-between flex-col">
        <SheetClose asChild>
            <section className='h-full flex flex-col gap-6 pt-16 text-white'>
                {sidebarLinks.map((item)=>{
                const isActive = pathname === item.route;
                return (
                    <SheetClose asChild key={item.route}>
                        <Link href={item.route} key={item.label} 
                         className={cn(
                            'flex gap-4 items-center p-4 rounded-lg  w-full max-w-60',
                            {
                              'bg-blue-1': isActive,
                            }
                          )} >
                            <Image
                                src={item.imgURL}
                                alt={item.label}
                                width={20}
                                height={20}
                            />
                            <p className="font-semibold">
                                {item.label}
                            </p>
                        </Link>
                    </SheetClose>
                )
                })}
            </section>
        </SheetClose>
    </div>

  </SheetContent>
</Sheet>

    </section>
  )
}

export default MobileNav
