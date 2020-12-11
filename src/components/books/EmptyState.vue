<template>
    <div>
        <p>Wat jammer... U hebt nog geen boeken toegevoegd.</p>

        <form @submit.prevent="formHandler">
            <input type="text" />
        </form>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class extends Vue {
    formHandler() {
        console.log("form submitted");
    }
}
</script>

<style lang="scss"></style>
