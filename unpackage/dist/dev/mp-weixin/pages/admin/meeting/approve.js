"use strict";
const common_vendor = require("../../../common/vendor.js");
if (!Array) {
  const _component_van_empty = common_vendor.resolveComponent("van-empty");
  _component_van_empty();
}
const _sfc_main = {
  __name: "approve",
  setup(__props) {
    const fetched = common_vendor.ref(true);
    const pageNo = common_vendor.ref(1);
    const list = common_vendor.ref([{
      roomName: "亚马逊",
      status: 0
    }, {
      roomName: "亚马22逊",
      status: 1
    }]);
    const goToDetail = (id) => {
      common_vendor.index.navigateTo({
        url: `/pages/admin/meeting/approveDetail?id=${id}`
      });
    };
    common_vendor.onReachBottom(() => {
    });
    common_vendor.onPullDownRefresh(() => {
      list.value = [];
      pageNo.value = 1;
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: list.value.length
      }, list.value.length ? {
        b: common_vendor.f(list.value, (item, k0, i0) => {
          return {
            a: common_vendor.t(item.roomName),
            b: common_vendor.o(($event) => goToDetail(_ctx.id), item.id),
            c: item.id
          };
        })
      } : {}, {
        c: fetched.value && !list.value.length
      }, fetched.value && !list.value.length ? {
        d: common_vendor.p({
          description: "暂无审批记录"
        })
      } : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-26045047"], ["__file", "/Users/apple/sub-work/booking/booking/pages/admin/meeting/approve.vue"]]);
wx.createPage(MiniProgramPage);
