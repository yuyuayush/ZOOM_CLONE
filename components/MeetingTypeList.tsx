'use client';
import Image from 'next/image'
import React, { useState } from 'react'
import HomeCard from './HomeCard'
import { useRouter } from 'next/navigation';
import MeetingModal from './MeetingModal';
import { Textarea } from './ui/textarea';
import ReactDatePicker from "react-datepicker";
import { toast, useToast } from './ui/use-toast';
import { Input } from './ui/input';
import { useUser } from '@clerk/nextjs';
import { Call,useStreamVideoClient } from '@stream-io/video-react-sdk';
import Loader from './Loader';
const initialValues = {
  dateTime: new Date(),
  description: '',
  link: '',
};

const MeetingTypeList = () => {
  const router = useRouter();
  const [callDetail, setCallDetail] = useState<Call>();
  const [meetingState, setMeetingState] = useState("")
  const [values, setValues] = useState(initialValues)
  const user = useUser();
  const client  = useStreamVideoClient();
  const createMeeting = async()=>{
    if(!client || !user) return;
    try {
      if(!values.dateTime){
        toast({title:"please select a date and time"});
        return;
      }
      const id =crypto.randomUUID();
      const call = client.call('default',id);
      if(!call)throw new Error("Failed to create meeting");

      const startsAt = 
        values.dateTime.toISOString() || new Date(Date.now()).toISOString();
        const description = values.description || 'Instant Meeting';
        await call.getOrCreate({
          data:{
            starts_at:startsAt,
            custom:{
              description
            },
          },
        });
        setCallDetail(call);
        if(!values.description){
          router.push(`/meeting/${call.id}`);
        }
        toast({
          title: 'Meeting Created',
        });
    } catch (error) {
      console.error(error);
      toast({ title: 'Failed to create Meeting' });
    }
  }
  if (!client || !user) return <Loader />;
  // const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetail?.id}`;

  return (
    <section className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4'>
   <HomeCard img='icons/add-meeting.svg' title='New Meeting' description='Start an insert meeting' handleClick={()=>setMeetingState('isInstantMeeting')} />
   <HomeCard img='icons/join-meeting.svg' title='Join Meeting' className="bg-blue-1" description='via invitation link' handleClick={()=>setMeetingState('isJoiningMeeting')} />
   <HomeCard img='icons/schedule.svg'  title='Schedule Meeting' className="bg-purple-1" description='Plan your meeting' handleClick={()=>setMeetingState('isScheduleMeeting')} />
   <HomeCard img='icons/recordings.svg'  title="View Recordings" description="Meeting Recordings" className="bg-yellow-1" handleClick={()=>router.push('/recordings')} />
   
   <MeetingModal 
   isOpen = {meetingState==="isInstantMeeting"}
   onClose={()=>setMeetingState('')}
   title="Instant Meeting"
   handleClick ={createMeeting}
   >
    <div className="flex flex-col gap-2.5">
            <label className="text-base font-normal leading-[22.4px] text-sky-2">
              Add a description
            </label>
            <Textarea
              className="border-none bg-dark-3 focus-visible:ring-0 focus-visible:ring-offset-0"
              onChange={(e) =>
                setValues({ ...values, description: e.target.value })
              }
            />
          </div>
          <div className="flex w-full flex-col gap-2.5">
            <label className="text-base font-normal leading-[22.4px] text-sky-2">
              Select Date and Time
            </label>
            <ReactDatePicker
              selected={values.dateTime}
              onChange={(date) => setValues({ ...values, dateTime: date! })}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              timeCaption="time"
              dateFormat="MMMM d, yyyy h:mm aa"
              className="w-full rounded bg-dark-3 p-2 focus:outline-none"
            />
          </div>
        </MeetingModal>
</section>
  )
}

export default MeetingTypeList
