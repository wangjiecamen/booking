<template>
    <view class="sumbit_btn" @click="emits('onClick')">
        <slot></slot>
    </view>
</template>

<script setup>
    const emits = defineEmits(['onClick'])
</script>

<style scoped lang="scss">
    .sumbit_btn {
        position: fixed;
        bottom: 20rpx;
        right: 20rpx;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fff;
        box-sizing: border-box;
        width: 50px;
        font-size: 12px;
        background: rgba(33, 150, 243, 0.8);
        height: 50px;
        border-radius: 50%
    }
</style>