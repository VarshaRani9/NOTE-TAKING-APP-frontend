import React, { useContext, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import {Button, TextField} from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { NoteContext } from '../context/note-context';
import {useForm} from 'react-hook-form'
import dayjs from 'dayjs';
import { useApi } from '../../../shared/hooks/api-hook';
// Add & update screen is same

const Add = () => {

  const apiCall = useApi('POST')
  const [dateValue, setDateValue] = React.useState(dayjs('2022-04-17'));
  const {register, handleSubmit, formState:{errors}, reset} = useForm()
  // console.log({...register('password')});
  const [message, setMessage] = useState('');
    const params = useParams();
    // const nameRef = useRef()
    // const descRef = useRef()
    // const dateRef = useRef()
    const errorStyle = {
      color : 'red'
    }
    const noteContext = useContext(NoteContext)
    // const takeInput = () =>{
    //   const noteObject = {
    //     title : nameRef.current.value,
    //     desc : descRef.current.value,
    //     date : dateRef.current.value
    //   }
    //   noteContext.addSingleNote(noteObject)
    //   console.log(noteObject);
    //   setMessage('Note added!')
    // }
    const getFormData = async(formData) =>{
      console.log('form data : '+formData);
      noteContext.addSingleNote(formData)
      const result = await apiCall(formData)
      setMessage(result.message)
    }

    // const giveError = () => {
    //   throw new Error("Error...");
    // }

    return (
      <form onSubmit={handleSubmit(getFormData)}>

      {/* VALUE SET FOR TITLE, DISC, DATE FROM NOTE OF UPDATE BUT THESE ARE NO MORE EDITABLE ?????????????? */}
      {/* //// {console.log("context : ",noteContext.setCurrNote().title)} */}

        <h1>{params.operationname} Note {message}</h1>
    <br/>
        {/* <TextField inputRef={nameRef} id="outline-basic" label="Title" variant="filled" /> */}
        <TextField {...register('title',{required:true, min:3, max:10})} id="outline-basic" label="Title"
        value={noteContext.setCurrNote().title } variant="filled" />
        {errors && errors.title && errors.title.type==='required' && <p style={errorStyle}>Title Cant be empty</p>}
        <br/>
    <br/>

{/* custom validations */}
        <TextField {...register('desc',{
          validate:{
            checkLength:(value)=>value.length>7
          }
        })} id="outlined-multiline-static" label="Desc" value={noteContext.setCurrNote().desc|| ""} 
        contentEditable="true"
        variant="filled" multiline rows={4}/>
        {errors && errors.desc && errors.desc.type==='checkLength' && <p style={errorStyle}>Length is less than 7</p>}
        <br/>
    <br/>

        {/* {giveError()} */}

        <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker {...register('date')} value={dateValue}
          onChange={(newValue) =>setDateValue(noteContext.setCurrNote().date) || setDateValue(newValue)} label="Note Date"/>
          {/* <DatePicker value={dateValue}
          onChange={(newValue) => setDateValue(newValue)} {...register('date')} label="Note Date"/> */}
        </LocalizationProvider>
    <br/>
    <br/>
    {/* <Button onClick={takeInput} variant="contained">Add Note</Button> */}
    <Button type='submit' variant="contained">Add Note</Button>
    &nbsp;&nbsp;
    <Button onClick={()=>reset({title:'',desc:'',date:setDateValue(dayjs('2023-01-04'))})} variant="contained">RESET Note</Button>
    </form>
  )

}

export default Add