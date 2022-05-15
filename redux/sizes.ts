import { createSlice } from "@reduxjs/toolkit"

export const sizes = createSlice({
    name:"sizes",
    initialState: {
        canvaWidth:520,
        canvaHeight:260,
        rectWidth:10,
        rectHeigth:50,
        ballSize:8,
        rectMovment:6,
        ballMovmentX:1,
        ballMovmentY:0
    },
    reducers:{
        change: (state, action) =>{
            state.canvaWidth = action.payload
            state.canvaHeight = action.payload / 2
            state.rectWidth = action.payload / 55
            state.rectHeigth = action.payload / 8
            state.ballSize = action.payload / 55
            state.ballMovmentX = action.payload / 520
        }
    }
}) 

export const { change } = sizes.actions
export default sizes.reducer