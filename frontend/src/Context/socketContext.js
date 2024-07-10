import { useMemo, createContext } from "react";
import io from "socket.io-client";

const SocketContext = createContext(null); 

const UseSocket = ({ children }) => {
  const socket = useMemo(() => io("http://localhost:5000"), []);
  socket.on("connect", () => console.log("connected"));

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export { UseSocket, SocketContext };
