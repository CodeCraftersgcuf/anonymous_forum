import React, { useEffect, useRef, useState } from "react";
import Avatar from "react-avatar";

import {
  replyApi,
  usePostThreadReplyMutation,
} from "../../../services/api/ReplyApi";
import { useSelector } from "react-redux";
import { getCurrentThread } from "../../features/Threads/ThreadSlice";
import { threadApi } from "../../../services/api/ThreadApi";
import { toast } from "react-toastify";

const Comment = ({ setShowCommentBox, commentBoxRef, currentReply }) => {
  const thread = useSelector(getCurrentThread);
  const [postReply, { isLoading, isError, isSuccess }] =
    usePostThreadReplyMutation();
  const [trigger] = threadApi.endpoints.getThread.useLazyQuery();
  const [replyTrigger] = replyApi.endpoints.getThreadReplies.useLazyQuery();


  const textareaRef = useRef();

  const [name] = useState("Anon");
  const [reply, setReply] = useState("");

  const replyRef = useRef();


  const replyHandler = async (e) => {
    const childReply =
      textareaRef.current.parentElement.parentElement.parentElement.classList.contains(
        "reply_box"
      );
    try {
      let payload;
      if (!childReply) {
        payload = {
          user: name,
          text: reply,
          threadNumber: thread?.threadNumber,
        };
      } else {
        payload = {
          user: name,
          text: reply,
          threadNumber: thread?.threadNumber,
          parentReplyNumber: currentReply?.replyNumber,
        };
      }

      await postReply(payload).unwrap();
      setReply("");
      trigger(thread?.threadNumber);
      replyTrigger(thread?.threadNumber);
    } catch (error) {
      console.log(error);
    }
  };

  const autoGrow = () => {
    const oField = textareaRef.current;
    const oFieldScrollHeight = oField.scrollHeight;
    const minHeight = 35;
    if (oFieldScrollHeight > minHeight) {
      oField.setAttribute(
        "style",
        "height:" + oField.scrollHeight + "px;overflow-y:hidden;"
      );
      oField.style.height = "35px";
      oField.style.height = oField.scrollHeight + "px";
    } else oField.style.height = "35px";
  };
  useEffect(() => {
    if (isSuccess && !isLoading) {
      toast.success("Reply added successfully");
    }
    if (isError && !isLoading) {
      toast.error("Failed to add reply");
    }
  }, [isSuccess, isLoading, isError]);

  const CommentFunctions = (e, value) => {
    const grandParent =
      textareaRef.current.parentElement.parentElement.parentElement.classList.contains(
        "reply_box"
      );
    const commentFunction = replyRef.current;
    if (value === "display") {
      if (grandParent) {
        commentBoxRef.current.style.display = "block";
      }
      commentFunction.style.display = "block";
    } else if (value === "hide") {
      if (grandParent) {
        commentBoxRef.current.style.display = "none";
        setShowCommentBox(false);
      } else commentFunction.style.display = "none";
    }
  };

  return (
    <>
      <div className=" mt-2 flex flex-col gap-2">
        <div className="comment flex gap-2">
          <Avatar round={true} name={name} size="30" />
          <textarea
            value={reply}
            onFocus={(e) => {
              CommentFunctions(e, "display");
            }}
            onChange={(e) => {
              setReply(e.target.value);
            }}
            style={{ height: "35px", minHeight: "35px", resize: "none" }}
            ref={textareaRef}
            onInput={autoGrow}
            placeholder="Add a Reply"
            className="w-full text-sm outline-none border-b-[2px] border-[#5c5a5a] bg-transparent focus:border-[#317FB6] pl-2"
          />
        </div>
        <div ref={replyRef} id="comment_func" className="hidden">
          <div className="flex justify-end sumit_cancel mt-3 w-full pr-4 gap-4">
            <button
              className="hover:bg-[#c4c4c4] dark:hover:text-black px-3 py-1 rounded-2xl"
              onClick={(e) => CommentFunctions(e, "hide")}
            >
              Cancel
            </button>
            <button
              type="submit"
              onClick={(e) => replyHandler(e)}
              disabled={reply.length === 0}
              className="bg-[#317fb6] text-white px-3 py-1 rounded-2xl disabled:bg-[#c4c4c4] dark:disabled:text-gray-400 dark:hover:text-white"
            >
              Reply
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Comment;
