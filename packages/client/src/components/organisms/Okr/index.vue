<template>
  <section class="okr-form component component--full-width">
    <div class="okr-form__container">
      <form class="okr-form__form" @submit.prevent="handleSubmit">
        <h3>Objective</h3>
        <div class="okr-form__form-item okr__form-item--objective">
          <label for="">Objective Name</label>
          <input type="text" v-model="submissionData.objective" />
        </div>
        <hr />
        <h3>Key Results</h3>
        <div
          v-for="(kr, index) in submissionData.keyResults"
          :key="'KR-' + index"
        >
          <div class="okr-form__form-item okr__form-item--key-result">
            <label for="">Key Result Name</label>
            <span>
              <input type="text" v-model="kr.result" />
              <CloseIcon @click="removeKeyResult(kr, index)" />
            </span>
            <label for="">Completion Rate</label>
            <input
              class=""
              type="number"
              min="0"
              max="100"
              v-model.number="kr.completion_rate"
            />
          </div>
        </div>
        <span
          class="okr-form__add-more-button"
          @click.prevent="addKeyResult"
          tabindex="0"
          type="button"
        >
          <AddIcon /> Add Key Result
        </span>
        <hr />
        <div class="okr-form__button-group">
          <button class="button button--green" type="submit">Update</button>
          <button
            class="button button--border"
            type="button"
            @click="$router.push('/okrs')"
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
        objective: "",
        keyResults: [],
        id: null,
        completionRate: 0,
      },
    };
  },
  computed: {
    okrData() {
      return this.$store.state.okrs.currentOkrData;
    },
  },
  methods: {
    removeKeyResult(kr, index) {
      this.submissionData.keyResults.splice(index);
      console.log(this.submissionData.keyResults);
    },
    handleSubmit() {
      this.$store.dispatch("editOkr", this.submissionData);
      this.$router.push("/okrs");
    },
    addKeyResult() {
      if (this.submissionData.keyResults.length < 6) {
        this.submissionData.keyResults.push({
          result: "",
          completion_rate: 0,
          objective_id: this.okrData.id,
        });
      } else {
        console.log("OKR LIMIT MET");
      }
    },
  },
  mounted() {
    if (this.okrData) {
      this.submissionData.keyResults = JSON.parse(
        JSON.stringify(this.okrData.key_results)
      );
      this.submissionData.objective = this.okrData.objective;
      this.submissionData.id = this.okrData.id;
    }
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/styles/organisms/_okr-form.scss";
</style>
