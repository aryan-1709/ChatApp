import React from 'react'
import {DashBoard}from './DashBoard'
import MessagingApp from './MessagingApp'
import { useLocation } from "react-router-dom";
export default function FrontPage() {
  const location = useLocation();
  const { name, email } = location.state;
  return (
    <div className='overflow-hidden'>
      <div>
        <DashBoard email={email} name={name}/>
      </div>
      <div className='h-[767px] bg-slate-300 w-full'>
        <MessagingApp />
      </div>
    </div>
  )
}
