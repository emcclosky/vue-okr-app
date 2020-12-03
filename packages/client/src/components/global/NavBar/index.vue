<template>
	<nav class="nav-bar" role="navigation" :class="{'nav-bar--default': !authorized}">
		<div v-if="!authorized" class="nav-bar__logo">
			<router-link to="/">
				OKR
			</router-link>
		</div>
		<div v-if="authorized" class="nav-bar__options">
			<form class="nav-bar__search-form" :class="{'nav-bar__search-form--active': searchActive}" action="" v-click-outside="{exclude: ['search-button'], handler: 'closeSearch' }" role="search">
				<input class="nav-bar__search-input" type="text" placeholder="Search Here...">
				<button class="nav-bar__search-button" type="submit"><SearchIcon /></button>
				<button class="nav-bar__close-button" type="button" @click="closeSearch"><CloseIcon /></button>
			</form>
			<ul class="nav-bar__links">
				<li class="nav-bar__link nav-bar__link--mobile-only" ref="menu-button">
					<button class="nav-bar__menu-button" @click.stop="activateMenu" ref="menu-button"><MenuIcon /></button>
				</li>
				<span>
					<li class="nav-bar__link nav-bar__link--mobile-only" @click="openSearch" ref="search-button">
						<button class="nav-bar__search-button"><SearchIcon /></button>
					</li>
					<li class="nav-bar__link">
						<a>
							<NotificationIcon />
						</a>
					</li>
					<li class="nav-bar__link">
						<a @click="toggleDropdown($event)" ref="profile-button" type="button">
							<ProfileIcon />
							<span v-if="userData">
								{{ userData.first_name }} {{ userData.last_name }}
							</span>
							<ChevronDownIcon />
						</a>
					</li>
					<DropdownMenu :dropdownOptions="dropdownOptions" v-click-outside="{exclude: ['profile-button'], handler: 'dropdownHandler'}" />
				</span>
			</ul>
	</div>
	<div class="nav-bar__options" v-if="!authorized">
			<ul class="nav-bar__links">
				<li class="nav-bar__link nav-bar__link--mobile-only" ref="menu-button">
					<button class="nav-bar__menu-button" @click.stop="activateMenu" ref="menu-button"><MenuIcon /></button>
				</li>
				<span class="nav-bar__link-group" :class="{'nav-bar__link-group--active': menuOpen}">
					<button class="nav-bar__close-button" type="button" @click="activateMenu"><CloseIcon /></button>
					<li class="nav-bar__link">
						<router-link to="/login">Log In</router-link>
					</li>
					<li class="nav-bar__link">
						<router-link to="signup">Sign Up</router-link>
					</li>
				</span>
			</ul>
		</div>
	</nav>
</template>

<script>
import DropdownMenu from '@/components/atoms/DropdownMenu';

export default {
	components: {
		DropdownMenu
	},
	props: ['authorized', 'menuStatus', 'scrollPos'],
	data() {
		return {
			searchActive: false,
			menuOpen: false,
			name: '',
			navScroll: 0,
			dropdownOptions: [
				{
					name: 'Logout',
					action: this.handleLogout,
					icon: 'LogoutIcon'
				},
				{
					name: 'Settings',
					action: this.getSettings,
					icon: 'SettingIcon'
				}
			]
		}
	},
	computed: {
		userData(){
			return this.$store.state.auth.userData;
		}
	},
	watch: {
		menuStatus(){
			if(this.menuStatus)
				this.menuOpen = true;
			else
				this.menuOpen = false;
		},
		scrollPos(){
			if (this.scrollPos <= 80)
				this.$el.classList.remove("nav-bar--fixed");
			else if (this.scrollPos > this.navScroll)
				this.$el.classList.add("nav-bar--fixed");

			this.navScroll = this.scrollPos <= 80 ? 80 : this.scrollPos;
		}
	},
	methods: {
		openSearch(){
			this.searchActive = true;
			this.$store.dispatch('searchOpen', this.searchActive);
		},
		closeSearch(){
			this.searchActive = false;
			this.$store.dispatch('searchOpen', this.searchActive);
		},
		activateMenu(){
			if(this.menuOpen) {
				this.menuOpen = false;
				this.$store.dispatch('menuOpen', this.menuOpen);
			} else {
				this.menuOpen = true;
				this.$store.dispatch('menuOpen', this.menuOpen);
			}
		},
		toggleDropdown(){
			const currentDropdown = this.$el.querySelector('.dropdown-menu');
			if(currentDropdown.classList.contains('active'))
				currentDropdown.classList.remove('active');
			else
				currentDropdown.classList.add('active');
		},
		dropdownHandler(){
			const dropdown = this.$el.querySelector('.dropdown-menu');
			if(dropdown) dropdown.classList.remove('active');
		},
		handleLogout() {
			this.$store.dispatch('logout');
		},
		getSettings() {
			this.$router.push('/settings');
		}
	},
	updated(){
		if(this.userData === null && localStorage.length > 1){
			const { authorized, email, first_name, last_name, id, expiration } = localStorage;
			this.$store.dispatch('setUserData', { authorized, email, first_name, last_name, id, expiration });
		}
	}
}
</script>
<style lang="scss" scoped>
    @import '@/assets/styles/organisms/_nav-bar.scss'
</style>