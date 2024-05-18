import React from "react";
import { Outlet } from "react-router-dom";

const BoardLayout = () => {
  return (
    <>
      <div className="boards-layout">
        <Outlet />
      </div>
    </>
  );
};

export default BoardLayout;
