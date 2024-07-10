import React, { useContext } from "react";
import { DashBoard } from "./DashBoard";
import MessagingApp from "./MessagingApp";
import { UsersContext } from "../Context/UsersContext";

export default function FrontPage() {
  const { email, name } = useContext(UsersContext);
  return (
    <div className="overflow-hidden">
      <div>
        <DashBoard email={email} name={name} />
      </div>
      <div className="h-[767px] bg-slate-300 w-full">
        <MessagingApp />
      </div>
    </div>
  );
}
