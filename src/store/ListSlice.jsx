import { createSlice } from "@reduxjs/toolkit";

const ListSlice = createSlice({
    name: 'ListSlice',
    initialState: {
        list:[],
        
    },
    reducers: {
      addList (state, action) {
        state.list.push(action.payload)
        // console.log("action is", action);
    },
    deleteList: (state,action) => {
        state.list = state.list.filter((item) => item.id !== action.payload)
        // console.log("delete",action.payload);
    },
    addTask (state, action) {
        // console.log('action=> ', action);
        state.list.forEach((item) => {
            if(item.id === action.payload.listId){
                if(Object.hasOwn(item, 'task')){
                    item.task.push(action.payload)
                   let arr = []
                }else{
                    item.task =[];
                    item.task.push(action.payload)
                }
            }
        })
    },
    deleteTask: (state, action) => {
        // console.log(action.payload);
        state.list.forEach((item) => {
            if(item.id === action.payload.listId){
                // console.log(item)
               item.task = item.task.filter((task) => task.id !== action.payload.id)
            }
        })

    },


}

})

export const {addList,deleteList,addTask,deleteTask} = ListSlice.actions;
export default ListSlice.reducer