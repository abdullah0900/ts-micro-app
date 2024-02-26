import axios from "axios";
import { useRouter } from "next/router";
import React, { useState } from "react";

// Import hooks provided by react-redux
import { useDispatch } from "react-redux";

// Import the actions which will be required
import { createData } from "../../state/actions/dataActions";

const CreateNewDataComponent: React.FC = ( ) => {
    const router = useRouter();

    const [title, settitle] = useState();
    const [assigned, setassigned] = useState();
    const [postValStatus, setPostValStatus] = useState(false);

    const dispatch = useDispatch();

    // Handle input field change
    const handleTitleChange = (event: any) => {
        settitle(event.target.value);
    }

    const handleAssingedChange = (event: any) => {
        setassigned(event.target.value);
    }

    const config = {
        headers: { 
            'content-type': 'application/json',
            'Access-Control-Allow-Origin': "*"
        }
    }

    const dataToBeFedToDataAPI = {
        title: title,
        assigned: assigned
    }

    const createNewData = async (event: any) => {
        event.preventDefault()

        await axios.post(`http://localhost:8080/data/`, dataToBeFedToDataAPI, config)
        .then((response) => {
            dispatch(createData(response.data))
            console.log(response.data)
            setPostValStatus(true);
        })
    }

    return (
        <>
            {
                (!postValStatus) 
                ?
                <>
                    <h1>Add new Data:</h1>
                    <input onChange={handleTitleChange} placeholder="Title"/>
                    <input onChange={handleAssingedChange} placeholder="Assigned"/>
                    <button onClick={createNewData}>+</button>
                </>
                : 
                <h2 onClick={() => {router.push("/")}}>Go to homepage</h2>
            }
        </>
    )
}

export default CreateNewDataComponent;