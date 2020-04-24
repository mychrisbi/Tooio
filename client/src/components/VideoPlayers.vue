<template>
  <div class="hello">
    <div class="videoContainer">
      <OutgoingVideo></OutgoingVideo>
      <IncomingVideos></IncomingVideos>
    </div>
  </div>
</template>

<script>
import OutgoingVideo from "./OutgoingVideo";
import IncomingVideos from "./IncomingVideos";

export default {
  name: "VideoPlayers",
  components: {
    OutgoingVideo,
    IncomingVideos
  },
  props: {
    msg: String
  }
};
</script>

<style scoped>
.videoContainer{
    display: flex;
    
}
</style>
