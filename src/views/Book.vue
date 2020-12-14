<template>
    <div class="wrapper">
        <section class="book-detail">
            <h2>{{ book.title }}</h2>

            <img
                :src="
                    book.cover
                        ? book.cover
                        : require('../assets/placeholder.png')
                "
                alt="book"
            />

            <p>{{ book.description }}</p>
        </section>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Book } from "@/interfaces/book";

@Component
export default class extends Vue {
    get routerId() {
        return this.$route.params.id;
    }

    get books() {
        return this.$store.getters.books;
    }

    get book() {
        return this.books.find((book: Book) => book._id === this.routerId);
    }
}
</script>

<style scoped lang="scss">
.book-detail {
    margin: 40px 0 10vh;
    h2 {
        font-size: 32px;
        font-weight: 300;

        color: $secondary-text;
    }
    img {
        width: 100%;
        margin: 32px 0;
    }
}
</style>
