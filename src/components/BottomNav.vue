<template>
    <nav v-if="user">
        <div @click="$router.push('/book/add')">
            +
        </div>
    </nav>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class extends Vue {
    get user() {
        return this.$store.getters.user;
    }
}
</script>

<style scoped lang="scss">
nav {
    position: fixed;
    bottom: 0;

    width: 100%;
    height: 8vh;

    background: $white;

    display: flex;
    align-items: center;
    justify-content: center;

    border-top: 1px solid $border-color;

    & > div {
        cursor: pointer;

        font-size: 32px;
        font-weight: 300;

        background: $primary-text;
        color: $white;

        border-radius: 50%;

        height: 64px;
        width: 64px;

        display: flex;
        align-items: center;
        justify-content: center;
        transform: translateY(-45%);
    }
}
</style>
