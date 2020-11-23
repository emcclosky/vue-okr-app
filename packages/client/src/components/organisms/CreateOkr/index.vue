<template>
    <section class="okr-form component component--full-width">
        <div class="okr-form__container">
            <h2>Create New OKR</h2>
            <hr />
            <form class="okr-form__form" @submit.prevent="handleSubmit()">
                <h3>Objective</h3>
                <div class="okr-form__form-item okr-form__form-item--objective">
                    <label for="objective">What would you like to accomplish?</label>
                    <input type="text" name="objective" placeholder="Enter your objective..." v-model="submissionData.objective">
                </div>
                <div class="okr-form__form-item okr-form__form-item--type">
                    <label for="type">Type</label>
                    <input type="text" name="type" placeholder="Select type" v-model="submissionData.type">
                </div>
                <div class="okr-form__form-item okr-form__form-item--type">
                    <label for="owner">Owner</label>
                    <input type="text" name="owner" placeholder="Select type" v-model="submissionData.owner">
                </div>
                <div class="okr-form__form-item okr-form__form-item--visibility">
                    <label for="visibility">Visibility</label>
                    <input type="text" name="visibility" placeholder="Select visibility" v-model="submissionData.visibility">
                </div>
                <hr />
                <h3>Key Results</h3>
                <div v-for="(kr, index) in keyResults" :key="'KR-'+index">
                    <div class="okr-form__form-item">
                        <input type="text" placeholder="Add a new key result." @change="buildSubmissionData($event.target.value)">
                    </div>
                </div>
                <span class="okr-form__add-more-button" @click.prevent="addKeyResult" tabindex="0" type="button">
                    <AddIcon /> Add Key Result
                </span>
                <hr />
                <button class="button button--green" :disabled="keyResults.length === 0" type="submit">Create</button>
                <button class="button button--border" type="button" @click="cancelCreation">Cancel</button>
            </form>
        </div>
    </section>
</template>

<script>

export default {
    data(){
        return {
            submissionData: {
                objective: '',
                keyResults: [],
                user_id: 1
            },
            keyResults: [],
            minKeyResultCreated: false
        }
    },
    methods: {
        handleSubmit(){
            this.$store.dispatch('createOkr', this.submissionData);
        },
        buildSubmissionData(value){
            event.preventDefault();
            this.submissionData.keyResults.push({ result: value, completionRate: 0 });
        },
        addKeyResult(){
            if(this.keyResults.length < 6)
                this.keyResults.push(this.keyResults.length + 1)
            else
                console.log('OKR LIMIT MET')
        },
        cancelCreation(){
            this.$router.back();
        }
    },
    mounted() {
        this.submissionData.user_id = sessionStorage.id;
    }
}
</script>
<style lang="scss" scoped>
    @import '@/assets/styles/organisms/_okr-form.scss'
</style>