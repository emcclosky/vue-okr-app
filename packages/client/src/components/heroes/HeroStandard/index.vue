<template>
  <div class="hero-standard">
    <div class="hero-standard__container">
      <div class="hero-standard__text-content">
        <h1>
          Measure What Matters
        </h1>
        <p>
          Keep focused on goals that drive results using OKRs.
        </p>
        <div class="hero-standard__button-container">
          <router-link to="/signup">
            <button class="button button--green">Get Started</button>
          </router-link>
        </div>
      </div>
    </div>
    <div class="hero-standard__background-container">
      <WaveBackground />
    </div>
  </div>
</template>
<script>
import WaveBackground from "@/components/ui-elements/WaveBackground";
export default {
  components: {
    WaveBackground,
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/styles/organisms/_hero-standard.scss";
</style>
