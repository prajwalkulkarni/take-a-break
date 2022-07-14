import React,{ useEffect, useState } from "react"
import useInterval from "../util/useInterval"
import './Timer.css'

const second =  1000
const minute = 60000
const hour = 3600000
const Timer: React.FC<{breakTime:number, breakType:string}> = (props) =>{

    const [countdown,setCountDown] = useState({
        timer:props.breakTime,
        hours:0,
        minutes:0,
        seconds:0
    })

    const hideNotif = useInterval(props.breakType)



    useEffect(()=>{
        let breakTime = countdown.timer
        let refTime = countdown.timer
        console.log("Mount")
        let interval = setInterval(()=>{
            
            let msToHours = Math.trunc(breakTime/hour)
            
            if(msToHours>0) breakTime-=(msToHours*hour)
            let msToMinutes = Math.trunc(breakTime/minute)
            if(msToMinutes>0) breakTime-=(msToMinutes*minute)

            let msToSeconds = Math.trunc(breakTime/second)
            if(refTime===0)hideNotif()
            breakTime = refTime - second
            refTime-=second
            

            setCountDown(prev=> {
                return {
                    timer:prev.timer-second,
                    hours:msToHours,
                    minutes:msToMinutes,
                    seconds:msToSeconds
                }
            })
        },1000)
        
        return () => {
            if(interval){
                clearInterval(interval)
            }
        }
    },[])


    return(
        <div>
            <span>{countdown.hours<10?`0${countdown.hours}` : countdown.hours}</span> <span>:</span> <span>{countdown.minutes<10?`0${countdown.minutes}`:countdown.minutes}</span> <span>:</span> 
            <span>{countdown.seconds<10?`0${countdown.seconds}`:countdown.seconds}</span>
        </div>
    )
}

export default Timer