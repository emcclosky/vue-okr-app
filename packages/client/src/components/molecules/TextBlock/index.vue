<template>
  <div
    class="text-block component"
    :class="{ 'component--gutter': clientWidth < 1024 }"
  >
    <div class="text-block__container">
      <div class="text-block__text-content">
        <h2>{{ data.headline }}</h2>
        <p>{{ data.body }}</p>
        <div class="text-block__features">
          <div
            class="text-block__feature"
            v-for="(feature, index) in data.features"
            :key="`${feature}-${index}`"
          >
            <component v-bind:is="setCheckbox(feature)"></component
            >{{ feature }}
          </div>
        </div>
        <div class="text-block__disclaimer">
          <WarningIcon />{{ data.disclaimer }}
        </div>
      </div>
      <div class="text-block__image">
        <img :src="setImage(data.imageUrl)" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
import CheckboxIcon from "@/components/ui-elements/CheckboxIcon";
import CheckboxBlank from "@/components/ui-elements/CheckboxBlank";
import WarningIcon from "@/components/ui-elements/WarningIcon";

export default {
  components: {
    CheckboxIcon,
    CheckboxBlank,
    WarningIcon,
  },
  props: {
    data: Object,
    home: Boolean,
  },
  data() {
    return {};
  },
  computed: {
    clientWidth() {
      return this.$store.state.clientWidth;
    },
  },
  methods: {
    setCheckbox(feature) {
      if (feature === "OAuth 2.0") return CheckboxIcon;
      else return CheckboxBlank;
    },
    setImage(imagePath) {
      return require(`@/assets/${imagePath}`);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/molecules/_text-block.scss";
</style>
