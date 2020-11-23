<template>
    <div class="okr-card">
        <div class="okr-card__objective" :data-id="data.id">
            <span class="okr-card__objective-group" tabindex="0" @click="showKeyResults = !showKeyResults" @keydown.enter="showKeyResults = !showKeyResults" >
                <DropdownArrow :class="{'drop-down-arrow--active': showKeyResults === true}" />
                <h4 class="okr-card__objective-title">{{data.objective}}</h4>
            </span>
            <div class="okr-card__measurement">
                <ProgressBar :progress="objectiveCompletion" v-if="clientWidth >= 768" />
                <span class="okr-card__percent">{{ objectiveCompletion }}%</span>
            </div>
            <span class="okr-card__options">
                <button @click="toggleDropdown" ref="options-button" type="button"><OptionsIcon /></button>
                  <DropdownMenu :dropdownOptions="dropdownOptions" :element="data" v-click-outside="{exclude: ['options-button'], handler: 'clickOutsideDropdownHandler'}" />
            </span>
        </div>
        <div class="okr-card__key-results-container" v-if="showKeyResults">
            <ul class="okr-card__key-results">
                <li v-for="(keyResult) in data.key_results" :key="'KR-'+keyResult.id">
                    <KeyResultCard :keyResult="keyResult" />
                </li>
                <li class="okr-card__add-key-result">
                    <span tabindex="0">
                        <AddIcon />
                        Add a new key result
                   </span>
                </li>
            </ul>
        </div>
        <AlertDialog @confirm-action="handleAlertAction" v-if="showDialog" :dialogOptions="dialogOptions"/>
    </div>
</template>

<script>
import DropdownMenu from '@/components/atoms/DropdownMenu';
import AlertDialog from '@/components/atoms/AlertDialog';
import ProgressBar from '@/components/atoms/ProgressBar';
import KeyResultCard from '@/components/molecules/KeyResultCard';

export default {
    components: {
        DropdownMenu,
        ProgressBar,
        AlertDialog,
        KeyResultCard
    },
    props: {
        data: Object,
    },
    data(){
        return {
            objectiveCompletion: 0,
            confirmationCompleted: null,
            showDialog: false,
            showKeyResults: false,
            dialogOptions: {
                title: 'Delete this okr?',
                message: 'Deleting an okr is permanent and cannot be recovered.',
                confirmButtonText: 'Delete',
                buttonClass: 'button--red'
            },
            dropdownOptions: [
                {
                    name: 'Edit',
                    action: this.editOkr,
                    icon: 'EditIcon'
                },
                {
                    name: 'Delete',
                    action: this.deleteOkr,
                    icon: 'DeleteIcon',
                    color: 'red'
                },
            ]
        }
    },
    computed: {
        clientWidth() {
            return this.$store.state.clientWidth;
        }
    },
    methods: {
        handleAlertAction(bool){
            if(bool) {
                this.confirmationCompleted = true;
                this.deleteOkr(this.data);
            }
            this.showDialog = false;
            this.$store.dispatch('dialogOpen', false);
        },
        calculateObjectiveCompletion(){
            const keyResultCount = this.data.key_results.length;
            let completionRateSum = 0;
            this.data.key_results.forEach(kr => completionRateSum += kr.completion_rate);
            this.objectiveCompletion = Math.round(completionRateSum / keyResultCount);
        },
        toggleDropdown(){
            const currentDropdown = this.$el.querySelector('.dropdown-menu');
            if(currentDropdown.classList.contains('active')) {
                currentDropdown.classList.remove('active');
                this.$el.querySelector('.okr-card__options').classList.remove('active');
            } else {
                currentDropdown.classList.add('active');
                this.$el.querySelector('.okr-card__options').classList.add('active');
            }
        },
        clickOutsideDropdownHandler(event){
            [...this.$el.querySelectorAll('.dropdown-menu.active')].forEach(menu => {
                menu.parentNode.classList.remove('active');
                menu.classList.remove('active');
            });
        },
        editOkr(okr){
            this.$store.dispatch('setOkrData', okr);
            this.$router.push(`/okrs/okr/${okr.id}`);
        },
        deleteOkr(okr){
            if(this.confirmationCompleted === null) {
                this.showDialog = true;
                this.$store.dispatch('dialogOpen', true);
                return;
            } else {
                this.$store.dispatch('deleteOkr', okr.id);
            }
        },
    },
    created(){
        this.calculateObjectiveCompletion();
    }
}
</script>
<style lang="scss" scoped>
    @import '@/assets/styles/molecules/_okr-card.scss'
</style>