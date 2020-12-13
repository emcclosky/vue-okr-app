<template>
    <div class="dropdown-menu">
        <ul class="dropdown-menu__options">
            <li class="dropdown-menu__option" :class="setOptionClass(option)" v-for="(option, index) in dropdownOptions" :key="`${option.name} - ${index}`" @click="handleAction(option)">
                <component :is="option.icon" :name="option.icon" :key="`${option.icon}-${index}`"></component>
                <a href="#">{{ option.name }}</a>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    props: {
      dropdownOptions: Array,
      element: Object
    },
    data(){
        return {

        }
    },
    methods: {
        handleAction(option){
            if (!option.action)
                return;
            option.action(this.element);
        },
        setOptionClass(option){
            let optionClass = option.color ? option.color : '';
            if(!option.icon && !option.action)
               optionClass = `${optionClass} dropdown-menu__option--no-icon`;
            return optionClass;
        }
    }
}
</script>
<style lang="scss" scoped>
    @import '@/assets/styles/atoms/_dropdown-menu.scss'
</style>
