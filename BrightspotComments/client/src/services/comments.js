import axios from "axios";

export async function getComments() {
  const res = await axios.get("http://localhost:3001/comments");
  return res.data;
}

export const postComment = async (user, message, parent = null) => {
  await axios.post("http://localhost:3001/comments", {
    user: user,
    comment_text: message,
    parent_id: parent,
  });
  return true;
};

export default { getComments, postComment };
