import React, { useState, useEffect } from "react";
import axios from "axios"

function Message({ message, time, images = [], messageType }) {
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
  // console.log(props.person.name);
  const [msg, setMsg] = useState("");
  const updateMsg=(event)=>{
    setMsg(event.target.value);
  };
  const [messages, setMessages] = useState([]); 
  // const [initialMessages, setInitialMessages] = useState([]);
  let tempMessages = [];

  const getData = async () => {
    let res = await axios.get("http://localhost:5000/get");
    res = res.data
    const i =  res.findIndex(obj => obj.name === props.person.name);
    console.log(props.person.name)
    
    console.log(res[i].message)
    if(res[i].message.length > 0){
    for(let j = 0; j<res[i].message[0][0].msgs.length; j++){
      tempMessages.push(res[i].message[0][0].msgs[j]);
    }}

    setMessages(tempMessages);
    setMsg("");
  
    
  };
  useEffect(() => {
    getData();
  }, [props]);

  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();

  const currentTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  
  
  const updateMessage = (event) => {
    event.preventDefault();
    if (msg.trim() !== "") {
      console.log(props.person)
      const newItem = { id:"my_custom_id", name:props.person.name, status:props.person.status, message: msg, time: `Today ${currentTime}`, messageType: "sent" };
      const sendData = async()=>{
        const response = await axios.post('http://localhost:5000/api/data', newItem);
        console.log('Data sent successfully:', response.data);
      }
      
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
            {/* Add an empty div to occupy the remaining space */}
            <div className="flex-grow"></div>
          </div>
        </div>
      </div>
      <div className="flex-grow "></div>
      <form className="sticky bottom-1 max-w-[700px] rounded-full" style={{border: '3px solid black', marginBottom: 'env(safe-area-inset-bottom)'}} onSubmit={updateMessage}>
        <input className="pl-3 w-full rounded-full h-9" type="text" placeholder="Write a message" value={msg} onChange={updateMsg} />
      </form>
    </div>
  );
}

export default ChatApp;
