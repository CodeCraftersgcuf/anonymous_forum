import { formatDistanceToNow } from "date-fns";
import React, { useRef, useState } from "react";
import Avatar from "react-avatar";
import Comment from "./Comment";
import { useGetChildRepliesQuery } from "../../../services/api/ReplyApi";

const Reply = ({ reply }) => {
  const commentBoxRef = useRef();
  const { data } = useGetChildRepliesQuery(reply?._id, {
    refetchOnMountOrArgChange: true,
  });

  const [showCommentBox, setShowCommentBox] = useState(false);
  const [showReplies, setShowReplies] = useState(false);

  const commentBoxHandler = () => {
    if (!showCommentBox) {
      setShowCommentBox(true);
      commentBoxRef.current.style.display = "block";
    }
  };

  return (
    <>
      <div className="mt-3 bg-[#fafafa] flex gap-1 p-2 rounded-lg dark:bg-[#0E162A]">
        <div className="avatar min-w-[3rem] md:w-[5%] flex justify-center pt-2 mr-2">
          <Avatar name={reply?.user} size="40" round={true} />
        </div>
        <div className="flex flex-col w-full">
          <div className="reply_head flex gap-2 text-[0.7rem] text-gray-600 dark:text-gray-400">
            <p>@{reply?.user}</p>
            <p>{formatDistanceToNow(new Date(reply?.createdAt))}</p>
          </div>
          <div className="reply_body max-w-[calc(100vw - 2rem)] max-h-[200px] overflow-y-auto">
            <p className="text-[0.8rem]">{reply?.text}</p>
            {/* Add the "dandueroses" HTML here */}
            <div dangerouslySetInnerHTML={{ __html: reply?.dandueroses }} />
          </div>

          <div>
            <button
              onClick={() => commentBoxHandler()}
              className="text-[1rem] w-min  hover:bg-[#c4c4c4] py-1 px-3 mt-5 rounded-2xl dark:hover:text-black mr-2"
            >
              Reply
            </button>
            {data?.length > 0 ? (
              <button
                onClick={() => setShowReplies((prev) => !prev)}
                className="text-[1rem] w-max  hover:bg-[#c4c4c4] py-1 px-3 mt-5 rounded-2xl dark:hover:text-black"
              >
                {showReplies ? "Hide Replies" : "Show Replies"}
              </button>
            ) : null}
          </div>
          <div ref={commentBoxRef} className="reply_box mt-2 hidden">
            <Comment
              commentBoxRef={commentBoxRef}
              setShowCommentBox={setShowCommentBox}
              currentReply={reply}
            />
          </div>
          {data?.length > 0 && showReplies
            ? data?.map((reply) => {
                return <Reply key={reply.replyNumber} reply={reply} />;
              })
            : null}
        </div>
      </div>
    </>
  );
};

export default Reply;
