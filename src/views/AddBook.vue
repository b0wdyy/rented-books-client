<template>
    <div>
        <h2>Add a new book</h2>
        <form @submit.prevent="formHandler">
            <div>
                <input
                    type="text"
                    id="book-title"
                    v-model="title"
                    placeholder="Title..."
                />
            </div>

            <div>
                <textarea
                    id="book-description"
                    v-model="description"
                    placeholder="Description..."
                />
            </div>

            <div class="form-file">
                <label for="book-cover">Book cover</label>
                <input type="file" id="book-cover" ref="fileInput" />
                <div v-if="fileInput && fileInput.files[0]">
                    File selected: {{ fileInput.files[0].name }}
                </div>
            </div>

            <input type="submit" value="Submit" />
        </form>
    </div>
</template>

<script lang="ts">
import { Component, Ref, Vue } from "vue-property-decorator";

@Component
export default class extends Vue {
    mounted() {
        console.log(this.user);
    }
    @Ref() fileInput!: any;

    title = "";
    description = "";

    formHandler() {
        if (!this.title || !this.description || !this.fileInput.files) return;

        this.$store.dispatch("addBook", {
            fileInput: this.fileInput.files[0],
            title: this.title,
            token: this.token,
            description: this.description,
            userId: this.user._id,
        });
    }

    get user() {
        return this.$store.getters.user;
    }

    get token() {
        return this.$store.getters.token;
    }
}
</script>

<style scoped lang="scss">
h2 {
    padding: 0 32px;
    margin: 40px 0;

    font-size: 20px;

    color: $primary-text;
}
form {
    margin: 80px auto;

    height: 40vh;
    width: 70%;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;

    & > div {
        width: 100%;
    }

    input,
    textarea {
        outline: none;
    }

    textarea {
        border: none;
        border-bottom: 1px solid $border-color;
    }

    textarea {
        width: 100%;
        max-width: 100%;

        height: 100px;
        max-height: 100px;
    }

    input {
        border: none;
        border-bottom: 1px solid $border-color;

        width: 100%;

        font-size: 14px;

        &[type="file"] {
            display: none;
        }
        &[type="text"] {
            padding: 4px 0;
        }
        &[type="submit"] {
            padding: 12px 0;
            width: 100%;

            border: none;
            border-radius: 4px;

            background: $primary-text;
            color: $white;
        }
    }

    .form-file {
        width: auto;
        padding: 12px 24px;
        display: inline;

        background: $secondary-text;
        color: $white;

        border-radius: 24px;
    }
}
</style>
