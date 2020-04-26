<template>
  <v-container>
    <v-card color="green" dark height="150px" align-beginning>
      <div style="display:flex; height:100%;">
      <img
        src="@/assets/teacher.jpg"
        class="image"
        alt="lorem"
        height="100%"

      />
      <div style="padding: 1rem;">
        This text represents media shared by the teacher. 
      </div>
      </div>
    </v-card>
    <v-row>
      <v-col v-for="n in 4" :key="n" cols="6" md="3">
        <div @click="changeTable(n)" style="display: flex; flex-direction: column;align-items: center;" :class="'room-'+n === activeTable ? 'active':'inactive'">
          Table {{n}}
          <img
            src="@/assets/table.jpg"
            width="50"
          />
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "classRoomComponent",
  data: () => ({
    overview: true,
    activeTable: "room-2"
  }),
  methods: {
    changeTable: function(n) {
      this.$emit("set-room", "room-" + n);
      this.activeTable = "room-" + n;
    }
  },
};
</script>
<style scoped>
.active {
  border: 4px solid green;
}
</style>