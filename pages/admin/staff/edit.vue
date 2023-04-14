<template>
    <van-cell-group>
        <van-field label="账号" @change="(e)=>setFormData('username',e.detail)" :value="formData.username"
            placeholder="请输入" />
        <van-field type="password" label="密码" @change="(e)=>setFormData('password',e.detail)" :value="formData.password"
            placeholder="请输入" />
        <van-field type="password" label="密码" @change="(e)=>setFormData('password2',e.detail)"
            :value="formData.password2" placeholder="请再次输入密码" />
        <van-field label="昵称" @change="(e)=>setFormData('nickname',e.detail)" :value="formData.nickname"
            placeholder="请输入" />
        <view @click="showPicker = true">
            <van-field :value="branchName" is-link readonly label="所属部门" placeholder="选择部门" />
        </view>
        <van-popup :show="showPicker" round position="bottom">
            <van-picker show-toolbar :columns="branchList" @cancel="showPicker = false" @confirm="onConfirm" />
        </van-popup>
        <van-cell title="验证码">
            <uni-captcha ref="captcha" scene="register" v-model="formData.captcha" />
        </van-cell>
        <van-cell title="账号状态">
            <template #right-icon>
                <van-switch size="20" @change="(e)=>setFormData('status',e.detail)" :checked="formData.status"
                    :active-value="0" :inactive-value="1" />
            </template>
        </van-cell>
    </van-cell-group>
    <view class="btn_wrapper">
        <van-button block round color='#2196f3' @click="submit">提交</van-button>
    </view>
</template>

<script setup>
    import {
        onLoad
    } from "@dcloudio/uni-app";
    import {
        onMounted,
        ref
    } from "vue";
    const captcha = ref()
    const formData = ref({
        status: 0,
        username: "",
        nickname: "",
        password: "",
        password2: "",
        captcha: "",
        department_id: "",
        role: ['user'],
    })
    const branchName = ref('')
    const showPicker = ref(false)
    const branchList = ref([])
    onLoad(async (options) => {
        uni.setNavigationBarTitle({
            title: options.id ? '员工详情' : '新增员工'
        })
        await getBranchList()
        if (options.id) {
            formData.value.uid = options.id
            await getDetail()
            getBranchName(formData.value.department_id)
        }

    })

    const getBranchList = async () => {
        const {
            data
        } = await uniCloud.importObject('branch').getBranchList()
        branchList.value = data.map(i => {
            return {
                text: i.name,
                value: i._id
            }
        })
    }
    const setFormData = (field, value) => {
        formData.value[field] = value
    }
    const onConfirm = (e) => {
        branchName.value = branchList.value[e.detail.index].text
        formData.value.department_id = branchList.value[e.detail.index].value
        showPicker.value = false
    }
    const getBranchName = (id) => {
        branchName.value = branchList.value.find(i => i.value === id).text
    }
    const getDetail = async () => {
        const {
            data
        } = await uniCloud.importObject('staff').getItem({
            _id: formData.value.uid
        })
        console.log(data)
        formData.value.username = data.username
        formData.value.nickname = data.nickname
        formData.value.status = data.status
        formData.value.department_id = data.department_id
    }

    const submit = async () => {
        if (formData.value.department_id === '') {
            return uni.showToast({
                title: '请选择所属部门',
                icon: 'none',
                duration: 3000
            });
        }
        if (formData.value.captcha.length != 4) {
            captcha.value.focusCaptchaInput = true
            return uni.showToast({
                title: '请输入验证码',
                icon: 'none',
                duration: 3000
            });
        }
        if (formData.value.uid) {
            await uniCloud.importObject('uni-id-co').updateUser(formData.value)
        } else {
            await uniCloud.importObject('uni-id-co').addUser(formData.value)
        }
        uni.navigateBack()
    }
</script>

<style lang="scss">
    .btn_wrapper {
        margin: 30px 10px
    }

    .van-cell__title {
        display: flex;
        align-items: center;
    }

    .van-cell__value {
        flex-basis: 60% !important;
    }

    .captcha-box {
        input {
            text-align: left;
        }
    }
</style>