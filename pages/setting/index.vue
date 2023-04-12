<template>
    <view>
        <van-cell-group>
            <van-cell title="账号名称" value="moby" />
            <van-cell title="角色" value="普通用户"></van-cell>
            <van-cell title="所属部门" value="产品部" />
        </van-cell-group>
    </view>
    <view class="btn">
        <van-button type="danger" block round @click="logout">退出</van-button>
    </view>

</template>

<script setup>
    const logout = () => {
        uni.reLaunch({
            url: "/pages/login/index"
        })
    }
</script>

<style scoped lang="scss">
    .btn {
        margin: 0 20px;
        width: -webkit-fill-available;
        position: fixed;
        bottom: 20px
    }
</style>