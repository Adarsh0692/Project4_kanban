import { createSlice } from "@reduxjs/toolkit";

const ListSlice = createSlice({
  name: "ListSlice",
  initialState: {
    list: [],
  },
  reducers: {
    addList(state, action) {
      state.list.push(action.payload);
      
     
    },
    deleteList: (state, action) => {
      state.list = state.list.filter((item) => item.id !== action.payload)
     
    },

    clearAll: (state, action) => {
      state.list.splice(action.payload, state.list.length);
     
    },

    addTask(state, action) {
    
      state.list.forEach((item) => {
        if (item.id === action.payload.listId) {
          if (Object.hasOwn(item, "task")) {
            item.task.push(action.payload);
            let arr = [];
          } else {
            item.task = [];
            item.task.push(action.payload);
          }
        }
      });
    },
    deleteTask: (state, action) => {
     
      state.list.forEach((item) => {
       
        if (item.id === action.payload.listId || item.id === action.payload.id) {
        
             item.task = item.task.filter((task) => task.id !== action.payload.id)
        }
      });
    },

    reorderList: (state, action) => {
      const { source, destination, draggableId } = action.payload;
    
      const sourceList = state.list.find((item) => item.id === source.droppableId);
      const destinationList = state.list.find((item) => item.id === destination.droppableId);
    
      if (source.droppableId === destination.droppableId) {
        const sourceTask = sourceList.task.find((task) => task.id === draggableId);
        sourceList.task.splice(source.index, 1);
        sourceList.task.splice(destination.index, 0, sourceTask);
      } else {
        const taskToMove = sourceList.task.find((task) => task.id === draggableId);
        const updatedTask = { ...taskToMove, listId: destination.droppableId };
        sourceList.task = sourceList.task.filter((task) => task.id !== draggableId);
        destinationList.task.splice(destination.index, 0, updatedTask);
      }
    },

 
    
    
    editList: (state, action) => {
      
      const { itemId, updated } = action.payload;
      const list = state.list.find((item) => item.id === itemId);
      if (list) {
        list.title = updated;
      }
    },
    editTask: (state, action) => {
      const { updated, cardData } = action.payload;
      state.list.forEach((item) => {
        if (item.id === cardData.listId) {
          const taskData = item.task.find((item) => item.id === cardData.id);
          if (taskData) {
            taskData.title = updated;
          }
        }
      });
    },
    description: (state,action) => {
     
      const { content, cardData} = action.payload;
      state.list.forEach((item) => {
      if(item.id === cardData.listId){
        
        const taskData = item.task.find((item) => item.id === cardData.id);
          if (taskData) {
            taskData.description = content; 
          }
      }
    })
    },
    activity: (state,action) => {
     
      const {id, comment, time, cardData} = action.payload;
      state.list.forEach((item) => {
      if(item.id === cardData.listId){
        
        const taskData = item.task.find((item) => item.id === cardData.id);
          if (taskData) {
            taskData.activity.push({id,comment: comment,time: time}) 
          }
      }
    })
    },
    deleteActivity: (state, action) => {
           
            const {id, cardData} = action.payload
      state.list.forEach((item) => {
        if(item.id === cardData.listId){
          
          const taskData = item.task.find((item) => item.id === cardData.id);
            if (taskData) {
              taskData.activity = taskData.activity.filter((item) => item.id !== id)
            }
        }
      })
    }
  },
});

export const {
  addList,
  deleteList,
  clearAll,
  addTask,
  deleteTask,
  reorderList,
  editList,
  editTask,
  description,
  activity,
  deleteActivity
} = ListSlice.actions;
export default ListSlice.reducer;