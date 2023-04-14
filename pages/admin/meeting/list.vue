<template>
    <view class="meeting-page">
        <view v-if="list.length">
            <van-swipe-cell :right-width="65" v-for="item in list" :key="item._id">
                <view @click="goToDetail(item._id)" class="meeting-item">
                    <view> {{item.name}}</view>
                    <view v-if="item.status===1" class="on">已启用</view>
                    <view v-else class="off">已禁用</view>
                </view>
                <view slot="right">
                    <van-button @click.stop="onDelete(item._id)" square type="danger">删除</van-button>
                </view>
            </van-swipe-cell>

        </view>
        <van-empty v-if="fetched&&!list.length" description="暂无部门记录"></van-empty>
        <add-btn @on-click="goToAdd">新增</add-btn>
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
    import AddBtn from '@/components/AddBtn.vue'
    const fetched = ref(true)
    const pageNo = ref(1)
    const list = ref([])
    onShow(() => {
        getList(true)
    })
    const getList = async (isRefresh = false) => {
        if (isRefresh) pageNo.value = 1
        fetched.value = false
        const data = await uniCloud.importObject('room').getList({
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
        await uniCloud.importObject('room').deleteItem({
            _id: id
        })
        getList(true)
    }
    const goToAdd = () => {
        uni.navigateTo({
            url: `/pages/admin/meeting/edit`
        })
    }
    const goToDetail = (id) => {
        uni.navigateTo({
            url: `/pages/admin/meeting/edit?id=${id}`
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
    .meeting-page {
        padding: 10px;
    }

    .meeting-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        min-height: 45px;
        padding: 10px;
        background: #fff;
        border-radius: 5px;
        margin-bottom: 10px;
        font-size: 12px;

        .on {
            color: $uni-color-primary
        }

        .off {
            color: $uni-color-error
        }
    }
</style>