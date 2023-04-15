<template>
    <image :src="url" @click="preview"></image>
</template>

<script setup>
    const props = defineProps({
        url: {
            type: String,
            default: ''
        }
    })
    const preview = () => {
        uni.previewImage({
            current: props.url,
            urls: [props.url]
        })
    }
</script>

<style scoped>
    image {
        width: 100%;
        height: 100%;
    }
</style>