"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _component_van_cell = common_vendor.resolveComponent("van-cell");
  const _component_van_cell_group = common_vendor.resolveComponent("van-cell-group");
  const _component_van_button = common_vendor.resolveComponent("van-button");
  (_component_van_cell + _component_van_cell_group + _component_van_button)();
}
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const logout = () => {
      common_vendor.index.reLaunch({
        url: "/pages/login/index"
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          title: "单元格",
          value: "内容"
        }),
        b: common_vendor.p({
          title: "单元格",
          value: "内容",
          label: "描述信息",
          border: "{{ false }}"
        }),
        c: common_vendor.o(logout),
        d: common_vendor.p({
          block: true,
          round: true
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/apple/sub-work/booking/booking/pages/setting/index.vue"]]);
wx.createPage(MiniProgramPage);
