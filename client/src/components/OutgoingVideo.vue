<template>
  <div class="hello">
    <video id="videoContainer" ref="videoContainer"></video>
    <div id="users-container"></div>
    <div id="users"></div>
  </div>
</template>

<script>
import io from "socket.io-client";

export default {
  name: "OutgoingVideos",
  props: {
    msg: String
  },
  data: () => ({
    existingStreams: []
  }),
  mounted: async function() {
    var socket = io.connect("http://localhost:5000");

    var answersFrom = {};
    var peerConnection =
      window.RTCPeerConnection ||
      window.mozRTCPeerConnection ||
      window.webkitRTCPeerConnection ||
      window.msRTCPeerConnection;

    var sessionDescription =
      window.RTCSessionDescription ||
      window.mozRTCSessionDescription ||
      window.webkitRTCSessionDescription ||
      window.msRTCSessionDescription;

    navigator.getUserMedia =
      navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia ||
      navigator.msGetUserMedia;

    var pc = new peerConnection({
      iceServers: [
        {
          urls: ["stun:stun.schlund.de"]
        }
      ]
    });
    pc.ontrack = obj => {
        console.log("OK")
      if (!this.existingStreams.includes(obj.streams[0].id)) {
        this.existingStreams.push(obj.streams[0].id);

        const vid = document.createElement("video");
        vid.setAttribute("class", "video-small");
        vid.setAttribute("autoplay", "autoplay");
        document.getElementById("users-container").appendChild(vid);
        vid.srcObject = obj.streams[0];
      }
    };

    const mediaStream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true
    });

    const videoContainer = document.getElementById("videoContainer");
    videoContainer.srcObject = mediaStream;
    videoContainer.onloadedmetadata = function() {
      videoContainer.play();
    };
    pc.addStream(mediaStream);

    socket.on("add-users", function(data) {
      for (var i = 0; i < data.users.length; i++) {
        var el = document.createElement("div"),
          id = data.users[i];

        el.setAttribute("id", id);
        el.innerHTML = id;        
        el.addEventListener("click", function() {
          createOffer(id)
        });
        console.log(data);
        document.getElementById("users").appendChild(el);
      }
    });

    socket.on("remove-user", function(id) {
      var div = document.getElementById(id);
      document.getElementById("users").removeChild(div);
    });

    socket.on("offer-made", function(data) {
      pc.setRemoteDescription(
        new sessionDescription(data.offer),
        function() {
          pc.createAnswer(function(answer) {
            pc.setLocalDescription(
              new sessionDescription(answer),
              function() {
                socket.emit("make-answer", {
                  answer: answer,
                  to: data.socket
                });
              },
              error
            );
          }, error);
        },
        error
      );
    });

    socket.on("answer-made", function(data) {
      pc.setRemoteDescription(
        new sessionDescription(data.answer),
        function() {
          document.getElementById(data.socket).setAttribute("class", "active");
          if (!answersFrom[data.socket]) {
            createOffer(data.socket);
            answersFrom[data.socket] = true;
          }
        },
        error
      );
    });

    function createOffer(id) {
      pc.createOffer(function(offer) {
        pc.setLocalDescription(
          new sessionDescription(offer),
          function() {
            socket.emit("make-offer", {
              offer: offer,
              to: id
            });
          },
          error
        );
      }, error);
    }

    function error(err) {
      console.warn("Error", err);
    }
  }
};
</script>

<style scoped>
</style>
