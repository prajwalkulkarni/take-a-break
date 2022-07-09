import { PropsWithChildren,useContext,useReducer } from "react";
import { Context, dispatchHandler,types } from "./context";



const initialState = {
    blinkInterval: 10000,
    stretchInterval: 30000,
    waterInterval: 60000,
    enablereminder: true,
    setBlinkInterval:()=>{},
    setStretchInterval:()=>{},
    setWaterInterval:()=>{},
    setBlinkNotif:()=>{},
    setStretchNotif:()=>{},
    setWaterNotif:()=>{},
    setReminder:()=>{},
    shBlinkNotif: false,
    shStretchNotif: false,
    shWaterNotif: false
}

const ContextWrapper: React.FC<PropsWithChildren> = (props) =>{


    const [state, dispatch] = useReducer(dispatchHandler,initialState)

    const setBlinkInterval = (time:number) => dispatch({type:types.BLINK,time,shStatus:false,reminder:true})
    const setStretchInterval = (time:number) => dispatch({type:types.STRETCH,time,shStatus:false,reminder:true})
    const setWaterInterval = (time:number) => dispatch({type:types.WATER,time,shStatus:false,reminder:true})

    const setBlinkNotif = (shStatus:boolean) => dispatch({type:types.SHBLINK,time:0,shStatus,reminder:true})
    const setStretchNotif = (shStatus:boolean) => dispatch({type:types.SHSTRETCH,time:0,shStatus,reminder:true})
    const setWaterNotif = (shStatus:boolean) => dispatch({type:types.SHWATER,time:0,shStatus,reminder:true})

    const setReminder = (reminder: boolean) => dispatch({type:types.REMINDER,time:0,shStatus:false,reminder})

    return(
        <Context.Provider value={{blinkInterval:state.blinkInterval,stretchInterval:state.stretchInterval
        ,waterInterval:state.waterInterval,shBlinkNotif:state.shBlinkNotif,shStretchNotif:state.shStretchNotif,shWaterNotif:state.shWaterNotif,
        enablereminder: state.enablereminder,
        setBlinkNotif,setStretchNotif,setWaterNotif,
        setBlinkInterval,setStretchInterval,setWaterInterval,
        setReminder}}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextWrapper