import * as React from "react";
import { useState, useEffect } from "react";
import ChatApp from "./ChatApp";
import { IoMdVideocam } from "react-icons/io";
import { FaPhone, FaSearch } from "react-icons/fa";
import axios from "axios";
import image from './images/dummy.jpg';

function MessagingApp() {
  const [list, setList] = useState([]);
  const getData = async () => {
    const res = await axios.get("http://localhost:5000/get");
    setList([...list, ...res.data]);
  };

  useEffect(() => {
    getData();
  }, []);
  const [selectedPerson, setSelectedPerson] = useState(null);
  const handlePersonClick = (person) => {
    setSelectedPerson(person);
  };
  const checkString = (s) => {
    let str = s;
    if (s.length >= 34) {
      str = s.substring(0, 31);
      str += "...";
    }
    return str;
  };

  return (
    <div className=" flex justify-start w-full  ">
      <div className="flex flex-col justify-start items-center mx-auto min-w-[312px] max-w-[312px] max-h-[750px] overflow-auto bg-slate-300 border-r-2 border-slate-500">
        <div className="bg-slate-400 px-3 w-full sticky top-0 pb-0 border-b-4 border-slate-500">
          <div className="flex gap-5 justify-between self-stretch w-full whitespace-nowrap ">
            <div className="flex gap-1 px-1">
              <div className="grow text-2xl font-semibold tracking-tighter leading-9 text-slate-950">
                Messaging
              </div>
              <div className="justify-center self-start px-1 py-1 text-xs text-center text-red-800 bg-red-500 rounded">
                137
              </div>
            </div>
            <div className="flex gap-1.5 py-1 pr-1.5 pl-1.5 my-auto text-sm font-medium leading-6 text-slate-950 bg-slate-500 rounded-full">
              <div className="grow self-stretch">Agents</div>
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
            <li key={index} onClick={() => handlePersonClick(item)}>
              <div className="flex flex-col px-5 pb-0 py-2.5 w-full  max-w-[292px] hover:bg-slate-400/[0.5] ">
                <div className="flex gap-5 justify-between">
                  <div className="text-sm font-medium tracking-tight leading-5 text-slate-950">
                    {item.name}
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
          ))}
        </ul>
      </div>
      <div className="w-full h-full ">
        {selectedPerson && <ChatApp person={selectedPerson} />}
      </div>
      {selectedPerson && (
        <div className=" w-full h-[710px] flex justify-center pt-8 bg-gradient-to-r from-slate-300 to-slate-200">
          <div className="">
            <img className="rounded-full h-[200px] w-[200px] aspect-w-1 aspect-h-1 shadow-[0_0px_80px_-16px_rgba(0,0,0,0.3)] shadow-black" src={image} alt="no image" />
            <div className="mt-6 flex flex-col items-center text-center">
              <div className="">{selectedPerson.status}</div>
              <div className="text-2xl">~{selectedPerson.name}</div>
              <div className="flex justify-center gap-10 w-full pt-5 ">
                <div className="bg-slate-400/[.5] rounded-full p-7 hover:bg-slate-500 shadow-2xl">
                  <IoMdVideocam className="scale-150 hover:cursor-pointer " />
                </div>
                <div className="bg-slate-400/[.5] rounded-full p-7  hover:bg-slate-500 shadow-2xl">
                  <FaPhone className="scale-125 hover:cursor-pointer " />
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


