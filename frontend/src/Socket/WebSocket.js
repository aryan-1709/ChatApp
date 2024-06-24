import React, { useState, useEffect } from 'react';
import {io} from "socket.io-client"
import { useMemo } from 'react';

const WebSocket = () => {
    const socket = useMemo(() => io("http://localhost:5000"),[]); 
    let m = "";
    const [message, setMessage] = useState("")  ;
    const [id, setid] = useState("")
    const handelSubmit=(e)=>{
        e.preventDefault();
        socket.emit("message", {message, id});
        setMessage("");
        
    }
    useEffect(()=>{
        socket.on("connect", ()=>{
            console.log("connected");
        })
        socket.on("welcome", (event)=>{
            console.log(event);
        })
        socket.on("brodcast", (e)=>{
            console.log(e);
            setid(e);
        })
        socket.on("receive", (m)=>console.log("received", m));
    },[])
    return (
        <div className="App">
          <form onSubmit={handelSubmit} className='bg-black-300'>
            <input type="text" className='bg-black-300' value={message} onChange={e=>setMessage(e.target.value)} />
          </form>
        </div>
      );
};

export default WebSocket;
