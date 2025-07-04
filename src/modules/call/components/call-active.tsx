import { CallControls, SpeakerLayout } from '@stream-io/video-react-sdk'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

interface Props {
    onLeave: () => void,
    meetingName: string 
}

const CallActive = ({
    onLeave,
    meetingName
}: Props) => {
  return (
    <div className='flex flex-col justify-between min-h-screen p-4 text-white'>
      <div className='bg-[#101213] rounded-full p-4 h-full items-center gap-4'>
       <Link href='/' className='flex items-center justify-center p-1 bg-white/10 rounded-full w-fit'>
        <Image src='/logo.svg' width={40} height={40} alt='logo' />
       </Link>
       <h4 className='text-md'>{meetingName}</h4>
      </div>
      <SpeakerLayout />
      <div className='bg-[#101213] rounded-full px-4'>
        <CallControls onLeave={onLeave} />
      </div>
    </div>
  )
}

export default CallActive
