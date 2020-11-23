<template>
    <div class="progress-bar">
        <div :style="[progress ? {width: progress + '%'} : {width: 0 + '%'}]" class="progress-bar__progress"></div>
    </div>
</template>


<script>
export default {
    props: ['progress']
}
</script>>
<style lang="scss" scoped>
    @import '@/assets/styles/atoms/_progress-bar.scss'
</style>