import React, { useEffect, useState } from "react";
import config from "../../config/index";
function PostComments({ postId }) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    if (!postId) {
      return;
    }
    getComments(postId);
  }, [postId]);

  async function getComments(postId) {
    const fetchedComments = await (
      await fetch(`${config.apiUrl}/posts/${postId}/comment`, {
        credentials: "include",
      })
    ).json();
    setComments(fetchedComments);
  }

  return (
    <div>
      {comments.map((comment) => {
        return <div key={comment._id}>{comment.content}</div>;
      })}
    </div>
  );
}

export default PostComments;
