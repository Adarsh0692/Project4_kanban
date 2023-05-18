import React, { useRef, useState } from "react";
import { deleteList, deleteTask, reordedList,editList,editTask } from "../store/ListSlice";
import { useDispatch, useSelector } from "react-redux";
import style from './DashBoard.module.css'
import DeleteIcon from "@mui/icons-material/Delete";
import Navbar from "./header/Navbar";
import AddNew from "./AddNew";
import Card from "./AddACard/Card";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";






export default function DashBoard({ selectedImage }) {
  const [isHover, setIsHover] = useState(true)
  const [editingListId, setEditingListId] = useState(null);
 
  const textRef =useRef(null)
 
  const list = useSelector((state) => state.ListSlice.list);
  // const [list , setList] = useState(lists)
  const dispatch = useDispatch();


  function handleListDelete(item) {
    dispatch(deleteList(item.id));
    // console.log(item.id)
    toast.success(`List ${item.title} Deleted successfully.`);
  }

  function handleDeleteTask(task) {
    const listName = list.filter((item) => item.id === task.listId)
    dispatch(deleteTask(task))
    toast.success(`Task ${task.title} from list ${listName[0].title} Deleted successfully.`);
  }

  function handleToggleEdit(item) {
    
    setEditingListId(item.id);
    
  }
  function handleChangeblur(itemId){
   const updated= (textRef.current.value);
    setEditingListId(null)
    dispatch(editList({updated, itemId}))
    
  }

  function handleEditTask(task){
 console.log('hello', task)
  }

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
    function reorder(list, startIndex, endIndex) {
      const result = Array.from(list);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);
      return result;
    }
    console.log(reorder);
    dispatch(reordedList(reorder))
  }

  const getListStyle = (isDraggingOver) => ({
      // background: isDraggingOver? 'lightblue' : 'lightgrey' ,
      // padding : 8,
      //  width: 250,
  })

  const getItemStyle = (isDragging, draggableStyle) => ({
    userSelect: 'none',
    padding: 16,
    margin: '0 0 8px 0',
    // background: isDragging? 'lightgreen' : 'grey',
    ...draggableStyle
  })

  return (
    
    <div className={style.dash_div} >
      <div  className={style.image} style={{ backgroundImage: `url(${selectedImage})` }}>
      
      <Navbar />

      <ToastContainer position="top-center" autoClose='2000' />
     <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided, snapshot) =>(
          <div {...provided.droppableProps} ref={provided.innerRef} style={getListStyle(snapshot.isDraggingOver)}>

         
      <div className={style.dash_containor}>
        <div className={style.list_container}>
          {list.map((item,index) => (
            <Draggable key={item.id} draggableId={item.id} index={index}>
              {(provided, snapshot) =>(

            
            <div ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
             className={style.cardBox}>
              <div className={style.list_card}>
                <div className={style.listName} 
                // onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}
                >

                 {editingListId === item.id?  (
                  <input 
                  className={style.editInput}
                  type="text"
                  ref={textRef}
                  autoFocus
                   defaultValue={item.title}
                   onBlur={() =>handleChangeblur(item.id)}
                  />
                 ) : (<span onClick={() => handleToggleEdit(item)} >{item.title}</span>) }
                <div  className={style.divicon} onClick={() => handleListDelete(item)}>
                  <DeleteIcon className={style.icon} sx={{fontSize:'20px', cursor:'pointer'}} />
                </div>
                </div>
                <div>
                  {item.task &&
                    item.task.map((task) => (
                      <div key={task.id} className={style.card} draggable >
                        <Card cardData={task} handleDeleteTask={()=>handleDeleteTask(task)}/>
                        {/* <div className={style.edIcon}>
                        <span> <EditIcon sx={{fontSize:'15px',cursor:'pointer'}} onClick={()=>handleEditTask(task)}/></span>
                       <p><DeleteIcon sx={{fontSize:'15px', cursor:'pointer'}} onClick={()=>handleDeleteTask(task)}/></p>
                       </div> */}
                      </div>
                    ))}
                </div>
                <div className={style.cardBtn}>
                  <AddNew type="card" listId={item.id} />
                </div>
              </div>
            </div>
              )}
            </Draggable>
          ))}
        </div>
        <div className={style.AddNewbtn}>
        <AddNew />
        </div>
        
      </div>
      </div>
        )}
      </Droppable>
      </DragDropContext>
    </div>
</div>
  );
}

