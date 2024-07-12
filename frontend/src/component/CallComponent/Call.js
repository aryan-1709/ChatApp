import React, { useState, useContext, useRef, useEffect } from "react";
import Peer from "simple-peer";
import { Rnd } from "react-rnd";
import { UsersContext } from "../../Context/UsersContext";
import { SocketContext } from "../../Context/socketContext";
import "./styles.css";

const Call = ({ onClose, userToCall }) => {
  const { socket } = useContext(SocketContext);
  const { Me, incoming, callerinfo, callerSignal, setIncoming } =
    useContext(UsersContext);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const userVideo = useRef(null); // Initialize with null
  const connectionRef = useRef();
  const [callAccepted, setCallAccepted] = useState(false);
  const msgs = ["Calling User...", "Incoming Call..."];
  const [stream, setStream] = useState();
  const [callEnded, setCallEnded] = useState(false);

  const [dimensions, setDimensions] = useState({
    width: 200,
    height: 200,
    x: 100,
    y: 100,
  });

  const toggleFullScreen = () => {
    setDimensions((prev) => ({
      width: !isFullScreen ? window.innerWidth : 200,
      height: !isFullScreen ? window.innerHeight : 200,
      x: !isFullScreen ? 0 : 100,
      y: !isFullScreen ? 0 : 100,
    }));
    setIsFullScreen(!isFullScreen);
  };

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: false })
      .then((stream) => {
        setStream(stream);
      })
      .catch((error) => console.error("Error accessing media devices.", error));
  }, []);

  const callUser = () => {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: stream,
    });

    peer.on("signal", (data) => {
      socket.emit("callUser", {
        userToCall: userToCall.socketid,
        signalData: data,
        from: Me.socketid,
        name: Me.username,
      });
    });

    peer.on("stream", (stream) => {
      userVideo.current.srcObject = stream;
    });

    socket.on("callAccepted", (signal) => {
      setCallAccepted(true);
      peer.signal(signal);
      if (!connectionRef.current && peer) connectionRef.current = peer;
    });
  };

  const answerCall = () => {
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: stream,
    });

    peer.on("signal", (data) => {
      socket.emit("answerCall", { signal: data, to: callerinfo });
    });

    peer.on("stream", (stream) => {
      if (userVideo.current) {
        userVideo.current.srcObject = stream;
      }
    });

    peer.signal(callerSignal);
    connectionRef.current = peer;
    setCallAccepted(true);
  };

  const leaveCall = () => {
    if (connectionRef.current) {
      connectionRef.current = undefined;
    }
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream();
    }
    setCallEnded(true);
    setIncoming(false);
    onClose();
  };

  return (
    <Rnd
      size={{ width: dimensions.width, height: dimensions.height }}
      position={{ x: dimensions.x, y: dimensions.y }}
      onDragStop={(e, d) => setDimensions({ ...dimensions, x: d.x, y: d.y })}
      onResizeStop={(e, direction, ref, delta, position) => {
        setDimensions({
          width: ref.style.width,
          height: ref.style.height,
          ...position,
        });
      }}
      bounds="window"
      className="draggable-box border border-gray-300 bg-white p-4 shadow-md fixed"
    >
      <div className="flex justify-end">
        <button
          onClick={toggleFullScreen}
          className="px-4 py-2 bg-blue-500 text-white rounded mr-2 z-10"
        >
          {isFullScreen ? "Exit Full Screen" : "Full Screen"}
        </button>
        <div className="fixed inset-0 flex flex-col justify-between bg-green-800 text-white">
          <div className="flex-grow flex items-center justify-center">
            {callAccepted && !callEnded ? (
              <div className="video-container">
                <video
                  ref={userVideo}
                  autoPlay
                  playsInline
                  style={{ width: "100%", height: "100%" }}
                />
              </div>
            ) : (
              <div className="text-center">
                {!incoming ? callUser() : null}
                {incoming ? msgs[1] : msgs[0]}
              </div>
            )}
          </div>
          <div className="flex justify-center gap-4 p-4">
            {!callAccepted && incoming && !callEnded ? (
              <button
                onClick={answerCall}
                className="px-4 py-2 bg-green-500 text-white rounded"
              >
                Receive Call
              </button>
            ) : null}
            <button
              onClick={leaveCall}
              className="px-4 py-2 bg-red-500 text-white rounded"
            >
              End Call
            </button>
          </div>
        </div>
      </div>
    </Rnd>
  );
};

export default Call;
