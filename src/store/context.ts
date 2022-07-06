
import React, { PropsWithChildren } from 'react'


export enum types {
    BLINK = 'BLINK',
    SHBLINK = 'SHBLINK',
    STRETCH = 'STRETCH',
    SHSTRETCH = 'SHSTRETCH',
    WATER = 'WATER',
    SHWATER = 'SHWATER'
}


 interface State  {
    blinkInterval: number,
    stretchInterval: number,
    waterInterval: number,
    shBlinkNotif: boolean,
    shStretchNotif: boolean,
    shWaterNotif: boolean,
    setBlinkInterval: Function,
    setStretchInterval: Function,
    setWaterInterval: Function,
    setBlinkNotif:Function,
    setStretchNotif:Function,
    setWaterNotif:Function
 }

 type Action = {
    type:types,
    time : number,
    shStatus:boolean
 }


 export function dispatchHandler(state:State,action:Action){
    const {type,time,shStatus} = action

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
        default:
            return state    
    }
 }

export const Context = React.createContext<State|null>(null)




