import Comment from "./Comment";

const CommentList = ({ comments, relation }) => {
  if (comments == null) return;
  return comments.map((comment) => (
    <div key={comment.id}>
      <Comment comment={comment} relation={relation} />
    </div>
  ));
};

export default CommentList;
