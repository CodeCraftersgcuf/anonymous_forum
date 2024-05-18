import React, { useEffect, useState } from "react";
import { useGetBoardsQuery } from "../../../services/api/BoardApi";
import { Link } from "react-router-dom";
import Shimmer from "../../Shimmer/Shimmer";
import { formatDistanceToNow } from "date-fns";

const Boards = () => {
  const { data, isLoading, isFetching, isSuccess } = useGetBoardsQuery();
  const [filteredBoards, setFilteredBoards] = useState([]);
  const [searchedBoard] = useState("");

  useEffect(() => {
    if (isSuccess && !isLoading && !isFetching && searchedBoard?.length > 0) {
      const filteredItems = data.filter((board) =>
        board?.name?.toLowerCase().includes(searchedBoard.toLowerCase())
      );
      setFilteredBoards(filteredItems);
    } else if (
      searchedBoard?.length === 0 &&
      isSuccess &&
      !isLoading &&
      !isFetching
    ) {
      setFilteredBoards(data);
    }
  }, [isLoading, isFetching, isSuccess, data, searchedBoard]);

  return (
    <>
      {isLoading || isFetching ? (
        <div className="mt-12 w-[95%] flex  gap-2 flex-wrap">
          {[1, 2, 3, 4].map((e, i) => (
            <Shimmer key={i} />
          ))}
        </div>
      ) : (
        <div className="boards gap-3  flex flex-wrap md:justify-center justify-normal">
          {filteredBoards?.map((board) => (
            <Link
              className="group relative block md:min-w-[23%]  min-w-full md:max-w-[23%]  bg-[#e2c496] dark:bg-[#1E283A] p-[20px] rounded-lg mt-5 "
              to={`${board.boardNumber}`}
              key={board.boardNumber}
            >
              <p className="group-hover:text-[#317FB6] text-[1.2rem]">
                {board.name}
              </p>
              <p className="text-[#7a7070] dark:text-[#95A2B8] text-[0.9rem] pb-3">
                Description: {board.description}
              </p>
              <p className="absolute bottom-1 right-2 text-sm text-[#317FB6]">
                {formatDistanceToNow(new Date(board?.createdAt))} ago..
              </p>
            </Link>
          ))}
        </div>
      )}
    </>
  );
};

export default Boards;
