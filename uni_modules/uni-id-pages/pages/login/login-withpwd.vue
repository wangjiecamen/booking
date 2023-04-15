<!-- 账号密码登录页 -->
<template>
    <view class="uni-content">
        <!-- 顶部文字 -->
        <text class="title title-box">账号密码登录</text>
        <uni-forms>
            <uni-forms-item name="username">
                <uni-easyinput :focus="focusUsername" @blur="focusUsername = false" class="input-box"
                    :inputBorder="false" v-model="username" placeholder="请输入手机号/用户名/邮箱" />
            </uni-forms-item>
            <uni-forms-item name="password">
                <uni-easyinput :focus="focusPassword" @blur="focusPassword = false" class="input-box" clearable
                    type="password" :inputBorder="false" v-model="password" placeholder="请输入密码" />
            </uni-forms-item>
        </uni-forms>
        <uni-captcha v-if="needCaptcha" focus ref="captcha" scene="login-by-pwd" v-model="captcha" />
        <!-- 带选择框的隐私政策协议组件 -->
        <uni-id-pages-agreements scope="login" ref="agreements"></uni-id-pages-agreements>
        <button class="uni-btn primary_btn" @click="pwdLogin">登录</button>
        <!-- 忘记密码 -->
        <view class="link-box">
            <text class="link" @click="toRegister">{{config.isAdmin ? '注册管理员账号': '注册账号'}}</text>
            <!-- <text class="link" @click="toRegister" v-if="!config.isAdmin">注册账号</text> -->
        </view>

    </view>
</template>

<script>
    import mixin from '@/uni_modules/uni-id-pages/common/login-page.mixin.js';
    const uniIdCo = uniCloud.importObject("uni-id-co", {
        errorOptions: {
            type: 'toast'
        }
    })
    export default {
        mixins: [mixin],
        data() {
            return {
                "password": "",
                "username": "",
                "captcha": "",
                "needCaptcha": false,
                "focusUsername": false,
                "focusPassword": false,
                uniIdRedirectUrl: '/pages/index/index'
            }
        },
        onShow() {
            // #ifdef H5
            document.onkeydown = event => {
                var e = event || window.event;
                if (e && e.keyCode == 13) { //回车键的键值为13
                    this.pwdLogin()
                }
            };
            // #endif
        },
        methods: {
            // 页面跳转，找回密码
            toRetrievePwd() {
                let url = '/uni_modules/uni-id-pages/pages/retrieve/retrieve'
                //如果刚好用户名输入框的值为手机号码，就把它传到retrieve页面，根据该手机号找回密码
                if (/^1\d{10}$/.test(this.username)) {
                    url += `?phoneNumber=${this.username}`
                }
                uni.navigateTo({
                    url
                })
            },
            /**
             * 密码登录
             */
            pwdLogin() {
                if (!this.password.length) {
                    this.focusPassword = true
                    return uni.showToast({
                        title: '请输入密码',
                        icon: 'none',
                        duration: 3000
                    });
                }
                if (!this.username.length) {
                    this.focusUsername = true
                    return uni.showToast({
                        title: '请输入手机号/用户名/邮箱',
                        icon: 'none',
                        duration: 3000
                    });
                }
                if (this.needCaptcha && this.captcha.length != 4) {
                    this.$refs.captcha.getImageCaptcha()
                    return uni.showToast({
                        title: '请输入验证码',
                        icon: 'none',
                        duration: 3000
                    });
                }

                if (this.needAgreements && !this.agree) {
                    return this.$refs.agreements.popup(this.pwdLogin)
                }

                let data = {
                    "password": this.password,
                    "captcha": this.captcha
                }

                if (/^1\d{10}$/.test(this.username)) {
                    data.mobile = this.username
                } else if (/@/.test(this.username)) {
                    data.email = this.username
                } else {
                    data.username = this.username
                }

                uniIdCo.login(data).then(async e => {
                    this.loginSuccess(e)
                    const user = uniCloud.getCurrentUserInfo()
                    const {
                        data
                    } = await uniCloud.importObject('user').getUserInfo(user.uid)
                    uni.setStorageSync('userinfo', data)
                }).catch(e => {
                    if (e.errCode == 'uni-id-captcha-required') {
                        this.needCaptcha = true
                    } else if (this.needCaptcha) {
                        //登录失败，自动重新获取验证码
                        this.$refs.captcha.getImageCaptcha()
                    }
                })
            },
            /* 前往注册 */
            toRegister() {
                uni.navigateTo({
                    url: this.config.isAdmin ? '/uni_modules/uni-id-pages/pages/register/register-admin' :
                        '/uni_modules/uni-id-pages/pages/register/register',
                    fail(e) {
                        console.error(e);
                    }
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "@/uni_modules/uni-id-pages/common/login-page.scss";

    @media screen and (min-width: 690px) {
        .uni-content {
            height: 600px;
            background-color: #fff;
            padding-bottom: 10px;
        }
    }

    .forget {
        font-size: 12px;
        color: #8a8f8b;
    }

    .link-box {
        /* #ifndef APP-NVUE */
        display: flex;
        /* #endif */
        flex-direction: row;
        justify-content: space-between;
        margin-top: 20px;
    }

    .link {
        font-size: 12px;
    }
</style>