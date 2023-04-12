<template>

    <view class="register">
        <van-cell-group>
            <van-field label='账号' @change="onChangeUserName" :value="formData.username" placeholder="请输入账号"></van-field>
            <van-field label='密码' @change="onChangePassword" :value="formData.password" placeholder="请输入密码"></van-field>

            <view @click="showPicker = true">
                <van-field :value="formData.branchName" is-link readonly label="所属部门" placeholder="选择部门" />
            </view>
            <van-popup :show="showPicker" round position="bottom">
                <van-picker show-toolbar :columns="branchList" @cancel="showPicker = false" @confirm="onConfirm" />
            </van-popup>
        </van-cell-group>
        <view class="btn_wrapper">
            <van-button block round color="#2196F3" class="register_btn" @click="goToRegister">注册</van-button>
        </view>
    </view>

</template>

<script setup>
    import {
        ref
    } from "vue";
    const userModel = uniCloud.importObject('user')
    const showPicker = ref(false)
    const formData = ref({
        username: '',
        password: '',
        branch: ''
    })

    const goToRegister = async () => {
        try {
            console.log(formData.value)
            await userModel.register(formData.value)
            // uni.redirectTo({
            //     url: "/pages/index/index"
            // })
        } catch (e) {
            console.log(e, '<<<<')
        }

    }
    const onChangeUserName = (e) => {
        formData.value.username = e.detail
    }
    const onChangePassword = (e) => {
        formData.value.password = e.detail
    }
</script>

<style lang="scss">
    .btn_wrapper {
        margin: 10px 30px
    }

    .register_btn {

        color: $uni-color-primary;
        display: block;
    }
</style>