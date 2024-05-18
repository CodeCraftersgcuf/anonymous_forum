import React from "react";
import { useSelector } from "react-redux";
import { getCurrentThread } from "../../features/Threads/ThreadSlice";

const ThreadLayout = () => {
  const threadData = useSelector(getCurrentThread);

  return (
    <>
      <div className="heading mt-2 dark:bg-[#1E283A] dark:text-gray-400 ">
        <p className="text-[2rem] text-gray-800 dark:text-gray-400">
          {threadData?.subject}
        </p>
        <div className="tags flex gap-2 mt-2 mb-2 flex-wrap border-b border-b-black pb-2 dark:border-b-gray-400 ">
          {threadData?.tags
            ? threadData?.tags?.map((tag) => {
                return (
                  <span
                    className="text-[0.8rem] text-white bg-[#317FB6] px-2 py-[2px] rounded-md"
                    key={tag._id}
                  >
                    {tag.title}
                  </span>
                );
              })
            : null}
        </div>
      </div>
    </>
  );
};

export default ThreadLayout;
