import React, { useEffect, useState } from 'react'
import './feed.css'
import Post from '../post/Post'
import Share from '../share/Share'
// import { Posts } from '../../dummyData'
import axios from "axios";

export default function Feed() {
const [posts, setPosts] = useState([]);

useEffect(()=>{
  const fetchPosts = async() => {
    try {
      await axios.get(`posts/timeline/6682f1e8a4275851273149d6`).then(res => {
        setPosts(res.data)
      })
    } catch (error) {
      console.log(error.response.data);
    }
  }
  fetchPosts();
},[])
  return (
    <div className='feed'>
      <div className="feedWrapper">
      <Share/>
      {posts.map((p) =>(
        <Post key={p.id} post={p}/>
      ))}
      </div>
    </div>
  )
}
