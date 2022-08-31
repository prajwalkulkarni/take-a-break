import ReactDOM  from "react-dom";
import React from "react";
import DOMContent from "./DOMContent";
import {ChromeMessage, Sender, DOMMessageResponse} from '../types';


function inject(msg: ChromeMessage, sender: chrome.runtime.MessageSender, sendResponse: (response: DOMMessageResponse) => void) {

    

    console.log("Listner called")
    // document.body.appendChild(portal);


    if(msg.message === 'SET_INTERVALS'){
        const portal = document.createElement('div')
        portal.id = 'portal'
        portal.style.position = 'absolute'
        portal.style.overflow = 'hidden'
        portal.style.top = '0'
        portal.style.left = '0'
        portal.style.width = '100%'
        portal.style.height = '100%'
        portal.style.zIndex = '9999'
    
        const body = document.body
        body.style.overflow = 'hidden'
        
        
        const shadowRoot = portal.attachShadow({ mode: 'open' })
    
        // note inline use of webpack raw-loader, so that the css
        // file gets inserted as raw text, instead of attached to <head>
        // as with the webpack style-loader
    
        shadowRoot.innerHTML = // just using template string
          `
           
           <style>
           .backdrop {
            display: flex;
            justify-content: center;
            align-items: flex-start;
            z-index: 0;
            top: 0;
            left: 0;
            position: absolute;
            width: 100%;
            height: 100%;
        }
        
        
        .backdrop::before {
            position: absolute;
            content: '';
            top: 0;
            left: 0;
            height: 100%;
            width: 100%;
            background-color: rgb(71, 71, 71);
            opacity: 0.8;
            z-index: 1;
        
        }
        
        .overlay {
            display: flex;
            align-self: center;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            font-family: Arial, Helvetica, sans-serif;
            z-index: 2;
            opacity: 1;
            margin: 0.2rem;
            padding: 0.2rem;
            width: 30%;
            height: fit-content;
            text-align: center;
            border: 1px solid none;
            border-radius: 0.3rem;
            box-shadow: 3px 2px 4px rgb(75, 75, 75);
            background: whitesmoke;
        }
        
        .dismissbtn {
            background-color: #8e24aa;
            border-radius: 5px;
            border: none;
            color: white;
            padding: 10px;
            text-align: center;
            font-size: medium;
            cursor: pointer;
            width: 100%;
        }
        
        .dismissbtn:hover, .dismissbtn:active{
            background-color: #631976;
        }
        
        
        button{
            border:none;
            color:white;
            background-color: transparent;
        }
        
        article{
            color: gray;
            text-align: left;
            padding: 0.2rem;
        }
    
        h2{
            color: rgb(51,51,51);
        }
           </style>
           <div id='shadowReactRoot'></div>
         `
        document.body.appendChild(portal)
    
        ReactDOM.render(
            React.createElement(DOMContent),
            shadowRoot.querySelector('#shadowReactRoot')
        )
    
    }
    else if(msg.message === 'RM_OVERLAY'){

        console.log("Hit")
        const portal = document.getElementById('portal')
        portal && portal.remove()

        const shadowReactRoot = document.getElementById('shadowReactRoot')
        shadowReactRoot && shadowReactRoot.remove()
        const body = document.body
        body.style.overflow = 'auto'
    }
    return true

    
}



chrome.runtime.onMessage.addListener(inject);