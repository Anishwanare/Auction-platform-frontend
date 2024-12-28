import React from 'react'
import {ScaleLoader } from "react-spinners"

const Spinner = () => {
    return (
        <div className='w-full min-h-[600px] flex items-center justify-center'>
            <ScaleLoader  size={130} color='#e31e9e'/>
        </div>
    )
}

export default Spinner
