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

const PostList = () => {
    const [posts, setPosts] = useState([]); // this is where data is "set"

  useEffect(() => {
        axios.get('https://jsonplaceholder.typicode.com/posts')
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
