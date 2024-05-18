import React from "react";
import { NavLink, useLocation } from "react-router-dom";

import Confused from "../../../Assets/confused.png";

const ErrorPage = () => {
  const { state } = useLocation();
  const { reason, boardId, threadId } = state;

  return (
    <>
      <div className="relative flex items-end justify-center h-screen bg-[#a8272e]">
        <NavLink
          to="/"
          className="absolute top-0 p-3 mt-2 bg-[#330d10] font-bold rounded-md text-[2rem] text-white"
        >
          Go to home
        </NavLink>
        <p className="absolute text-[4rem] md:text-[10rem] font-bold text-white -rotate-[10deg] translate-y-[-28rem]">
          NOT FOUND
        </p>
        <img
          src={Confused}
          alt="Error"
          className="max-w-[40rem] object-contain"
        />
      </div>
    </>
  );
};

export default ErrorPage;
