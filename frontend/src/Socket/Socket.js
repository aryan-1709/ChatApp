import { useMemo } from "react";
import io from "socket.io-client";

const socket = io("chat-app-lake-two-40.vercel.app");
socket.on("connect",()=>console.log("connected"));

const useSocket = () => {
  return useMemo(() => socket, []);
};

export default useSocket;
