<template>

    <van-cell-group>
        <van-field label="标题" @change="(e)=>setFormData('title',e.detail)" :value="formData.title" placeholder="请输入" />
        <van-field :maxlength='500' type="textarea" label="内容" @change="(e)=>setFormData('title',e.detail)"
            :value="formData.title" placeholder="请输入" />
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
        title: '12',
        content: 'fddefe'
    })

    onLoad((options) => {
        uni.setNavigationBarTitle({
            title: options.id ? '公告详情' : '新增公告'
        })
        if (options.id) {
            getDetail()
        }
    })
    const setFormData = (field, value) => {
        formData.value[field] = value
    }
    const getDetail = () => {

    }
    const submit = () => {
        uni.navigateBack()
    }
</script>

<style scoped>
    .btn_wrapper {
        margin: 30px 10px
    }
</style>