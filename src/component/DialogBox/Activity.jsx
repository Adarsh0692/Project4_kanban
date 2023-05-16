import React from 'react'
import style from "./Activity.module.css"
import { useState } from 'react'
import { Button } from '@mui/material'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { RxActivityLog } from 'react-icons/rx';


export default function Activity() {

  const [text, setText] = useState("")
  const [arr, setArr] = useState([])
  const [isEditing, setIsEditing] = useState(false);
  const [showAndHideDetailes, setshowAndHideDetailes] = useState("Hide detailes")

  function handleClick(){
    setIsEditing(true)
  }

  function handleSaveClick(){
    if(text){
    let time = new Date().toLocaleDateString()
    setArr([...arr,{text:text,time:time}])
    }else{
      return alert("can not be empty")
    }
    setText("")
    setIsEditing(false)
  }

  function removePTag(html){
    return html.replace(/^<p>/, '').replace(/<\/p>$/, '');
  };

  function handleClickDelete(index){
    let result = arr.filter((ele,i) => i !== index)
    setArr(result)
  }

  function handleShowAndHideComments(){
      let result = showAndHideDetailes === "Hide detailes" ? "Show detailes":"Hide detailes"
      setshowAndHideDetailes(result)
  }

  return (
    <div className={style.mainContainer}>
      <div className={style.iconH2Button}>
      <div className={style.iconeH2}>
      <RxActivityLog className={style.logo}/>
      <h2>Activity</h2>
      </div>
      <div>
      <Button variant='contained' 
      onClick={handleShowAndHideComments}
      sx={{
      textTransform: "capitalize",
      backgroundColor: "var(--ds-background-neutral,#091e420a)",
      color: "black",
      }}>{showAndHideDetailes}</Button>
      </div>
      </div>
      {isEditing ? (
      <div className={style.textAreaButton}>
      <ReactQuill className={style.reactQuill} value={text} onChange={setText}/>
      <Button variant='contained' onClick={handleSaveClick} sx={{
      marginTop: "2.5rem", 
      width: "5rem", 
      textTransform: "capitalize",
      marginLeft: "2.7rem"
      }}>Save</Button>
      </div>
      )
      :
      <div onClick={handleClick} className={style.activityDiv}>Write a comment...</div>
    }
      {arr.map((ele,index) => {
        return <div key={index} className={style.commentsEditAndDelete}>
              {showAndHideDetailes === "Hide detailes" ? <><div className={style.comments}>{removePTag(ele.text)}</div>
               <div className={style.time}>{ele.time}</div>
              <div className={style.editAndDelete}>
               <p onClick={() => handleClickDelete(index)}>Delete</p>
               </div></>:null}
               </div>
      })}
    </div>
  )
}
