<template>
   <div class="login-form component component--full-width">
       <div class="login-form__container">
           <div class="login-form__inner-container">
                <h2>Log In</h2>
                <p>Don't have an account? <router-link to="/signup">Sign Up</router-link></p>
                <span class="login-form__alert" role="alert" v-if="authorized === false && loginAttemptFailed">Incorrect email or password.</span>
                <div class="login-form__form-container">
                    <form @submit.prevent="handleLogin()">
                        <div>
                            <div class="login-form__form-group">
                                <div class="login-form__form-item">
                                    <label for="email">Email</label>
                                    <input
                                        v-model="loginData.email"
                                        type="email"
                                        name="email"
                                        id="email"
                                        aria-label="Email"
                                        @focus="focusAnimation($event)"
                                        @blur="focusAnimation($event)"
                                    >
                                </div>
                            </div>
                            <div class="login-form__form-group">
                                <div class="login-form__form-item">
                                    <label for="passwd">Password</label>
                                    <input
                                        v-model="loginData.password"
                                        type="password"
                                        name="passwd"
                                        id="passwd"
                                        aria-label="Password"
                                        @focus="focusAnimation($event)"
                                        @blur="focusAnimation($event)"
                                    >
                                </div>
                            </div>
                            <span class="login-form__help-text">
                                <router-link to="/password-reset">Forgot your password?</router-link>
                            </span>
                        </div>
                        <button class="button button--green" type="submit">Log In</button>
                    </form>
                </div>
                <div class="login-form__divider">
                    <span>
                        or
                    </span>
                </div>
                <div>
                    <a href="http://127.0.0.1:8000/auth/google">
                        <button class="button button--google">Continue with Google</button>
                    </a>
                </div>
           </div>
       </div>
   </div>
</template>

<script>

export default {
    data(){
        return {
            loginData: {
              email: '',
              password: ''
            },
            loginAttemptFailed: false
        }
    },
    computed: {
        clientWidth() {
            return this.$store.state.clientWidth;
        },
        authorized() {
            return this.$store.state.auth.authorized;
        }
    },
    methods: {
        focusAnimation(event) {
            if(!event.currentTarget.value) {
                const labelClassList = event.currentTarget.previousElementSibling.classList;
                labelClassList.contains('active') ? labelClassList.remove('active') : labelClassList.add('active');
            }
        },
        async handleLogin(){
            try {
                await this.$store.dispatch('login', this.loginData);
            } catch(err){
                console.error('here', err);
                this.loginAttemptFailed = true;
            }
        }
    }
}
</script>
<style lang="scss" scoped>
    @import '@/assets/styles/molecules/_login-form.scss'
</style>