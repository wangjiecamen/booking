<template>
    <view class="notice-page">
        <view v-if="list.length">
            <view @click="goToDetail(item._id)" class="notice-item van-ellipsis" v-for="item in list" :key="item._id">
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
        onReachBottom,
        onShow
    } from "@dcloudio/uni-app";
    const fetched = ref(true)
    const pageNo = ref(1)
    const list = ref([])
    onShow(() => {
        getList(true)
    })
    const getList = async (isRefresh = false) => {
        if (isRefresh) pageNo.value = 1
        fetched.value = false
        const data = await uniCloud.importObject('notice').getList({
            pageNo: pageNo.value,
            pageSize: 10
        })
        if (isRefresh) list.value = []
        if (list.value.length < data.total) {
            list.value.push(...data.data)
        }
        fetched.value = true
        uni.stopPullDownRefresh()
        console.log(data)
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
        getList(true)
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