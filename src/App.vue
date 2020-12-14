<template>
    <div id="app">
        <Nav />
        <router-view />
        <bottom-nav />
    </div>
</template>

<script lang="ts">
import Nav from "@/components/Nav.vue";
import { Component, Vue } from "vue-property-decorator";
import BottomNav from "@/components/BottomNav.vue";

@Component({
    components: {
        BottomNav,
        Nav,
    },
})
export default class extends Vue {}
</script>

<style lang="scss">
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
</style>
