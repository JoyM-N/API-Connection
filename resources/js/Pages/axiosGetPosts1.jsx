// This file is used to fetch data using a PROXY from a public API using axios.
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const PostList = () => {
//   const [posts, setPosts] = useState([]); // this is where data is "set"
//   const BASE_URL= import.meta.env.VITE_BASE_URL_1;

//   // useEffect(() => 
//   //   {
//   //   axios.get(`${BASE_URL}/posts`) // Using the BASE_URL from .env
//   //     .then(response => {
//   //       setPosts(response.data); // SETTING data here!
//   //     })
//   //     .catch(error => {
//   //       console.error('Error fetching posts:', error);
//   //     });
//   // }, []);

//   const fetchPosts = async () => {
//     try {
//       // Using CORS proxy
//       // const proxyUrl = 'https://api.allorigins.win/get?url=';
//       const proxyUrl = 'https://corsproxy.io/?';
//       const targetUrl = `${BASE_URL}/posts`;
      
//       const res = await axios.get(`${proxyUrl}${encodeURIComponent(targetUrl)}`);
//       const postsData = JSON.parse(res.data.contents);
//       setPosts(postsData);
//     } catch (error) {
//       console.error('Error fetching posts:', error);
//       setPosts([
//         { id: 'Error', title: 'Error', body: error.message }
//       ]);
//     }
//   };

//   useEffect(() => {
//     fetchPosts();
//   }, []);
//   return (
//     <div>
//       <h2>Posts</h2>
//       <ul>
//         {posts.map(post => (
//           <li key={post.id}><strong>{post.title}</strong>: {post.body}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default PostList;

import React, { useEffect, useState } from 'react';
import axios from 'axios';

function PostList() {
// const PostList = () => {
    const [posts, setPosts] = useState(
      () => {
   // Try to load from localStorage first
    const stored = localStorage.getItem('posts');
    return stored ? JSON.parse(stored) : [];
  }

    ); // this is where data is "set"

      const BASE_URL_1= import.meta.env.VITE_BASE_URL_1;
  useEffect(() => {
    axios.get(`${BASE_URL_1}/posts`) // Using the BASE_URL from .env
      .then(response => {
        setPosts(response.data); // SETTING data here!
        localStorage.setItem('breeds', JSON.stringify(json.data)); 
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
