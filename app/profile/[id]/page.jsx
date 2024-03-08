"use client"

import React,{useEffect, useState} from 'react'
import { useSearchParams } from 'next/navigation';
import Profile from '@components/Profile';

const CheckProfile = ({params}) => {

    const [posts,setPosts]=useState([]);
    const searchParams=useSearchParams();
    
    const userName = searchParams.get("name");

    useEffect(()=>{
      
        const getPosts=async()=>{
            const response=await fetch(`/api/users/${params?.id}/posts`)
            const data=await response.json();
            console.log("okkkkk"+data)
            setPosts(data);
        }
        if (params?.id) getPosts();
    },[params.id])

  return (
    <Profile
      name={userName}
      desc={`Welcome to ${userName} personalized profile page. Share your exceptional prompts and inspire others with the power of your imagination`}
      data={posts}
    />
  )
}

export default CheckProfile
