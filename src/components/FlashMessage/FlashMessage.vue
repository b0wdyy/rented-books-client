<template>
    <transition name="slide-fade">
        <div
            class="flashmessage"
            :class="{ error: type === 'error', success: type === 'success' }"
            v-if="flashMessage"
        >
            <p>{{ message }}</p>
        </div>
    </transition>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { FlashMessage } from "@/interfaces/flashMessage";

@Component
export default class extends Vue {
    get flashMessage(): FlashMessage {
        return this.$store.getters.flashMessage;
    }

    get type() {
        return this.flashMessage && this.flashMessage.type;
    }

    get message() {
        return this.flashMessage && this.flashMessage.message;
    }
}
</script>

<style scoped lang="scss">
.slide-fade-enter-active {
    transition: all 0.4s ease;
}
.slide-fade-leave-active {
    transition: all 0.4s ease-in;
}
.slide-fade-enter,
.slide-fade-leave-to {
    transform: translateY(-10px);
    opacity: 0;
}

.flashmessage {
    display: flex;
    justify-content: center;
    align-items: center;

    width: 280px;
    padding: 40px 0;

    color: $white;
    background: red;

    position: fixed;
    top: 40px;
    left: 50%;
    z-index: 100;

    transform: translateX(-50%);
    border-radius: 4px;

    &.success {
        background: #87ff87;
    }

    &.error {
        background: #ff0137;
    }
}
</style>
