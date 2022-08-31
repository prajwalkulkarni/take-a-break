import React, { ChangeEvent, FormEvent, useContext, useEffect, useState } from 'react';
import './App.css';

import { backgroundWorker } from './util/background-util'
import { useToast } from '@chakra-ui/react'

const queryInfo: chrome.tabs.QueryInfo = {
  active: true,
  currentWindow: true
};
function App() {


  const toast = useToast()
 

  const [interval, setIntervals] = useState({
    blink: 20,
    stretch: 40,
    water: 60

  })

  const [toggleCheck, setToggleCheck] = useState(false)


  const [err, showError] = useState(false)

  const { setBreakIntervals, setNotifState, blinkAlarmIn, waterAlarmIn, stretchAlarmIn } = backgroundWorker()


  const setBlinkreminder = (e: ChangeEvent<HTMLInputElement>) => setIntervals(prev => {

    return {
      ...prev,
      blink: +e.target.value
    }
  })

  const setStretchreminder = (e: ChangeEvent<HTMLInputElement>) => setIntervals(prev => {
    return {
      ...prev,
      stretch: +e.target.value
    }
  })

  const setWaterreminder = (e: ChangeEvent<HTMLInputElement>) => setIntervals(prev => {
    return {
      ...prev,
      water: +e.target.value
    }
  })


  useEffect(() => {
    chrome.storage.sync.get(['blink', 'water', 'stretch', 'toggleState'], function (result) {
      console.log('Intervals get');
      setIntervals({
        blink: result.blink,
        stretch: result.stretch,
        water: result.water
      })

      setToggleCheck(result.toggleState)
    });
  }, [])

  const updateIntervals = (e: FormEvent) => {
    e.preventDefault()

    if (new Set([interval.blink, interval.stretch, interval.water]).size < 3) {
      showError(true)
      return
    }

    showError(false)

  //   chrome.runtime.onInstalled.addListener(details=>{
  //     chrome.alarms.create('blink', {
  //         delayInMinutes: interval.blink,
  //         periodInMinutes: interval.blink
  //       })
  // })
    

    setBreakIntervals(interval)
    setNotifState(false, false, false, toggleCheck)

    blinkAlarmIn(interval.blink, toggleCheck)
    waterAlarmIn(interval.water, toggleCheck)
    stretchAlarmIn(interval.stretch, toggleCheck)

    toast({
      title: 'Settings saved.',
      description: "Your changes are updated.",
      status: 'success',
      position: 'top',
      duration: 5000,
      isClosable: true,
    })


  }
  return (
    <div className="App">

      <form onSubmit={updateIntervals}>

        <fieldset>
          <h2>Better browsing</h2>

          <div>
            {err && <p className='error'>Two or more breaks cannot have same interval.</p>}
            <div className='inputcontainer'>
              <label htmlFor='blink'>Blink reminder - <b>{interval.blink}min</b></label><br />
              <input id="blink" type="range" min="1" max="30" value={interval.blink} step="1" onChange={setBlinkreminder} />
            </div>

            <div className='inputcontainer'>
              <label htmlFor='stretch'>Stretch reminder - <b>{interval.stretch}min</b></label><br />
              <input id="stretch" type="range" min="10" max="90" value={interval.stretch} step="1" onChange={setStretchreminder} />
            </div>

            <div className='inputcontainer'>
              <label htmlFor='water'>Water reminder - <b>{interval.water}min</b></label><br />
              <input id="water" type="range" min="20" max="120" value={interval.water} step="1" onChange={setWaterreminder} />
            </div>

            <div className='togglecontainer'>
              <b>Enable reminders</b>
              <label htmlFor='toggle' className='toggle'>
                <input id="toggle" checked={toggleCheck} onChange={(e) => setToggleCheck(e.target.checked)} type="checkbox" className='toggleCheck' />
              </label>
            </div>


          </div>


          <input type="submit" value="Save settings" />

        </fieldset>
      </form>

      {/* {(ctx?.shWaterNotif || ctx?.shBlinkNotif || ctx?.shStretchNotif) && ReactDOM.createPortal(
        <Backdrop>
          {ctx?.shWaterNotif && <Overlay breakType='water' breakTime={300000} />}
          {ctx?.shBlinkNotif && <Overlay breakType='blink' breakTime={200000} />}
          {ctx?.shStretchNotif && <Overlay breakType='stretch' breakTime={300000} />}
        </Backdrop>
        , document.getElementById('portal') as HTMLElement)} */}
    </div>
  );
}

export default App;
