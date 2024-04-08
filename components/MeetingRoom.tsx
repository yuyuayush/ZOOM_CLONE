import { cn } from '@/lib/utils';
import { CallControls, CallParticipantsList, PaginatedGridLayout, SpeakerLayout } from '@stream-io/video-react-sdk';
import React, { useState } from 'react'
type CallLayoutType = 'grid' | 'speaker-left' | 'speaker-right';
import { useRouter, useSearchParams } from 'next/navigation';
import { DropdownMenu, DropdownMenuTrigger } from './ui/dropdown-menu';

const MeetingRoom = () => {
  const router =useRouter();
  const [layout, setlayout] = useState<CallLayoutType>('speaker-left');
  const [showParticipants, setShowParticipants] = useState(false);
  const CallLayout = ()=>{
    switch (layout) {
      case 'grid':
      return <PaginatedGridLayout/>
      case 'speaker-left':
        return <SpeakerLayout participantsBarPosition="left"/>
        default:
        return <SpeakerLayout participantsBarPosition="right"/>
        
    }
  } 
  return (
    <section className='relative h-screen w-full overflow-hidden pt-4 text-white'>
      <div className="relative flex size-full items-center justify-center ">
        <div className="flex size-full max-w-[1000px] items-center ">
         <CallLayout/>
        </div>
      <div className={cn('h-[calc(100vh-86px)] hidden ml-2',{
        'show-block':showParticipants,
            })}>

          <CallParticipantsList onClose={()=>setShowParticipants(false)}/>
      </div>
      </div>
      <div className="fixed bottom-0 flex w-full items-center justify-center gap-3 ">
        <CallControls onLeave={()=>router.push('/')}/>
        <DropdownMenu>
        <DropdownMenuTrigger/>
        </DropdownMenu>
      </div>
    </section>
  )
}

export default MeetingRoom

