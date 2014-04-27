GeoServer - Node.js server
========

GeoServer is a simple, scalable web-based gps position server built on [Node.js](http://nodejs.org) for exchange information about GPS position.

Client
------

Android class responsible for connection with GeoServer https://github.com/yoman07/PhotoShoter/blob/master/PhotoShoterModule/src/main/java/com/photoshoter/SocketClient.java

for using this client on Android you need socket.io library https://github.com/Gottox/socket.io-java-client

Full Android demo client application https://github.com/yoman07/PhotoShoter/


Events
------

The server and client both emit events on the channel objects.

Client emit event:
* `connect` - emitted when someone joins the channel with data `fb_id` - this can be any unique id
* `position_update` - emitted when someone change position with data `latitude` and `longitude` 
* `send_photo` - emitted when someone make a photo and send to other user with data `fb_id` - receiver id, `image` - image in base64 format and `locationImage` - location where photo was made


Server emit event:
* `close` - emitted when someone left the channel with data `fb_id` - this can be any unique id
* `position_update` - emitted when someone change position with data `fb_id` and 
                                `"position" : {
                                    "lat" : data.latitude,
                                    "long" : data.longitude
                                 }`
* `photo_received` - emitted when someone make a photo and send to other user with data `fb_id` - sneder id, `image` - image in base64 format and `locationImage` - location where photo was made


Installation & Demo
-------------------

To install:

	git clone https://github.com/yoman07/geo_server/

To run the demo:

  foreman start
  Then open `http://localhost:5000` in a browser.


You can deploy this demo on heroku more about this is here https://devcenter.heroku.com/articles/git , but you need enable websocket on heroku server https://devcenter.heroku.com/articles/heroku-labs-websockets .


License
-------

Copyright (c) 2014 Roman Barzyczak

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.
