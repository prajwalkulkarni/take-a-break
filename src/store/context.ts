
import React, { PropsWithChildren } from 'react'


export enum types {
    BLINK = 'BLINK',
    SHBLINK = 'SHBLINK',
    STRETCH = 'STRETCH',
    SHSTRETCH = 'SHSTRETCH',
    WATER = 'WATER',
    SHWATER = 'SHWATER',
    REMINDER = 'REMINDER'
}


 interface State  {
    blinkInterval: number,
    stretchInterval: number,
    waterInterval: number,
    enablereminder: boolean,
    shBlinkNotif: boolean,
    shStretchNotif: boolean,
    shWaterNotif: boolean,
    setBlinkInterval: Function,
    setStretchInterval: Function,
    setWaterInterval: Function,
    setBlinkNotif:Function,
    setStretchNotif:Function,
    setWaterNotif:Function,
    setReminder:Function
 }

 type Action = {
    type:types,
    time : number,
    shStatus:boolean,
    reminder: boolean
 }


 export function dispatchHandler(state:State,action:Action){
    const {type,time,shStatus, reminder} = action

    switch(type){
        case types.BLINK:
            return {...state,blinkInterval:time}
        case types.STRETCH:
            return {...state,stretchInterval:time}
        case types.WATER:
            return {...state,waterInterval:time} 
        case types.SHBLINK:
            return {...state,shBlinkNotif:shStatus}
        case types.SHSTRETCH:
            return {...state,shStretchNotif:shStatus}
        case types.SHWATER:
            return {...state,shWaterNotif:shStatus} 
        case types.REMINDER:
            return {...state,enablereminder:reminder}
        default:
            return state    
    }
 }

export const Context = React.createContext<State|null>(null)




