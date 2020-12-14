<template>
    <nav>
        <h1><router-link to="/" exact>Library books</router-link></h1>
        <div class="hamburger">
            <span></span>
            <span></span>
            <span></span>
        </div>
    </nav>
</template>

<script>
import { Component, Vue } from "vue-property-decorator";

@Component
export default class extends Vue {
    logout() {
        this.$store.dispatch("logout");
        this.$router.push("/login");
    }
    get user() {
        return this.$store.getters.user;
    }

    get currentRouterName() {
        return this.$route.name;
    }
}
</script>

<style lang="scss" scoped>
nav {
    padding: 32px;
    border-bottom: 1px solid transparentize($border-color, $amount: 0.8);

    color: $primary-text;

    display: flex;
    align-items: center;
    justify-content: space-between;

    h1 {
        font-size: 24px;
    }

    .hamburger {
        transform: rotate(-45deg);

        height: 20px;
        width: 30px;

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        span {
            display: inline-block;
            height: 4px;

            background: $primary-text;

            border-radius: 10px;

            &:nth-child(1),
            &:nth-child(3) {
                width: 70%;
            }

            &:nth-child(2) {
                width: 100%;
            }
        }
    }

    .login-button {
        color: lighten($primary-text, 20);

        padding: 8px 16px;
        border-radius: 4px;
        border: 1px solid $primary-text;

        cursor: pointer;

        transition: 0.4s ease;

        &:hover {
            color: $white;
            background: lighten($primary-text, 20);
        }
    }
}
</style>
