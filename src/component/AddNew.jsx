import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import style from "./DashBoard.module.css";
import { useDispatch } from "react-redux";
import { addList, addTask } from "../store/ListSlice";
import { nanoid } from "nanoid";


export default function AddNew({type, listId}) {
  const [input, setInput] = useState("");
  const [isFormVisible, setIsFormVisible] = useState(true);

  const dispatch = useDispatch()

  function handleListInput(e) {
    setInput(e.target.value);
  }

  function handleAddList(e) {
    e.preventDefault();
    if(type && input){
          dispatch(addTask({id: nanoid(7), title: input, listId: listId}))
    }else
    if(input){
    dispatch(addList({id: nanoid(6), title: input}))
    }
    setInput('')
  }

  return (
    <div>
      {isFormVisible ? (
        <Button
          onClick={() => setIsFormVisible(false)}
          className={style.addbtn}
          variant="text"
        >
          + Add New
        </Button>
      ) : (
        <div className={style.addList_div}>
          <form onSubmit={handleAddList}>
           {type? <TextField  value={input} sx={{backgroundColor:'whitesmoke'}} onChange={handleListInput} placeholder="Add new card..."/> : <input type="text" value={input} onChange={handleListInput} placeholder="Enter list title" />}
            <div className={style.crossbtn}>
              <Button
                sx={{ height: "30px", textTransform: "capitalize" }}
                autoFocus={true}
                variant="contained"
                type='submit'
                
              >
                Add
              </Button>
              <CloseIcon onClick={() => setIsFormVisible(true)} sx={{fontSize:'30px',color:'black',cursor: 'pointer'}} />
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
