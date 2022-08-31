export {}
chrome.alarms.onAlarm.addListener( ( alarm ) => {
    chrome.tabs && chrome.tabs.query({
        active: true,
        currentWindow: true
    }, tabs => {
        const currentTabId = tabs[0].id;
        console.log(currentTabId)
        chrome.tabs.sendMessage(
            currentTabId as number,
            {
                from: 0,
                message: "SET_INTERVALS",
            },
            (response) => {
                // setResponseFromContent(response);
                if (!window.chrome.runtime.lastError) {
                    // do you work, that's it. No more unchecked error
                    console.log(response)
                  }
            });
    });
});