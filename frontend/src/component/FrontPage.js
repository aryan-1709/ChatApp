import React from 'react'
import {DashBoard}from './DashBoard'
import MessagingApp from './MessagingApp'
export default function FrontPage() {
  return (
    <div className='overflow-hidden'>
      <div>
        <DashBoard />
      </div>
      <div className='h-[767px] bg-slate-300 w-full'>
        <MessagingApp />
      </div>
    </div>
  )
}
