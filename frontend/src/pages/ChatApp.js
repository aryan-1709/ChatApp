import React, { useState, useEffect, useRef, useContext } from "react";
import { UsersContext } from "../Context/UsersContext";
import { SocketContext } from "../Context/socketContext";

function Message(msgs) {
  return (
    <div
      className={`flex flex-col ${
        msgs.msgType === "sent" ? "items-end" : "items-start"
      } px-5`}
    >
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

function ChatApp({ selectedPerson }) {
  const { Me, setMe } = useContext(UsersContext);
  const { socket } = useContext(SocketContext);
  const [msg, setMsg] = useState("");
  const [messages, setMessages] = useState([]);
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const currentTime = `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}`;

  const updateParent = (mesg, time, msgType, recipient) => {
    const convo = Me.conversations.find(
      (chat) => chat.participant === recipient.toString()
    );
    if (!convo) {
      let newConversations = Me.conversations;
      newConversations.push({
        participant: recipient,
        messages: [
          {
            msg: mesg,
            time: time,
            msgType: msgType,
          },
        ],
      });
      setMe({ ...Me, conversations: newConversations });
    } else {
      const updatedConversations = Me.conversations.map((convo) => {
        if (convo.participant.toString() === recipient.toString()) {
          return {
            ...convo,
            messages: [
              ...convo.messages,
              {
                msg: mesg,
                time: time,
                msgType: msgType,
              },
            ],
          };
        }
        return convo;
      });
      setMe({ ...Me, conversations: updatedConversations });
    }
  };

  // useEffect(() => {
  //   socket.on("toReceiver", (data) => {
  //     updateParent(data.msg, data.time, data.msgType, data.sender);
  //   });
  // }, [Me, socket, setMe]);

  const updateMsg = (event) => {
    event.preventDefault();
    setMsg(event.target.value);
  };
  

  useEffect(() => {
    const conversation = Me.conversations.find(
      (conversation) => conversation.participant === selectedPerson._id
    );
    setMessages([]);
    if (conversation) {
      conversation.messages.forEach((message) => {
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            msg: message.msg.toString(),
            msgType: message.msgType.toString(),
            time: message.time.toString(),
          },
        ]);
      });
    }
  }, [selectedPerson, Me]);

  const updateMessage = (event) => {
    event.preventDefault();
    if (msg.trim() !== "") {
      const newItem = {
        sender: Me._id,
        recipient: selectedPerson._id,
        msg: msg,
        time: `Today ${currentTime}`,
        msgType: "sent",
      };
      socket.emit("msg", newItem);
      setMessages([
        ...messages,
        {
          msg: newItem.msg,
          time: newItem.time,
          msgType: newItem.msgType,
        },
      ]);
      setMsg("");
      updateParent(msg, newItem.time, "sent", selectedPerson._id);
    }
  };

  const messagesEndRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="h-full overflow-auto bg-gradient-to-r from-slate-200 to-slate-300 border-t-0 border-b-0 border-l-0 border-slate-500 border-r-2">
      <div className="h-[710px] min-w-[750px] max-w-[750px] p-2 overflow-auto">
        <div className="flex gap-5 flex-col md:flex-row">
          <div className="flex flex-col w-full">
            <div className="flex flex-col grow">
              {messages.map((msgs, index) => (
                <Message key={index} {...msgs} />
              ))}
              <div ref={messagesEndRef}></div>
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
            className="pl-3 h-full w-full rounded-full focus:outline-none"
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
