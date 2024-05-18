import React, { useState } from "react";
import { createPortal } from "react-dom";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useGetBoardThreadsQuery } from "../../../services/api/ThreadApi";
import Avatar from "react-avatar";

import ThreadCreator from "./ThreadCreator";
import { useGetBoardQuery } from "../../../services/api/BoardApi";
import Shimmer from "../../Shimmer/Shimmer";
import { useEffect } from "react";
const { format, formatDistanceToNow } = require("date-fns");

const Threads = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    isError: boardError,
    isLoading: boardLoading,
    isFetching: boardFetching,
  } = useGetBoardQuery(id, {
    refetchOnMountOrArgChange: true,
  });
  const {
    data,
    isFetching,
    isLoading,
    isError: threadError,
  } = useGetBoardThreadsQuery(id, {
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    if (boardError && !(boardLoading || boardFetching)) {
      navigate("/error", {
        state: { reason: "Cannot fetch this board", boardId: id },
      });
    }
    if (threadError && !(isLoading || isFetching)) {
      navigate("/error", {
        state: { reason: "Cannot fetch threads for this board", boardId: id },
      });
    }
  }, [
    boardError,
    threadError,
    boardLoading,
    boardFetching,
    isLoading,
    isFetching,
    navigate,
    id,
  ]);

  const [threadCreator, showThreadCreator] = useState(false);

  const threadCreatorHandler = () => {
    let page = document.documentElement;
    let isDarkMode = page.classList.contains("dark");
    let root = document.querySelector("#root");
    let html = document.getElementsByTagName("html");
    showThreadCreator((prev) => !prev);
    if (!isDarkMode) {
      if (!threadCreator) {
        root.style.opacity = "0.1";
        html[0].style.overflowY = "hidden";
      } else {
        html[0].style.overflowY = "auto";
        root.style.opacity = "1";
      }
    }
  };


  return (
    <>
      <div className="mt-10 md:ml-3 ">

        <div className="post_thread flex items-center justify-center">
            <button
              className="text-sm text-white  bg-[#317FB6] px-3 py-2 rounded-md"
              onClick={threadCreatorHandler}
            >
              Create thread
            </button>
          </div>  
        {isFetching || isLoading || boardFetching || boardLoading ? (
          <div className="mt-12 w-[95%] flex flex-col gap-2">
            {[1, 2, 3, 4].map((e, i) => (
              <Shimmer key={i} h="7rem" w="100%" />
            ))}
          </div>
        ) : (
          <div className="mt-12 w-[95%] ">
            {data?.map((thread) => {
              const threaduri = `thread/${thread?.threadNumber}`;
              return (
                <div
                  key={thread?.threadNumber}
                  className="thread flex border-b-2 dark:border-gray-400 dark:border-b pb-5 mt-5 justify-between"
                >
                  <div className="flex ">
                    <div className="flex md:gap-5 gap-2 items-center">
                      <Avatar name="Abu Dev" round={true} size="60" />
                      <div className="flex flex-col gap-1">
                        <NavLink
                          to={threaduri}
                          className="hover:underline underline-offset-2 text-[#cd3186]"
                        >
                          <div className="title text-[#317FB6] md:text-[1.3rem] md:font-medium ">
                            {thread?.subject}
                          </div>
                        </NavLink>
                        <div className="date md:text-sm text-[0.6rem] text-black-500">
                          {format(
                            new Date(thread?.createdAt),
                            "MMM d, yyyy, hh:m a"
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex w-[45%] justify-end items-baseline md:items-stretch">
                    <div className="md:mr-10 md:w-[15%] bg-[#F6F7F6] dark:bg-[#1E283A] dark:text-gray-400 px-4 py-2 text-sm text-gray-500 dark:rounded-lg">
                      <p className="text-center text-lg">
                        {thread?.replyCount || 0}
                      </p>
                      <p className="text-center">Reply</p>
                    </div>
                    <div className="mr-10 w-[23%] bg-[#F6F7F6] px-4 py-2 text-sm hidden md:block dark:bg-[#1E283A] dark:text-gray-400 dark:rounded-lg">
                      <p className="">Created</p>
                      <p>{formatDistanceToNow(new Date(thread?.createdAt))}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        {threadCreator
          ? createPortal(
              <ThreadCreator closeModal={threadCreatorHandler} />,
              document.body
            )
          : null}
      </div>
    </>
  );
};

export default Threads;
