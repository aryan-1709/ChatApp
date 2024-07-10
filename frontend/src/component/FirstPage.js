import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import UseSocket from "../Socket/Socket";

const FirstPage = () => {
  const socket = UseSocket();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setemail] = useState('');

  const handleInputName = (event) => {
    event.preventDefault();
    setUsername(event.target.value);
  };

  const handleEmail = (e) => {
    e.preventDefault();
    setemail(e.target.value);
  };

  const handleSubmit = (event) => {
    socket.emit("auth", [username, email]);
    socket.on("state", (res) => {
      alert(res);
    });
    event.preventDefault();
    navigate('/in', {state : {name: username, email: email}})
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
            Username
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            placeholder="Enter your username"
            value={username}
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
  );
};

export default FirstPage;
