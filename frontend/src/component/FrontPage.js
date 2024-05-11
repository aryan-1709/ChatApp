import React from 'react'
import {DashBoard, responseData }from '../DashBoard'
import Chats from './Chats'
import Dropdown from '../Dropdown'
import Box from '../box'
export default function FrontPage() {
  // console.log("responceData", responseData);
  return (
    <div className='overflow-hidden'>
      {/* <Box width="120vh" height="100vh" backgroundColor="white" className="flex items-center"></Box> */}
        <div>
            <DashBoard />
        </div>
        <div className='h-[767px] bg-slate-300 '>
            <Chats />
        </div>
        
        
    </div>
  )
}
