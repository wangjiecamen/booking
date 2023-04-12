<template>

    <view class="login">

        <van-cell-group>
            <van-field label='账号' @change="onChangeUserName" :value="formData.username" placeholder="请输入账号"></van-field>
            <van-field label='密码' @change="onChangePassword" :value="formData.password" placeholder="请输入密码"></van-field>
        </van-cell-group>
        <view class="btn_wrapper">
            <van-button block round class='login_btn' color="#2196F3" @click="submit">登录</van-button>
            <van-button block round class="register_btn" @click="goToRegister">注册</van-button>
        </view>
    </view>

</template>

<script setup>
    import {
        ref
    } from "vue";
    const userModel = uniCloud.importObject('user')
    const formData = ref({
        username: '',
        password: ''
    })

    const goToRegister = () => {
        uni.navigateTo({
            url: "/pages/register/index"
        })
    }
    const onChangeUserName = (e) => {
        formData.value.username = e.detail
    }
    const onChangePassword = (e) => {
        formData.value.password = e.detail
    }
    const submit = async () => {
        try {
            console.log(formData.value)
            await userModel.login(formData.value)
            uni.redirectTo({
                url: "/pages/index/index"
            })
        } catch (e) {

        }

    }
</script>

<style lang="scss">
    .btn_wrapper {
        margin: 10px 30px
    }

    .register_btn {
        margin-top: 10px;
        color: $uni-color-primary;
        display: block;
    }
</style>