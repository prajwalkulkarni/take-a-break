import React,{useContext, PropsWithChildren } from "react";
import { Context } from "../store/context";
import useInterval from "../util/useInterval";
import { data } from "../util/data";
import Timer from "./Timer";
import {ChromeMessage, Sender} from "../types";


interface ImageObject {
    'blink' : string,
    'stretch' : string,
    'water' : string
}
const image: ImageObject = {
    'blink' : 'https://doodleipsum.com/700/avatar-3?i=611d48fdd4b608275e68c4b916526c90',
    'stretch' : 'https://doodleipsum.com/700/flat?i=1c19a2de0d01935993e256652f8b6ebd',
    'water' : 'https://doodleipsum.com/700/flat?i=23243fc71ac1a810a5873bde01e17f07'
}

const message: ChromeMessage = {
    from: Sender.React,
    message: "RM_OVERLAY",
  }

  const queryInfo: chrome.tabs.QueryInfo = {
    active: true,
    currentWindow: true
  };

const Overlay: React.FC<PropsWithChildren & {breakType:string,breakTime:number}> = (props) =>{

    const hideNotif = useInterval(props.breakType)

    const handleDismiss = () => {
        console.log("Dismiss")
        hideNotif()
       
          chrome.tabs && chrome.tabs.query(queryInfo, tabs => {
            const currentTabId = tabs[0].id;
            console.log(currentTabId)
            chrome.tabs.sendMessage(
                currentTabId as number,
                message,
                (response) => {
                  // setResponseFromContent(response);
                  if (!window.chrome.runtime.lastError) {
                      // do you work, that's it. No more unchecked error
                      console.log(response)
                    }
              });
        });
    }

    return(
       
         <div className="overlay">
            <h2>Time to {data[props.breakType as keyof typeof data].title}</h2>
            <Timer breakTime={props.breakTime} breakType={props.breakType}/>
            <img src={image[props.breakType as keyof typeof image]} height="250" width="250" alt={props.breakType}/>

            <article>{data[props.breakType as keyof typeof data].description}</article>

            <button className="dismissbtn" onClick={handleDismiss}>Dismiss</button>
        </div>
       
    )
}

export default Overlay