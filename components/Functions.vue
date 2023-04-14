<template>
    <div class="container">
        <div @click="goTo(b)" class="block" v-for="b in functions" :key="b.title" :style="{background:b.bg}">
            {{b.title}}
        </div>
    </div>
</template>

<script setup>
    import {
        userFunctions,
        adminFunctions
    } from "../contants";
    import {
        onBeforeMount,
        ref
    } from "vue"
    const functions = ref([])
    onBeforeMount(() => {
        console.log(uniCloud.getCurrentUserInfo().role[0])
        const userType = uniCloud.getCurrentUserInfo().role[0]
        if (userType === 'admin') functions.value = adminFunctions
        if (userType === 'user') functions.value = userFunctions
    })
    const goTo = (b) => {
        uni.navigateTo({
            url: b.url,
            fail: () => {
                uni.switchTab({
                    url: b.url
                })
            },
        });
    }
</script>

<style scoped lang="scss">
    .container {
        margin-top: 30px;
        padding: 10px;
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-gap: 10px;
    }

    .block {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 18px;
        height: 100px;
        color: #ffffff;
        border-radius: 8px;
    }
</style>