import React, { useEffect, useState } from "react";
import { NavLink, Outlet, useParams } from "react-router-dom";
import { useGetBoardQuery } from "../../../services/api/BoardApi";
import Avatar from "react-avatar";

const IndividualBoard = () => {
  const { id, tid } = useParams();

  const { data, isLoading, isFetching } = useGetBoardQuery(id);
  const [boardData, setBoardData] = useState(null);
  useEffect(() => {
    if (!isLoading || !isFetching) {
      setBoardData(data);
    }
  }, [data, isFetching, isLoading]);

  return (
    <>
      <NavLink
        to="/"
        className="text-[#000000] border border-[#317fb6] rounded px-2 py-1 
  hover:border-blue-500 hover:bg-blue-500 hover:text-white"
      >
        Home
      </NavLink>

      {!tid ? (
        <div className="flex flex-col ml-2 dark:text-white">
          <div className="mt-5 flex gap-3 items-center">
            <div>
              <Avatar name={boardData?.name} round="10px" size={60} />
            </div>
            <div className="text-[2rem] font-medium text-black dark:text-white">
              {boardData?.name}
            </div>
          </div>
          <div className="tags mt-3 dark:text-gray-400 dark:border-gray-400 flex items-baseline flex-wrap md:block">
            <span className="mr-3 text-lg font-medium">Category:</span>
            {boardData?.tags ? (
              boardData.tags.map((e) => (
                <code
                  key={e.id}
                  className="py-[2px] px-3 border-2 rounded-lg text-lg mr-2 dark:border-gray-400 mb-2"
                >
                  {e.title}
                </code>
              ))
            ) : (
              <span className="text-sm font-light">No Category</span>
            )}
          </div>
        </div>
      ) : null}

      <Outlet />
    </>
  );
};

export default IndividualBoard;
