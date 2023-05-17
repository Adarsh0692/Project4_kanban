import React, { useState } from "react";
import { deleteList, deleteTask } from "../store/ListSlice";
import { useDispatch, useSelector } from "react-redux";
import EditIcon from '@mui/icons-material/Edit';
import style from "./DashBoard.module.css";
import DeleteIcon from "@mui/icons-material/Delete";
import Navbar from "./header/Navbar";
import AddNew from "./AddNew";
import Card from "./AddACard/Card";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";


export default function DashBoard() {
  const [isHover, setIsHover] = useState(true)
  const [items, setItems] = useState([])
  const list = useSelector((state) => state.ListSlice.list);
  const dispatch = useDispatch();

  function handleListDelete(item) {
    dispatch(deleteList(item.id));
    toast.success(`List ${item.title} Deleted successfully.`);

  }

  function handleDeleteTask(task) {
    const listName = list.filter((item) => item.id === task.listId)
    dispatch(deleteTask(task))
    toast.success(`Task ${task.title} from list ${listName[0].title} Deleted successfully.`);
  }

  return (
    <div className={style.dash_div}>
      <Navbar />
      <h1> New DashBoard</h1>
      <div className={style.dash_containor}>
        <div className={style.list_container}>
          {list.map((item) => (
            <div key={item.id} className={style.cardBox}>
              <div className={style.list_card}>
                <div className={style.listName}>
                  <span>{item.title}</span>
                  <span onClick={() => handleListDelete(item.id)}>
                    <DeleteIcon />
                  </span>
                </div>
                <div>
                  {item.task &&
                    item.task.map((task) => (
                      <div key={task.id} className={style.card}>
                        <Card cardData={task} />
                        <span> <EditIcon sx={{ fontSize: '20px' }} /></span>
                      </div>
                    ))}
                </div>
                <div className={style.cardBtn}>
                  <AddNew type="card" listId={item.id} />
                </div>
              </div>
            </div>
          ))}
        </div>
        <AddNew />
      </div>
    </div>
  );
}
