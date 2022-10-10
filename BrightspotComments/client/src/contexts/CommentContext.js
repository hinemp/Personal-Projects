import React, { useContext, useEffect, useMemo, useState } from "react";
import { useAsync } from "../hooks/useAsync";
import { getComments } from "../services/comments";

const Context = React.createContext();

export function useComment() {
  return useContext(Context);
}

export function CommentProvider({ children }) {
  const {
    loading,
    error,
    value: allComments,
  } = useAsync(() => getComments(), []);
  const [comments, setComments] = useState([]);
  const commentsByParentId = useMemo(() => {
    if (comments == null) return;
    const group = {};
    comments.forEach((comment) => {
      group[comment.parent_id] ||= [];
      group[comment.parent_id].push(comment);
    });
    console.log(comments);
    return group;
  }, [comments]);

  useEffect(() => {
    setComments(allComments);
  }, [allComments]);

  return (
    <Context.Provider
      value={{
        rootComments: commentsByParentId[null],
      }}
    >
      {loading ? (
        <h1>Loading</h1>
      ) : error ? (
        <h1 className="error-msg">{error}</h1>
      ) : (
        children
      )}
    </Context.Provider>
  );
}
