<template>
    <view class="notice-page">
        <view v-if="list.length">
            <van-swipe-cell :right-width="65" v-for="item in list" :key="item._id">
                <view @click="goToDetail(item._id)" class="notice-item van-ellipsis">
                    {{item.title}}
                </view>
                <view slot="right">
                    <van-button @click.stop="onDelete(item._id)" square type="danger">删除</van-button>
                </view>
            </van-swipe-cell>

        </view>
        <van-empty v-if="fetched&&!list.length" description="暂无公告"></van-empty>
    </view>
    <add-btn @on-click="goToAdd">新增</add-btn>
</template>

<script setup>
    import AddBtn from '@/components/AddBtn.vue'
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
    const onDelete = async (id) => {
        await uniCloud.importObject('notice').deleteItem({
            _id: id
        })
        getList(true)
    }
    const goToAdd = () => {
        uni.navigateTo({
            url: `/pages/admin/notice/detail`,
        })
    }
    const goToDetail = (id) => {
        uni.navigateTo({
            url: `/pages/admin/notice/detail?id=${id}`,
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