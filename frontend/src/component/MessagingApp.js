import * as React from "react";
import { useState, useEffect } from "react";
import ChatApp from "../pages/ChatApp";
import { IoMdVideocam } from "react-icons/io";
import { FaPhone, FaSearch } from "react-icons/fa";
import dummy from "../images/dummy.jpg";
import { useContext } from "react";
import { UsersContext } from "../Context/UsersContext";
import Call from "./CallComponent/Call";

function MessagingApp() {
  const { users, email, Me, incoming } = useContext(UsersContext);
  const [list, setList] = useState([]);
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [inCall, setInCall] = useState(false);

  useEffect(() => {
    const filteredList = users.filter((item) => item.email !== email);
    setList(filteredList);
  }, [email, users]);

  useEffect(() => {
    if (list.length !== 0 && selectedPerson) {
      const user = list.filter((user) => user._id === selectedPerson._id);
      if (user) {
        // const mess = user[0].conversations.filter((convo) => convo.participant === Me._id);
        let sel = selectedPerson;
        sel.conversations = user[0].conversations;
        setSelectedPerson(sel);
      }
    }
  }, [list]);

  const handlePersonClick = (person) => {
    setSelectedPerson(person);
  };

  const chats = (item, index) => {
    const dotColor = item.online ? "bg-green-500" : "bg-red-500";
    const msgs = Me.conversations.filter(
      (convo) => convo.participant === item._id.toString()
    );
    let latest = "";
    if (msgs[0]) latest = msgs[0].messages[msgs[0].messages.length - 1].msg;
    return (
      <div key={index} onClick={() => handlePersonClick(item)}>
        <div className="flex flex-col pb-0 py-2.5 w-full hover:bg-slate-400/[0.5]">
          <div className="flex gap-5 justify-between items-center">
            <div className="text-sm font-medium tracking-tight leading-5 text-slate-950 ml-4 flex items-center">
              <span className={`w-2 h-2 rounded-full mr-1 ${dotColor}`}></span>
              {item.username}
            </div>
            <div className="flex-auto text-xs tracking-normal text-right text-zinc-500 text-opacity-80 mr-4">
              {item.status}
            </div>
          </div>
          <div className="flex gap-5 justify-between mt-2 text-xs font-medium tracking-tight text-zinc-500 text-opacity-80">
            <div className="flex-auto">{latest}</div>
          </div>
          <div className="w-full border-b-4 border-slate-400"></div>
        </div>
      </div>
    );
  };

  const handelCall = () => {
    setInCall(true);
  };

  useEffect(() => {
    if (incoming) setInCall(true);
  }, [incoming]);

  const handleCloseCall = () => {
    setInCall(false);
  };

  return (
    <div className="flex w-full overflow-auto">
      {inCall && <Call onClose={handleCloseCall} userToCall={selectedPerson} />}
      <div className="flex flex-col justify-start items-center mx-auto min-w-[252px] max-w-[252px] max-h-[750px] overflow-auto bg-slate-300 border-r-2 border-slate-500">
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
        <div className="w-full h-[100vh]">
          {list.map((item, index) => (
            <React.Fragment key={index}>{chats(item, index)}</React.Fragment>
          ))}
        </div>
      </div>
      <div className="flex-grow h-full">
        {selectedPerson && <ChatApp selectedPerson={selectedPerson} />}
      </div>
      {selectedPerson && (
        <div className="w-full h-[710px] flex justify-center pt-8 bg-gradient-to-r from-slate-300 to-slate-200">
          <div>
            <img
              className="rounded-full h-[200px] w-[200px] aspect-w-1 aspect-h-1 shadow-[0_0px_80px_-16px_rgba(0,0,0,0.3)] shadow-black"
              src={dummy}
              alt="No img"
            />
            <div className="mt-6 flex flex-col items-center text-center">
              <div>{selectedPerson.status}</div>
              <div className="text-2xl">~{selectedPerson.username}</div>
              <div className="flex justify-center gap-10 w-full pt-5">
                <div
                  onClick={handelCall}
                  className="bg-slate-400/[.5] hover:cursor-pointer rounded-full p-7 hover:bg-slate-500 shadow-2xl"
                >
                  <IoMdVideocam
                    onClick={handelCall}
                    className="scale-150 hover:cursor-pointer"
                  />
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
