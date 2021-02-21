import React from 'react'
import Loader from "react-loader-spinner"
import styled from "styled-components"


const Spinner = () => {
    return (
        <LoaderContainer>
            <Loader 
                type="Circles"
                color="#00BFFF"
                height={100}
                width={130}
                timeout={2000}
            />
        </LoaderContainer>
    )
} 

export default Spinner

const LoaderContainer = styled.div`
    display: flex;
    justify-content: center;
    margin: 200px auto;
`;