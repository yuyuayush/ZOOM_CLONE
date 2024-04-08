import MeetingTypeList from '@/components/MeetingTypeList';
import React from 'react'

const Home = () => {
  const now = new Date();
  const time = now.toLocaleTimeString('en-US',{hour:'2-digit',minute:'2-digit'});
  const date = (new Intl.DateTimeFormat('en-US', { dateStyle: 'full' })).format(now);

  return (
    <section className='flex size-full flex-col gap-5 text-white ' >
            <div className="bg-hero bg-cover rounded-[20px] h-[303px]">
              <div className="max-md:px-5 max-md:py-8 lg:p-11 flex flex-col justify-between w-full h-full  ">
                  <h1>
                    Meeting time
                  </h1>
                  <div className="flex flex-col gap-2">
                    <h1 className="text-4xl font-extrabold lg:text-7xl">{time}</h1>
                    <p className="text-lg font-medium text-sky-1 lg:text-2xl">{date}</p>
                </div>
              </div>
            </div>
        <MeetingTypeList/>
    </section>
  )
}

export default Home
