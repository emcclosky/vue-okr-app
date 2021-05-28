<template>
  <div class="home">
    <TextBlock :data="aboutContent" :home="true" v-if="aboutContent" />
  </div>
</template>

<script>
import TextBlock from "@/components/molecules/TextBlock";
import aboutContent from "@/content/about-section.json";

export default {
  name: "Home",
  components: {
    TextBlock,
  },
  data() {
    return {
      aboutContent: aboutContent,
    };
  },
};
</script>
