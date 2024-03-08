"use client";

import React, { useState, useEffect } from "react";
import Profile from "@components/Profile";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const MyProfile = () => {

    const {data:session}=useSession();
    const router=useRouter();
    
    const [posts,setPosts]=useState([]);

    useEffect(()=>{

        const fetchPosts=async()=>{
            const response = await fetch(`api/users/${session?.user.id}/posts`);
            const data=await response.json();
            setPosts(data);
        }
        if(session?.user.id) fetchPosts();

    },[])

    const handleEdit=(post)=>{
        router.push(`/update-prompt?id=${post._id}`);
    }

    const handleDelete=async(post)=>{
        const hasConfirmed=confirm("Are you sure?");
        if(hasConfirmed){
            try{
                await fetch(`/api/prompt/${post._id.toString()}`,{
                    method:'DELETE',
                })

                const filteredPosts=posts.filter(p=>p._id!==post._id);
                setPosts(filteredPosts);
            }catch(err){
                console.log(err);
            }
        }
    }

  return (
    <Profile
      name="My"
      desc="Welcome to your personalized profile page. Share your exceptional prompts and inspire others with the power of your imagination"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;
