<template>
<v-container>
            <v-card color="green" dark height=150px align-beginning>
              <v-card-text>I am a blackboard because that's easier than a whole ass classroom.</v-card-text>
            </v-card>
            <v-row>
              <v-col
                v-for="n in 4"
                :key="n"
                cols="6"
                md="3"
                justify='end'
              >
                <v-btn 
                >
                  Tisch {{n}}
                </v-btn>
              </v-col>
            </v-row>
          </v-container>
</template>

<script>
  export default {
    name: "classRoomComponent",
    data: () => ({
    })
  }
</script>