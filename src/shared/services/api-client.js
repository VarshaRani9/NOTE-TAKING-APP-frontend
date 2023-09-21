// web service / backend api / web api call here
import axios from 'axios'
export const getNotes = async() => {
    try{
        const URL = process.env.REACT_APP_NOTES_URL;
        const response = await axios.get(URL);
        return response.data.notes;
    }
    catch(err){
        throw err;
    }
}

// write POST call
export const postNote = async(noteData) =>{
    try{
    const URL = process.env.REACT_APP_NOTE_ADD_URL;
    const response = await axios.post(URL,noteData)
    return response.data;
    }
    catch(err){
        throw err;
    }
}