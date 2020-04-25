<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <v-img alt="Vuetify Logo" class="shrink mr-2" contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png" transition="scale-transition" width="40" />

        <v-img alt="Vuetify Name" class="shrink mt-1 hidden-sm-and-down" contain min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png" width="100" />
      </div>

      <v-spacer></v-spacer>

      <v-btn href="https://github.com/vuetifyjs/vuetify/releases/latest" target="_blank" text>
        <span class="mr-2">Latest Release</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>


    <main>
      <v-container fluid grid-list-md fill-height align-end>
        <v-row style="height: 60px;"></v-row>
        <v-flex d-flex xs12 sm12 md6>
          <v-card color="purple" dark style="height: 800px;">
            <v-card-title primary class="title">Document</v-card-title>
            <v-card-text>{{ lorem }}</v-card-text>
          </v-card>
        </v-flex>
        <v-col>
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

          <v-layout align-end>
            <v-flex v-for="i in 3" :key="i" xs4>
              <img :src="`https://randomuser.me/api/portraits/men/${i + 20}.jpg`" class="image" alt="lorem" width="100%"
                height="100%">
            </v-flex>
          </v-layout>
        </v-col>


      </v-container>
      <!--
      <v-container class="grey lighten-5" fluid>
        <v-row style="height: 50px;">
        </v-row>
        <v-row style="height: 800px;">
          <v-col class="pa-2" outlined cols="12" md="6">
            <v-card class="pa-2" outlined tile>
              Hello i am Document : ^)
            </v-card>
          </v-col>

          <v-col md="4" offset-md="1" tile>
            <v-row class="pa-2">
              <v-card class="pa-2">
                <v-card-media class="white--text" height="200px"
                  src="https://cdn.pixabay.com/photo/2015/09/26/19/25/blackboard-959608_960_720.png">
                </v-card-media>
                a room with Class

              </v-card>
            </v-row>
            <v-row>
              <v-col>
                <v-card class="pa-2" outlined tile>
                  Frend 1
                </v-card>
              </v-col>
              <v-col>
                <v-card class="pa-2" outlined tile>
                  Frend 2
                </v-card>
              </v-col>
              <v-col>
                <v-card class="pa-2" outlined tile>
                  Frend 3
                </v-card>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    -->
    </main>
  </v-app>
</template>

<script>
  export default {
    data: () => ({
      lorem: `Lorem ipsum dolor sit amet, mel at clita quando. Te sit oratio vituperatoribus, nam ad ipsum posidonium mediocritatem, explicari dissentiunt cu mea. Repudiare disputationi vim in, mollis iriure nec cu, alienum argumentum ius ad. Pri eu justo aeque torquatos.`
    })
  }
</script>