import axios from "axios";
import React, { useState, useEffect } from "react";
// Add routing
import { useRouter } from "next/router";

// Import hooks provided by react-redux
import { useSelector, useDispatch } from "react-redux";

// Import all actions and bind them
import { getAllData } from "../../state/actions/dataActions";

import Loader from "../Loader/Loader";

const DataList: React.FC = () => {
    const allData = useSelector((state: any) => state?.data?.allData);
    const dispatch = useDispatch();

    // Redirect to update page
    const redirectToUpdatePage = (params: number) => {
        console.log(params);
        router.push({
            pathname: "/updatedata",
            query: { id: params }
        })
    }

    // Delete
    const deleteData = (params: any) => {
        console.log(params);
        axios.delete(`http://localhost:8080/data/${params}`)
        console.log("Values deleted successfully");
        router.reload();
    }

    const fetchAllData = async () => {
        await axios.get("http://localhost:8080/data/")
        .then((res) => {
            dispatch(getAllData(res.data))
            console.log(res.data)
        })
    }

    useEffect(() => {
        fetchAllData()
    },[])

    const router = useRouter();

    return (
        <>
            <h1>All Data:</h1>
            {
                (!allData && allData == undefined) ? 
                    <>
                        <Loader/>
                    </>
                    :
                    allData.map((individualData: any) => {
                        return (
                            <>  
                                <h3>ID: {individualData._id}</h3>
                                <h4>Title: {individualData.title}</h4>
                                <h4>Assigned: {individualData.assigned}</h4>
                                <button onClick={() => {redirectToUpdatePage(individualData._id)}}>Update</button>
                                <button onClick={() => {deleteData(individualData._id)}}>Delete</button>
                            </>
                        )
                    })  
            }
            
        </>
    )
}

export default DataList;