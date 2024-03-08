import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const GET=async(request,{params})=>{
    try{
        await connectToDB();

        const prompt=await Prompt.findById(params.id).populate('creator');
        if(!prompt) return new Response("couldnt find prompt",{status:404});
        return new Response(JSON.stringify(prompt),{status:200});

    }catch(error){
        return new Response("Failed to fetch post",{status:500});
    }
}

export const PATCH=async(request,{params})=>{
    const {prompt,tag}=await request.json();

    try{
        await connectToDB();

        const existingPrompt=await Prompt.findById(params.id);
        if(!existingPrompt) return new Response('Couldnt find Prompt',{status:404});

        existingPrompt.tag=tag;
        existingPrompt.prompt=prompt;
        existingPrompt.save();
        return new Response("Successfully updated Prompt",{status:200});
    }catch(error){
        return new Response("Failed To update Prompt",{status:500});
    }
}

export const DELETE=async(request,{params})=>{
    try{
        await connectToDB();

        await Prompt.findByIdAndDelete(params.id);

        return new Response("Prompt deleted successfully", { status: 200 });
    }catch (error) {
        return new Response("Error deleting prompt", { status: 500 });
    }
}
