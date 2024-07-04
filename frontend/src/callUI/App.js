import React , { useEffect, useRef, useState } from 'react';
import Peer from 'simple-peer';
import {CopyToClipboard} from "react-copy-to-clipboard";
import io from "socket.io-client";

const socket = io.connect("http://localhost:5000");

export const App = () => {
    const [me, setme] = useState("");
    const [stream, setstream] = useState();
    const [receiveCall, setReceiveCall] = useState(false);
    const [caller, setCaller] = useState("");
    const [callerSignal, setCallerSignal] = useState();
    const [callAccepted, setCallAccepted] = useState(false);
    const [idToCall, setIdToCall] = useState("");
    const [callEnded, setCallEnded] = useState(false);
    const [name, setname] = useState("");
    const [msg, setmsg] = useState("Copy to clipboard");
    const myvideo = useRef();   
    const userVideo = useRef();
    const connectionRef = useRef();
    
    useEffect(() => {
        socket.on("me", (id) => {
            console.log("Connected", id);
            setme(id);
        });

        socket.on("callUser", (data) => {
            console.log("Call received");
            setReceiveCall(true);
            setCaller(data.from);
            setname(data.name);
            setCallerSignal(data.signal);
        });
    })

    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ video: true , audio: false}).then((stream) => {
            setstream(stream);
            if(myvideo.current)
                myvideo.current.srcObject = stream;
        });
    },[me]);
    
    const calluser = (id) => {
        const peer = new Peer({
            initiator:true,
            trickle:false,
            stream:stream
        })

        peer.on("signal", (data) => {
            console.log("Calling user");
            console.log({userToCall: id,
                signalData: data,
                from: me,
                name: name})
            socket.emit("callUser", {
                userToCall: id,
                signalData: data,
                from: me,
                name: name
            })
        })

        peer.on("stream", (stream) => {
            userVideo.current.srcObject = stream;
        })

        socket.on("callAccepted", (signal) => {
            setCallAccepted(true);
            peer.signal(signal);
        })

        connectionRef.current = peer;
    }

    const answerCall = () => {
        setCallAccepted(true);
        const peer = new Peer({
            initiator:false,
            trickle:false,
            stream:stream
        })

        peer.on("signal", (data) => {
            socket.emit("answerCall", {signal: data, to: caller})
        })

        peer.on("stream", (stream) => {
            userVideo.current.srcObject = stream;
        })

        peer.signal(callerSignal);
        connectionRef.current = peer;
    }   

    const leaveCall = () => {
        setCallEnded(true);
        connectionRef.current.destroy();
    }


    return (
        <>
            <h1> Zoomish </h1>
            <div className='container'>
                <div className='video-container'>
                    <div className='video'>
                        {stream && <video playsInline muted ref={myvideo} autoPlay className='w-[300px]'/>}
                    </div>
                    <div className='video'>
                        {callAccepted && !callEnded ? 
                        <video playsInline muted ref={userVideo} autoPlay className='w-[300px]'/>:
                        null}
                    </div>
                </div>
                <div className='myId'>
                    <input
                        id='filled-basic'
                        label="Name"
                        value={name}
                        onChange={(e) => setname(e.target.value)}
                        className='mb-[20px]'
                        placeholder='Input Name'
                    />
                    <CopyToClipboard text={me} >
                        <button onClick={()=>setmsg("Copied to clipboard")}>{msg}</button>
                    </CopyToClipboard>
                    <input 
                    id='filled-basic' 
                    label="ID to Call"
                    value={idToCall}
                    className='bg-slate-600S'
                    onChange={(e)=>setIdToCall(e.target.value)}
                    placeholder='input ID'/>

                    <div className='call-button bg-black text-gray-100'>
                        {callAccepted && !callEnded?(
                            <button className='hover:cursor-pointer' onClick={leaveCall}>End Call</button>
                        ) : (
                            <button className="hover:cursor-pointer" onClick={()=>calluser(idToCall)}>Call Now</button>
                        )}
                        {idToCall}
                    </div>
                </div>
                <div>
                    {receiveCall && !callAccepted ?(
                        <div className='caller' >
                            <h1>{name} is calling...</h1>
                            <button onClick={answerCall}>Answer</button>
                        </div>
                    ):null}
                </div>
            </div>
        </>
    )
}
