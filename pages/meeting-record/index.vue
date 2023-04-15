<template>
    <view class="record-page">
        <view v-if="list.length">
            <view @click="goToDetail(item._id)" class="record-item" v-for="item in list" :key="item._id">
                <view>
                    <text style="margin-right: 10px;"> {{item.room_name}}</text>
                    <text> {{item.date}} {{item.start_time}}-{{item.end_time}}</text>
                </view>
                <view :style="{color:bookingStatus[item.status].color}">{{bookingStatus[item.status].text}}</view>
            </view>
        </view>
        <van-empty v-if="fetched&&!list.length" description="暂无会议记录"></van-empty>
    </view>
</template>

<script setup>
    import {
        bookingStatus
    } from '@/contants.js'
    import {
        ref
    } from "vue";
    import {
        onPullDownRefresh,
        onReachBottom,
        onShow
    } from "@dcloudio/uni-app";
    import {
        getUserInfo
    } from '@/utils/user.js'
    const fetched = ref(true)
    const pageNo = ref(1)
    const list = ref([])

    onShow(() => {
        getList(true)
    })
    const getList = async (isRefresh = false) => {
        if (isRefresh) pageNo.value = 1
        fetched.value = false
        const data = await uniCloud.importObject('booking').getListByUser({
            pageNo: pageNo.value,
            pageSize: 10,
            user_id: getUserInfo()._id
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
            url: `/pages/meeting-record/detail?id=${id}&type=edit`,
        })
    }
    onReachBottom(() => {
        getList()
    })
    onPullDownRefresh(() => {
        getList(true)
    })
</script>

<style scoped lang="scss">
    .record-page {
        padding: 10px;
    }

    .record-item {
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