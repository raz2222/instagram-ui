import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import config from "../config/index";
import Avatar from "../Avatar/Avatar";
import PostDate from "../Post/PostDate/PostDate";
import "./PostPage.scss";
import PostLike from "../Post/PostLike/PostLike";
import PostComments from "./PostComments/PostComments";

function PostPage() {
  const { id } = useParams();
  const [post, setPost] = useState({});
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      return;
    }
    getPost(id);
  }, [id]);

  async function getPost(id) {
    const fetchedPost = await (
      await fetch(`${config.apiUrl}/posts/${id}`, {
        credentials: "include",
      })
    ).json();
    setPost(fetchedPost);
    setLoading(false);
  }

  const buildImageUrl = (imageName) => {
    return config.apiUrl + "/posts/" + imageName;
  };

  return (
    <div className="PostPage">
      {!isLoading && (
        <div className="row">
          <div className="col-md-8">
            <img
              className="PostPage__image"
              src={buildImageUrl(post.image)}
              alt="post image"
            />
            <div className="PostPage__actions">
              <PostLike postId={post._id} likes={post.likes} />
            </div>
            <div className="PostPage__content">
              <p className="PostPage__description">{post.description}</p>
            </div>
            <div className="PostPage__date">
              <PostDate date={post.createdAt} />
            </div>
          </div>
          <div className="col-md-4">
            <header>
              <div className="PostPage__user">
                <Link to={`/profile/${post.user._id}`} className="d-flex">
                  <Avatar size="md" image={post.user.avatar} />
                  <h3 className="PostPage__user__username">
                    {post.user.username}
                  </h3>
                </Link>
              </div>
            </header>
            <hr />
            <PostComments postId={post._id} />
          </div>
        </div>
      )}
    </div>
  );
}

export default PostPage;
