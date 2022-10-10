import CommentList from "./CommentList";

const CommentSection = ({ allComments }) => {
  // Comment section will have it's own state, handling all comments
  const parents = findParents(allComments);
  const relation = findChildren(allComments);

  return <CommentList comments={parents} relation={relation}></CommentList>;
  // return parents.map((comment) => (
  //   <div key={comment.id}>
  //     <Comment />
  //   </div>
  // ));
};

export default CommentSection;
