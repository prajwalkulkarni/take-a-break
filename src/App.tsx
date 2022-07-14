import React, { ChangeEvent, FormEvent, useContext, useEffect, useState } from 'react';
import './App.css';
import { Context } from './store/context';
import useTime from './util/useTime';
import { ChromeMessage, Sender } from './types';

import { useToast } from '@chakra-ui/react'

function App() {


  const toast = useToast()

  const [interval, setIntervals] = useState({
    blink: 20,
    stretch: 40,
    water: 60

  })

  const [toggleCheck, setToggleCheck] = useState(false)

  const { blinkAlarmIn, waterAlarmIn, stretchAlarmIn } = useTime()

  const [err, showError] = useState(false)

  const ctx = useContext(Context)

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


  const updateIntervals = (e: FormEvent) => {
    e.preventDefault()

    if (new Set([interval.blink, interval.stretch, interval.water]).size < 3) {
      showError(true)
      return
    }

    showError(false)
    ctx?.setBlinkInterval(interval.blink)
    ctx?.setStretchInterval(interval.stretch)
    ctx?.setWaterInterval(interval.water)

    blinkAlarmIn(interval.blink, toggleCheck)
    stretchAlarmIn(interval.stretch, toggleCheck)
    waterAlarmIn(interval.water, toggleCheck)

    toast({
      title: 'Settings saved.',
      description: "Your changes are updated.",
      status: 'success',
      position: 'top',
      duration: 5000,
      isClosable: true,
    })

    const message: ChromeMessage = {
      from: Sender.React,
      message: "SET_INTERVALS",
    }

    const queryInfo: chrome.tabs.QueryInfo = {
      active: true,
      currentWindow: true
    };
    chrome.tabs && chrome.tabs.query(queryInfo, tabs => {
      const currentTabId = tabs[0].id;
      console.log(currentTabId)
      chrome.tabs.sendMessage(
          currentTabId as number,
          message,
          (response) => {
              // setResponseFromContent(response);
              console.log(response);
          });
  });
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
