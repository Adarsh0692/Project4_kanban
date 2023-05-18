import React, { useState } from 'react';
import { MdSubtitles } from 'react-icons/md';
import style from "./Title.module.css";
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Title = ({title,listName}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [headingText, setHeadingText] = useState(title);
  const navigate = useNavigate()
  

  const handleHeadingClick = () => {
    setIsEditing(true);
  };

  const handleInputChange = (e) => {
    setHeadingText(e.target.value);
  };

  const handleInputBlur = () => {
    setIsEditing(false);
  };
// console.log(list);
// console.log(title);
  return (
    <div className={style.mainContainer}>
      <div className={style.iconH2}>
      <div><MdSubtitles className={style.icon}/></div>
      <div>

     
      {isEditing ? (
        <input
          type="text"
          value={headingText}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
        />
      ) : (
        <h3 onClick={handleHeadingClick}>{headingText}</h3>
      )}
       </div>
       <div className={style.cross}>
         <CloseIcon onClick={() => navigate('/')}/>
       </div>
      </div>
      <div className={style.p}>
      <span>In list {listName}</span>
      </div>
    </div>
  );
};

export default Title; 