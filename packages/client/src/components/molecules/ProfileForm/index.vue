<template>
  <div class="profile-form component componeny--full-width">
    <div class="profile-form__container">
      <h2>Profile</h2>
      <div class="profile-form__form-container">
        <form @submit.prevent="updateProfile">
          <div class="profile-form__form-group">
            <div class="profile-form__form-item">
                <label for="firstname">First Name</label>
                <input
                  v-model="profileData.firstName"
                  type="text"
                  name="firstname"
                  aria-label="First name"
                  id="firstName"
                >
                <span class="profile-form__alert" role="alert">Please enter a first name.</span>
                </div>
                <div class="profile-form__form-item">
                  <label for="firstname">Last Name</label>
                  <input
                    v-model="profileData.lastName"
                    type="text"
                    name="lastname"
                    id="lastName"
                    aria-label="Last name"
                  >
                  <span class="profile-form__alert" role="alert">Please enter a last name.</span>
                </div>
            </div>
          <button class="button button--green" type="submit">Update profile</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      profileData: {
        firstName: '',
        lastName: '',
      },
    }
  }
}
</script>