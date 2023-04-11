<template>
    <view class="notice-page">
        <view v-if="list.length">
            <view @click="goToDetail(id)" class="notice-item van-ellipsis" v-for="item in list" :key="item.id">
                {{item.title}}
            </view>
        </view>
        <van-empty v-if="fetched&&!list.length" description="暂无公告"></van-empty>
    </view>
</template>

<script setup>
    import {
        ref
    } from "vue";
    import {
        onPullDownRefresh,
        onReachBottom
    } from "@dcloudio/uni-app";
    const fetched = ref(true)
    const pageNo = ref(1)
    const list = ref([])

    const getList = () => {

    }
    const goToDetail = (id) => {
        uni.navigateTo({
            url: `/pages/notice/detail?id=${id}`,
        })
    }
    onReachBottom(() => {
        getList()
    })
    onPullDownRefresh(() => {
        list.value = []
        pageNo.value = 1
        getList()
    })
</script>

<style scoped>
    .notice-page {
        padding: 10px;
    }

    .notice-item {
        min-height: 45px;
        padding: 10px;
        background: #fff;
        border-radius: 5px;
        margin-bottom: 10px;
    }
</style>