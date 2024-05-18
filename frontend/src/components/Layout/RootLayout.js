import React, { useEffect, useState } from "react";
import { NavLink, Outlet, useLocation, useParams } from "react-router-dom";

import Logo from "../../Assets/android-chrome-192x192.png";
import { useSelector } from "react-redux";
import { getCurrentBoard } from "../features/Boards/BoardSlice";
import { getCurrentThread } from "../features/Threads/ThreadSlice";
import { createPortal } from "react-dom";
import CreateBoardModal from "./CreateBoardModal";

const RootLayout = () => {
  const { id, tid } = useParams();
  const { pathname } = useLocation();

  const [showMeta, setShowMeta] = useState(false);

  useEffect(() => {
    if (pathname !== "/") setShowMeta(true);
    else setShowMeta(false);
  }, [pathname, showMeta, setShowMeta]);

  const boardData = useSelector(getCurrentBoard);
  const threadData = useSelector(getCurrentThread);
  const [createBoardModal, setCreateBoardModal] = useState(false);

  return (
    <>
      <div className="root-layout p-3 overflow-auto relative dark:bg-[#040404] bg-gradient-to-br from-red-600 to-purple-600 h-screen">
        <header>
          <div className="flex justify-center">
            <nav className="flex justify-between py-2">
              <NavLink
                to="/"
                className="flex items-center gap-2 cursor-pointer"
              >
                <img src={Logo} alt="logo" className="w-25" />
              </NavLink>
            </nav>
          </div>
        </header>
        <main>
          <div className="border-b-2 dark:border-[#273f6a] mb-5 flex gap-3">
            {!id && !tid && showMeta && (
              <div className="flex items-center gap-5 justify-between w-full">
                <div className="my-5 bg-[#000000] w-max p-2 rounded-md text-white ">
                  <h2 className="text-md font-semibold">Boards</h2>
                  <p className="text-sm">Currently opened boards</p>
                </div>

                <div className="">
                  <button
                    onClick={() => {
                      setCreateBoardModal((prev) => !prev);
                    }}
                    className="w-max  px-3 bg-blue-200 hover:bg-re-100  py-3 rounded mr-10 dark:bg-blue-400 dark:hover:bg-red-300"
                  >
                    Add Board
                  </button>
                </div>
              </div>
            )}

            {id && (
              <div className="">
                <div className="my-5 bg-red-700 dark:bg-pink-600 w-max p-2 rounded-md text-white ">
                  <h2 className="text-md font-semibold">{boardData?.name}</h2>
                  <NavLink
                    to={`/boards/${id}`}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <p className="text-sm">Current Board</p>
                  </NavLink>
                </div>
              </div>
            )}

            {tid && (
              <div className="">
                <div className="my-5 bg-purple-400 dark:bg-purple-600 w-max p-2 rounded-md text-white">
                  <h2 className="text-md font-semibold">
                    {threadData?.subject}
                  </h2>
                  <NavLink
                    to={`/boards/${id}/thread/${tid}`}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <p className="text-sm">Current Thread</p>
                  </NavLink>
                </div>
              </div>
            )}
          </div>
          <Outlet />
        </main>
      </div>

      {createBoardModal
        ? createPortal(
            <CreateBoardModal closeModal={setCreateBoardModal} />,
            document.body
          )
        : null}
    </>
  );
};

export default RootLayout;
