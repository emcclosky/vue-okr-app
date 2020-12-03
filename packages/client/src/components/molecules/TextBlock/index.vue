<template>
  <div class="text-block component" :class="{'component--gutter': clientWidth < 1024}">
    <div class="text-block__container">
      <div class="text-block__text-content">
        <h2>{{ data.headline }}</h2>
        <p>{{ data.body }}</p>
        <div class="text-block__features">
          <div v-for="(feature, index) in data.features" :key="`${feature}-${index}`">
            {{feature}}
          </div>
        </div>
      </div>
      <div class="text-block__image">
        <img :src="setImage(data.imageUrl)" alt="">
      </div>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    data: Object,
    home: Boolean
  },
  data() {
    return {

    }
  },
  computed: {
    clientWidth(){
      return this.$store.state.clientWidth;
    }
},
  methods: {
    setImage(imagePath) {
      return require(`@/assets/${imagePath}`);
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '@/assets/styles/molecules/_text-block.scss'
</style>