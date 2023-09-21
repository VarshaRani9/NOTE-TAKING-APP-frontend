import { Container, Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Header from '../../../shared/components/Header'
import SideBar from '../components/SideBar'
import Main from '../components/Main'
import { useLocation } from 'react-router-dom'
import { NoteContext } from '../context/note-context'
import { getNotes } from '../../../shared/services/api-client'

const NoteDashBoard = () => {
  const location = useLocation();
  const [notes,setNotes] = useState([]);
  const [allNotes,setAllNotes] = useState([]);
  console.log("location : ",location.search);

  // for re-rendering
  const isMarking = () =>{
    setNotes([...notes]);
 }

 const setCurrNote = (note) =>{
  if(note)setNotes(note);
  console.log("note in set curr note",note);
  console.log("notes in set curr note",notes);
  return notes;
 }

 const getMarkedCount = () =>notes.filter((e)=>e.isMarked).length
  
  const deleteRecords = () =>{
    setAllNotes(allNotes.filter(note=>!note.isMarked))
    return setNotes(allNotes.filter(note=>!note.isMarked))
  }

  const filteredRecord = (val) =>{
    if(location.search==='?type=update' || location.search==='?type=view'){
      return setNotes(allNotes)
    }
    else return setNotes(allNotes.filter(product=>product?.title?.toLowerCase()?.includes(val.toLowerCase())))
  }

  const getNote = (note) =>{
    return note;
  }

  const getDataFromAPI = async () =>{
    const notes = await getNotes();
    setNotes(notes)
    setAllNotes(notes)
    console.log('Notes: '+notes);
  }

  // Mounting - 1 time
  useEffect(()=>{
    console.log("mount");
    getDataFromAPI();
  },[])

  if(location && location.state){
    localStorage.setItem('username',location.state.username)
  }
  const addNote = (noteObject) =>{
    console.log("received note from add",noteObject);
    const cloneNotes = [...notes];
    cloneNotes.push(noteObject)
    setNotes(cloneNotes)
  }
  return (
    <Container>
      {/* {location && location.state && <Header username = {location.state.username}/>} */}
      <Header username = {localStorage.getItem('username')}/>
      <Grid container spacing={2}>
  <Grid item xs={4}>
    <SideBar />
  </Grid>
  <Grid item xs={8}>
    {/* ************** added ******** */}
    <NoteContext.Provider value={{notes:notes,addSingleNote:addNote,markCount:getMarkedCount,isMarked:false,isMarking:isMarking,deleteRecords:deleteRecords,filteredRecord:filteredRecord,getNote:getNote,setCurrNote:setCurrNote,
    }}>
    <Main />
    </NoteContext.Provider>
  </Grid>
  </Grid>
    </Container>
  )
}

export default NoteDashBoard