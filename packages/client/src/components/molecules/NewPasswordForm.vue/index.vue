<template>
  <div class="new-password-form component component--full-width">
    <div class="new-password-form__container">
      <div class="new-password-form__inner-container">
        <h2>Reset Password</h2>
        <p class="new-password-form__description" v-if="submitted">
          Your password has been successfully changed.
          <router-link to="/login">Log in</router-link> with your new password.
        </p>
        <div
          class="new-password-form__form-container"
          v-if="submitted === false"
        >
          <form @submit.prevent="handleNewPassword">
            <div>
              <div class="new-password-form__form-group">
                <div class="new-password-form__form-item">
                  <label for="passwd">Password</label>
                  <input
                    v-model="password"
                    type="password"
                    name="passwd"
                    id="passwd"
                    aria-label="Password"
                    @focus="focusAnimation($event)"
                    @blur="focusAnimation($event)"
                  />
                  <span class="new-password-form__alert" role="alert">
                    Must contain at least eight characters, one letter, one
                    number and one special character
                  </span>
                </div>
              </div>
              <div class="new-password-form__form-group">
                <div class="new-password-form__form-item">
                  <label for="confirmPasswd">Confirm Password</label>
                  <input
                    v-model="passwordConfirmation"
                    type="password"
                    name="confirmPasswd"
                    id="confirmPasswd"
                    aria-label="Confirm Password"
                    @focus="focusAnimation($event)"
                    @blur="focusAnimation($event)"
                  />
                  <span
                    class="new-password-form__alert"
                    role="alert"
                    v-if="passwordMatch()"
                  >
                    Passwords must match
                  </span>
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
  data() {
    return {
      email: "",
      submitted: false,
      password: "",
      passwordConfirmation: "",
      validationPassed: "",
    };
  },
  methods: {
    passwordMatch() {
      return (
        this.passwordConfirmation !== this.password &&
        this.passwordConfirmation !== "" &&
        this.validationPassed !== true
      );
    },
    focusAnimation(event) {
      if (!event.currentTarget.value) {
        const labelClassList =
          event.currentTarget.previousElementSibling.classList;
        labelClassList.contains("active")
          ? labelClassList.remove("active")
          : labelClassList.add("active");
      }
    },
    checkFormValidation() {
      let validationPassed = false;
      [...this.$el.querySelectorAll("input")].forEach((input) => {
        const fieldContainer = input.parentElement;
        let regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
        const bool = regex.test(input.value);
        if (!bool) {
          fieldContainer.classList.add("invalid");
          validationPassed = false;
        } else {
          if (fieldContainer.classList.contains("invalid")) {
            fieldContainer.classList.remove("invalid");
          }
          validationPassed = true;
        }
      });
      return validationPassed;
    },
    async handleNewPassword() {
      if (!this.checkFormValidation()) return;
      const data = { password: this.password, email: this.$route.query.user };
      try {
        await this.$store.dispatch("createNewPassword", data);
        this.submitted = true;
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/styles/molecules/_new-password-form.scss";
</style>
