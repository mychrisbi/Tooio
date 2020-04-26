To start it you need npm installed (https://www.npmjs.com/get-npm)

Change this line (in OutgoingVideo.vue):
this.socket = io.connect("http://localhost:5000");

to this: 
this.socket = io.connect("http://your-ip:5000");

(Your-ip is your local address, something like 10.0.0.14)

You can now start the development server with following commands:
    cd client
    npm install
    npm run serve

The server also needs to be started:
    cd server
    npm install
    npm run serve




You should now be able to reach the server from your local machine with your chrome/chromium browser:
localhost:8080

If you want to reach the server from other PCs (in your local LAN), you have to start the chrome/chromium browser with following option (cause we didn't deploy it with https yet):
chromium --unsafely-treat-insecure-origin-as-secure="http://your-ip:8080"
or
chrome.exe --unsafely-treat-insecure-origin-as-secure="http://your-ip:8080"
and then connect to http://your-ip:8080