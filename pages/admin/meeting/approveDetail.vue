<template>
    <view>
        <van-cell-group>
            <van-field label="会议室名称" readonly :value="detail.roomName"></van-field>
            <van-field label="预订部门" readonly :value="detail.branchName"></van-field>
            <van-field label="预订人" readonly :value="detail.userName"></van-field>
            <van-field label="预订日期" readonly :value="detail.date"></van-field>
            <van-field label="预订时间" readonly :value="detail.start+'-'+detail.end"></van-field>
            <van-field label="状态" readonly :value="detail.status"></van-field>
        </van-cell-group>
    </view>
    <view class="btn-wrapper">
        <van-button customStyle="width:100px" round color="#2196f3" @click="pass">通过</van-button>
        <van-button customStyle="width:100px" round type="danger" @click="refuse">拒绝</van-button>
    </view>
</template>

<script setup>
    import {
        ref
    } from "vue";
    const detail = ref({
        roomName: "亚马逊",
        branchName: '产品部',
        userName: 'moby',
        start: '10:00',
        end: '12:00',
        date: '2020-03-12',
        status: 1
    })
    const pass = () => {
        uni.navigateBack()
    }
    const refuse = () => {
        uni.navigateBack()
    }
</script>

<style scoped lang="scss">
    .btn-wrapper {
        margin: 30px;
        text-align: center;

        van-button {
            margin: 0 10px;
        }


    }
</style>