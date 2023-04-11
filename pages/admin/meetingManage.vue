<template>
    <view>
        <view v-for="item in list" :key="item">
            <view>{{item.me}}</view>
        </view>
    </view>
</template>

<script setup>
    import {
        ref
    } from "vue";
    const list = ref([1, 2, 3])
</script>

<style>
</style>