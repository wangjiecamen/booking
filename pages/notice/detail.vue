<template>
    <view class="detail_page">
        <view class="title">{{detail.title}}</view>
        <view class="update_time">发布时间：<text>{{detail.update_time}}</text></view>
        <view class="content">{{detail.content}}</view>
    </view>
</template>

<script setup>
    import {
        formatTimestamp
    } from '@/utils/time.js'
    import {
        ref
    } from "vue";
    import {
        onLoad
    } from "@dcloudio/uni-app";
    const detail = ref({
        title: '',
        content: '',
        update_time: ""
    })
    onLoad(async (options) => {
        const {
            data
        } = await uniCloud.importObject('notice').getItem({
            _id: options.id
        })
        detail.value.title = data.title
        detail.value.content = data.content
        detail.value.update_time = formatTimestamp(data.update_time)
    })
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