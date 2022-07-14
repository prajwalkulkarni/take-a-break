import React from "react";
import Backdrop from "../components/Backdrop";
import Overlay from "../components/Overlay";

export default function DOMContent(){

    return(
        <React.Fragment>
{/* 
{(ctx?.shWaterNotif || ctx?.shBlinkNotif || ctx?.shStretchNotif) && ReactDOM.createPortal(
                <Backdrop>
                    {ctx?.shWaterNotif && <Overlay breakType='water' breakTime={300000} />}
                    {ctx?.shBlinkNotif && <Overlay breakType='blink' breakTime={200000} />}
                    {ctx?.shStretchNotif && <Overlay breakType='stretch' breakTime={300000} />}
                </Backdrop>
                , document.getElementById('portal') as HTMLElement)} */}
            <Backdrop>
                <Overlay breakType='water' breakTime={300000}/>
            </Backdrop>
        </React.Fragment>
    )
}