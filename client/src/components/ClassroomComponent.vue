<template>
<v-container>
            <v-card color="green" dark height=150px align-beginning>
              <v-card-text>I am a blackboard because that's easier than a whole classroom.</v-card-text>
            </v-card>
            <v-row>
              <v-col
                v-for="n in 4"
                :key="n"
                cols="6"
                md="3"
                justify='end'
              >
                  <img src="@/assets/table.jpg" width="300" @click="changeTable(n)" :class="'room-'+n === activeTable ? 'active':'inactive'"/>
              </v-col>
            </v-row>
          </v-container>
          
</template>

<script>
export default {
  name: "classRoomComponent",
  data: () => ({
    overview: true,
    activeTable : 'room-2'
  }),
  methods: {
    changeTable: function(n) {
      this.$emit('set-room', 'room-'+n);
      this.activeTable = 'room-'+n
    }
  },
  components: {
  }
};
</script>
<style scoped>
.active{ 
  border:1px solid green
}
</style>