import { createSlice } from "@reduxjs/toolkit";

const ListSlice = createSlice({
  name: "ListSlice",
  initialState: {
    list: [],
  },
  reducers: {
    addList(state, action) {
      state.list.push(action.payload);
      // console.log("action is", action);
    },
    deleteList: (state, action) => {
      // state.list = state.list.filter((item) => item.id !== action.payload)
      state.list.splice(action.payload, 1);
      // console.log("delete",action.payload);
    },
    
    clearAll : (state, action) =>{
       state.list = []
    //    state.task = []
    },

    addTask(state, action) {
      // console.log('action=> ', action);
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
      // console.log(action.payload);
      state.list.forEach((item) => {
        if (item.id === action.payload.listId) {
          // console.log(item)
          //    item.task = item.task.filter((task) => task.id !== action.payload.id)
          item.task.splice(action.payload, 1);
        }
      });
    },

    reordedList: (state, action) => {
      state.list = action.payload;
      console.log(action);
    },
    editList: (state, action) => {
      // console.log('action', action);
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
  },
});

export const {
  addList,
  deleteList,
  clearAll,
  addTask,
  deleteTask,
  reordedList,
  editList,
  editTask,
} = ListSlice.actions;
export default ListSlice.reducer;
