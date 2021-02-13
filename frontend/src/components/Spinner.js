import React from 'react'
import Loader from "react-loader-spinner"


const Spinner = () => {
    return (
        <>
            <Loader 
                type="ThreeDots"
                color="#00BFFF"
                height={80}
                width={130}
                timeout={3000}
            />
        </>
    )
}

export default Spinner
