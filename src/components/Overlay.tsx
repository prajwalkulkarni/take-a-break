import { PropsWithChildren, ReactNode, useContext } from "react";
import { Context } from "../store/context";
import useInterval from "../util/useInterval";
import useTime from "../util/useTime";
import Backdrop from "./Backdrop";
import Timer from "./Timer";

const Overlay: React.FC<PropsWithChildren & {breakType:string,breakTime:number}> = (props) =>{

    const hideNotif = useInterval(props.breakType)


    return(
       <Backdrop>
         <div className="overlay">
            <h2>Time to {props.breakType}</h2>
            <Timer breakTime={props.breakTime}/>
            <img src={require('../logo.svg').default} height="200" width="200" alt="a11y"/>

            <article>Lorem ipsum dumb text</article>

            <button onClick={()=>hideNotif()}>Dismiss</button>
        </div>
       </Backdrop>
    )
}

export default Overlay