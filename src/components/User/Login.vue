<template>
    <div class="login-form__backdrop">
        <form class="login-form" @submit.prevent="loginHandler">
            <div>
                <label>username</label>
                <input type="text" />
            </div>

            <div>
                <label>wachtwoord</label>
                <input type="password" />
            </div>

            <input type="submit" value="Log in" />
            <p>Nog geen account? <span>Sign up</span></p>
        </form>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class extends Vue {
    loginHandler() {
        console.log("form submitted");
    }
}
</script>

<style lang="scss">
.wrapper {
    .login-form {
        padding: 40px;

        position: fixed;
        top: 50%;
        left: 50%;

        transform: translate(-50%, -50%);

        display: grid;
        place-items: center;

        background: $white;

        border-radius: 4px;

        & > div {
            label {
                color: $primary-text;
            }
            input {
                margin-top: 12px;

                border: 1px solid lighten($black, 75);
                padding: 10px;

                border-radius: 4px;
            }
            &:not(:nth-of-type(1)) {
                margin-top: 32px;
            }
        }

        input[type="submit"] {
            background: $primary-text;
            color: $white;

            border-radius: 4px;
            border: none;

            padding: 8px 0;
            margin-top: 24px;

            width: 100%;

            font-size: 16px;
        }

        p {
            font-size: 12px;
            font-weight: 300;
            margin-top: 12px;

            span {
                color: $primary-text;
                font-weight: 500;
            }
        }

        &__backdrop {
            height: 100vh;
            width: 100vw;
            position: absolute;
            top: 0;
            left: 0;

            background: transparentize($primary-accent, 0.4);
        }
    }
}
</style>
