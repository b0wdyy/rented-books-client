<template>
    <div class="error">{{ message }}</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class extends Vue {
    @Prop({ required: true }) message!: string;
}
</script>

<style scoped>
.error {
    color: red;
    font-size: 12px;

    margin: 8px 0;

    text-align: center;
}
</style>
