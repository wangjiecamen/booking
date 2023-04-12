<template>
    <view class="branch-page">
        <view v-if="list.length">
            <van-swipe-cell :right-width="65" v-for="item in list" :key="item.id">
                <view @click="goToDetail(id)" class="branch-item">
                    <view> {{item.branchName}}</view>
                    <view v-if="item.status===1" class="on">已启用</view>
                    <view v-else class="off">已禁用</view>
                </view>
                <view slot="right">
                    <van-button @click.stop="onDelete(id)" square type="danger">删除</van-button>
                </view>
            </van-swipe-cell>

        </view>
        <van-empty v-if="fetched&&!list.length" description="暂无部门记录"></van-empty>
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
    } from "@dcloudio/uni-app";

    const fetched = ref(true)
    const pageNo = ref(1)
    const list = ref([{
        branchName: "亚马逊",
        status: 0
    }, {
        branchName: "亚马22逊",
        status: 1
    }])
    const goToAdd = () => {
        uni.navigateTo({
            url: `/pages/admin/branch/edit`
        })
    }
    const onDelete = (id) => {

    }
    const getList = () => {

    }
    const goToDetail = (id) => {
        uni.navigateTo({
            url: `/pages/admin/branch/edit?id=${id}`
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
    .branch-page {
        padding: 10px;
    }

    .branch-item {
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