<template>
    <div class="key-result-card">
        <div class="key-result-card__container">
            <div class="key-result-card__content-wrapper">
                <div class="key-result-card__left-content">
                    <p>{{keyResult.result}}</p>
                </div>
                <div class="key-result-card__right-content">
                    <span class="key-result-card__owners"></span>
                    <ProgressBar :progress="keyResult.completion_rate" />
                    <span class="key-result-card__percentage">{{ keyResult.completion_rate || 0 }}%</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ProgressBar from '@/components/atoms/ProgressBar';

export default {
    components: {
        ProgressBar
    },
    props: {
        keyResult: Object
    }
}
</script>
<style lang="scss" scoped>
    @import '@/assets/styles/molecules/_key-result-card.scss'
</style>
