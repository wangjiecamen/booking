"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {};
if (!Array) {
  const _component_van_field = common_vendor.resolveComponent("van-field");
  const _component_van_cell_group = common_vendor.resolveComponent("van-cell-group");
  (_component_van_field + _component_van_cell_group)();
}
function _sfc_render(_ctx, _cache) {
  return {
    a: common_vendor.p({
      label: "日期"
    }),
    b: common_vendor.p({
      label: "开始时间"
    }),
    c: common_vendor.p({
      label: "结束时间"
    }),
    d: common_vendor.p({
      la: true
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/apple/sub-work/booking/booking/pages/meeting/submit.vue"]]);
wx.createPage(MiniProgramPage);
