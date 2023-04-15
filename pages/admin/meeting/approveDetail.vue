<template>
    <view>
        <van-cell-group>
            <van-field label="会议室名称" readonly :value="detail.room_name"></van-field>
            <van-field label="预订部门" readonly :value="detail.branch_name"></van-field>
            <van-field label="预订人" readonly :value="detail.user_name"></van-field>
            <van-field label="预订日期" readonly :value="detail.date"></van-field>
            <van-field label="预订时间" readonly :value="detail.start_time+'-'+detail.end_time"></van-field>
            <van-field label="备注" readonly :value="detail.remark||'无'"></van-field>
            <van-cell title="会议纪要">
                <template #right-icon v-if="detail.doc_url">
                    <preview-image :url="detail.doc_url"></preview-image>
                </template>
                <template #right-icon v-else>
                    <text>无</text>
                </template>
            </van-cell>
        </van-cell-group>
    </view>
    <view class="btn-wrapper" v-if="detail.status===0">
        <van-button block round color="#2196f3" @click="pass">通过</van-button>
        <van-button block round type="danger" @click="refuse">拒绝</van-button>
    </view>
</template>

<script setup>
    import PreviewImage from '@/components/PreviewImage.vue'
    import {
        ref
    } from "vue";
    import {
        onLoad
    } from "@dcloudio/uni-app";
    const detail = ref({})
    const id = ref('')
    onLoad(async (options) => {
        id.value = options.id
        getDetail()

    })
    const getDetail = async () => {
        const {
            data
        } = await uniCloud.importObject('booking').getItem({
            id: id.value
        })
        detail.value = data
    }
    const pass = async () => {
        await uniCloud.importObject('booking').auditItem({
            id: id.value,
            status: 1
        })
        uni.navigateBack()
    }
    const refuse = async () => {
        await uniCloud.importObject('booking').auditItem({
            id: id.value,
            status: 2
        })
        uni.navigateBack()
    }
</script>

<style scoped lang="scss">
    .btn-wrapper {
        margin: 10px 30px;
        text-align: center;

        van-button {
            margin: 0 10px;
        }


    }
</style>