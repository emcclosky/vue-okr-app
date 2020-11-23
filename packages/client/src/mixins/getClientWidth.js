export default {
    computed: {
        resizeListener() {
            return this.$store.state.resizeListener;
        }
    },
    methods: {
        getClientWidth() {
            const clientWidth = document.documentElement.clientWidth;
            this.$store.dispatch('setClientWidth', clientWidth);
        }
    },
    mounted() {
        if(!this.resizeListener) {
            this.$store.dispatch('setResizeListener', true);
            this.$nextTick(() => this.getClientWidth());
            window.addEventListener('resize', this.getClientWidth, { passive: true });
        }
    }
}