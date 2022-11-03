import React from 'react'
import { useParams } from 'react-router-dom';
function WebcamStream() {
  const {elderly_id} = useParams();
  const elderlyID=elderly_id;
  const video_source = 'http://localhost:8000/webcam_livestream?video='+elderlyID;
  return (
    <div className='webcam-container'>
    <video controls loop autoPlay>
                <source src={video_source} type="video/mp4" />
    </video>
    </div>
  )
}

export default WebcamStream