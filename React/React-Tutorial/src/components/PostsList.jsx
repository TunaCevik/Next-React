import { useState, useEffect } from "react";

import Post from "./Post";
import classes from "./PostsList.module.css";

function PostsList() {
  // fetch("http://localhost:8080/posts").then(response => response.json() ).then(data => {setPosts(data.posts)}) Infinete loop
  const [posts, setPosts] = useState([]);
  const [isFetching, setIsFetching] = useState();
  function addPostHandler(postData) {
    setPosts((existingPosts) => [postData, ...existingPosts]);
  }
  useEffect(() => {
    async function fetchPosts() {
      setIsFetching(true);
      const response = await fetch("http://localhost:8080/posts");
      const resData = await response.json();
      setPosts(resData.posts);
      setIsFetching(false);
    }
    fetchPosts();
  }, []);
  return (
    <>
      {!isFetching && posts.length > 0 && (
        <ul className={classes.posts}>
          {posts.map((post) => (
            <Post key={post.body} author={post.author} body={post.body} />
          ))}
        </ul>
      )}
      {!isFetching && posts.length === 0 && (
        <div style={{ textAlign: "center", color: "wheat" }}>
          <h2>There are no posts yet.</h2>
        </div>
      )}
      {isFetching && (
        <div style={{ textAlign: "center", color: "wheat" }}>
          <p>Loading posts...</p>
        </div>
      )}
    </>
  );
}

export default PostsList;
