import React, { useState } from "react";
import { deleteList, deleteTask } from "../store/ListSlice";
import { useDispatch, useSelector } from "react-redux";
import EditIcon from "@mui/icons-material/Edit";
import style from "./DashBoard.module.css";
import DeleteIcon from "@mui/icons-material/Delete";
import Navbar from "./header/Navbar";
import AddNew from "./AddNew";
import Card from "./AddACard/Card";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

export default function DashBoard() {
  const [isHover, setIsHover] = useState(true);
  const list = useSelector((state) => state.ListSlice.list);
  const dispatch = useDispatch();

  function handleListDelete(item) {
    dispatch(deleteList(item.id));
    toast.success(`List ${item.title} Deleted successfully.`);
  }

  function handleDeleteTask(task) {
    const listName = list.filter((item) => item.id === task.listId);
    dispatch(deleteTask(task));
    toast.success(
      `Task ${task.title} from list ${listName[0].title} Deleted successfully.`
    );
  }

  function onDragEnd(result) {
    // TODO: Handle the drag and drop logic
  }

  return (
    <div className={style.dash_div}>
      <Navbar />
      <h1> New DashBoard</h1>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppableList">
          {(provided) => (
            <div
              className={style.dash_containor}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              <div className={style.list_container}>
                {list.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided) => (
                      <div
                        className={style.cardBox}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                      >
                        <div className={style.list_card}>
                          <div className={style.listName}>
                            <span>{item.title}</span>
                            <span onClick={() => handleListDelete(item)}>
                              <DeleteIcon />
                            </span>
                          </div>
                          <Droppable droppableId={`droppableTask-${item.id}`}>
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                              >
                                {item.task &&
                                  item.task.map((task, index) => (
                                    <Draggable
                                      key={task.id}
                                      draggableId={task.id}
                                      index={index}
                                    >
                                      {(provided) => (
                                        <div
                                          className={style.card}
                                          {...provided.draggableProps}
                                          {...provided.dragHandleProps}
                                          ref={provided.innerRef}
                                        >
                                          <Card cardData={task} />
                                          <span>
                                            <EditIcon sx={{ fontSize: "20px" }} />
                                          </span>
                                        </div>
                                      )}
                                    </Draggable>
                                  ))}
                                {provided.placeholder}
                              </div>
                            )}
                          </Droppable>
                          <div className={style.cardBtn}>
                            <AddNew type="card" listId={item.id} />
                          </div>
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
              </div>
              <AddNew/>
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

