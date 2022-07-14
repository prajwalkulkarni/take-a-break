import { useContext } from "react";
import { Context } from "../store/context";

let blinkInterval:any,waterInterval:any,stretchInterval:any

export default function useTime(){

    const ctx = useContext(Context)
    
    function blinkAlarmIn(timeout:number, enabled:boolean){
        
        timeout*=60000
        if(blinkInterval){
            clearTimeout(blinkInterval)
        }
          if(enabled){
            
            blinkInterval = setTimeout(()=>{
                ctx?.setBlinkNotif(true)
            },timeout)
          }
        
    }   
    

    function stretchAlarmIn(timeout:number,  enabled:boolean){
        timeout*=60000
        
        if(stretchInterval){
            clearTimeout(stretchInterval)
        }
           if(enabled){
            
            stretchInterval = setTimeout(()=>{
                ctx?.setStretchNotif(true)
            },timeout)
           }
        
    }

   function waterAlarmIn(timeout:number, enabled:boolean){
    timeout*=60000

    if(waterInterval){
        clearTimeout(waterInterval)
    }
    
    if(enabled){
        
       
        waterInterval = setTimeout(()=>{
            ctx?.setWaterNotif(true)
        },timeout)
    }
    
   }

   

    return {
        blinkAlarmIn,
        stretchAlarmIn,
        waterAlarmIn

    }
}