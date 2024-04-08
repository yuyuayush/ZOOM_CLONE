"use client"

import React, { ReactNode } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import Image from 'next/image';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
    interface MeetingModalProps{
        isOpen: boolean;
        onClose: () => void;
        title: string;
        className?: string;
        children?: ReactNode;
        handleClick?: () => void;
        buttonText?: string;
        instantMeeting?: boolean;
        image?: string;
        buttonClassName?: string;
        buttonIcon?: string;
    } 
const MeetingModal = ({
    isOpen,onClose,title,className,children,handleClick,
    buttonText,instantMeeting,image,buttonClassName,buttonIcon}:MeetingModalProps
) => {
  return (
    <div>
     <Dialog open={isOpen} onOpenChange={onClose}>
     <DialogContent className='flex w-full max-w-[590px] flex-col gap-6 text-white py-9 px-6  bg-dark-1 border-none   ' >
        <div className="">
            {image && (
                <div className="">
                    <Image src={image} alt="checked" width={72} height={72}/>
                </div>
            )}
                <h1 className={cn("text-3xl font-bold leading-[42px]", className)}>
            {title}
                </h1>    
          {children}
          <Button onClick={handleClick} className={"w-full mt-3   bg-blue-1 focus-visible::ring-0 focus-visible:ring-offset-0"}>
          {buttonIcon && (
              <Image
                src={buttonIcon}
                alt="button icon"
                width={13}
                height={13}
              />
            )}{" "}
            &nbsp;
            {buttonText || "Schedule Meeting"}
          </Button>
              </div>
  </DialogContent>
</Dialog>

    </div>
  )
}

export default MeetingModal
