import * as React from "react";
import { useState, useEffect } from "react";
import ChatApp from "../pages/ChatApp";
import { IoMdVideocam } from "react-icons/io";
import { FaPhone, FaSearch } from "react-icons/fa";
import image from "../images/dummy.jpg";
import UseSocket from "../Socket/Socket";
import { useLocation } from "react-router-dom";

function MessagingApp() {
  const [list, setList] = useState([]);
  const [senderdata, setSenderdata] = useState()
  const [selectedPerson, setSelectedPerson] = useState(null);
  const location = useLocation();
  const { name, email } = location.state;
  const socket = UseSocket();
  
  useEffect(() => {
    socket.on("get", async (res) => {
      console.log("res", res);
      const filteredList = await res.filter(item => item.username !== name);
      const senderlist = await res.filter(item => item.email === email);
      setList(filteredList);
      setSenderdata(senderlist[0])
    });

    return () => {
      socket.off("get");
    };
  }, [socket, email, name]);

  useEffect(() => {
    socket.on("get", async (res) => {
      setList([]);
      const filteredList = await res.filter(item => item.username !== name);
      setList(filteredList);
    });
    return () => {
      socket.off("get");
    };
  })
  
  const handlePersonClick = (person) => {
    setSelectedPerson(person);
  };

  const checkString = (s) => {
    let str = s;
    if (s && s.length >= 34) {
      str = s.substring(0, 31) + "...";
    }
    return str;
  };

  const chats = (item, index) => {
    return (
      <li key={index} onClick={() => handlePersonClick(item)}>
        <div className="flex flex-col px-5 pb-0 py-2.5 w-full max-w-[292px] hover:bg-slate-400/[0.5]">
          <div className="flex gap-5 justify-between">
            <div className="text-sm font-medium tracking-tight leading-5 text-slate-950">
              {item.username}
            </div>
            <div className="flex-auto text-xs tracking-normal text-right text-zinc-500 text-opacity-80">
              {item.status}
            </div>
          </div>
          <div className="flex gap-5 justify-between mt-2 text-xs font-medium tracking-tight text-zinc-500 text-opacity-80">
            <div className="flex-auto">{checkString(item.curr)}</div>
          </div>
          <div className="w-full border-b-4 border-slate-400"></div>
        </div>
      </li>
    );
  };

  const updateConversations = (updatedConversations) => {
    const updatedList = list.map(user => {
      if (user._id === selectedPerson._id) {
        return {
          ...user,
          conversations: updatedConversations
        };
      }
      return user;
    });

    setSelectedPerson({
      ...selectedPerson,
      conversations: updatedConversations
    });

    setList(updatedList);
  };


  return (
    <div className="flex justify-start w-full">
      <div className="flex flex-col justify-start items-center mx-auto min-w-[312px] max-w-[312px] max-h-[750px] overflow-auto bg-slate-300 border-r-2 border-slate-500">
        <div className="bg-slate-400 px-3 w-full sticky top-0 pb-0 border-b-4 border-slate-500">
          <div className="flex gap-5 justify-between self-stretch w-full whitespace-nowrap">
            <div className="flex gap-1 px-1">
              <div className="grow text-2xl font-semibold tracking-tighter leading-9 text-slate-950">
                Messaging
              </div>
            </div>
          </div>

          <div className="flex gap-4 self-stretch px-4 py-1 mb-4 mt-3 text-sm bg-slate-50 text-neutral-400 rounded-full h-[50px] items-center">
            <FaSearch className="shrink-0 aspect-[0.9] w-[18px] scale-150 hover:cursor-pointer" />
            <input
              className="flex-auto rounded-full pl-4 h-full focus:outline-none"
              itemType="text"
              placeholder="Search in dashboard"
            ></input>
          </div>
        </div>
        <ul>
          {list.map((item, index) => (
            <React.Fragment key={index}>{chats(item, index)}</React.Fragment>
          ))}
        </ul>
      </div>
      <div className="w-full h-full">
        {selectedPerson && <ChatApp selectedPerson={selectedPerson} sender={senderdata} onUpdateConversations={updateConversations}/>}
      </div>
      {selectedPerson && (
        <div className="w-full h-[710px] flex justify-center pt-8 bg-gradient-to-r from-slate-300 to-slate-200">
          <div>
            <image
              className="rounded-full h-[200px] w-[200px] aspect-w-1 aspect-h-1 shadow-[0_0px_80px_-16px_rgba(0,0,0,0.3)] shadow-black"
              src={image}
              alt="no image"
            />
            <div className="mt-6 flex flex-col items-center text-center">
              <div>{selectedPerson.status}</div>
              <div className="text-2xl">~{selectedPerson.username}</div>
              <div className="flex justify-center gap-10 w-full pt-5">
                <div className="bg-slate-400/[.5] rounded-full p-7 hover:bg-slate-500 shadow-2xl">
                  <IoMdVideocam className="scale-150 hover:cursor-pointer" />
                </div>
                <div className="bg-slate-400/[.5] rounded-full p-7 hover:bg-slate-500 shadow-2xl">
                  <FaPhone className="scale-125 hover:cursor-pointer" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MessagingApp;
