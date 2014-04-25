Node.js server for exchange information about GPS position.

========

GeoServer is a simple, scalable web-based gps position server built on [Node.js](http://nodejs.org).


Client
------

Now client is available for Android with full client demo application https://github.com/yoman07/PhotoShoter/


Events
------

The server and client both emit events on the channel objects.

Client emit event:
* `connect` - emitted when someone joins the channel with data `fb_id` - this can be any unique id
* `position_update` - emitted when someone change position with data `latitude` and `longitude` 


Server emit event:
* `close` - emitted when someone left the channel with data `fb_id` - this can be any unique id
* `position_update` - emitted when someone change position with data `fb_id` and 
                                `"position" : {
                                    "lat" : data.latitude,
                                    "long" : data.longitude
                                 }`
 


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

Copyright 2014 Roman Barzyczak. Released under the terms of the MIT license.
