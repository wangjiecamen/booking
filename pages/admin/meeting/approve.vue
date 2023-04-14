<template>
    <view class="approve-page">

        <view v-if="list.length">
            <van-swipe-cell :right-width="65" v-for="item in list" :key="item._id">
                <view @click="goToDetail(id)" class="approve-item">
                    <view>
                        <text style="margin-right: 10px;"> {{item.room_name}}</text>
                        <text> {{item.date}} {{item.start_time}}-{{item.end_time}}</text>
                    </view>
                    <view :style="{color:bookingStatus[item.status].color}">{{bookingStatus[item.status].text}}</view>
                </view>
                <view slot="right">
                    <van-button @click.stop="onDelete(item._id)" square type="danger">删除</van-button>
                </view>
            </van-swipe-cell>

        </view>
        <van-empty v-if="fetched&&!list.length" description="暂无审批记录"></van-empty>

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

    const fetched = ref(true)
    const pageNo = ref(1)
    const list = ref([])


    onShow(() => {
        getList(true)
    })
    const getList = async (isRefresh = false) => {
        if (isRefresh) pageNo.value = 1
        fetched.value = false
        const data = await uniCloud.importObject('booking').getList({
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
    const onDelete = async (id) => {
        await uniCloud.importObject('booking').deleteItem({
            _id: id
        })
        getList(true)
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
    .approve-page {
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