from array import array
from datetime import datetime
import mimetypes
from msilib.schema import MIME
from fastapi import FastAPI, Header
from typing import Optional
from pydantic import BaseModel
from fastapi.responses import FileResponse
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
from pathlib import Path
from fastapi import Request, Response
from fastapi.templating import Jinja2Templates
import numpy as np
import cv2
import os
from typing import BinaryIO
import time
from datetime import datetime
from fastapi import HTTPException, Request, status

def send_bytes_range_requests(
    file_obj: BinaryIO, start: int, end: int, chunk_size: int = 10_000
):
    with file_obj as f:
        f.seek(start)
        while (pos := f.tell()) <= end:
            read_size = min(chunk_size, end + 1 - pos)
            yield f.read(read_size)


def _get_range_header(range_header: str, file_size: int) -> tuple[int, int]:
    def _invalid_range():
        return HTTPException(
            status.HTTP_416_REQUESTED_RANGE_NOT_SATISFIABLE,
            detail=f"Invalid request range (Range:{range_header!r})",
        )

    try:
        h = range_header.replace("bytes=", "").split("-")
        start = int(h[0]) if h[0] != "" else 0
        end = int(h[1]) if h[1] != "" else file_size - 1
    except ValueError:
        raise _invalid_range()

    if start > end or start < 0 or end > file_size - 1:
        raise _invalid_range()
    return start, end


def range_requests_response(
    request: Request, file_path: str, content_type: str
):
    """Returns StreamingResponse using Range Requests of a given file"""

    file_size = os.stat(file_path).st_size
    range_header = request.headers.get("range")

    headers = {
        "content-type": content_type,
        "accept-ranges": "bytes",
        "content-encoding": "identity",
        "content-length": str(file_size),
        "access-control-expose-headers": (
            "content-type, accept-ranges, content-length, "
            "content-range, content-encoding"
        ),
    }
    start = 0
    end = file_size - 1
    status_code = status.HTTP_200_OK

    if range_header is not None:
        start, end = _get_range_header(range_header, file_size)
        size = end - start + 1
        headers["content-length"] = str(size)
        headers["content-range"] = f"bytes {start}-{end}/{file_size}"
        status_code = status.HTTP_206_PARTIAL_CONTENT

    return StreamingResponse(
        send_bytes_range_requests(open(file_path, mode="rb"), start, end),
        headers=headers,
        status_code=status_code,
    )

id = "id"
month="month"
score="score"
caregivers = {
    1: {
        "name":"Sarah Connor",
        "score": 7,
        "ID": "00000002",
        "Date_taken": "08/11/21",
        "annual_data":[
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
                ],
        "daily_data": [{
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
  ],
    },
    2: {
        "name":"Ms. Anderson",
        "score": 12,
        "ID": "00000004",
        "Date_taken": "09/05/21",
        "annual_data": [
                        {
                            id: 1,
                            month: "January",
                            score: 12,

                        },{
                            id: 2,
                            month: "February",
                            score: 9,

                        },
                        {
                            id: 3,
                            month: "March",
                            score: 7,

                        },
                        {
                            id: 4,
                            month: "April",
                            score: 5,

                        },
                        {
                            id: 5,
                            month: "May",
                            score: 5,

                        },
                        {
                            id: 6,
                            month: "June",
                            score: 6,

                        },
                        {
                            id: 7,
                            month: "July",
                            score: 5,

                        },
                        {
                            id: 8,
                            month: "August",
                            score: 8,

                        },
                        {
                            id: 9,
                            month: "September",
                            score: 17,

                        },
                        {
                            id: 10,
                            month: "October",
                            score: 13,

                        },
                        {
                            id: 11,
                            month: "November",
                            score: 10,

                        },
                        {
                            id: 12,
                            month: "December",
                            score: 10,

                        },
                        
                        ],
        "daily_data": [{
    id: 1,
    month: "Monday 6/27",
    score: 9,
  },
  {
    id: 2,
    month: "Tuesday",
    score: 6,

  },
  {
    id: 3,
    month: "Wednesday",
    score: 6,

  },
  {
    id: 4,
    month: "Thursday",
    score: 11,

  },
  {
    id: 5,
    month: "Friday",
    score: 12,

  },
  {
    id: 6,
    month: "Saturday",
    score: 9,

  },
  {
    id: 7,
    month: "Sunday",
    score: 7,

  },
  ]
    }
}


empty_chart = [
{
    id: 1,
    month: "null",
    score: 0,

  },{
    id: 2,
    month: "null",
    score: 0,

  },
  {
    id: 3,
    month: "null",
    score: 0,

  },
  {
    id: 4,
    month: "null",
    score: 0,

  },
  {
    id: 5,
    month: "null",
    score: 0,

  },
  {
    id: 6,
    month: "null",
    score: 0,

  },
  {
    id: 7,
    month: "null",
    score: 0,

  },
  {
    id: 8,
    month: "null",
    score: 0,

  },
  {
    id: 9,
    month: "null",
    score: 0,

  },
  {
    id: 10,
    month: "null",
    score: 0,

  },
  {
    id: 11,
    month: "null",
    score: 0,

  },
  {
    id: 12,
    month: "null",
    score: 0,

  },
  
]
class Caregivee(BaseModel):
    name: str
    score: int
    Date_taken: str
    annual_data: list
class UpdateCaregivee(BaseModel):
    name: Optional[str] = None
    score: Optional[int] = None
    Date_taken: Optional[str] = None
    annual_data: Optional[list] = None
app=FastAPI()
#PORTION_SIZE = 1024 * 1024
#current_directory = getcwd() + "/"

#adding CORS URLs
origins = [
    'http://localhost:3000'
]
#adding middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins = origins,
    allow_credentials = True,
    allow_methods = ["*"],
    allow_headers = ["*"]
)

@app.get("/")
async def root():
    return {"message": "You are viewing the records for elderly patient: "}

def gen(camera):
    """Video streaming generator function."""
    while True:
        frame = camera.get_frame()
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')

@app.get("/get-by-name")
def get_elderly_name(*, name: Optional[str]=None):
    for caregivee in caregivers:
        if caregivers[caregivee]["name"] == name:
            return caregivers[caregivee]
    return {"Data": "Isn't Found!"}

@app.get("/get-annual-data-by-id")
def get_elderly_data(*, identity: Optional[str]=None):
    for caregivee in caregivers:
        if caregivers[caregivee]["ID"] == identity:
            return caregivers[caregivee]["annual_data"]
    return empty_chart
@app.get("/get-daily-data-by-id")
def get_elderly_data(*, identity: Optional[str]=None):
    for caregivee in caregivers:
        if caregivers[caregivee]["ID"] == identity:
            return caregivers[caregivee]["daily_data"]
    return empty_chart[0:7]
'''
Old Streaming technique (all at once):
@app.get("/webcam")
def get_webcam_footage():
    return FileResponse('Sarah Connor.mp4')
'''
#new efficient streaming technique:
@app.get("/webcam_livestream")
def get_video(request: Request, video: Optional[str]=None):
  video+=".mp4"
  return range_requests_response(
    request, file_path=video, content_type="video/mp4"
  )
'''
def get_video(name_video: str, range: str = Header(default=None)):
    start, end = range.replace("bytes=", "").split("-")
    start = int(start)
    end = int(start + PORTION_SIZE)
    with open(current_directory + name_video, "rb") as myfile:
        myfile.seek(start)
        data = myfile.read(end - start)
        size_video = str(path.getsize(current_directory + name_video))
        headers = {
            'Content-Range': f'bytes {str(start)}-{str(end)}/{size_video}',
            'Accept-Ranges': 'bytes'
        }
        return Response(content=data, status_code=206, headers=headers, media_type="video/mp4")
        '''
@app.get("/stream")
def stream():
  def get_data():
    while True:
      time.sleep(1)
      yield f'data: {datetime.now()} \n\n'
  return Response(get_data(), mimetypes='text/event-stream')