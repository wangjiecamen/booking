<template>
    <swiper class="swiper" circular :autoplay="true" :interval="3000" :duration="500">
        <swiper-item v-for="b in banners" :key="b">
            <image :src="b" class="banner"></image>
        </swiper-item>

    </swiper>
</template>

<script setup>
    import {
        ref
    } from "vue"
    const banners = ref([
        'https://i0.hdslb.com/bfs/sycp/creative_img/202303/f2cd53517d531e8253a57220044057a5.jpg@976w_550h_1c_!web-home-carousel-cover',
        "https://i0.hdslb.com/bfs/archive/56806e57d97b19e4caf07702390785497b1c7afa.jpg@976w_550h_1c_!web-home-carousel-cover"
    ])
</script>

<style scoped lang="scss">
    .banner {
        width: 100%;

    }
</style>