<template>
  <div class="signup-form component component--full-width">
    <div class="signup-form__container">
      <div class="signup-form__inner-container">
        <h2>Sign Up</h2>
        <p>
          Already have an account?
          <router-link to="/login">Log in here.</router-link>
        </p>
        <span
          class="signup-form__alert signup-form__alert--large"
          role="alert"
          v-if="generalError"
          >An error occurred. Please try again.</span
        >
        <div class="signup-form__form-container">
          <form @submit.prevent="handleSignup()">
            <div>
              <div class="signup-form__form-group">
                <div class="signup-form__form-item">
                  <label for="firstname">First Name</label>
                  <input
                    v-model="registrationData.firstName"
                    type="text"
                    name="firstname"
                    aria-label="First name"
                    id="firstName"
                    @focus="focusAnimation($event)"
                    @blur="validateField($event.target), focusAnimation($event)"
                  />
                  <span class="signup-form__alert" role="alert"
                    >Please enter a first name.</span
                  >
                </div>
                <div class="signup-form__form-item">
                  <label for="firstname">Last Name</label>
                  <input
                    v-model="registrationData.lastName"
                    type="text"
                    name="lastname"
                    id="lastName"
                    aria-label="Last name"
                    @focus="focusAnimation($event)"
                    @blur="validateField($event.target), focusAnimation($event)"
                  />
                  <span class="signup-form__alert" role="alert"
                    >Please enter a last name.</span
                  >
                </div>
              </div>
              <div class="signup-form__form-group">
                <div
                  class="signup-form__form-item"
                  :class="{ invalid: duplicateError }"
                >
                  <label for="email">Email</label>
                  <input
                    v-model="registrationData.email"
                    type="email"
                    name="email"
                    id="email"
                    aria-label="Email"
                    @focus="focusAnimation($event)"
                    @blur="validateField($event.target), focusAnimation($event)"
                  />
                  <span
                    v-if="!duplicateError"
                    class="signup-form__alert"
                    role="alert"
                    >Please enter a valid email</span
                  >
                  <span
                    v-if="duplicateError"
                    class="signup-form__alert"
                    role="alert"
                    >This email is taken. Try another.</span
                  >
                </div>
              </div>
              <div class="signup-form__form-group">
                <div class="signup-form__form-item">
                  <label for="passwd">Password</label>
                  <input
                    v-model="registrationData.password"
                    type="password"
                    name="passwd"
                    id="passwd"
                    aria-label="Password"
                    @focus="focusAnimation($event)"
                    @blur="validateField($event.target), focusAnimation($event)"
                  />
                  <span class="signup-form__alert" role="alert"
                    >Must contain at least eight characters, one letter, one
                    number and one special character.</span
                  >
                </div>
                <div class="signup-form__form-item">
                  <label for="confirmPasswd">Confirm Password</label>
                  <input
                    v-model="registrationData.passwordConfirmation"
                    type="password"
                    name="confirmPasswd"
                    id="confirmPasswd"
                    aria-label="Confirm Password"
                    @focus="focusAnimation($event)"
                    @blur="validateField($event.target), focusAnimation($event)"
                  />
                  <span
                    class="signup-form__alert"
                    role="alert"
                    v-if="passwordMatch()"
                  >
                    Passwords must match
                  </span>
                </div>
              </div>
              <span class="signup-form__help-text">
                Use 8 or more characters with a mix of letters, numbers &
                symbols.
              </span>
            </div>
            <button class="button button--green" type="submit">Sign up</button>
          </form>
        </div>
        <div class="signup-form__divider">
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
  data() {
    return {
      duplicateError: false,
      generalError: false,
      registrationData: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        passwordConfirmation: "",
      },
      fieldsToValidate: {
        firstName: false,
        lastName: false,
        email: false,
        passwd: false,
      },
    };
  },
  computed: {
    clientWidth() {
      return this.$store.state.clientWidth;
    },
  },
  methods: {
    passwordMatch() {
      return (
        this.fieldsToValidate["passwd"] === true &&
        this.registrationData.password !==
          this.registrationData.passwordConfirmation
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
    validateField(field) {
      const fieldContainer = field.parentElement;
      const helpTextClassList = this.$el.querySelector(
        ".signup-form__help-text"
      ).classList;
      let regex;

      if (field.id === "email")
        regex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      else if (field.id === "firstName" || field.id === "lastName")
        regex = /^([A-Za-z]+[,.]?[ ]?[A-Za-z]+['-]?)+$/;
      // Minimum eight characters, at least one letter, one number and one special character
      else
        regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

      const bool = regex.test(field.value);
      if (!bool || field.value === "") {
        if (field.id === "confirmPasswd" || field.id === "passwd") {
          helpTextClassList.add("hidden");
        }
        fieldContainer.classList.add("invalid");
        this.fieldsToValidate[field.id] = false;
      } else {
        if (fieldContainer.classList.contains("invalid")) {
          fieldContainer.classList.remove("invalid");
          if (field.id === "confirmPasswd" || field.id === "passwd")
            helpTextClassList.remove("hidden");
        }
        this.fieldsToValidate[field.id] = true;
      }
    },
    checkFormValidation() {
      const passwordConfirm = this.$el.querySelector("#confirmPasswd")
        .classList;
      if (
        this.registrationData.password !==
        this.registrationData.passwordConfirmation
      ) {
        passwordConfirm.add("invalid");
        this.fieldsToValidate["passwd"] = false;
        this.fieldsToValidate["confirmPasswd"] = false;
      } else if (
        this.registrationData.password ===
        this.registrationData.passwordConfirmation
      ) {
        if (passwordConfirm.contains("invalid"))
          passwordConfirm.remove("invalid");
        this.fieldsToValidate["passwd"] = true;
        this.fieldsToValidate["confirmPasswd"] = true;
      }
      return Object.values(this.fieldsToValidate).every(
        (bool) => bool === true
      );
    },
    async handleSignup() {
      if (!this.checkFormValidation()) return;
      this.registrationData.email = this.registrationData.email.toLowerCase();
      try {
        const response = await this.$store.dispatch(
          "registerNewUser",
          this.registrationData
        );
      } catch (err) {
        if (err.message.includes("409")) this.duplicateError = true;
        else this.generalError = true;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/styles/molecules/_signup-form.scss";
</style>
