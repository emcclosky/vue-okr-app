<template>
  <div class="profile-form component">
    <div class="profile-form__container">
      <h2>Profile</h2>
      <div class="profile-form__form-container">
        <form @submit.prevent="updateProfile">
          <div class="profile-form__form-item">
            <label for="email">Email</label>
            <input
              v-model="profileData.email"
              type="email"
              name="email"
              id="email"
              aria-label="Email"
              @focus="fieldsToValidate.email = false"
              @blur="validateField($event.target)"
            />
            <span class="profile-form__alert" role="alert"
              >Please enter a valid email</span
            >
          </div>
          <div class="profile-form__form-item">
            <label for="firstname">First Name</label>
            <input
              v-model="profileData.firstName"
              type="text"
              name="firstname"
              aria-label="First name"
              id="firstName"
              @focus="fieldsToValidate.firstName = false"
              @blur="validateField($event.target)"
            />
            <span class="profile-form__alert" role="alert"
              >First name cannot be empty.</span
            >
          </div>
          <div class="profile-form__form-item">
            <label for="firstname">Last Name</label>
            <input
              v-model="profileData.lastName"
              type="text"
              name="lastname"
              id="lastName"
              aria-label="Last name"
              @focus="fieldsToValidate.lastName = false"
              @blur="validateField($event.target)"
            />
            <span class="profile-form__alert" role="alert"
              >Last name cannot be empty.</span
            >
          </div>
          <div class="profile-form__button-group">
            <button class="button button--green" type="submit">
              Update Profile
            </button>
            <button
              class="button button--border"
              type="button"
              @click="cancelCreation"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      profileData: {
        firstName: "",
        lastName: "",
        email: "",
        id: "",
      },
      updated: false,
      fieldsToValidate: {
        firstName: true,
        lastName: true,
        email: true,
      },
    };
  },
  computed: {
    userData() {
      return this.$store.state.auth.userData;
    },
  },
  methods: {
    cancelCreation() {
      this.$router.back();
    },
    validateField(field) {
      const fieldContainer = field.parentElement;
      let regex;

      if (field.id === "email")
        regex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      else if (field.id === "firstName" || field.id === "lastName")
        regex = /^([A-Za-z]+[,.]?[ ]?[A-Za-z]+['-]?)+$/;

      const bool = regex.test(field.value);
      if (!bool || field.value === "") {
        fieldContainer.classList.add("invalid");
        this.fieldsToValidate[field.id] = false;
      } else {
        if (fieldContainer.classList.contains("invalid")) {
          fieldContainer.classList.remove("invalid");
        }
        this.fieldsToValidate[field.id] = true;
      }
    },
    checkFormValidation() {
      return Object.values(this.fieldsToValidate).every(
        (bool) => bool === true
      );
    },
    async updateProfile() {
      if (!this.checkFormValidation()) return;
      try {
        await this.$store.dispatch("updateProfile", this.profileData);
        this.$store.dispatch("setAlertNotification", {
          message: "Profile updated successfully",
          type: "success",
          visible: true,
        });
      } catch (err) {
        console.error("error: ", err);
      }
    },
  },
  mounted() {
    this.profileData.firstName = this.userData.first_name;
    this.profileData.lastName = this.userData.last_name;
    this.profileData.email = this.userData.email;
    this.profileData.id = this.userData.id;
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/styles/molecules/_profile-form.scss";
</style>
