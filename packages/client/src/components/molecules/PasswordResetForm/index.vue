<template>
   <div class="password-reset-form component component--full-width">
       <div class="password-reset-form__container">
           <div class="password-reset-form__inner-container">
                <h2>Password Reset</h2>
                <p class="password-reset-form__description" v-if="submitted === false">
                    Enter the email address that you used to register. We'll send you an email with a link to reset your password.
                </p>
                <p class="password-reset-form__description" v-if="submitted === true">
                    A reset link has been sent to {{ email }} with instructions on how to reset your password.
                </p>
                <span class="password-reset-form__alert" v-if="tokenValidated">
                    Your password reset link is not valid, or already used.
                </span>
                <div class="password-reset-form__form-container" v-if="submitted === false">
                    <form @submit.prevent="handlePasswordReset">
                        <div>
                            <div class="password-reset-form__form-group">
                                <div class="password-reset-form__form-item">
                                    <label for="email">Email address</label>
                                    <input
                                        v-model="email"
                                        type="email"
                                        name="email"
                                        id="email"
                                        aria-label="Email"
                                        @focus="focusAnimation($event)"
                                        @blur="focusAnimation($event)"
                                    >
                                </div>
                            </div>
                        </div>
                        <button class="button button--green" type="submit">Send</button>
                    </form>
                </div>
           </div>
       </div>
   </div>
</template>

<script>
export default {
    data(){
        return {
            email: '',
            submitted: false,
            tokenValidated: ''
        }
    },
    methods: {
        focusAnimation(event) {
            if(!event.currentTarget.value) {
                const labelClassList = event.currentTarget.previousElementSibling.classList;
                labelClassList.contains('active') ? labelClassList.remove('active') : labelClassList.add('active');
            }
        },
        async handlePasswordReset(){
            try {
                const response = await this.$store.dispatch('sendPasswordReset', { email: this.email });
                if(response.status === 204)
                    this.submitted = true;
            } catch(error) {
                console.error(error);
            }
        }
    },
    mounted(){
        if(this.$route.params && this.$route.params.tokenValidated)
            this.tokenValidated = this.$route.params.tokenValidated;
    }
}
</script>

<style lang="scss" scoped>
    @import '@/assets/styles/molecules/_password-reset-form.scss'
</style>