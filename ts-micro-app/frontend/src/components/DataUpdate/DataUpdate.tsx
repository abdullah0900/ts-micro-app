import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";

// Import hooks provided by react-redux
import { useDispatch } from "react-redux";

// Import update action for footballers
import { updateData } from "../../state/actions/dataActions";

// Import Axios
import axios from "axios";

const UpdateDataComponent = () => {
    const dispatch = useDispatch();
    const router = useRouter();

    const [title, settitle] = useState();
    const [assigned, setassigned] = useState();
    const [postValStatus, setPostValStatus] = useState(false);

    const handleTitleChange = (event: any) => {
        settitle(event.target.value);
    }

    const handleAssingedChange = (event: any) => {
        setassigned(event.target.value);
    }

    const dataToBeFedToDataAPI = {
        title: title,
        assigned: assigned
    }

    const updateExistingData = async (event: any) => {
        event.preventDefault();

        await axios.put(`http://localhost:8080/data/${router?.query?.id}`, dataToBeFedToDataAPI)
            .then((response) => {
                console.log(response.data);
                dispatch(updateData(response.data));
                setPostValStatus(true)
            })
    }

    return (
        <>
        {
            (!postValStatus) 
            ?
            <> 
                <h2>Update player with ID: {router?.query?.id}</h2>
                <input
                    onChange={handleTitleChange} 
                    placeholder="Title"
                />
                <input
                    onChange={handleAssingedChange} 
                    placeholder="Assigned"
                />
                <button onClick={updateExistingData}>Update</button>
            </>
            :
            <h2 onClick={() => {router.push("/")}}>Go to homepage</h2>
        }
        </>
    )
}

export default UpdateDataComponent;