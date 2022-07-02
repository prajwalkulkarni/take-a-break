import { PropsWithChildren, ReactNode } from "react";
import Backdrop from "./Backdrop";

const Overlay: React.FC<PropsWithChildren & {breakType:string}> = (props) =>{


    return(
       <Backdrop>
         <div className="overlay">
            <h2>Time to {props.breakType}</h2>

            <img src={require('../logo.svg').default} height="200" width="200" alt="a11y"/>

            <desc>Lorem ipsum dumb text</desc>
        </div>
       </Backdrop>
    )
}

export default Overlay