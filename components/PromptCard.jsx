"use client"

import React,{useState} from 'react'
import { useSession } from 'next-auth/react'
import { usePathname,useRouter } from 'next/navigation'
import Image from 'next/image'
import copy from '@public/assets/icons/copy.svg'
import tick from '@public/assets/icons/tick.svg'

const PromptCard = ({post,handleTagClick,handleEdit,handleDelete}) => {

    const {data:session}=useSession();
    const pathname=usePathname();
    const router=useRouter();
    const [copied,setCopied]=useState('');
    console.log("post"+post.creator)

    const handleProfileClick=()=>{
        if (post.creator._id === session?.user.id) return router.push("/profile");

        router.push(`/profile/${post.creator._id}?name=${post.creator.username}`);
    }

    const handleCopy=()=>{
        setCopied(post.prompt)
        navigator.clipboard.writeText(post.prompt);
        setTimeout(()=>setCopied(false),3000);
    }

  return (
    <div className='prompt_card' >
        <div className="flex justify-between items-start gap-5">
            <div  className='flex-1 flex justify-start items-center gap-3 cursor-pointer'
                onClick={handleProfileClick}>
                    <Image loader={()=>post?.creator.image} src={post?.creator.image} alt='creator_image' width={40} height={40} className='rounded-full object-contain'/>
                    <div className='flex flex-col'>
                        <h3 className='font-satoshi font-semibold text-gray-900'>
                            {post.creator.username}
                        </h3>
                        <p className='font-inter text-sm text-gray-500'>
                            {post.creator.email}
                        </p>
                    </div>
                    <div className='copy_btn' onClick={handleCopy}>
                        <Image src={copied===post.prompt?tick:copy} alt={copied === post.prompt ? "tick_icon" : "copy_icon"} width={12} height={12}/>
                    </div>
            </div>

        </div>
            <p className='my-4 font-satoshi text-sm text-gray-700'>{post.prompt}</p>
            <p className='font-inter text-sm blue_gradient cursor-pointer' onClick={()=>handleTagClick&&handleTagClick(post.tag)}>
                #{post.tag}
            </p>

            {session?.user.id===post.creator._id&& pathname==='/profile'&&(
                <div className='mt-5 flex-center gap-4 border-t border-gray-100 pt-3'>
                    <p  className='font-inter text-sm green_gradient cursor-pointer'
                         onClick={()=>handleEdit(post)}> 
                         Edit
                    </p>
                    <p className='font-inter text-sm orange_gradient cursor-pointer'
                         onClick={()=>handleDelete(post)}> 
                         Delete

                    </p>
                 </div>
            )
                }

    </div>
  )
}

export default PromptCard
