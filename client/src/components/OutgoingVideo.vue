<template>
  <div class="hello">
    <video id="videoContainer" ref="videoContainer"></video>
    <div id="users-container"></div>
    <div id="users"></div>
  </div>
</template>

<script>
import io from "socket.io-client";
var sessionDescription =
  window.RTCSessionDescription ||
  window.mozRTCSessionDescription ||
  window.webkitRTCSessionDescription ||
  window.msRTCSessionDescription;
export default {
  name: "OutgoingVideos",
  props: {
    msg: String
  },
  data: () => ({
    existingStreams: [],
    socket: {},
    localStream: null,
    pc: {},
    answersFrom: {},
    iceConfiguration: {
      iceServers: [
        {
          urls: ["stun:stun.schlund.de"]
        }
      ]
    }
  }),
  methods: {
    setupLocalStream: async function() {
      const videoContainer = document.getElementById("videoContainer");
      videoContainer.srcObject = this.localStream;
      videoContainer.onloadedmetadata = function() {
        videoContainer.play();
      };
    },
    setupSockets: async function() {
      this.socket.on("add-users", this.onAddUsers);
      this.socket.on("offer-made", this.onOfferMade);
      this.socket.on("answer-made", this.onAnswerMade);
    },
    errorHandler: function(err) {
      console.warn("Error", err);
    },
    createOffer: function(id) {
      this.pc[id].createOffer(offer => {
        this.pc[id].setLocalDescription(
          new sessionDescription(offer),
          () => {
            this.socket.emit("make-offer", {
              offer: offer,
              to: id
            });
          },
          this.errorHandler
        );
      }, this.errorHandler);
    },
    onAddUsers: function(data) {
      console.log("addusers", data);
      for (var i = 0; i < data.users.length; i++) {
        var el = document.createElement("div"),
          id = data.users[i];

        el.setAttribute("id", id);
        el.innerHTML = id;
        el.addEventListener("click", () => {
          this.addPeerConnection(id)
          this.createOffer(id);
        });
        document.getElementById("users").appendChild(el);
      }
    },
    onAnswerMade: function(data) {
      console.log("answermade", data);

      this.pc[data.socket].setRemoteDescription(
        new sessionDescription(data.answer),
        () => {
          document.getElementById(data.socket).setAttribute("class", "active");
          if (!this.answersFrom[data.socket]) {
            this.createOffer(data.socket);
            this.answersFrom[data.socket] = true;
          }
        },
        this.errorHandler
      );
    },
    onOfferMade: function(data) {
      console.log("offermade", data);
      this.addPeerConnection(data.socket)
      this.pc[data.socket].setRemoteDescription(
        new sessionDescription(data.offer),
        () => {
          this.pc[data.socket].createAnswer(answer => {
            this.pc[data.socket].setLocalDescription(
              new sessionDescription(answer),
              () => {
                this.socket.emit("make-answer", {
                  answer: answer,
                  to: data.socket
                });
              },
              this.errorHandler
            );
          }, this.errorHandler);
        },
        this.errorHandler
      );
    },
    addPeerConnection: function(id) {
      var peerConnection =
        window.RTCPeerConnection ||
        window.mozRTCPeerConnection ||
        window.webkitRTCPeerConnection ||
        window.msRTCPeerConnection;
      const newConnection = new peerConnection(this.iceConfiguration);
      newConnection.ontrack = obj => {
        const vid = document.createElement("video");
        vid.setAttribute("class", "video-small");
        vid.setAttribute("autoplay", "autoplay");
        document.getElementById("users-container").appendChild(vid);
        vid.srcObject = obj.streams[0];
      };
      newConnection.addStream(this.localStream);
      this.pc[id] = newConnection;
    }
  },
  mounted: async function() {
    this.socket = io.connect("http://localhost:5000");

    navigator.getUserMedia =
      navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia ||
      navigator.msGetUserMedia;
    console.log(navigator)
    this.localStream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true
    });

    await this.setupLocalStream();
    this.addPeerConnection(this.socket.id);
    await this.setupSockets();
  }
};
</script>

<style scoped>
</style>
