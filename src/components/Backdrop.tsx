import { PropsWithChildren } from 'react'
import './Portal.css'
import React from 'react'
export default function Backdrop(props:PropsWithChildren){


    return (
        <div className="backdrop">
            {props.children}
        </div>
    )
}