<template>
    <view class="index_page">
        <banners></banners>
        <functions></functions>
    </view>
</template>

<script setup>
    import Banners from "../../components/Banners.vue"
    import Functions from "../../components/Functions.vue"
    import {
        ref
    } from "vue"
    const role = ref('admin')
</script>

<style>

</style>