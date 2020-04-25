<template>
  <v-container>
    <v-card color="green" dark height="150px" align-beginning v-show="overview == true">
      <v-card-text>I am a blackboard because that's easier than a whole ass classroom.</v-card-text>
    </v-card>
    <v-row>
      <v-col v-for="n in 4" :key="n" cols="6" md="3" justify="end" v-show="overview == true">
        <v-btn @click="test(n)">Tisch {{n}}</v-btn>
      </v-col>
    </v-row>
  <DocumentComponent style="height: 100%" v-show="overview == false"/>
  <v-switch v-model="overview" :label="`overview: ${overview.toString()}`"></v-switch>
  </v-container>

</template>

<script>
import DocumentComponent from './DocumentComponent.vue';
export default {
  name: "classRoomComponent",
  data: () => ({
    overview: true
  }),
  methods: {
    test: function(n) {
      alert("Hi " + n);
      //TODO connect to peers on that table
    }
  },
  components: {
    DocumentComponent
  }
};
</script>