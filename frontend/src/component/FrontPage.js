import React from 'react'
import DashBoard from '../DashBoard'
import Chats from './Chats'
export default function FrontPage() {
  return (
    <div className='overflow-hidden'>
        <div>
            <DashBoard />
        </div>
        <div className='h-[767px] bg-slate-300 overflow-hidden'>
            <Chats />
        </div>
        
        
    </div>
  )
}
