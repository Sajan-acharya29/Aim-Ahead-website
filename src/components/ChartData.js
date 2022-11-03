//import axios from "axios";

import React, {useState, useEffect} from "react";
export const UserData = [
  {
    id: 1,
    month: "January",
    score: 27,

  },
  {
    id: 2,
    month: "February",
    score: 29,

  },
  {
    id: 3,
    month: "March",
    score: 22,

  },
  {
    id: 4,
    month: "April",
    score: 17,

  },
  {
    id: 5,
    month: "May",
    score: 19,

  },
  {
    id: 6,
    month: "June",
    score: 9,

  },
  {
    id: 7,
    month: "July",
    score: 11,

  },
  {
    id: 8,
    month: "August",
    score: 17,

  },
  {
    id: 9,
    month: "September",
    score: 17,

  },
  {
    id: 10,
    month: "October",
    score: 21,

  },
  {
    id: 11,
    month: "November",
    score: 23,

  },
  {
    id: 12,
    month: "December",
    score: 25,

  },
];

export const DailyUserData = [
  {
    id: 1,
    month: "Monday 6/27",
    score: 20,

  },
  {
    id: 2,
    month: "Tuesday",
    score: 22,

  },
  {
    id: 3,
    month: "Wednesday",
    score: 17,

  },
  {
    id: 4,
    month: "Thursday",
    score: 13,

  },
  {
    id: 5,
    month: "Friday",
    score: 22,

  },
  {
    id: 6,
    month: "Saturday",
    score: 20,

  },
  {
    id: 7,
    month: "Sunday",
    score: 25,

  },
  
];

export function Annual_Data(elderly){
  var [scores, setScores] = useState([]);
  const getMessage = async () =>{
    const requestOptions = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            'Accept': 'application/json'
        },
    };
    //console.log(elderly)
    const chart_info = await fetch("http://localhost:8000/get-annual-data-by-id?identity="+elderly["elderlyID"], requestOptions)
    const caregiver_data = await chart_info.json();
    scores = caregiver_data
    setScores(scores)
    //console.log(scores)
}
useEffect(() => {
  getMessage();
}, [])
return(
  scores
  );
};
export function Daily_Data(elderly){
  var [scores, setScores] = useState([]);
  const getMessage = async () =>{
    const requestOptions = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            'Accept': 'application/json'
        },
    };
    const chart_info = await fetch("http://localhost:8000/get-daily-data-by-id?identity="+elderly["elderlyID"], requestOptions)
    const caregiver_data = await chart_info.json();
    scores = caregiver_data
    setScores(scores)
    //console.log(scores)
}
useEffect(() => {
  getMessage();
}, [])
return(
  scores
  );
};
export default function Message(elderly){
var [message, setMessage] = useState("");


    const getWelcomeMessage = async () =>{
        const requestOptions = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'Accept': 'application/json'
            },
        };
        const response = await fetch("http://localhost:8000", requestOptions)
        const info = await fetch("http://localhost:8000/get-by-name?name="+elderly['person'], requestOptions)
        const data = await response.json();
        const caregiver = await info.json();
        message = data["message"] + caregiver["name"]
        setMessage(message)

        //console.log(data["message"])
    };
    useEffect(() => {
        getWelcomeMessage();
    }, [])
    return(
      <div>
        {message}
      </div>
    )
  }
