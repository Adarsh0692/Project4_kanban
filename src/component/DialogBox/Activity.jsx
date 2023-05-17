import React from 'react'
import style from "./Activity.module.css"
import { useState, useRef } from 'react'
import { Button } from '@mui/material'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { RxActivityLog } from 'react-icons/rx';
import DOMPurify from 'dompurify';
import Avatar from '@mui/material/Avatar';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';


export default function Activity() {
  const updatedCommentData = JSON.parse(localStorage.getItem("commentData")) || []
  const [text, setText] = useState("")
  const [arr, setArr] = useState(updatedCommentData)
  const [isEditing, setIsEditing] = useState(false);
  const [showAndHideDetailes, setshowAndHideDetailes] = useState("Hide detailes")
  const editorRef = useRef(null);

  

  function handleClick() {
    setIsEditing(true)
  }

  function handleSaveClick() {
    if (text) {
      var today = new Date();
      var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
      var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      var dateTime = date + ' ' + time;
      setArr([...arr, { text: text, time: dateTime }])
    } else {
      return alert("can not be empty")
    }
    setText("")
    setIsEditing(false)
  }

  // function removePTag(html){
  //   return html.replace(/^<p>/, '').replace(/<\/p>$/, '');
  // };

  function handleClickDelete(index) {
    let result = arr.filter((ele, i) => i !== index)
    setArr(result)
  }

  function handleShowAndHideComments() {
    let result = showAndHideDetailes === "Hide detailes" ? "Show detailes" : "Hide detailes"
    setshowAndHideDetailes(result)
  }

  const handleChange = (value) => {
    const sanitizedHTML = DOMPurify.sanitize(value, {
      ALLOWED_TAGS: [], // Remove all tags except the ones specified
      KEEP_CONTENT: true, // Keep tag contents
    });

    setText(sanitizedHTML);
    setCursorToEnd(); // Set the cursor position to the end
  };

  const setCursorToEnd = () => {
    if (editorRef.current) {
      const editor = editorRef.current.getEditor();
      const length = editor.getLength();
      editor.setSelection(length, length);
      editor.focus();
    }
  };

  localStorage.setItem("commentData", JSON.stringify(arr))

  return (
    <div className={style.mainContainer}>
      <div className={style.iconH2Button}>
        <div className={style.iconeH2}>
          <RxActivityLog className={style.logo} />
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
          <ReactQuill ref={editorRef} className={style.reactQuill} value={text} onChange={handleChange} />
          <Button variant='contained' onClick={handleSaveClick} sx={{
            marginTop: "2.5rem",
            width: "5rem",
            textTransform: "capitalize",
            marginLeft: "2.7rem"
          }}>Save</Button>
        </div>
      )
        :
        <div className={style.avatar}>
        <Avatar src="/broken-image.jpg" />
        <div onClick={handleClick} className={style.activityDiv}>Write a comment...</div>
        </div>
      }
      {arr.map((ele, index) => {
        return <div key={index} className={style.commentsEditAndDelete}>
          {showAndHideDetailes === "Hide detailes" ? <>
          <div className={style.timeAndDelete}>
          <Avatar src="/broken-image.jpg" />
          <div className={style.h3}><h3 >Aditya Shaw</h3></div>
            <div className={style.time}>{ele.time}</div>
            <div className={style.Delete}>
              <div onClick={() => handleClickDelete(index)}><DeleteForeverIcon/></div>
              </div>
            </div>
            <div>
          <div className={style.comments}>{ele.text}</div>
          </div>
            </> : null}
        </div>
      })}
    </div>
  )
}
