import { PropsWithChildren } from 'react'
import './Portal.css'

export default function Backdrop(props:PropsWithChildren){


    return (
        <div className="backdrop">
            {props.children}
        </div>
    )
}