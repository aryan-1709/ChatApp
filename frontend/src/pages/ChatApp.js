import React, { useState, useEffect } from "react";
import useSocket from "../Socket/Socket";
function Message(msgs) {
  console.log(msgs);
  return (
    <div
      className={`flex flex-col ${
        msgs.msgType === "sent" ? "items-end" : "items-start"
      } px-5`}
    >
      {/* {msgs.images.length > 0 && (
        <div className="flex gap-3 pr-9">
          {msgs.images.map((imgSrc, index) => (
            <img
              key={index}
              loading="lazy"
              src={imgSrc}
              alt=""
              className="shrink-0 w-28 max-w-full aspect-[0.93]"
            />
          ))}
        </div>
      )} */}
      <div
        className={`px-3 py-2 mt-2 text-base font-medium tracking-tight leading-5 text-white rounded-none shadow-sm ${
          msgs.msgType === "sent" ? "bg-slate-700" : "bg-slate-950"
        }`}
      >
        {msgs.msg}
      </div>
      <time className="mt-2.5 text-xs tracking-normal whitespace-nowrap text-neutral-500">
        {msgs.time}
      </time>
    </div>
  );
}

function ChatApp(props) {
  console.log("props", props); 
  const socket = useSocket();
  const [list, setList] = useState([]);
  useEffect(() => {
    socket.on("get", (res) =>{
      console.log("res", res);
      setList([...list, ...res]);
    })
  });
  

  const [msg, setMsg] = useState("");

  const updateMsg = (event) => {
    setMsg(event.target.value);
  };

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // const msgList = props.selectedPerson.conversations.filter(item => item. .toString() !== props.sender._id.toString());
    const conversation = props.selectedPerson.conversations.find(conversation => conversation.participant === props.sender._id);
    conversation.messages.forEach(message => {
      // Assuming setMessage is a function you want to use to process each message
      setMessages(prevMessages => [
        ...prevMessages,
        {
          msg: message.msg.toString(),
          msgType: message.msgType.toString(),
          time: message.time.toString(),
        }
      ]);
    });

      // const i = list.findIndex((obj) => obj.username === props.selectedPerson._id);
      // console.log(props.username,"i  ",i);
      // console.log("List",messages);
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
      // console.log("name",props)
      const newItem = {
        sender: props.sender._id,
        recipient: props.selectedPerson._id,
        msg: msg,
        time: `Today ${currentTime}`,
        msgType: "sent",
        // images: [],
      };
      // console.log("props",props)
      const sendData = async () => {
        socket.emit("msg", newItem)
      };
      sendData();

      setMessages([...messages, {msg:newItem.msg, time:newItem.time, msgType:newItem.msgType, 
      // images:newItem.images
      }]);
      setMsg(""); // Clear the input field after adding the message
    }
  };

  return (
    <div className="h-full overflow-hidden bg-gradient-to-r from-slate-200 to-slate-300 border-t-0 border-b-0 border-l-0 border-slate-500 border-r-2 ">
      <div className="h-[710px] min-w-[750px] max-w-[750px] p-2 overflow-auto">
        <div className="flex gap-5 flex-col md:flex-row">
          <div className="flex flex-col w-full">
            <div className="flex flex-col grow">
              {messages.map((msgs, index) => (
                <Message key={index} {...msgs} />
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
