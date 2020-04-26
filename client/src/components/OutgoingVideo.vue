<template>
  <div class="hello">
    <div class="videos">
      <div id="users-container">
        <video id="videoContainer" ref="videoContainer" class="video-small"></video>
      </div>
      <div id="users" style="display:none;"></div>
    </div>
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
    roomName: String
  },

  data: () => ({
    existingStreams: [],
    socket: {},
    localStream: null,
    pc: {},
    answersFrom: {},
    activeVideos: [],
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
      const videoContainer = this.$refs.videoContainer;
      videoContainer.srcObject = this.localStream;
      videoContainer.onloadedmetadata = function() {
        videoContainer.play();
      };
    },
    setupSockets: async function() {
      this.socket.on("add-users", this.onAddUsers);
      this.socket.on("offer-made", this.onOfferMade);
      this.socket.on("answer-made", this.onAnswerMade);
      this.socket.on("remove-users", this.onRemoveUser);
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
        window.setTimeout(() => {
          this.addPeerConnection(id);
          this.createOffer(id);
        }, 1000);
        document.getElementById("users").appendChild(el);
      }
    },
    onRemoveUser: function(data) {
      console.log("removeUser", data.users[0]);
      document.getElementById(data.users[0]).remove();
      const video = document.getElementById("video" + data.users[0]);
      if (video) {
        video.remove();
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
      this.addPeerConnection(data.socket);
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
        if (!this.existingStreams.includes(obj.streams[0])) {
          this.existingStreams.push(obj.streams[0]);
          const vid = document.createElement("video");
          vid.setAttribute("class", "video-small remote");
          vid.setAttribute("autoplay", "autoplay");
          vid.setAttribute("style", "width: 300px;");
          vid.setAttribute("id", "video" + id);
          document.getElementById("users-container").appendChild(vid);
          vid.srcObject = obj.streams[0];
        }
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
    console.log(navigator);
    this.localStream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true
    });

    await this.setupLocalStream();
    this.addPeerConnection(this.socket.id);
    await this.setupSockets();

    this.socket.emit("join-table", {
      name: this.roomName
    });
  },
  watch: {
    // whenever question changes, this function will run
    roomName: function(newName, oldName) {
      this.pc = {};
      this.answersFrom = [];
      const elementsToRemove = document
        .getElementById("users-container")
        .getElementsByClassName("remote");
      for (let i = 0; i < elementsToRemove.length; i) {
        elementsToRemove[i].remove();
      }
      const node = document.getElementById("users");
      while (node.firstChild) {
        console.log(node.firstChild);
        node.removeChild(node.firstChild);
      }
      this.socket.emit("join-table", {
        name: newName
      });
      this.socket.emit("leave-table", {
        name: oldName
      });
    }
  }
};
</script>

<style scoped>
#users-container {
  display: flex;
  overflow: auto;
  max-width: 45vw;
}
.videos {
  display: flex;
  overflow: auto;
}
#users {
  max-width: 15vw;
}
.video-small {
  width: 300px;
}
</style>
