<template>
    <van-cell-group>
        <van-field label="账号" @change="(e)=>setFormData('userName',e.detail)" :value="formData.userName"
            placeholder="请输入" />
        <van-field label="密码" @change="(e)=>setFormData('password',e.detail)" :value="formData.password"
            placeholder="请输入" />

        <view @click="showPicker = true">
            <van-field :value="formData.branchName" is-link readonly label="所属部门" placeholder="选择部门" />
        </view>
        <van-popup :show="showPicker" round position="bottom">
            <van-picker show-toolbar :columns="branchList" @cancel="showPicker = false" @confirm="onConfirm" />
        </van-popup>

        <van-cell title="账号状态">
            <template #right-icon>
                <van-switch size="20" @change="(e)=>setFormData('status',e.detail)" :checked="formData.status"
                    :active-value="1" :inactive-value="0" />
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
        ref
    } from "vue";
    const formData = ref({
        userName: '',
        status: 1,
        password: '',
        branchName: ''
    })
    const showPicker = ref(false)
    const branchList = ref([{
            text: '杭州',
            value: 'Hangzhou'
        },
        {
            text: '宁波',
            value: 'Ningbo'
        },
        {
            text: '温州',
            value: 'Wenzhou'
        },
        {
            text: '绍兴',
            value: 'Shaoxing'
        },
        {
            text: '湖州',
            value: 'Huzhou'
        },
    ])
    onLoad((options) => {
        uni.setNavigationBarTitle({
            title: options.id ? '部门详情' : '新增部门'
        })
        if (options.id) {
            getDetail()
        }
    })

    const setFormData = (field, value) => {
        formData.value[field] = value
    }
    const onConfirm = (e) => {
        showPicker.value = false
        console.log(e)
    }
    const getDetail = () => {}

    const submit = () => {
        console.log(formData.value)
        uni.navigateBack()
    }
</script>

<style scoped>
    .btn_wrapper {
        margin: 30px 10px
    }
</style>