import { createSlice } from "@reduxjs/toolkit";

const rtnSlice = createSlice({
    name:'realTimeNotification',
    initialState:{
        likeNotification:[],
    },
    reducers:{
        setLikeNotification:(state,action)=>{
            if(action.payload.type === 'like'){
                state.likeNotification.push(action.payload);
            }else if(action.payload.type === 'dislike'){
                state.likeNotification = state.likeNotification.filter((item)=> item.userId !== action.payload.userId);
            }else if(action.payload.type === 'follow'){
                state.likeNotification.push(action.payload);
            }else if(action.payload.type === 'message'){
                state.likeNotification.push(action.payload);
            }
        },
        clearNotifications:(state)=>{
            state.likeNotification = [];
        }
    }
});
export const {setLikeNotification, clearNotifications} = rtnSlice.actions;
export default rtnSlice.reducer;
