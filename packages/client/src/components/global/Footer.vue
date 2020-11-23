<template>
   <footer class="footer component">
       <div>Footer stuff goes here</div>
   </footer>
</template>

<script>

export default {
    data: function (){
        return {
            scrollPos: null,
            links: [
                { title: "About", link: "/#about"  },
                { title: "Experience", link: "/#jobs"  },
                { title: "Work", link: "/#projects"  },
                { title: "Contact", link: "/#contact"  },
            ],
            loaded: false
        }
    },

    methods: {
    },
}
</script>