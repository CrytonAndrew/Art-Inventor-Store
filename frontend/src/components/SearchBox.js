import React, {useState} from 'react'
import {Form,  Button} from "react-bootstrap"

const SearchBox = ({history}) => {
    const [keyword, setKeyword] = useState("")


    // No direct access to history in the header
    // We will use route to component render 
    const submitHandler = (e) => {
        e.preventDefault()
        if(keyword.trim()) {
            history.push(`/search/${keyword}`)
        }
        else {
            history.push("/")
        }
    }

    return (
        <Form onSubmit={submitHandler} inline>
            <Form.Control
                type="text"
                name="q"
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Find Product"
                className="mr-sm-2 ml-sm-5"
            >

            </Form.Control>
            <Button type="submit" variant="outline-info">
                Search
            </Button>
        </Form>
    )
}

export default SearchBox
