<script>
    import uniIdPageInit from '@/uni_modules/uni-id-pages/init.js';
    export default {
        onLaunch: async function() {
            console.log('App Launch')
            await uniIdPageInit()

            // const user = uniCloud.getCurrentUserInfo()
            // const {
            //     data
            // } = await uniCloud.importObject('user').getUserInfo(user.uid)
            // uni.setStorageSync('userinfo', data)

        },
        onShow: function() {
            console.log('App Show')
        },
        onHide: function() {
            console.log('App Hide')
        }
    }
</script>

<style lang="scss">
    @import "wxcomponents/vant/common/index.wxss";

    page {
        background-color: $uni-bg-color-grey !important;
        color: $uni-text-color !important;
    }

    view {
        box-sizing: border-box;
    }

    .primary_btn {
        background-color: $uni-color-primary;
    }

    .default_btn {
        text-align: center;
        height: 40px;
        line-height: 40px;
        margin: 15px 0 10px 0;
        color: #222 !important;
        border-radius: 5px;
        font-size: 16px;
    }

    /*每个页面公共css */
    ::-webkit-scrollbar {
        width: 0;
        height: 0;
        color: transparent;
    }
</style>