<template>
    <view class="flex flex-wrap">
        <view class="files" v-for="(file, index) in fileList" :key="file">
            <image @click="preview(index)" :src="file"></image>
            <view v-if="!readonly" class="delete_btn" @click="deleteFile(index)">
                <van-icon class="delete_icon" name="cross" />
            </view>
        </view>
        <view v-if="fileList.length < max && !readonly" class=" uploader" @click="upload">
            <van-icon name="plus" size="30"></van-icon>
        </view>
    </view>
</template>

<script setup>
    import {
        ref,
    } from "vue";

    const props = defineProps({
        readonly: {
            type: Boolean,
            default: false
        },
        max: {
            type: Number,
            default: 5
        },
        fileList: {
            type: Array,
            default: () => []
        }
    })
    const fileListRef = ref(props.fileList)

    const preview = (index) => {
        uni.previewImage({
            current: fileListRef.value[index],
            urls: fileListRef.value
        })
    }
    const deleteFile = (index) => {
        fileListRef.value.splice(index, 1)
    }

    const upload = () => {
        uni.chooseImage({
            count: 1,
            success: async (chooseImageRes) => {
                let filePath = chooseImageRes.tempFilePaths[0]
                console.log(filePath)
                const fileExtension = filePath.split('.').pop()
                const result = await uniCloud.uploadFile({
                    filePath: filePath,
                    cloudPath: `meeting_doc_${new Date().getTime()}.${fileExtension}`,
                });
                console.log(result)
                fileListRef.value.push(result.fileID)
            }
        })
    }
</script>

<style scoped lang="scss">
    .flex {
        display: flex;
    }

    .flex-wrap {
        flex-wrap: wrap;
    }

    .files {
        width: 100px;
        height: 100px;
        position: relative;

        image {
            width: 100%;
            height: 100%;
            border-radius: 8px;
        }
    }

    .uploader {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 100px;
        height: 100px;
        background: #FFFFFF;
        border-radius: 16rpx;
        border: 1px solid #E0E0E6;
    }

    .delete_btn {
        position: absolute;
        top: 0;
        right: 0;
        width: 28rpx;
        height: 28rpx;
        background-color: rgba(0, 0, 0, 0.7);
        border-radius: 0 0 0 24rpx;

        .delete_icon {
            position: absolute;
            top: -4rpx;
            right: -4rpx;
            color: #fff;
            font-size: 32rpx;
            -webkit-transform: scale(0.5);
            transform: scale(0.5);
        }
    }
</style>