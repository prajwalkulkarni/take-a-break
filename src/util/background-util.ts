type Interval = {
    blink: number,
    water: number,
    stretch: number
}


let blinkInterval: any, waterInterval: any, stretchInterval: any

export function backgroundWorker(){
    

    function setBreakIntervals({blink,stretch,water}:Interval){
        chrome.storage.sync.set({blink,water,stretch}, function() {
            console.log('Intervals set');
        });
    }

    function getIntervals(){
        chrome.storage.sync.get(['blink','water','stretch'], function(result) {
            console.log('Intervals get');
            console.log(result);
        });
    }

    function setNotifState(shWaterNotif:boolean,shBlinkNotif:boolean,shStretchNotif:boolean,toggleState:boolean){
        chrome.storage.sync.set({shWaterNotif,shBlinkNotif,shStretchNotif,toggleState}, function() {
            console.log('Notif state set');
        });
    }

    function setWaterNotif(shWaterNotif:boolean){
        chrome.storage.sync.set({shWaterNotif}, function() {
            console.log('Notif state set');
        });
    }
    function setStretchNotif(shStretchNotif:boolean){
        chrome.storage.sync.set({shStretchNotif}, function() {
            console.log('Notif state set');
        });
    }
    function setBlinkNotif(shBlinkNotif:boolean){
        chrome.storage.sync.set({shBlinkNotif}, function() {
            console.log('Notif state set');
        });
    }


    function blinkAlarmIn(timeout: number, enabled: boolean) {

        timeout *= 60000

        if (enabled) {

            // blinkInterval = setTimeout(() => {
            //     console.log(timeout)
                
            //       chrome.tabs && chrome.tabs.query(queryInfo, tabs => {
            //         const currentTabId = tabs[0].id;
            //         console.log(currentTabId)
            //         chrome.tabs.sendMessage(
            //             currentTabId as number,
            //             message,
            //             (response) => {
            //                 // setResponseFromContent(response);
            //                 if (!window.chrome.runtime.lastError) {
            //                     // do you work, that's it. No more unchecked error
            //                     console.log(response)
            //                   }
            //             });
            //     });
                

            // }, timeout)

            chrome.runtime.onInstalled.addListener(details=>{
                chrome.alarms.create('blink', {
                    delayInMinutes: timeout,
                    periodInMinutes: timeout
                  })
            })
        }
    }



    function waterAlarmIn(timeout: number, enabled: boolean) {

        timeout *= 60000

        
        if (enabled) {

            // waterInterval = setTimeout(() => {
            //     console.log(timeout)
                
            //       chrome.tabs && chrome.tabs.query(queryInfo, tabs => {
            //         const currentTabId = tabs[0].id;
            //         console.log(currentTabId)
            //         chrome.tabs.sendMessage(
            //             currentTabId as number,
            //             message,
            //             (response) => {
            //                 // setResponseFromContent(response);
            //                 if (!window.chrome.runtime.lastError) {
            //                     // do you work, that's it. No more unchecked error
            //                     console.log(response)
            //                   }
            //             });
            //     });
                

            // }, timeout)

          
          
            chrome.runtime.onInstalled.addListener(details=>{
                chrome.alarms.create('water', {
                    delayInMinutes: timeout,
                    periodInMinutes: timeout
                  })
            })
        }
    }



    function stretchAlarmIn(timeout: number, enabled: boolean) {

        timeout *= 60000

        if (stretchInterval) {
            clearTimeout(stretchInterval)
        }
        if (enabled) {

            // stretchInterval = setTimeout(() => {
            //     console.log(timeout)
                
            //       chrome.tabs && chrome.tabs.query(queryInfo, tabs => {
            //         const currentTabId = tabs[0].id;
            //         console.log(currentTabId)
            //         chrome.tabs.sendMessage(
            //             currentTabId as number,
            //             message,
            //             (response) => {
            //                 // setResponseFromContent(response);
            //                 if (!window.chrome.runtime.lastError) {
            //                     // do you work, that's it. No more unchecked error
            //                     console.log(response)
            //                   }
            //             });
            //     });
                

            // }, timeout)

            chrome.runtime.onInstalled.addListener(details=>{
                chrome.alarms.create('stretch', {
                    delayInMinutes: timeout,
                    periodInMinutes: timeout
                  })
            })
        }
    }

    return {
        blinkAlarmIn,
        waterAlarmIn,
        stretchAlarmIn,
        setBreakIntervals,
        setNotifState,
        setWaterNotif,
        setStretchNotif,
        setBlinkNotif,
    }


}