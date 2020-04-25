<template>
          <v-card color="purple" dark style="height: 800px;">
            <v-card-title primary class="title">Document</v-card-title>
            <v-card-text>{{ lorem }}</v-card-text>
          </v-card>
</template>

<script>
  export default {
    nam: "documentComponent",
    data: () => ({
      lorem: `Lorem ipsum dolor sit amet, mel at clita quando. Te sit oratio vituperatoribus, nam ad ipsum posidonium mediocritatem, explicari dissentiunt cu mea. Repudiare disputationi vim in, mollis iriure nec cu, alienum argumentum ius ad. Pri eu justo aeque torquatos.`
    })
  }
</script>