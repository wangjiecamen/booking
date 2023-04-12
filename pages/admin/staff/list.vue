<template>
    <view class="staff-page">
        <view v-if="list.length">
            <van-swipe-cell :right-width="65" v-for="item in list" :key="item.id">
                <view class="staff-item" @click="goToDetail(id)">
                    <view> {{item.userName}}</view>
                    <view v-if="item.status===1" class="on">已启用</view>
                    <view v-else class="off">已禁用</view>
                </view>
                <view slot="right">
                    <van-button @click.stop="onDelete(id)" square type="danger">删除</van-button>
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
        onReachBottom
    } from "@dcloudio/uni-app";
    import AddBtn from '@/components/AddBtn.vue'
    const fetched = ref(true)
    const pageNo = ref(1)
    const list = ref([{
        userName: "亚马逊",
        status: 0
    }, {
        userName: "亚马22逊",
        status: 1
    }])

    const getList = () => {

    }
    const onDelete = (id) => {
        console.log(id)
    }
    const goToAdd = () => {
        uni.navigateTo({
            url: `/pages/admin/staff/edit`
        })
    }
    const goToDetail = (id) => {
        uni.navigateTo({
            url: `/pages/admin/staff/edit?id=${id}`
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
    .staff-page {
        padding: 10px;
    }

    .staff-item {
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