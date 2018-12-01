<template>
    <div id="app">
        <app-header></app-header>
        <router-view/>
        <app-nav></app-nav>
       
    </div>
</template>
<script>
import AppHeader from './common/Appheader.vue'
import AppNav from './common/AppNav.vue'

export default {
    components:{
        AppHeader,
        AppNav
    },
    created() {
        this.$store.dispatch('getlocationg')
    },
}
</script>
