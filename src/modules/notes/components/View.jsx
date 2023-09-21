import React, { useContext, useEffect, useState } from 'react'
import './View.css'
import Add from './Add'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { NoteContext } from '../context/note-context';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import Button from './Button'
import { getNotes } from '../../../shared/services/api-client';

const View = () => {

  const context = useContext(NoteContext);
  const navigate = useNavigate();

  // const getDataFromAPI = async () =>{
  //   const notes = await getNotes();
  //   console.log('Notes: '+notes);
  // }

  // // Mounting - 1 time
  // useEffect(()=>{
  //   console.log("mount");
  //   getDataFromAPI();
  // },[])

//   // Updation - multiple times
//   useEffect(()=>{
//     console.log("update");
//   },[]);

// // Unmounting - 1 time
// useEffect(()=>{
//   return function(){
//     console.log("Unmount");
//   }
// },[])

    const [input, setInput] = useState("");
    const searchParams = useSearchParams();
    let val = ''
    for(let [key, value] of searchParams[0].entries()){
      console.log(value);
        val = value;
    }
  return (
    <div>
      <NoteContext.Consumer>
        {(value)=>{
          // return (<h1>Value : {val} Notes length is : {value.notes.length}</h1>)
          return (
          <>
          {(val==="view" || val==="update") && context.filteredRecord()}
          <h1>Total notes are {value.notes.length}</h1>
          {/* added ****************** */}
          {val==="search" && <>
          <input onChange={(e)=>{
            setInput(e.target.value)
            }
            } type="text" />
          <i onClick={()=>{
                 context.filteredRecord(input)
          }} className="fa-brands fa-searchengin bold"></i>
          </>}
          <br/><br/>
          <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Note Id</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Desc</TableCell>
            <TableCell>Date</TableCell>
            {(val==="delete" || val==="update") &&
            <TableCell>Operation</TableCell>
            }
            </TableRow>
            </TableHead>
            <TableBody>
              {value?.notes?.map((note,index)=><TableRow className={note.isMarked?'red':''} key={index}>
                <TableCell>{index+1}</TableCell>
                <TableCell>{note.title}</TableCell>
                <TableCell>{note.desc}</TableCell>
                <TableCell>{note.date}</TableCell>

                {/* added ************* */}
                <TableCell>
                  {val==="update" && <i onClick={()=>{
                    console.log("note : ",note);
                    context.setCurrNote(note)
                    navigate("/dashboard/add-note/Add")
                }} className="fa-solid fa-pen-to-square hand"></i>}
                {
                val==="delete" && <><i onClick={()=>{
                    note.isMarked=!note.isMarked;
                    context.isMarking()//for re-rendering
                }} className="fa-solid fa-trash hand"></i>
                </>
                }
                </TableCell>
              </TableRow>)}
            </TableBody>
            </Table>
            </TableContainer>
            {(val==="delete") && <Button className='' fn={context.deleteRecords} val={val} disable={context.markCount===0} />}
          </>
          );
        }}
        </NoteContext.Consumer>
    </div>
  )
}

export default View