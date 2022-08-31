import { useContext } from "react";
import { Context } from "../store/context";
import { ChromeMessage, Sender } from '../types';

let blinkInterval: any, waterInterval: any, stretchInterval: any

const message: ChromeMessage = {
    from: Sender.React,
    message: "SET_INTERVALS",
  }

  const queryInfo: chrome.tabs.QueryInfo = {
    active: true,
    currentWindow: true
  };
  
export default function useTime() {



    const ctx = useContext(Context)

    function blinkAlarmIn(timeout: number, enabled: boolean) {

        timeout *= 60000

        if (blinkInterval) {
            clearTimeout(blinkInterval)
        }
        if (enabled) {

            blinkInterval = setTimeout(() => {
                console.log(timeout)
                
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
                ctx?.setBlinkNotif(true)

            }, timeout)
        }

    }


    function stretchAlarmIn(timeout: number, enabled: boolean) {
        timeout *= 60000

        if (stretchInterval) {
            clearTimeout(stretchInterval)
        }
        if (enabled) {

            stretchInterval = setTimeout(() => {
                ctx?.setStretchNotif(true)
            }, timeout)
        }

    }

    function waterAlarmIn(timeout: number, enabled: boolean) {
        timeout *= 60000

        if (waterInterval) {
            clearTimeout(waterInterval)
        }

        if (enabled) {


            waterInterval = setTimeout(() => {
                ctx?.setWaterNotif(true)
            }, timeout)
        }

    }



    return {
        blinkAlarmIn,
        stretchAlarmIn,
        waterAlarmIn

    }
}