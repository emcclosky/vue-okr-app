<template>
    <aside class="sidebar" :class="{'sidebar--open': menuOpen}" v-click-outside="{exclude: ['menu-button'], handler: 'closeMenu' }">
        <button class="sidebar__close-button" @click="closeMenu">
            <CloseIcon />
        </button>
        <div class="sidebar__container">
            <ul class="sidebar__links sidebar__links--top">
                <li class="sidebar__link" :class="{'active': routeName === 'Okrs'}">
                    <router-link to="/okrs" >
                        <DashboardIcon />
                        Dashboard
                    </router-link>
                </li>
                <li class="sidebar__link" :class="{'active': routeName === 'Tasks'}">
                    <router-link to="/tasks">
                        <TaskIcon />
                        Tasks
                    </router-link>
                </li>
                <li class="sidebar__link" :class="{'active': routeName === 'Performance'}">
                    <router-link to="/performance">
                        <PerformanceIcon />
                        Performance
                    </router-link>
                </li>
            </ul>
            <ul class="sidebar__links sidebar__links--bottom">
               <li class="sidebar__link" :class="{'active': routeName === 'Settings'}">
                    <router-link to="/settings">
                        <SettingIcon />
                        Settings
                    </router-link>
                </li>
            </ul>
        </div>
    </aside>
</template>

<script>

export default {
	data(){
		return {
			routeName: ''
		}
	},
	watch: {
		$route() {
			this.routeName = this.$route.name;
		}
	},
	computed: {
		scrollPos(){
			return this.$store.state.scrollPos;
		},
		clientWidth(){
			return this.$store.state.clientWidth;
		},
		menuOpen(){
			return this.$store.state.menuOpen;
		},
	},
	methods: {
		closeMenu() {
			if(this.menuOpen === true) this.$store.dispatch('menuOpen', false);
		},
	},
	mounted(){
		this.routeName = this.$route.name;
	}
}
</script>
<style lang="scss" scoped>
    @import '@/assets/styles/organisms/_sidebar.scss'
</style>