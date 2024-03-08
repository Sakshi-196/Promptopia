"use client"

import React,{useState,useEffect} from 'react'

import { useRouter,useSearchParams } from 'next/navigation'
import Form from '@components/Form'

const UpdatePrompt = () => {
    const router=useRouter()
    const paramsId=useSearchParams().get("id");
    
   const [submitting,setSubmitting]=useState(false)
   const [post,setPost]=useState({
    prompt:'',
    tag:''
   })

   useEffect(()=>{
    const getPromptDetails=async()=>{
        const response=await fetch(`api/prompt/${paramsId}`)
        const data=await response.json();
        setPost({prompt:data.prompt,tag:data.tag});
    }
    if(paramsId) getPromptDetails();
   },[])

   const editPrompt=async(e)=>{
        e.preventDefault();
        setSubmitting(true)

        if(!paramsId) return alert("Missing PromptId!");
        
        try{
            const response=await fetch(`api/prompt/${paramsId}`,{
                method:'PATCH',
                body:JSON.stringify({
                    prompt:post.prompt,
                    tag:post.tag
                })
            })
            
            if(response.ok){ 
                router.push("/");
            }
        }catch(error){
            console.log(error);
        }finally{
            setSubmitting(false);
        }
        
   }


  return (
    <Form type='Edit' post={post} setPost={setPost} submitting={submitting} handleSubmit={editPrompt}/>

  
  )
}

export default UpdatePrompt
