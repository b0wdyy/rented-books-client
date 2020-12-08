<template>
    <div class="wrapper">
        <div v-if="books && !loading" class="books">
            <div v-for="book in books" :key="book.id">
                <Book :book="book" />
            </div>
        </div>

        <div v-else-if="!books && !loading">
            <EmptyState />
        </div>

        <div v-else>
            loading...
        </div>

        <div v-if="formVisible">
            <Login />
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Book from "@/components/books/Book.vue";
import EmptyState from "@/components/books/EmptyState.vue";
import Login from "@/components/User/Login.vue";
@Component({
    components: { Login, EmptyState, Book },
})
export default class Home extends Vue {
    get books() {
        return this.$store.getters.books;
    }

    get loading() {
        return this.$store.getters.loading;
    }

    get formVisible() {
        return this.$store.getters.formVisible;
    }
}
</script>

<style lang="scss" scoped>
.books {
    display: grid;
    grid-template-columns: 1fr;

    margin: 32px 0;

    & > div {
        justify-self: center;
    }
}
</style>
