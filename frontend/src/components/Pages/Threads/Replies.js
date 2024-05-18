import React, { useEffect, useState } from "react";
import Comment from "./Comment";
import Reply from "./Reply";
import Shimmer from "../../Shimmer/Shimmer";
import { useGetThreadRepliesQuery } from "../../../services/api/ReplyApi";
import { useSelector } from "react-redux";
import { getCurrentThread } from "../../features/Threads/ThreadSlice";

const Replies = ({ tid }) => {
  const {
    data: replies,
    isLoading,
    isFetching,
    isSuccess,
  } = useGetThreadRepliesQuery(tid);

  const threadData = useSelector(getCurrentThread);
  const [repliesContainer, setRepliesContainer] = useState(false);

  useEffect(() => {
    if (!isLoading && !isFetching && isSuccess && replies?.length > 0)
      setRepliesContainer(true);
    else setRepliesContainer(false);
  }, [isLoading, isFetching, replies?.length, isSuccess]);


  return (
    <>
      <div className="mt-8 px-4 py-2 bg-[#fafafa] dark:bg-[#1E283A] dark:rounded-lg dark:text-gray-400">
        <div className="add_comment flex gap-5 items-center text-[1rem] mt-2">
          <div>
            <p>{threadData?.replyCount || 0} Replies</p>
          </div>
        </div>
        <Comment />

        <div
          className={`replies mt-7 bg-[#c4c4c4b6] dark:bg-transparent ${
            repliesContainer ? "p-2" : ""
          } rounded-lg`}
        >
          {isLoading || isFetching ? (
            <div className="flex flex-col gap-2">
              {[1, 2, 3, 4].map((e, i) => {
                return <Shimmer key={i} h="5rem" w="100%" />;
              })}
            </div>
          ) : (
            replies.map((reply) => {
              return <Reply key={reply.replyNumber} reply={reply} />;
            })
          )}
        </div>
      </div>
    </>
  );
};

export default Replies;
