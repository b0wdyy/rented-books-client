<template>
    <div class="wrapper login">
        <h2>Welcome back!</h2>
        <form @submit.prevent="login" autocomplete="off">
            <div class="form-username">
                <input
                    type="text"
                    id="username"
                    placeholder="username"
                    v-model="username"
                />
                <label for="username">Username</label>
                <div class="form-error" v-if="usernameError">
                    Username is required
                </div>
            </div>

            <div class="form-password">
                <input
                    type="password"
                    id="password"
                    placeholder="password"
                    v-model="password"
                />
                <label for="password">Password</label>

                <div class="form-error" v-if="passwordError">
                    Password is required
                </div>
            </div>
            <Error :message="error" />
            <input type="submit" :value="loading ? 'Loading...' : 'Login'" />
            <span
                >Not an account yet?
                <router-link to="/signup" exact>Sign up.</router-link></span
            >
        </form>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import Error from "@/components/Global/Error.vue";
@Component({
  components: {Error}
})
export default class extends Vue {
    usernameError = false;
    passwordError = false;

    username = "";
    password = "";

    checkLoginForm() {
        if (this.username === "" || this.password === "") {
            this.passwordError = this.password === "";
            this.usernameError = this.username === "";
            return;
        }
    }

    async login() {
        this.checkLoginForm();
        await this.$store.dispatch("loginUser", {
            username: this.username,
            password: this.password,
        });
        try {
          await this.$router.push("/");
        } catch (e) {
          await this.$store.dispatch("setError", 'Unauthorized to go further.')
        }
    }

    get loading() {
        return this.$store.getters.loading;
    }

    get error() {
        return this.$store.getters.error;
    }

    @Watch("username")
    onUsernameChange(value: string, _oldValue: string) {
        this.usernameError = value === "";
    }

    @Watch("password")
    onPasswordChange(value: string, _oldValue: string) {
        this.passwordError = value === "";
    }
}
</script>

<style scoped lang="scss">
.login {
    display: grid;
    place-items: center;
    height: 60vh;

    h2 {
        color: $primary-text;
        font-size: 32px;
    }
}
form {
    width: 70%;
    position: relative;
    display: grid;

    &::after {
        content: "";
        width: 200px;
        height: 200px;
        background: $secondary-text;

        position: absolute;
        top: 130%;
        right: -20%;

        border-radius: 50%;

        opacity: 0.1;
    }

    .form-password,
    .form-username {
        position: relative;
        margin-bottom: 40px;

        width: 100%;

        label {
            position: absolute;
            left: 0;

            color: $border-color;

            pointer-events: none;

            transition: 0.2s ease;
        }
        input {
            border: none;
            border-bottom: 1px solid $border-color;
            width: 100%;

            padding: 4px 0;

            outline: none;

            font-size: 14px;

            &::placeholder {
                opacity: 0;
            }

            &:focus,
            &:not(:placeholder-shown) {
                & + label {
                    transform: translateY(-100%);

                    color: $black;

                    font-size: 14px;
                }
            }
        }
    }

    input[type="submit"] {
        width: 100%;

        background: $primary-text;
        color: $white;
        border: none;
        border-radius: 4px;

        padding: 12px 0;

        font-size: 14px;
        text-transform: uppercase;

        cursor: pointer;
    }

    span {
        text-align: right;
        font-size: 10px;

        display: inline-block;
        margin-top: 8px;

        a {
            color: $primary-text;
        }
    }

    .form-error {
        color: red;
        margin: 4px 0;

        font-size: 12px;
    }
}
</style>
