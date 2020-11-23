<template>
	<div>
		<a href="/#main" class="skip">Skip to Main Content</a>
		<header>
			<NavBar :authorized="authorized" />
			{{ authorized }}
		</header>
		<main>
			<Sidebar v-if="authorized" />
			<div class="page-container" :class="{'page-container--default': !authorized}">
				<div class="page-scrim" :class="setScrimClass()"></div>
				<slot/>
			</div>
		</main>
		<!-- <Footer /> -->
	</div>
</template>

<script>
import NavBar from '@/components/global/NavBar';
import Sidebar from '@/components/global/Sidebar';
import getClientWidth from '@/mixins/getClientWidth.js';
import { mapState, mapGetters } from 'vuex'

export default {
	components: {
		NavBar,
		Sidebar
	},
	mixins: [getClientWidth],
	data() {
		return {
			scrollPos: null,
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
			if(this.menuOpen || this.dialogOpen)
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