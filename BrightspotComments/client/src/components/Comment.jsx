import { useState } from "react";
import { FaEdit, FaHeart, FaReply, FaTrash } from "react-icons/fa";
import "../styles/comment.css";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";
import IconBtn from "./IconBtn";

const dateFormatter = new Intl.DateTimeFormat(undefined, {
  dateStyle: "medium",
  timeStyle: "short",
});

const Comment = ({ comment, relation }) => {
  // // Get all children from relation
  let children = [];
  if (comment.id in relation) children = relation[comment.id];

  const [areChildrenHidden, setAreChildrenHidden] = useState(false);
  const [isReplying, setIsReplying] = useState(false);

  return (
    <>
      <div className="comment">
        <div className="header">
          <span className="name">{comment.user}</span>
          <span className="date">
            {dateFormatter.format(Date.parse(comment.createdAt))}
          </span>
        </div>
        <div className="message">{comment.comment_text}</div>
        <div className="footer">
          <IconBtn Icon={FaHeart} aria-label="Like">
            {comment.likes}
          </IconBtn>
          <IconBtn
            onClick={() => setIsReplying((prev) => !prev)}
            isActive={isReplying}
            Icon={FaReply}
            aria-label={isReplying ? "Cancel Reply" : "Reply"}
          />
          <IconBtn Icon={FaEdit} aria-label="Edit" />
          <IconBtn Icon={FaTrash} aria-label="Delete" color={"danger"} />
        </div>
      </div>
      {isReplying && (
        <div className="mt-1 m-3">
          <CommentForm />
        </div>
      )}
      {children?.length > 0 && (
        <>
          <div className={`nest-com-stack ${areChildrenHidden ? "hide" : ""}`}>
            <button
              className="collapse-line"
              aria-label="Hide Replies"
              onClick={() => setAreChildrenHidden(true)}
            />
            <div className="nested-comments">
              <CommentList
                comments={children}
                relation={relation}
                key={comment.id}
              ></CommentList>
            </div>
          </div>
          <button
            className={`btn mt-1 ${!areChildrenHidden ? "hide" : ""}`}
            onClick={() => setAreChildrenHidden(false)}
          >
            Show Replies
          </button>
        </>
      )}
    </>
  );
};

export default Comment;
