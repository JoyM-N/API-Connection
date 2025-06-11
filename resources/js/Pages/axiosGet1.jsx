import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PostList = () => {
  const [posts, setPosts] = useState([]); // this is where data is "set"
  const BASE_URL= import.meta.env.VITE_BASE_URL_1;

  useEffect(() => {
    axios.get(`${BASE_URL_1}/posts`) // Using the BASE_URL from .env
      .then(response => {
        setPosts(response.data); // SETTING data here!
      })
      .catch(error => {
        console.error('Error fetching posts:', error);
      });
  }, []);

  return (
    <div>
      <h2>Posts</h2>
      <ul>
        {posts.map(post => (
          <li key={post.id}><strong>{post.title}</strong>: {post.body}</li>
        ))}
      </ul>
    </div>
  );
};

export default PostList;

