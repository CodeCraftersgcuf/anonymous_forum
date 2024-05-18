import React from "react";
import { useParams } from "react-router-dom";
import { useGetThreadQuery } from "../../../services/api/ThreadApi";
import Post from "./Post";
import Shimmer from "../../Shimmer/Shimmer";
import Replies from "./Replies";

const Thread = () => {
  const { tid } = useParams();
  const { data, isLoading, isFetching } = useGetThreadQuery(tid);

  return (
    <>
      {isLoading || isFetching ? (
        <div className="mt-3">
          <Shimmer h="12rem" w="100%" />
        </div>
      ) : (
        <>
          <Post postData={data} />
          <Replies tid={tid} />
        </>
      )}
    </>
  );
};

export default Thread;
