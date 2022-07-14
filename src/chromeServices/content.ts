import ReactDOM  from "react-dom";
import React from "react";
import DOMContent from "./DOMContent";
function inject() {

    

    // document.body.appendChild(portal);
    ReactDOM.render(React.createElement(DOMContent), document.getElementById("portal"));

    
}

inject();