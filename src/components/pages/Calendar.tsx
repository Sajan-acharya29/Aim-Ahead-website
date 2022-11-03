import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, {DateClickArg} from '@fullcalendar/interaction';
import React from 'react';

const Cal = () => {
    const handleDateClick = (e:DateClickArg)=>{
        console.log(e);
    }
    return <>
        <FullCalendar plugins={[dayGridPlugin, interactionPlugin]} dateClick={handleDateClick}/>
        </>
}
export default Cal;