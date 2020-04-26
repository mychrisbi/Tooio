<template>
  <v-app>
    <img src="@/assets/logo.png" class="logo" />
    <main>
      <v-container fluid grid-list-md fill-height align-end>
        <v-flex d-flex xs12 sm12 md6>
          <DocumentComponent :documentHash="hashMap[currentRoom]" :key="currentRoom" />
        </v-flex>
        <v-col>
          <ClassRoomComponent v-on:set-room=" currentRoom= $event" />
          <v-layout align-end>
            <outgoing-video :roomName="currentRoom"></outgoing-video>
          </v-layout>
        </v-col>
      </v-container>
    </main>
  </v-app>
</template>

<script>
import DocumentComponent from "./components/DocumentComponent.vue";
import ClassRoomComponent from "./components/ClassroomComponent.vue";
import OutgoingVideo from "./components/OutgoingVideo.vue";

export default {
  data: () => ({
    lorem: `Lorem ipsum dolor sit amet, mel at clita quando. Te sit oratio vituperatoribus, nam ad ipsum posidonium mediocritatem, explicari dissentiunt cu mea. Repudiare disputationi vim in, mollis iriure nec cu, alienum argumentum ius ad. Pri eu justo aeque torquatos.`,
    currentRoom: "room-2",
    hashMap:{
      'room-1':'M5phJoAuRkrQI26YacD',
      'room-2':'M5plNJa4q_vQJs2oYSw',
      'room-3':'M5plLMcZg7-1eFegFDL',
      'room-4':'M5plP4IChw007s1WDkt',

    }
  }),
  components: {
    DocumentComponent,
    ClassRoomComponent,
    OutgoingVideo
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.logo{
  width: 396px;
  height: 122px;
}
</style>