import { useState,useEffect } from 'react';
import ReactQuill from "react-quill";
import Parser from 'html-react-parser';
import 'react-quill/dist/quill.snow.css';
import style from "./Descripition.module.css"
import { HiMenuAlt2 } from 'react-icons/hi';
import { Button } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';

function Description({taskId}) {
  const contentData = JSON.parse(localStorage.getItem("description")) || ''
  // const taskContent = contentData.find((data) => data.taskid === taskId)
  // console.log(taskContent);
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(contentData);
  // const [desData, setDesContent] = useState();

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

  const handleContentChange = (e) => {
    setContent(e.target.value);
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
      {/* <ReactQuill value={content} onChange={handleContentChange} className={style.reactQuill}/> */}
      <input type="text" value={content} onChange={handleContentChange} className={style.desText}/>
      <div>
      <Button 
      variant="contained" 
      sx={{
       
      width: "5rem", 
      textTransform: "capitalize",
      
      }}
      onClick={handleSaveClick}
      >Save</Button>
      <Button 
      sx={{
       
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
      <div className={style.content}>{content}</div>
      </>
      }
    </div>
    </>
  );
};

export default Description;

