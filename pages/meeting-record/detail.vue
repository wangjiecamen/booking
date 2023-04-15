<template>
    <view style="overflow: hidden;">
        <van-cell-group>
            <van-field readonly label="日期" :value="formData.date"></van-field>
            <van-field readonly label="开始时间" :value="formData.start_time"></van-field>
            <van-field readonly label="结束时间" :value="formData.end_time"></van-field>
            <van-field readonly label="发起人" :value="formData.user_name"></van-field>
            <van-field readonly label="发起部门" :value="formData.branch_name"></van-field>
            <van-field readonly label="预订会议室" :value="formData.room_name"></van-field>
            <van-field readonly label="是否需要审核" :value="formData.audit===1?'需要':'不需要'"></van-field>
            <van-field @change="(e)=>formData.remark=e.detail" label=" 备注" :value="formData.remark"
                type="textarea"></van-field>
            <van-cell v-if="formData._id" title="二维码">
                <template #right-icon>
                    <uqrcode style="display: inline-block;" ref="uqrcode" canvas-id="qrcode"
                        :value="`https://fc-mp-cc99a23f-d23b-4970-81b7-caad20480fff.next.bspapp.com/sign?id=${formData._id}`"
                        :size="100">
                    </uqrcode>
                </template>
            </van-cell>
            <van-cell title="会议纪要">
                <template #right-icon>
                    <uploader :max="1" :file-list="fileList" :readonly="readonly"></uploader>
                </template>
            </van-cell>
            <van-cell title="签到人数" :value="formData.sign_num"></van-cell>
        </van-cell-group>
        <view class="btn_wrapper" v-if="!readonly">
            <van-button block round color='#2196f3' @click="submit">提交</van-button>
            <van-button v-if="formData.status===0||formData.status===1" block round @click="cancel">取消</van-button>
        </view>
    </view>
</template>

<script setup>
    import Uploader from "@/components/uploader.vue"
    import {
        onLoad,
        onShareAppMessage
    } from "@dcloudio/uni-app";
    import {
        ref
    } from "vue";
    const fileList = ref([])
    const readonly = ref(false)
    const formData = ref({
        date: '',
        start_time: '',
        end_time: "",
        remark: '',
        user_name: '',
        user_id: '',
        room_id: '',
        room_name: '',
        branch_id: '',
        branch_name: '',
        doc_url: '',
    })
    onLoad((options) => {
        console.log(options)
        uni.setNavigationBarTitle({
            title: options.id ? '会议详情' : '新增会议'
        })
        if (options.id) {
            readonly.value = options.type === 'detail'
            formData.value._id = options.id
            getDetail()
        } else {
            formData.value = JSON.parse(decodeURIComponent(options.form))
        }
    })
    const getDetail = async () => {
        const {
            data
        } = await uniCloud.importObject('booking').getItem({
            id: formData.value._id
        })

        formData.value = data
        if (data.doc_url) fileList.value = [data.doc_url]
        console.log(fileList.value)
    }
    const cancel = async () => {
        await uniCloud.importObject('booking').auditItem({
            status: 3,
            id: formData.value._id
        })
        uni.navigateBack()
    }
    const submit = async () => {
        if (fileList.value.length) formData.value.doc_url = fileList.value[0]
        else formData.value.doc_url = ''
        console.log(formData.value)
        if (formData.value._id) {
            await uniCloud.importObject('booking').updateItem(formData.value)
        } else {
            await uniCloud.importObject('booking').addItem(formData.value)
        }
        uni.navigateBack()
    }
    onShareAppMessage(() => {
        return {
            title: '会议室',
            path: `/pages/meeting-record/detail?id=${formData.value._id}&type=detail`
        }
    })
</script>


<style>
    page {
        background-color: #fff !important;
    }
</style>
<style scoped lang="scss">
    .btn_wrapper {
        margin: 30px 10px;

        van-button {
            margin: 0 5px;
        }

    }
</style>