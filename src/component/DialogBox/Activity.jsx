import React from 'react';
import style from "./Activity.module.css";
import { useState } from 'react';
import { Button } from '@mui/material';
import ReactQuill from 'react-quill';
import Parser from 'html-react-parser';
import 'react-quill/dist/quill.snow.css';
import { RxActivityLog } from 'react-icons/rx';
import Avatar from '@mui/material/Avatar';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { ToastContainer, toast } from 'react-toastify';


export default function Activity() {
  const updatedCommentData = JSON.parse(localStorage.getItem("commentData")) || [];
  const [text, setText] = useState("");
  const [arr, setArr] = useState(updatedCommentData);
  const [isEditing, setIsEditing] = useState(false);
  const [showAndHideDetailes, setshowAndHideDetailes] = useState("Hide details");

  const handleClick = () => {
    setIsEditing(true);
  };

  const handleContentChange = (value) => {
    setText(value);
  };

  const getTextFromHTML = (html) => {
    const parsedHtml = Parser(html);
    return parsedHtml;
  };

  const handleSaveClick = () => {
    if (text) {
      var today = new Date();
      var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
      var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      var dateTime = date + ' ' + time;
      setArr([...arr, { text: getTextFromHTML(text), time: dateTime }]);
    } else {
      toast.warning('Cannot be empty');
    }
    setText("");
    setIsEditing(false);
  };

  const handleClickDelete = (index) => {
    let result = arr.filter((ele, i) => i !== index);
    setArr(result);
  };

  const handleShowAndHideComments = () => {
    let result = showAndHideDetailes === "Hide details" ? "Show details" : "Hide details";
    setshowAndHideDetailes(result);
  };

  localStorage.setItem("commentData", JSON.stringify(arr));

  return (
    <div className={style.mainContainer}>
      <div className={style.iconH2Button}>
        <div className={style.iconeH2}>
          <RxActivityLog className={style.logo} />
          <h2>Activity</h2>
        </div>
        <div>
          <Button
            variant='contained'
            onClick={handleShowAndHideComments}
            sx={{
              textTransform: "capitalize",
              backgroundColor: "var(--ds-background-neutral,#091e420a)",
              color: "black",
            }}
          >
            {showAndHideDetailes}
          </Button>
        </div>
      </div>
      {isEditing ? (
        <div className={style.textAreaButton}>
          <ReactQuill
            className={style.reactQuill}
            value={text}
            onChange={handleContentChange}
          />
          <Button
            variant='contained'
            onClick={handleSaveClick}
            sx={{
              width: "5rem",
              textTransform: "capitalize",
            }}
          >
            Save
          </Button>
        </div>
      ) : (
        <div className={style.avatar}>
          <Avatar src="/broken-image.jpg" />
          <div onClick={handleClick} className={style.activityDiv}>
            Write a comment...
          </div>
        </div>
      )}
      {arr.map((ele, index) => {
        return (
          <div key={index} className={style.commentsEditAndDelete}>
            {showAndHideDetailes === "Hide details" && (
              <>
                <div className={style.timeAndDelete}>
                  <Avatar src="/broken-image.jpg" />
                  <div className={style.h3}>
                    <h3>Adarsh</h3>
                  </div>
                  <div className={style.time}>{ele.time}</div>
                  <div className={style.Delete}>
                    <div onClick={() => handleClickDelete(index)}>
                      <DeleteForeverIcon />
                    </div>
                  </div>
                </div>
                <div>
                  <div className={style.comments}>{ele.text}</div>
                </div>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}

