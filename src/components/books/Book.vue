<template>
    <section class="book">
        <h2 class="book__title">{{ book.title }}</h2>
        <img
            style="max-width: 100%; margin: 12px 0;"
            src="../../assets/placeholder.png"
            alt="placeholder"
        />
        <p class="book__description">{{ book.description }}</p>
    </section>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Book } from "@/interfaces/book";

@Component()
export default class extends Vue {
    @Prop({ required: true }) private book!: Book;
}
</script>

<style lang="scss">
.book {
    .book__title {
        font-size: 20px;

        color: $secondary-text;
    }
}
</style>
