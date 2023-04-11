<template>
    <view>
        <van-cell-group>
            <van-cell title="单元格" value="内容" />
            <van-cell title="单元格" value="内容" label="描述信息" border="{{ false }}" />
        </van-cell-group>
    </view>
    <view style="margin: 10px ;">
        <van-button block round @click="logout">退出</van-button>
    </view>

</template>

<script setup>
    const logout = () => {
        uni.reLaunch({
            url: "/pages/login/index"
        })
    }
</script>

<style>
</style>