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
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Book from "@/components/books/Book.vue";
import EmptyState from "@/components/books/EmptyState.vue";

@Component({
    components: { EmptyState, Book },
})
export default class Home extends Vue {
    mounted() {
        this.fetchData();
    }
    async fetchData() {
        await this.$store.dispatch("fetchBooks");
    }

    get books() {
        return this.$store.getters.books;
    }

    get loading() {
        return this.$store.getters.loading;
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
