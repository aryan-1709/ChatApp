import React, { useState, useEffect } from "react";
import {io} from "socket.io-client"
import { useMemo } from 'react';
import useSocket from "../Socket/Socket";
function Message({ selectedPerson, sender }) {
  console.log(selectedPerson);
  console.log(sender);
  const message="dav", time="ssfsf", images = [], messageType = "sent"; 
  return (
    <div
      className={`flex flex-col ${
        messageType === "sent" ? "items-end" : "items-start"
      } px-5`}
    >
      {images.length > 0 && (
        <div className="flex gap-3 pr-9">
          {images.map((imgSrc, index) => (
            <img
              key={index}
              loading="lazy"
              src={imgSrc}
              alt=""
              className="shrink-0 w-28 max-w-full aspect-[0.93]"
            />
          ))}
        </div>
      )}
      <div
        className={`px-3 py-2 mt-2 text-base font-medium tracking-tight leading-5 text-white rounded-none shadow-sm ${
          messageType === "sent" ? "bg-slate-700" : "bg-slate-950"
        }`}
      >
        {message}
      </div>
      <time className="mt-2.5 text-xs tracking-normal whitespace-nowrap text-neutral-500">
        {time}
      </time>
    </div>
  );
}

function ChatApp(props) {
  console.log("props", props);
  // const socket = useMemo(()=>io("http://localhost:5000"), []);  
  const socket = useSocket();

  const [list, setList] = useState([]);
  // const getData = async () => {
  //   socket.on("get", (res) =>{
  //     console.log("res", res);
  //     setList([...list, ...res]);
  //   })
  // };
  useEffect(() => {
    socket.on("get", (res) =>{
      console.log("res", res);
      setList([...list, ...res]);
    })
  }, []);


  const [msg, setMsg] = useState("");

  const updateMsg = (event) => {
    setMsg(event.target.value);
  };

  const [messages, setMessages] = useState([]);
  const [result, setresult] = useState()
  if(result){
    console.log("result", result);
  }


  useEffect(() => {
    // socket.on("get", (res) => {
      // setresult(res);
      const i = list.findIndex((obj) => obj.name === props.person.name);
      console.log(props.person.name,"i  ",i);
      console.log(list[i]);
  },[props]);

  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();

  const currentTime = `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}`;

  const updateMessage = (event) => {
    socket.on("auth", (res)=>{console.log("receive",res.user)})
    event.preventDefault();
    if (msg.trim() !== "") {
      console.log("name",props)
      const newItem = {
        sender: props.person.name,
        msg: msg,
        time: `Today ${currentTime}`,
        msgType: "sent",
      };
      console.log("props",props)
      const sendData = async () => {
        socket.emit("msg", newItem)
      };
      sendData();

      setMessages([...messages, newItem]);
      setMsg(""); // Clear the input field after adding the message
    }
  };

  return (
    <div className="h-full overflow-hidden bg-gradient-to-r from-slate-200 to-slate-300 border-t-0 border-b-0 border-l-0 border-slate-500 border-r-2 ">
      <div className="h-[710px] min-w-[750px] max-w-[750px] p-2 overflow-auto">
        <div className="flex gap-5 flex-col md:flex-row">
          <div className="flex flex-col w-full">
            <div className="flex flex-col grow">
              {messages.map((msg, index) => (
                <Message key={index} {...msg} />
              ))}
            </div>
            <div className="flex-grow"></div>
          </div>
        </div>
      </div>
      <div className="flex-grow "></div>
      <div className="px-3 sticky bottom-8 aspect-w-1 aspect-h-3 shadow-[2px_50px_80px_-16px_rgba(0,0,0,0.3)] shadow-black h-[50px]">
        <form
          className=" h-full w-full rounded-full border-black"
          style={{
            border: "3px solid black",
            marginBottom: "env(safe-area-inset-bottom)",
          }}
          onSubmit={updateMessage}
        >
          <input
            className="pl-3 h-full w-full rounded-full focus:outline-none "
            type="text"
            placeholder="Write a message"
            value={msg}
            onChange={updateMsg}
          />
        </form>
      </div>
    </div>
  );
}

export default ChatApp;
