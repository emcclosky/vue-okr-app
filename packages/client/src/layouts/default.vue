<template>
	<div class="page-container" :class="{'page-container--default': !authorized, 'page-container--logged-in': authorized}">
		<header :class="{'default': !authorized}">
			<a href="/#main" class="skip">Skip to Main Content</a>
			<NavBar :authorized="authorized" :menuStatus="menuOpen" :scrollPos="scrollPos" />
		</header>
		<main id="main">
			<HeroStandard v-if="!authorized && routeName === 'Home'" />
			<Sidebar v-if="authorized" />
				<div class="page-scrim" :class="setScrimClass()"></div>
				<slot/>
		</main>
		<GlobalFooter v-if="!authorized && routeName === 'Home'" />
	</div>
</template>

<script>
import NavBar from '@/components/global/NavBar';
import GlobalFooter from '@/components/global/GlobalFooter';
import Sidebar from '@/components/global/Sidebar';
import HeroStandard from '@/components/heroes/HeroStandard';
import getClientWidth from '@/mixins/getClientWidth.js';
import { mapState, mapGetters } from 'vuex'

export default {
	components: {
		NavBar,
		GlobalFooter,
		Sidebar,
		HeroStandard
	},
	mixins: [getClientWidth],
	data() {
		return {
			scrollPos: null,
			routeName: null
		}
	},
	computed: {
		...mapState({
			menuOpen: 'menuOpen',
			searchOpen: 'searchOpen',
			dialogOpen: 'dialogOpen',
			authorized: state => state.auth.authorized
		}),
	},
	watch: {
		menuOpen: function() {
			this.setFixedClass(this.menuOpen);
		},
		searchOpen: function() {
			this.setFixedClass(this.searchOpen);
		},
		dialogOpen: function() {
			this.setFixedClass(this.dialogOpen);
			this.closeDropdowns();
		},
		$route() {
				this.routeName = this.$route.name;
		}
	},
	methods: {
		closeDropdowns() {
			[...this.$el.querySelectorAll('.dropdown-menu.active')].forEach(menu => {
				menu.classList.remove('active');
			});
		},
		setFixedClass(bool) {
			if(bool)
				document.body.classList.add('fixed');
			else
				document.body.classList.remove('fixed');
		},
		setScrimClass() {
			if(this.menuOpen && this.authorized || this.dialogOpen)
				return 'page-scrim--active';
			else if(this.searchOpen)
				return 'page-scrim--active page-scrim--search';
		},
		updateScrollPos() {
			const st = window.pageYOffset || document.documentElement.scrollTop;
			this.scrollPos = st <= 0 ? 0 : st;
			this.$store.dispatch('setScrollPos', this.scrollPos);
		},
	},
	updated() {
		if(this.routeName === 'Home') {
			this.$el.querySelector('.home').lastChild.classList.add('component--double-bottom');
		}
	},
	mounted() {
		this.scrollPos = 0;
		window.addEventListener('scroll', this.updateScrollPos);
		this.$store.dispatch('setScrollPos', this.scrollPos);
	},
	destroy() {
		window.removeEventListener('scroll', this.updateScrollPos);
	}
}
</script>