"use client"

import React,{useState,useEffect} from 'react'
import PromptCard from './PromptCard'

const Feed = () => {

    const [searchText,setSearchText]=useState('')
    const [allPosts,setAllPosts]=useState([])
    const [searchedResults,setSearchResults]=useState([]);

    function containsString(Obj,string){
        const searchString=string.toLowerCase().replace(/\s/g,'');
        return Object.values(Obj).some(value=>{
            if(typeof(value)==='string'){
                let val=value.toLowerCase().replace(/\s/g,'');
                return val.includes(searchString);
            }
            return false;
        })
    }
    
    const handleSearch=(e)=>{
        console.log(e)
        setSearchText(e.target.value)
        const filteredResults=allPosts.filter(post=>containsString(post,e.target.value));
        setSearchResults(filteredResults)
        
    }

    useEffect(()=>{
        const fetchPosts=async ()=>{
            const response=await fetch('api/prompt')
            const data=await response.json();
            console.log("response"+Object.values(data[0]))
            setAllPosts(data)
        }
        fetchPosts();

    },[])


    const handleTagClick=(tag)=>{
        setSearchText(tag)
        const filteredResults=allPosts.filter(post=>containsString(post,tag));
        setSearchResults(filteredResults)
    }


  return (
    <section className='feed'>
        <form className='relative w-full flex-center'>
            <input type="text" placeholder='Search for a tag or a username' value={searchText} onChange={handleSearch} required className='search_input peer'/>
        </form>
        
        {/* ALl prompts */}
        {searchText?(
            <PromptCardList data={searchedResults} handleTagClick={handleTagClick}/>
        ):
        <PromptCardList data={allPosts} handleTagClick={handleTagClick}/>
        }


    </section>

  )
}

export default Feed

const PromptCardList=({data,handleTagClick})=>{
    console.log("ok"+data[0]);
    return (
        <div className='mt-16 prompt_layout'>
            {data&&data.map((post)=>{
                return(
                    // <h1 key={post._id}></h1>
                    <PromptCard key={post._id} post={post} handleTagClick={handleTagClick}/>
                )
            })}

        </div>
    )
}
