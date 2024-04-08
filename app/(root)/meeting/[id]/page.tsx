"use client"
import React, { useState } from 'react'
import { useUser } from '@clerk/nextjs'
import { useParams } from 'next/navigation';
import { StreamCall, StreamTheme } from '@stream-io/video-react-sdk';
import MeetingSetup from '@/components/MeetingSetup';
import MeetingRoom from '@/components/MeetingRoom';
import { useGetCallById } from '@/hooks/useGetCallById';
import Loader from '@/components/Loader';


const page = ({params}:{params:{id:string}}) => {
  
  const {id} = useParams();
  const {call,isCallLoading} = useGetCallById(id);
  const { isLoaded, user } = useUser();
  const [isSetupComplete, setisSetupComplete] = useState(false);
  if(!isLoaded || isCallLoading)
    return <Loader/>
  return (
    <main className='h-screen w-full'>
      <StreamCall call={call}>
        <StreamTheme>
          {!isSetupComplete ?
         ( <MeetingSetup setIsSetupComplete={setisSetupComplete}/> ):
          (<MeetingRoom/>)
        } 
        </StreamTheme>
      </StreamCall>
      
    </main>
  )
}

export default page
