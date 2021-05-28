<template>
  <div class="alert-dialog">
    <div class="alert-dialog__container">
      <h3>{{ dialogOptions.title }}</h3>
      <p>{{ dialogOptions.message }}</p>
      <span class="alert-dialog__cta-container">
        <button
          @click="$emit('confirm-action', false)"
          class="button button--border"
        >
          Cancel
        </button>
        <button
          @click="$emit('confirm-action', true)"
          class="button"
          :class="dialogOptions.buttonClass"
        >
          {{ dialogOptions.confirmButtonText }}
        </button>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    dialogOptions: Object,
  },
  emits: ["confirm-action"],
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/atoms/_alert-dialog.scss";
</style>
