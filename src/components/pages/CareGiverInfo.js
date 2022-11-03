import React, { useEffect } from 'react';
import '../../App.css';
import '../Chart.css';
import { useState } from 'react';
import {useNavigate, useParams} from 'react-router-dom'
import { UserAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//import { UserData } from '../ChartData';
import {Daily_Data } from '../ChartData';
import {Annual_Data} from '../ChartData';
import Message from '../ChartData';
import BarChart from '../BarChart';
import LineChart from '../LineChart';
import { Link } from 'react-router-dom';
import { Button } from '../Button';
import { db } from '../../firebase';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import getDay from 'date-fns/getDay';
import startOfWeek from 'date-fns/startOfWeek';
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"
import { Inject, ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, EventSettingsModel} from '@syncfusion/ej2-react-schedule';
import { DataManager, WebApiAdaptor} from '@syncfusion/ej2-data';
import { collection, where, query, getDocs, doc, updateDoc } from 'firebase/firestore';
import CalModal from '../CalendarModal';
import {DateTimePickerComponent} from "@syncfusion/ej2-react-calendars";
import Table from '../Table';
//import ReactPlayer from 'react-player';
//import VideoPlayer from "react-video-js-player"
//import Cards from '../Cards';

const CareGiverInfo = () =>{
    //calendar initialization
    const locales = {
        "en-US": require("date-fns/locale/en-US")
    }
    const localizer = dateFnsLocalizer({
        format,
        parse,
        startOfWeek,
        getDay,
        locales
    })
    const events = [
        {title: "Big Meeting",
        start: new Date(2022, 6, 28, 10, 30),
        end: new Date(2022, 6, 28, 12, 30),}
    ]
    const [newEvent, setNewEvent] = useState({title: "", start: "", end: "", repeat: "", interval: 0})
    const [allEvents, setAllEvents] = useState(events)
    const handleAddEvent = async () => {
        //console.log(newEvent)
        //var test = (Date.now(newEvent.start.value)*1000)
        //console.log(Date(test))
        //console.log(Math.floor(Date.now(newEvent.start.value)/1000))
        //console.log((Date.now(newEvent.start.value)))
        var startDateTime = {seconds: parseInt((newEvent.start.value.getTime() / 1000).toFixed(0)), nanoseconds: 0}
        var endDateTime = {seconds: parseInt((newEvent.end.value.getTime() / 1000).toFixed(0)), nanoseconds: 0}
        var agenda_item = [{Activity: newEvent.title, EndTime: endDateTime, StartTime: startDateTime}]
        var alldata = Data[0].Agenda.concat(agenda_item)
        console.log(alldata)
        const userDoc = doc(db, "Valid_Caregivees", Data[0].id)
        const newField = {Agenda: alldata};
        await updateDoc(userDoc, newField)

        /*const updateAgenda = async (id, agenda) => {
            const userDoc = doc(db, "Valid_Caregivees", id)
            const newField = {agenda: agenda.arrayUnion({"Activity": "Check-Score",
        "Day":["Monday"], "Times":"10:00-10:15"})}
            await updateDoc(userDoc,newField)
        }
        //setAllEvents([...allEvents, newEvent])*/
    };
    const usersCollectionRef = collection(db, "Valid_Caregivees");
    const {user, logout} = UserAuth();
    const [fetch, setFetch] = useState(0);
    /*
    var admin = require('firebase-admin/app');
    var serviceAccount = require('../../auth-development-93567-firebase-adminsdk-6i9at-1121a04698.json')
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
    const uid = user.email;
    admin.auth().createCustomToken(uid).then((customToken) => {console.log(customToken);}).catch((error) => {console.log("Error: ",error)})
    */
    const navigate = useNavigate();
    const {type} = useParams();
    const {elderly_id} = useParams();
    //console.log(elderly_id);
    //const stateParamVal = useLocation().state.stateParam;
    //console.log("Props Parameter Value - " + type)
    //console.log("Props State Value - " + stateParamVal)
    const elderly = type;
    const elderlyID=elderly_id;
    //console.log(elderlyID);
    var ElderlyData = Annual_Data({elderlyID});
    var DailyElderlyData = Daily_Data({elderlyID});
    //console.log(ElderlyData);
    //console.log(DailyElderlyData)
    const [Data, setData] = useState([]);


    //function for checking if an object is in an array:
    function containsObject(obj, list) {
        var x;
        for (x in list) {
            if (list.hasOwnProperty(x) && JSON.stringify(list[x]) === JSON.stringify(obj)) {
                return true;
            }
        }
    
        return false;
    }
    //console.log(Data)
    useEffect(() => {

        const getElderly = async () => {
          console.log("Using Firestore")
          const q = query(usersCollectionRef, where("Caregivee", "==", elderly));
          const caregiver_data = await getDocs(q);
          //fetching data form firestore and storing in data structure array
          setData(caregiver_data.docs.map((doc)=>({...doc.data(), id: doc.id})))
        };
        getElderly();
        //console.log(Data)
        //console.log(Data.length)
        if (Data.length!==0){
            console.log("I'm in")
            const agenda = Data[0].Agenda;
            agenda.map((task) => {
                var startdate = new Date(task.StartTime.seconds*1000);
                var enddate = new Date(task.EndTime.seconds*1000);
                var activity = task.Activity;
                //console.log(activity)
                //console.log(startdate, enddate)
                const AgendaItem = {title: activity, start: startdate, end: enddate, repeat: "weekly", interval: 5}
                if (Math.random() >0.5 && containsObject(AgendaItem, allEvents)===false){
                    //console.log(allEvents.includes(AgendaItem))
                    setAllEvents([...allEvents, AgendaItem])
                    console.log("Setting", AgendaItem)
                }
    })}
    }, [fetch]);
    //console.log(allEvents)
    //console.log(containsObject(thing, database))
    //console.log(Data)
    const [elderlyData, setElderlyData] = useState({
        labels: ElderlyData.map((data) => data.month),
        datasets: [{
            label: elderly + "'s Score ",
            data: ElderlyData.map((data) => data.score),
            backgroundColor: ["#00b7ff"],
            borderColor: "black",
            borderWidth: 1,
        },],
    });
    useEffect(() => {
    const getElderly = async () => {
        setElderlyData({
            labels: ElderlyData.map((data) => data.month),
            datasets: [{
                label: elderly + "'s Score ",
                data: ElderlyData.map((data) => data.score),
                backgroundColor: ["#00b7ff"],
                borderColor: "black",
                borderWidth: 1,
            },],
        });
    };
    getElderly();
    }, [ElderlyData]);

    const [DailyuserData, setDailyUserData] = useState({
        labels: DailyElderlyData.map((data) => data.month),
        datasets: [{
            label: elderly + "'s Score ",
            data: DailyElderlyData.map((data) => data.score),
            backgroundColor: ["#00b7ff"],
            borderColor: "black",
            borderWidth: 1,
        },],
    });
    useEffect(() => {
    const getElderly = async () => {
        setDailyUserData({
            labels: DailyElderlyData.map((data) => data.month),
            datasets: [{
                label: elderly + "'s Score ",
                data: DailyElderlyData.map((data) => data.score),
                backgroundColor: ["#00b7ff"],
                borderColor: "black",
                borderWidth: 1,
            },],
        });
    };
    getElderly();
    }, [DailyElderlyData]);
    const handleLogout= async() =>{
        try{
            await logout()
            navigate('/')
            toast.success('Successfully logged out');
            //console.log("Logged out")
        }catch(e){
            //console.log(e.message)
        };
    };

    //console.log(UserData)
    //var answer = Annual_Data({elderly})
    //console.log(elderlyData);
    //console.log(<Annual_Data person={elderly}/>)
    var path = '/caregiver-stream'
    path+="/"+elderlyID;
    const remoteData =[{
            Subject: 'Call in -- check-in',
            StartTime: new Date(2022, 6, 28, 10, 0),
            EndTime: new Date(2022, 6, 28, 12, 30),
            }];
    //console.log(remoteData)
    //var eventSettings: EventSettingsModel = { dataSource: this.dataManger }; 
    const timestyle = {
        width: "150px"

    };
    const list = [{"Most recent score": 7, 
    "Time of recording": "16:27 Sunday 04/07/2022",
    "Cognitive Status": "Healthy"}]
    const colNames = ["Most recent score", "Time of recording", "Cognitive Status"]
    return (
    <div>
        <p className='loggedin'>Logged in as: {user && user.email}</p>
        <Message person={elderly}/>
        <h1 className='headings'>{elderly}'s Monthly and Weekly Recordings</h1>
        <div className='chart-area'>
            <div className='chart'>
                <BarChart chartdata={elderlyData}/>
            </div>
            <div className='chart'>
                <LineChart chartdata={DailyuserData}/>
            </div>
        </div>
        <div className='content-area'>
        <div className='content'>
        <h1 className='headings'>Webcam LiveStream</h1>
        <Button className='sign-up' buttonStyle='btn--primary' buttonSize='btn--large'> <Link to={path} className='nav-links-alt'>
                       Watch LiveStream
                    </Link></Button>
                    </div>
        <div style = {{padding: '3vh 10px', marginBottom:"-14vh"}} className='content'>
        <Table list={list} colNames={colNames}/>
        {/*         <p className='non-chart-data'> Most recent score: 7</p>
        <p className='non-chart-data'> Time of recording: 16:27 Sunday 04/07/2022</p>
        <p className='non-chart-data'> Cognitive Status: healthy</p>*/}
        </div>
        </div>
        {/*
        {Data.map((user) => {
        return (
          <div className='caregiver-content-section'>
            <h2> Task:</h2>
                <h2>Activity: {user.Agenda[0]["Activity"]}</h2>
                <h2>Day: {user.Agenda[0]["Day"]}</h2>
                <h2>Time: {user.Agenda[0]["Times"]}</h2>
                <Button className='sign-up' buttonStyle='btn--primary' buttonSize='btn--large'>
                       Remove Task</Button>
            </div>
            );
      })}
      <div className='new_caregiver_area'>
      <button className='loggingout' onClick={() => setOpenModal(true)}>
                        ADD NEW TASK</button>
        <CalModal open={openModal} onClose={() => setOpenModal(false)}/> 
    </div>*/}
        <h1 className='headings'>Calendar and Tasks</h1>
        {/*<ScheduleComponent currentView='Month' eventSettings={{dataSource: remoteData}}>
            <Inject services={[Day, Week, WorkWeek, Month, Agenda]}/>
    </ScheduleComponent>*/}
        <div className='calendar-input-div'>
            <input type="text" placeholder='Add Title' value={newEvent.title} onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}/>
            {/*<DatePicker placeholderText='Start-Date' className='calendar-start-date-input' selected={newEvent.start} onChange={(start) => setNewEvent({...newEvent, start})}/>*/}
            {/*<DatePicker placeholderText='End-Date' selected={newEvent.end} onChange={(end) => setNewEvent({...newEvent, end})}/>*/}
            <DateTimePickerComponent style={timestyle} placeholder='Select a Start Time' selected={newEvent.start} onChange={(start) => setNewEvent({...newEvent, start})}/>
            <DateTimePickerComponent style={timestyle} placeholder='Select an End Time' selected={newEvent.end} onChange={(end) => setNewEvent({...newEvent, end})}/>
            <button className='calendar-submit-btn' onClick={handleAddEvent}> ADD TASK </button>
        </div>
        <Calendar localizer={localizer} events={allEvents} startAccessor="start" endAccessor="end" className='calendar'/>
        <button className='calendar-refresh-btn' onClick={() => setFetch(Math.random())}>Refresh/Load Agenda </button>
        <button className='loggingout' onClick={handleLogout}>LOGOUT</button>
    </div>
    );
};

export default CareGiverInfo;