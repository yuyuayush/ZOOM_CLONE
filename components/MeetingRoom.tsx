import { cn } from '@/lib/utils';
import { CallControls, CallParticipantsList, CallStatsButton, CallingState, PaginatedGridLayout, SpeakerLayout, useCall, useCallStateHooks } from '@stream-io/video-react-sdk';
import React, { useState } from 'react'
type CallLayoutType = 'grid' | 'speaker-left' | 'speaker-right';
import { useRouter, useSearchParams } from 'next/navigation';
import { DropdownMenu, DropdownMenuTrigger } from './ui/dropdown-menu';
import { LayoutList, Users } from 'lucide-react';
import { DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from '@radix-ui/react-dropdown-menu';
import EndCallButton from './EndCallButton';
import Loader from './Loader';

const MeetingRoom = () => {
  const searchParams = useSearchParams();
  const isPersonalRoom = !!searchParams.get('personal');
  const router =useRouter();
  const [layout, setlayout] = useState<CallLayoutType>('speaker-left');
  const [showParticipants, setShowParticipants] = useState(false);
  const {useCallCallingState} = useCallStateHooks();
    const callingState = useCallCallingState();
    if(callingState !== CallingState.JOINED)return <Loader/>
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
          <div className="flex items-center">
        <DropdownMenuTrigger>
            <LayoutList size={20} className='text-white'/>
        </DropdownMenuTrigger>
          </div>
          <DropdownMenuContent className='border-dark-1 text-white bg-dark-1 text-sm p-2 '>
            {['Grid',"Speaker-Left","Speaker-Right"].map((item,i)=>(
              <div key={i} >
              <DropdownMenuItem className='px-3 cursor-pointer hover:bg-white rounded-sm hover:text-black  ' 
              onClick={()=>setlayout(item.toLowerCase() as CallLayoutType)  }
              >
                {item}
              </DropdownMenuItem>
              <DropdownMenuSeparator className='border-white '/>
              </div>
            ))
            }

          </DropdownMenuContent>
        </DropdownMenu>
        <CallStatsButton/>
        <button onClick={()=>setShowParticipants((prev)=>!prev)}>
          <div className="cursor-pointer rounded-2xl bg-[#19232d]">
          <Users size={20} className='text-white'/>
          </div>
        </button>
        {!isPersonalRoom && <EndCallButton/>}
      </div>
    </section>
  )
}

export default MeetingRoom

