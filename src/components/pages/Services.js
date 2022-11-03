import React, { useEffect, useState } from 'react';
import '../../App.css';


export default function Services(){
    /* for testing Backend API
    const [message, setMessage] = useState("");

    const getWelcomeMessage = async () =>{
        const requestOptions = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'Accept': 'application/json'
            },
        };
        const response = await fetch("http://localhost:8000", requestOptions)
        const data = await response.json();

        console.log(data["message"])
    };
    useEffect(() => {
        getWelcomeMessage();
    }, [])
    */
    return( <h1 className='services'>Services</h1>);
}