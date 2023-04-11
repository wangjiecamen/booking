"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "detail",
  setup(__props) {
    const detail = common_vendor.ref({
      title: "关于xxxxxde的通告",
      content: "关于xxxxxde的通告关于xxxxxde的通告关于xxxxxde的通告关于xxxxxde的通告关于xxxxxde的通告关于xxxxxde的通告，关于xxxxxde的通告，关于xxxxxde的通告，关于xxxxxde的通告，关于xxxxxde的通告",
      updateTime: "2020-03-12 23:33:20"
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(detail.value.title),
        b: common_vendor.t(detail.value.updateTime),
        c: common_vendor.t(detail.value.content)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-0f737f11"], ["__file", "/Users/apple/sub-work/booking/booking/pages/notice/detail.vue"]]);
wx.createPage(MiniProgramPage);
