import React, { useContext, useEffect } from "react";
import Backdrop from "../components/Backdrop";
import Overlay from "../components/Overlay";
import ReactDOM from 'react-dom'
export default function DOMContent() {

    

    return (
        <React.Fragment>

            {/* {(ctx?.shWaterNotif || ctx?.shBlinkNotif || ctx?.shStretchNotif) && (
                <Backdrop>
                    {ctx?.shWaterNotif && <Overlay breakType='water' breakTime={300000} />}
                    {ctx?.shBlinkNotif && <Overlay breakType='blink' breakTime={200000} />}
                    {ctx?.shStretchNotif && <Overlay breakType='stretch' breakTime={300000} />}
                </Backdrop>
                )} */}

            

            <Backdrop>
                <Overlay breakType='water' breakTime={300000}/>
            </Backdrop>
        </React.Fragment>
    )
}