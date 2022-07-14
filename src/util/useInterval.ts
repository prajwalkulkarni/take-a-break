import { useContext } from "react"
import { Context } from "../store/context"
import useTime from "./useTime"
export default function useInterval(breakType:string){
    const ctx = useContext(Context)
    const {blinkAlarmIn,waterAlarmIn,stretchAlarmIn} = useTime()
    const hideNotif = () =>{
        switch(breakType){
            case 'water':
                ctx?.setWaterNotif(false)
                waterAlarmIn(ctx?.waterInterval ?? 10, true)
                break;
            case 'blink':
                ctx?.setBlinkNotif(false)
                blinkAlarmIn(ctx?.blinkInterval ?? 1, true)
                break;
            case 'stretch':
                ctx?.setStretchNotif(false)
                stretchAlarmIn(ctx?.stretchInterval ?? 1, true)
                break;
            default:
                return
        }
    }

    return hideNotif
}
