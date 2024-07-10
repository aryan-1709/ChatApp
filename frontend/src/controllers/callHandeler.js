import React , { useEffect, useRef, useState } from 'react';
import Peer from 'simple-peer';
import {CopyToClipboard} from "react-copy-to-clipboard";


const callHandeler = ({}) => {
    const [stream, setstream] = useState();
    const [receiveCall, setReceiveCall] = useState(false);
    const [caller, setCaller] = useState("");
    const [callerSignal, setCallerSignal] = useState();
    const [callAccepted, setCallAccepted] = useState(false);
    const [callEnded, setCallEnded] = useState(false);
    const myvideo = useRef();
    const userVideo = useRef();
    const connectionRef = useRef();

    useEffect(() => {
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
    },[]);
    
    const calluser = (id) => {
        const peer = new Peer({
            initiator:true,
            trickle:false,
            stream:stream
        })

        peer.on("signal", (data) => {
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
}

module.exports = {callHandeler,};