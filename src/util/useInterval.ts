import { useContext } from "react"
import { Context } from "../store/context"
import { backgroundWorker } from "../util/background-util"
export default function useInterval(breakType:string){
    const ctx = useContext(Context)
    const {setWaterNotif, setBlinkNotif, setStretchNotif,blinkAlarmIn, waterAlarmIn, stretchAlarmIn} = backgroundWorker()
    // const {blinkAlarmIn, waterAlarmIn, stretchAlarmIn} = manageState()
   
    const hideNotif = () =>{
        switch(breakType){
            case 'water':
                setWaterNotif(false)

                chrome.storage.sync.get(['water'], function(result) {
                    
                    console.log(result);
                    waterAlarmIn(result.water ?? 10, true)
                });
                break;
            case 'blink':
                setBlinkNotif(false)

                chrome.storage.sync.get(['blink'], function(result) {
                    
                    console.log(result);
                    blinkAlarmIn(result.blink ?? 1, true)
                });
                
                break;
            case 'stretch':
                setStretchNotif(false)

                chrome.storage.sync.get(['stretch'], function(result) {
                    
                    console.log(result);
                    stretchAlarmIn(result.stretch ?? 1, true)
                });
                
                break;
            default:
                return
        }
    }

    return hideNotif
}
