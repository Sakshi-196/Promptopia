import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const GET=async(request,{params})=>{
    try{
        await connectToDB();

        const posts=await Prompt.find({creator:params.id}).populate('creator')
        console.log("yeah"+posts);
        return new Response(JSON.stringify(posts),{status:200});
    }catch(error){
        return new Response("Failed to fetch prompts created by user", { status: 500 })
    }
}   
