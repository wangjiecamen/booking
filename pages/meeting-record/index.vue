<template>
    <view class="record-page">
        <view v-if="list.length">
            <view @click="goToDetail(id)" class="record-item" v-for="item in list" :key="item.id">
                <view> {{item.roomName}}</view>
            </view>
        </view>
        <van-empty v-if="fetched&&!list.length" description="暂无会议记录"></van-empty>
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
    const list = ref([{
        roomName: "亚马逊"
    }])

    const getList = () => {

    }
    const goToDetail = (id) => {
        uni.navigateTo({
            url: `/pages/meeting-record/detail?id=${id}`,
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

<style scoped lang="scss">
    .record-page {
        padding: 10px;
    }

    .record-item {
        min-height: 45px;
        padding: 10px;
        background: #fff;
        border-radius: 5px;
        margin-bottom: 10px;
    }
</style>