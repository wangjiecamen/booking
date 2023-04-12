<script>
    export default {
        onLaunch: async function() {
            console.log('App Launch')

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

    /*每个页面公共css */
    ::-webkit-scrollbar {
        width: 0;
        height: 0;
        color: transparent;
    }
</style>