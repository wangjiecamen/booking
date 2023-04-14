<!-- 账号注册页 -->
<template>
    <view class="uni-content">
        <text class="title title-box">用户注册</text>
        <uni-forms ref="form" :value="formData" :rules="rules" validate-trigger="submit" err-show-type="toast">
            <uni-forms-item name="username" required>
                <uni-easyinput :inputBorder="false" :focus="focusUsername" @blur="focusUsername = false"
                    class="input-box" placeholder="请输入用户名" v-model="formData.username" trim="both" />
            </uni-forms-item>
            <uni-forms-item name="nickname">
                <uni-easyinput :inputBorder="false" :focus="focusNickname" @blur="focusNickname = false"
                    class="input-box" placeholder="请输入用户昵称" v-model="formData.nickname" trim="both" />
            </uni-forms-item>
            <uni-forms-item name="password" v-model="formData.password" required>
                <uni-easyinput :inputBorder="false" :focus="focusPassword" @blur="focusPassword = false"
                    class="input-box" maxlength="20"
                    :placeholder="'请输入' + (config.passwordStrength == 'weak'?'6':'8') + '-16位密码'" type="password"
                    v-model="formData.password" trim="both" />
            </uni-forms-item>
            <uni-forms-item name="password2" v-model="formData.password2" required>
                <uni-easyinput :inputBorder="false" :focus="focusPassword2" @blur="focusPassword2 =false"
                    class="input-box" placeholder="再次输入密码" maxlength="20" type="password" v-model="formData.password2"
                    trim="both" />
            </uni-forms-item>
            <uni-forms-item>
                <view class="picker_wrapper" @click="showPicker = true">
                    <view>
                        <text class="label">所属部门</text>
                    </view>
                    <view>
                        <text class="value">{{branchName}}</text>
                        <van-icon name="arrow" color="#ccc" />
                    </view>

                </view>
            </uni-forms-item>
            <van-popup :show="showPicker" round position="bottom">
                <van-picker show-toolbar :columns="branchList" @cancel="showPicker = false" @confirm="onConfirm" />
            </van-popup>
            <uni-forms-item>
                <uni-captcha ref="captcha" scene="register" v-model="formData.captcha" />
            </uni-forms-item>

            <uni-id-pages-agreements scope="register" ref="agreements"></uni-id-pages-agreements>
            <button class="uni-btn primary_btn" @click="submit">注册</button>
            <button @click="navigateBack" class="register-back default_btn">返回</button>

        </uni-forms>
    </view>
</template>

<script>
    import rules from './validator.js';
    import mixin from '@/uni_modules/uni-id-pages/common/login-page.mixin.js';
    import config from '@/uni_modules/uni-id-pages/config.js'
    import {
        store,
        mutations
    } from '@/uni_modules/uni-id-pages/common/store.js'

    const uniIdCo = uniCloud.importObject("uni-id-co")
    const branchCo = uniCloud.importObject("branch")
    export default {
        mixins: [mixin],
        data() {
            return {
                formData: {
                    username: "moby1",
                    nickname: "biyw",
                    password: "wangjie1739",
                    password2: "wangjie1739",
                    captcha: "",
                    department_id: ""
                },
                rules,
                focusUsername: false,
                focusNickname: false,
                focusPassword: false,
                focusPassword2: false,
                branchList: [{
                    text: '产品部',
                    value: "232499812"
                }],
                branchName: '',
                showPicker: false,
            }
        },
        onReady() {
            this.$refs.form.setRules(this.rules)
        },
        onShow() {
            // #ifdef H5
            document.onkeydown = event => {
                var e = event || window.event;
                if (e && e.keyCode == 13) { //回车键的键值为13
                    this.submit()
                }
            };
            // #endif
        },
        mounted() {
            this.getBranchList()
        },
        methods: {
            async getBranchList() {
                const {
                    data
                } = await branchCo.getBranchList()
                this.branchList = data.map(i => {
                    return {
                        text: i.name,
                        value: i._id
                    }
                })
            },
            onConfirm(e) {
                this.branchName = this.branchList[e.detail.index].text
                console.log(this.branchName)
                this.formData.department_id = this.branchList[e.detail.index].value
                this.showPicker = false
            },
            /**
             * 触发表单提交
             */
            submit() {
                if (this.formData.department_id === '') {
                    return uni.showToast({
                        title: '请选择所属部门',
                        icon: 'none',
                        duration: 3000
                    });
                }
                this.$refs.form.validate().then((res) => {
                    if (this.formData.captcha.length != 4) {
                        this.$refs.captcha.focusCaptchaInput = true
                        return uni.showToast({
                            title: '请输入验证码',
                            icon: 'none',
                            duration: 3000
                        });
                    }
                    if (this.needAgreements && !this.agree) {
                        return this.$refs.agreements.popup(() => {
                            this.submitForm(res)
                        })
                    }
                    this.submitForm(res)
                }).catch((errors) => {
                    let key = errors[0].key
                    key = key.replace(key[0], key[0].toUpperCase())
                    this['focus' + key] = true
                })
            },
            submitForm(params) {
                uniIdCo.registerUser(this.formData).then(e => {
                        this.loginSuccess(e)
                    })
                    .catch(e => {
                        console.log(e.message);
                        //更好的体验：登录错误，直接刷新验证码
                        this.$refs.captcha.getImageCaptcha()
                    })
            },
            navigateBack() {
                uni.navigateBack()
            },
        }
    }
</script>

<style lang="scss">
    @import "@/uni_modules/uni-id-pages/common/login-page.scss";

    @media screen and (max-width: 690px) {
        .uni-content {
            height: 100%;
            background-color: #fff;
        }
    }

    @media screen and (min-width: 690px) {
        .uni-content {
            padding: 30px 40px 60px;
            max-height: 530px;
        }

        .link-box {
            /* #ifndef APP-NVUE */
            display: flex;
            /* #endif */
            flex-direction: row;
            justify-content: space-between;
            margin-top: 10px;
        }

        .link {
            font-size: 12px;
        }
    }

    .uni-content ::v-deep .uni-forms-item__label {
        position: absolute;
        left: -15px;
    }

    button {
        margin-top: 15px;
    }

    .picker_wrapper {
        height: 44px;
        background-color: #F8F8F8 !important;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 12px;
        padding: 10px;

        .value {
            margin-right: 10px;
        }
    }
</style>