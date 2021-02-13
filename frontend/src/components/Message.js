import React from 'react'
import {Alert} from "react-bootstrap"

const Message = ({variant, header, message}) => {
    return (
        <>
            <Alert variant={variant}>
            <Alert.Heading>{header}</Alert.Heading>
            <p>
              {message}
            </p>
            </Alert>
        </>
    )
}

export default Message
