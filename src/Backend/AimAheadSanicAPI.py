from sanic import Sanic
from sanic.response import json
from sanic import response
import struct
app = Sanic("Aim-Ahead-API")
'''
cat_list = []

class Cat(object):
    def __init__(self, name, age, weight):
        self.name = name 
        self.age = age
        self.weight = weight
    def to_json(self):
        return{
            "name": self.name,
            "age": self.age,
            "weight": self.weight
        }
@app.route("create_cat", methods=["POST"])
async def create_cat(request):
    try:
        data = request.json
        cat = Cat(data['name'], data['age'], data['weight'])
        cat_list.append(cat)
        return json(cat)
    except Exception as error:
        print(error)
        return json({"message": "creation failed"}, status=500)
'''
@app.route("/")
async def test(request):
    return json({"hello": "world"})

if __name__ == "__AimAheadSanicAPI__":
    app.run(host='0.0.0.0', port=8000, fast=True)
# route previously used for getting feature data
@app.route('/data', methods=['POST'])
def data(request):
	incoming_data = request.get_json()
	print(incoming_data['hostname'])  # We'll build this in a sec.
	print(incoming_data['data'][0]['emotions'])
	return response.json({'message': 'success'})


# websocket server code goes here..
@app.websocket('/feed')
async def feed(request, ws):
	await ws.send('connection is successful')
	#fps = FPS()
	#fps.start()
	connected = True

	while True:
		data = await ws.recv()
		
		if not data:
			break
    
		if data[0] == 0:
			seg = data[16: 24]
			unpack = struct.unpack('i i', seg)
			fl, sl = unpack

			unpacked_data = struct.unpack('H i d i i {}s {}s ?'.format(len(data) - 25 - sl, len(data) - 25 - fl), data)
			reply = "server recevied data when both audio and video is open"

		elif data[0] == 1:
			unpacked_data = struct.unpack('H i d {}s'.format(len(data) - 16), data)
			reply = "server received data when only video is open"

		elif data[0] == 2:
			unpacked_data = struct.unpack('H i d {}s ?'.format(len(data) - 17), data)
			reply = "server received when only audio is open"

		elif data[0] == 3:
			unpacked_data = struct.unpack('H i d', data)
			reply = "server recieved when both audio and video is close"

		# how to send and print this reply message to the client ??????????
		'''
    Future work
    We will likely send status of device back here not necessarily a string reply
    client will need to do ws.recv() to get this data.
    '''
		await ws.send(reply)