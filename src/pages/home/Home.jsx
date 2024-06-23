import React from 'react'
import './home.css'
import Topbar from '../../components/topbar/Topbar'
import Sidebar from '../../components/sidebar/Sidebar';
import Feed from '../../components/feed/Feed';
import Post from '../../components/post/Post';

function Home() {
  return (
    <>
      <Topbar/>
      <div className="homeContainer">
      <Sidebar/>
      <Feed/>
      </div>
    </>
  );
}

export default Home