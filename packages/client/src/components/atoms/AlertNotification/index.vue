<template>
    <div class="alert-notification">
      <div class="alert-notification__container">
        <div class="alert-notification__message">
          <CheckCircleIcon />
          <p>{{ alertNotification.message }}</p>
        </div>
          <span class="alert-notification__cta-container">
            <button @click="$store.dispatch('setAlertNotification', { message: '', type: '', visible: false })"><CloseIcon /></button>
          </span>
      </div>
    </div>
</template>

<script>
import CloseIcon from '@/components/ui-elements/CloseIcon';
import CheckCircleIcon from '@/components/ui-elements/CheckCircleIcon';

export default {
  components: {
    CloseIcon,
    CheckCircleIcon
  },
  computed: {
		alertNotification(){
			return this.$store.state.alertNotification;
    }
  },
  methods: {
    setClass(){
      if(this.alertNotification.type === 'success')
        return 'alert-notification--success';
      else if(this.alertNotification.type === 'error')
        return 'alert-notification--error';
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '@/assets/styles/atoms/_alert-notification.scss'
</style>