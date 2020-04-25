<template>
              <img :src="url" class="image" alt="lorem" width="100%"
                height="100%">
</template>

<script>
  export default {
    name: "portraitComponent",
    props: ['url']
  }
</script>