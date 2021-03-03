import React from 'react'
import {Helmet} from "react-helmet"

const Meta = ({description, title}) => {
    return (
        <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        </Helmet>
    )
}

export default Meta
