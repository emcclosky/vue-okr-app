<template>
  <section class="create-okr okr-form component component--full-width">
    <div class="okr-form__container">
      <h2>Create New OKR</h2>
      <hr />
      <form class="okr-form__form" @submit.prevent="handleSubmit()">
        <h3>Objective</h3>
        <div class="okr-form__form-item okr-form__form-item--objective">
          <label for="objective">What would you like to accomplish?</label>
          <input
            type="text"
            name="objective"
            placeholder="Enter your objective..."
            v-model="submissionData.objective"
          />
        </div>
        <hr />
        <h3>Key Results</h3>
        <div v-for="(kr, index) in keyResults" :key="'KR-' + index">
          <div class="okr-form__form-item">
            <span>
              <input
                type="text"
                placeholder="Add a new key result."
                @change="buildSubmissionData($event.target.value)"
              />
              <CloseIcon @click="keyResults.splice(index)" />
            </span>
          </div>
        </div>
        <span
          class="okr-form__add-more-button"
          @click.prevent="keyResults.push(this.keyResults.length + 1)"
          tabindex="0"
          type="button"
        >
          <AddIcon /> Add Key Result
        </span>
        <hr />
        <div class="okr-form__button-group">
          <button class="button button--green" type="submit">Create</button>
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
  </section>
</template>

<script>
import CloseIcon from "@/components/ui-elements/CloseIcon";

export default {
  components: {
    CloseIcon,
  },
  data() {
    return {
      submissionData: {
        completionRate: 0,
        description: "",
        objective: "",
        keyResults: [],
        user_id: 1,
      },
      keyResults: [],
      minKeyResultCreated: false,
    };
  },
  methods: {
    handleSubmit() {
      this.$store.dispatch("createOkr", this.submissionData);
    },
    buildSubmissionData(value) {
      event.preventDefault();
      this.submissionData.keyResults.push({ result: value, completionRate: 0 });
    },
    cancelCreation() {
      this.$router.back();
    },
  },
  mounted() {
    this.submissionData.user_id = localStorage.id;
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/styles/organisms/_okr-form.scss";
</style>
