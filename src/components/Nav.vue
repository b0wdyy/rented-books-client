<template>
    <nav>
        <h1><router-link to="/" exact>Library books</router-link></h1>

        <div v-if="user">
            <span class="login-button">Log out</span>
        </div>
        <div v-else>
            <span class="login-button"
                ><router-link to="/login" exact>Log in</router-link></span
            >
        </div>
    </nav>
</template>

<script>
import { Component, Vue } from "vue-property-decorator";

@Component
export default class extends Vue {
    get user() {
        return this.$store.getters.user;
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
