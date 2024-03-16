import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import LeftPannel from './LeftPannel';
// import ChatApp from './ChatApp';
// import MessagingApp from './MessagingApp';
// import Chats from './component/Chats';
// import DashBoard from './DashBoard';
import FrontPage from './component/FrontPage';
// import UserDetails from './UserDetails';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <FrontPage />
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
