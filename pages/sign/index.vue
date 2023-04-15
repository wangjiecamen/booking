<template>
    <view class="sign" v-if="success">
        <image class="icon" src="/static/successful.svg"></image>
        <view class="text">签到成功</view>
    </view>
</template>

<script setup>
    import {
        onLoad,
    } from "@dcloudio/uni-app"
    import {
        ref
    } from "vue";
    const success = ref(false)
    onLoad(async (options) => {
        console.log(options)
        if (options.scene) await uniCloud.callFunction({
            name: 'sign',
            data: {
                id: options.scene
            }
        })
        success.value = true
    })
</script>

<style scoped>
    .sign {
        text-align: center;
        margin-top: 100px;
    }

    .text {
        font-size: 12px;
        margin-top: 10px;
    }

    .icon {
        width: 70px;
        height: 70px;
    }
</style>