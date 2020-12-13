<template>
    <div class="wrapper login">
        <div>
            <h2>Hello stranger!</h2>
            <h3>Make an account and get started.</h3>
        </div>

        <form>
            <div class="form-username">
                <input
                    type="text"
                    id="username"
                    placeholder="username"
                    required
                />
                <label for="username">Username</label>
            </div>

            <div class="form-password">
                <input
                    type="password"
                    id="password"
                    placeholder="password"
                    required
                />
                <label for="password">Password</label>
            </div>

            <div class="form-password">
                <input
                    type="password"
                    id="password-confirm"
                    placeholder="password"
                    required
                />
                <label for="password-confirm">Confirm password</label>
            </div>

            <input type="submit" value="Sign up" />
            <span
                >Already have an account?
                <router-link to="/login" exact>Log in.</router-link></span
            >
        </form>
    </div>
</template>

<script>
export default {
    name: "Signup",
};
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

    & > div {
        text-align: center;

        h3 {
            margin-top: 12px;
            color: lighten($primary-text, 20);
        }
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
}
</style>
