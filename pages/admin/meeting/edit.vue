<template>
    <van-cell-group>
        <van-field label="会议室名称" @change="onChangeRoomName" :value="formData.name" placeholder="请输入" />
        <van-cell title="会议室状态">
            <template #right-icon>
                <van-switch size="20" @change="onChangeStatus" :checked="formData.status" :active-value="1"
                    :inactive-value="0" />
            </template>
        </van-cell>
        <van-cell title="是否需要审核">
            <template #right-icon>
                <van-switch size="20" @change="onChangeAudit" :checked="formData.audit" :active-value="1"
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
        name: '',
        audit: 0,
        status: 1,
    })
    onLoad((options) => {
        uni.setNavigationBarTitle({
            title: options.id ? '会议室详情' : '新增会议室'
        })
        if (options.id) {
            formData.value._id = options.id
            getDetail()
        }
    })

    const getDetail = async () => {
        const {
            data
        } = await uniCloud.importObject('room').getItem({
            _id: formData.value._id
        })
        console.log(data)

        formData.value.name = data.name
        formData.value.status = data.status
        formData.value.audit = data.audit
    }

    const onChangeRoomName = (e) => {
        formData.value.name = e.detail
    }
    const onChangeAudit = (e) => {
        formData.value.audit = e.detail
    }
    const onChangeStatus = (e) => {
        formData.value.status = e.detail
    }
    const submit = async () => {
        if (formData.value._id) {
            console.log(formData.value)
            await uniCloud.importObject('room').updateItem(formData.value)
        } else {

            await uniCloud.importObject('room').addItem(formData.value)
        }
        uni.navigateBack()
    }
</script>

<style scoped>
    .btn_wrapper {
        margin: 30px 10px
    }
</style>