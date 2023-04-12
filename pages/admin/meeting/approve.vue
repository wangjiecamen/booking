<template>
    <view class="approve-page">
        <view v-if="list.length">
            <view @click="goToDetail(id)" class="approve-item" v-for="item in list" :key="item.id">
                <view> {{item.roomName}}</view>
            </view>
        </view>
        <van-empty v-if="fetched&&!list.length" description="暂无审批记录"></van-empty>

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
        roomName: "亚马逊",
        status: 0
    }, {
        roomName: "亚马22逊",
        status: 1
    }])

    const getList = () => {

    }
    const goToDetail = (id) => {
        uni.navigateTo({
            url: `/pages/admin/meeting/approveDetail?id=${id}`
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
    approve-page {
        padding: 10px;
    }

    .approve-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        min-height: 45px;
        padding: 10px;
        background: #fff;
        border-radius: 5px;
        margin-bottom: 10px;
        font-size: 12px;

    }
</style>