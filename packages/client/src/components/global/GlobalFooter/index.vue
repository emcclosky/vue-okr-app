<template>
	<footer>
		<div class="global-footer component component--full-width">
			<div class="global-footer__container">
			<!-- <div class="global-footer__top"></div> -->
				<div class="global-footer__bottom">
					<div class="global-footer__site-credit">Designed & Developed by Liz Arinder</div>
					<div class="global-footer__social-bar">
						<a href="https://www.linkedin.com/in/elizabeth-a-94772071/">
							<LinkedinIcon />
						</a>
						<a href="https://github.com/emcclosky">
							<GithubIcon />
						</a>
					</div>
				</div>
			</div>
		</div>
	</footer>
</template>

<script>
import GithubIcon from '@/components/ui-elements/GithubIcon';
import LinkedinIcon from '@/components/ui-elements/LinkedinIcon';

export default {
	components: {
		GithubIcon,
		LinkedinIcon
	},
	methods: {
	},
}
</script>

<style lang="scss" scoped>
  @import '@/assets/styles/organisms/_global-footer.scss'
</style>