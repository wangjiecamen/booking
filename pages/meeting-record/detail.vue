<template>
    <view>
        <van-cell-group>
            <van-field readonly label="日期" :value="formData.date"></van-field>
            <van-field readonly label="开始时间" :value="formData.start_time"></van-field>
            <van-field readonly label="结束时间" :value="formData.end_time"></van-field>
            <van-field label="备注" :value="formData.remark" type="textarea"></van-field>
            <van-field label="发起人" :value="formData.userName"></van-field>
            <van-cell title="二维码">
                <template #right-icon>
                    <uqrcode style="display: inline-block;" ref="uqrcode" canvas-id="qrcode"
                        value="https://uqrcode.cn/doc" :size="100">
                    </uqrcode>
                </template>
            </van-cell>
            <van-cell title="会议纪要">
                <template #right-icon>
                    <uploader :max="1"></uploader>
                </template>
            </van-cell>
        </van-cell-group>


    </view>
</template>

<script setup>
    import Uploader from "@/components/uploader.vue"

    import {
        ref
    } from "vue";
    const formData = ref({
        date: '2020-02-03',
        start_time: '10:00',
        end_time: "12:00",
        remark: '13',
        userName: 'moby'
    })
</script>


<style>
    page {
        background-color: #fff !important;
    }
</style>
<style scoped lang="scss">

</style>