import { useMemo, createContext } from "react";
import io from "socket.io-client";

const SocketContext = createContext(null); 

const UseSocket = ({ children }) => {
  const socket = useMemo(() => io("https://chathub-server-iy0i.onrender.com"), []);
  socket.on("connect", () => console.log("connected"));

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export { UseSocket, SocketContext };
