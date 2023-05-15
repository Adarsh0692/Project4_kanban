import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import style from "./Descripition.module.css"
import { HiMenuAlt2 } from 'react-icons/hi';
import { Button } from '@mui/material';

function Description(){
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState('');
  const [isEditBtnHide, setIsEditBtnHide] = useState(false)

  function handleClick(){
    setIsEditing(true);
  };

  function handleSaveClick(){
    if(content.length > 0){
    setIsEditBtnHide(true)
    }
    setIsEditing(false)
  }

  function handleCancleClick(){
    setIsEditing(false)
  }

  function removePTag(html){
    return html.replace(/^<p>/, '').replace(/<\/p>$/, '');
  };

  return (
    <>
    <div className={style.logoH1}>
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
      <ReactQuill value={content} onChange={setContent} className={style.reactQuill}/>
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
      {content !== "<p><br></p>" ? <div className={style.content}>{removePTag(content)}</div>:null}
      </>
      }
    </div>
    </>
  );
};

export default Description;

