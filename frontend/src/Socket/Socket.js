import { useMemo } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:5000");
socket.on("connect",()=>console.log("connected"));

const useSocket = () => {
  return useMemo(() => socket, []);
};

export default useSocket;
