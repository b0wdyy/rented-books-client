<template>
    <section class="book">
        <h2 class="book__title">{{ book.title }}</h2>
        <router-link :to="{ name: 'BookDetail', params: { id: book._id } }">
            <img
                style="max-width: 100%; margin: 12px 0;"
                :src="
                    book.cover
                        ? book.cover
                        : require('../../assets/placeholder.png')
                "
                alt="placeholder"
            />
        </router-link>
    </section>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Book } from "@/interfaces/book";

@Component
export default class extends Vue {
    @Prop({ required: true }) private book!: Book;
}
</script>

<style lang="scss">
section.book {
    margin: 24px 0;

    .book__title {
        font-size: 20px;

        color: $secondary-text;
    }

    &:last-child {
        margin-bottom: 12vh;
    }
}
</style>
