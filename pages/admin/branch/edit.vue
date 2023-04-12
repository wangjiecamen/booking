<template>
    <van-cell-group>
        <van-field label="部门名称" @change="onChangeBranchName" :value="formData.branchName" placeholder="请输入" />
        <van-cell title="部门状态">
            <template #right-icon>
                <van-switch size="20" @change="onChangeStatus" :checked="formData.status" :active-value="1"
                    :inactive-value="0" />
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
        branchName: '',
        status: 1
    })
    onLoad((options) => {
        uni.setNavigationBarTitle({
            title: options.id ? '部门详情' : '新增部门'
        })
        if (options.id) {
            getDetail()
        }
    })
    const getDetail = () => {}
    const onChangeBranchName = (e) => {
        formData.value.branchName = e.detail
    }
    const onChangeStatus = (e) => {
        formData.value.status = e.detail
    }
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