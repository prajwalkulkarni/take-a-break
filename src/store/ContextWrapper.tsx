import React,{ PropsWithChildren,useContext,useReducer } from "react";
import { Context, dispatchHandler,types } from "./context";



const initialState = {
    blinkInterval: 10000,
    stretchInterval: 30000,
    waterInterval: 60000,
    setBlinkInterval:()=>{},
    setStretchInterval:()=>{},
    setWaterInterval:()=>{},
    setBlinkNotif:()=>{},
    setStretchNotif:()=>{},
    setWaterNotif:()=>{},
    shBlinkNotif: false,
    shStretchNotif: false,
    shWaterNotif: false
}

const ContextWrapper: React.FC<PropsWithChildren> = (props) =>{


    const [state, dispatch] = useReducer(dispatchHandler,initialState)

    const setBlinkInterval = (time:number) => dispatch({type:types.BLINK,time,shStatus:false})
    const setStretchInterval = (time:number) => dispatch({type:types.STRETCH,time,shStatus:false})
    const setWaterInterval = (time:number) => dispatch({type:types.WATER,time,shStatus:false})

    const setBlinkNotif = (shStatus:boolean) => dispatch({type:types.SHBLINK,time:0,shStatus})
    const setStretchNotif = (shStatus:boolean) => dispatch({type:types.SHSTRETCH,time:0,shStatus})
    const setWaterNotif = (shStatus:boolean) => dispatch({type:types.SHWATER,time:0,shStatus})

    
    return(
        <Context.Provider value={{blinkInterval:state.blinkInterval,stretchInterval:state.stretchInterval
        ,waterInterval:state.waterInterval,shBlinkNotif:state.shBlinkNotif,shStretchNotif:state.shStretchNotif,shWaterNotif:state.shWaterNotif,
        setBlinkNotif,setStretchNotif,setWaterNotif,
        setBlinkInterval,setStretchInterval,setWaterInterval}}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextWrapper