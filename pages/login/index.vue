<template>

    <view class="login">
        <uni-forms :modelValue="formData" label-width="45">
            <uni-forms-item label="账号" name="username">
                <uni-easyinput type="text" v-model="formData.username" placeholder="请输入账号" />
            </uni-forms-item>
            <uni-forms-item label="密码" name="password">
                <uni-easyinput type="password" v-model="formData.password" placeholder="请输入密码" />
            </uni-forms-item>
            <van-button block round color="#2196F3" @click="submit">登录</van-button>
            <van-button block round class="register_btn" @click="goToRegister">注册</van-button>
        </uni-forms>
    </view>
</template>

<script setup>
    import uniEasyinput from '@/uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.vue'
    import uniForms from '@/uni_modules/uni-forms/components/uni-forms/uni-forms.vue'
    import uniFormsItem from '@/uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.vue'
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
    .login {
        margin: 30px;
    }

    .register_btn {
        margin-top: 10px;
        color: $uni-color-primary;
        display: block;
    }
</style>