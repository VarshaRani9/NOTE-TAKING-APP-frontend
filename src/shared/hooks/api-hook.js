import { getNotes, postNote } from "../services/api-client"

// Api hook for making API Call
export const useApi = (method) =>{
    const apiCall = async(data={}) =>{
        if(method==="GET"){
            return await getNotes()
        }
        else if(method==="POST"){
            const note = await postNote(data)
            if(note && note.title)return {message:'Note Added to the DB'};
            else return {message:'Some problem in Adding Note'}
        }
    }
    return apiCall;
}