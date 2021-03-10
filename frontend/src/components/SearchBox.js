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
        <Form onSubmit={submitHandler} inline className="search_form">
            <Form.Control
                type="text"
                name="q"
                // size="lg"
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Search for merch..."
                className="mr-sm-2 ml-sm-5 search_box"
            >

            </Form.Control>
            <Button type="submit" variant="outline-info">
                Search
            </Button>
        </Form>
    )
}

export default SearchBox
