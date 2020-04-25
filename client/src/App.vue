<template>
  <v-app>
    <main>
      <v-container fluid grid-list-md fill-height align-end>
        <v-flex d-flex xs12 sm12 md6>
          <DocumentComponent />
        </v-flex>
        <v-col>
          <ClassRoomComponent />
          <v-layout align-end>
            <v-flex v-for="i in 3" :key="i" xs4>
              <portraitComponent :url="`https://randomuser.me/api/portraits/men/${i + 20}.jpg`" />
            </v-flex>
          </v-layout>
        </v-col>
      </v-container>
    </main>
  </v-app>
</template>

<script>
  import DocumentComponent from './components/DocumentComponent.vue'
  import ClassRoomComponent from './components/ClassroomComponent.vue'
  import PortraitComponent from './components/PortraitComponent.vue'
  export default {
    data: () => ({
      lorem: `Lorem ipsum dolor sit amet, mel at clita quando. Te sit oratio vituperatoribus, nam ad ipsum posidonium mediocritatem, explicari dissentiunt cu mea. Repudiare disputationi vim in, mollis iriure nec cu, alienum argumentum ius ad. Pri eu justo aeque torquatos.`
    }),
    components: {
      DocumentComponent,
      ClassRoomComponent,
      PortraitComponent
    }
  }
</script>