<template>
  <Layout>
    <router-view :key="$route.fullPath" />
  </Layout>
</template>

<script>
import Layout from "./layouts/default.vue";

export default {
  components: {
    Layout,
  },
};
</script>
