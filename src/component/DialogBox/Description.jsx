import { useState,useEffect } from 'react';
import ReactQuill from "react-quill";
import Parser from 'html-react-parser';
import 'react-quill/dist/quill.snow.css';
import style from "./Descripition.module.css"
import { HiMenuAlt2 } from 'react-icons/hi';
import { Button } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';

function Description() {
  const contentData = JSON.parse(localStorage.getItem("description")) || ""
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(contentData);
  const [isEditBtnHide, setIsEditBtnHide] = useState(false)

  useEffect(() => {
    if (contentData) {
      setIsEditBtnHide(true)
    }
  }, [contentData])


  function handleClick() {
    setIsEditing(true);
  };


  function handleSaveClick() {
    if (content) {
      setIsEditBtnHide(true)
    } else {
      toast.warning('can not be empty')
    }
    setIsEditing(false)
  }

  function handleCancleClick() {
    setIsEditing(false)
    setIsEditBtnHide(false)
    setContent("")
  }

  const handleContentChange = (value) => {
    setContent(value);
  };

  const getTextFromHTML = (html) => {
    const parsedHtml = Parser(html);
    return parsedHtml;
  };

  localStorage.setItem('description', JSON.stringify(content));


  return (
    <>
    <div className={style.logoH1}>
    <ToastContainer position="top-center" autoClose='2000' />
    <div><HiMenuAlt2 className={style.logo}/></div>
    <h2>Description</h2>
    {isEditBtnHide && <Button sx={{
    textTransform: "capitalize",
    backgroundColor: "var(--ds-background-neutral,#091e420a)",
    color: "black",
    }} onClick={() => setIsEditing(true)}>Edit</Button>}
    </div>
    <div>
      {isEditing ? 
      <div className={style.textAreaButtons}>
      <ReactQuill value={content} onChange={handleContentChange} className={style.reactQuill}/>
      <div>
      <Button 
      variant="contained" 
      sx={{
      marginTop: "2.5rem", 
      width: "5rem", 
      textTransform: "capitalize",
      marginLeft: "2.7rem"
      }}
      onClick={handleSaveClick}
      >Save</Button>
      <Button 
      sx={{
      marginTop: "2.5rem", 
      width: "5rem", 
      textTransform: "capitalize"
      }}
      onClick={handleCancleClick}
      >Cancel</Button>
      </div>
      </div> 
      :
      <>
      {!isEditBtnHide && <div onClick={handleClick} className={style.DescriptionDiv}>Add a more detailed descripition...</div>}
      <div className={style.content}>{getTextFromHTML(content)}</div>
      </>
      }
    </div>
    </>
  );
};

export default Description;

