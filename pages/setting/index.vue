<template>
    <view>
        <van-cell-group>
            <van-cell title="账号名称" :value="info.username" />
            <van-cell title="昵称名称" :value="info.nickname" />
            <van-cell title="角色" :value="info.role.join(',')"></van-cell>
            <van-cell v-if="info.branchName" title="所属部门" :value="info.branchName" />
        </van-cell-group>
    </view>
    <view class="btn">
        <van-button block round @click="logout">退出</van-button>
    </view>

</template>

<script setup>
    import {
        onMounted,
        ref
    } from "vue";
    import {
        getUserInfo
    } from '@/utils/user.js'
    const info = ref({
        branchName: '',
        username: '',
        nickname: '',
        role: []
    })
    onMounted(async () => {

        info.value = getUserInfo()

    })
    const logout = async () => {
        // 1. 已经过期就不需要调用服务端的注销接口	2.即使调用注销接口失败，不能阻塞客户端
        if (uniCloud.getCurrentUserInfo().tokenExpired > Date.now()) {
            try {
                await uniCloud.importObject('uni-id-co').logout()
            } catch (e) {
                console.error(e);
            }
        }
        uni.removeStorageSync('uni_id_token');
        uni.setStorageSync('uni_id_token_expired', 0)
        uni.reLaunch({
            url: "/uni_modules/uni-id-pages/pages/login/login-withpwd"
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