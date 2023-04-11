<template>
    <view class="detail_page">
        <view class="title">{{detail.title}}</view>
        <view class="update_time">发布时间：<text>{{detail.updateTime}}</text></view>
        <view class="content">{{detail.content}}</view>
    </view>
</template>

<script setup>
    import {
        ref
    } from "vue";

    const detail = ref({
        title: '关于xxxxxde的通告',
        content: '关于xxxxxde的通告关于xxxxxde的通告关于xxxxxde的通告关于xxxxxde的通告关于xxxxxde的通告关于xxxxxde的通告，关于xxxxxde的通告，关于xxxxxde的通告，关于xxxxxde的通告，关于xxxxxde的通告',
        updateTime: "2020-03-12 23:33:20"
    })
    const getDetail = () => {

    }
</script>

<style lang="scss" scoped>
    .detail_page {
        margin: 10px;
    }

    .title {
        margin: 10px 0;
        font-weight: 500;
        font-size: 16px;
        text-align: center;
    }

    .update_time {
        font-size: 12px;
        color: #ccc;
    }

    .content {
        margin-top: 10px;
        font-size: 14px;
        color: #222;
    }
</style>