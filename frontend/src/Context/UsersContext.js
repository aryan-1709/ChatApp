import { createContext, useState, useEffect, useContext } from "react";
import { SocketContext } from "./socketContext";
import { useNavigate } from "react-router-dom";

const UsersContext = createContext();

const Users = ({ children }) => {
  const navigate = useNavigate();
  const { socket } = useContext(SocketContext);
  const [users, setusers] = useState([]);
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [Me, setMe] = useState();
  const [enter, setEnter] = useState(1);

  const handleInputName = (event) => {
    event.preventDefault();
    setName(event.target.value);
  };

  const handleEmail = (e) => {
    e.preventDefault();
    setEmail(e.target.value);
  };

  const handleSubmit = (event) => {
    setEnter(0);
    socket.emit("auth", [name, email]);
    socket.on("state", (res) => {
      alert(res);
    });
    event.preventDefault();
    navigate("/in");
  };

  useEffect(() => {
    socket.on("get", async (res) => {
      setusers(res);
    });
    return () => {
      socket.off("auth");
      socket.off("get");
    };
  }, [email, name, socket]);

  useEffect(() => {
    if (email && users.length > 0) {
      setMe(users.filter((item) => item.email === email)[0]);
    }
  }, [users, email]);

  const updateParent = (mesg, time, msgType, recipient) => {
    if (!Me) return;
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

  useEffect(() => {
    socket.on("toReceiver", (data) => {
      console.log(Me);
      updateParent(data.msg, data.time, data.msgType, data.sender);
    });
  }, [socket, Me, setMe]);

  return (
    <>
      {enter && (
        <div className="flex justify-center items-center h-screen">
          <form
            onSubmit={handleSubmit}
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          >
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="username"
              >
                Username
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="text"
                placeholder="Enter your username"
                value={name}
                onChange={handleInputName}
              />
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={handleEmail}
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Enter
              </button>
            </div>
          </form>
        </div>
      )}
      <UsersContext.Provider
        value={{ users, setusers, name, setName, email, setEmail, Me, setMe }}
      >
        {children}
      </UsersContext.Provider>
    </>
  );
};

export { UsersContext, Users };
