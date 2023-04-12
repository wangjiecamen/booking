"use strict";
const common_vendor = require("../../../common/vendor.js");
if (!Array) {
  const _component_van_field = common_vendor.resolveComponent("van-field");
  const _component_van_cell_group = common_vendor.resolveComponent("van-cell-group");
  const _component_van_button = common_vendor.resolveComponent("van-button");
  (_component_van_field + _component_van_cell_group + _component_van_button)();
}
const _sfc_main = {
  __name: "approveDetail",
  setup(__props) {
    const detail = common_vendor.ref({
      roomName: "亚马逊",
      branchName: "产品部",
      userName: "moby",
      start: "10:00",
      end: "12:00",
      date: "2020-03-12",
      status: 1
    });
    const pass = () => {
      common_vendor.index.navigateBack();
    };
    const refuse = () => {
      common_vendor.index.navigateBack();
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          label: "会议室名称",
          readonly: true,
          value: detail.value.roomName
        }),
        b: common_vendor.p({
          label: "预订部门",
          readonly: true,
          value: detail.value.branchName
        }),
        c: common_vendor.p({
          label: "预订人",
          readonly: true,
          value: detail.value.userName
        }),
        d: common_vendor.p({
          label: "预订日期",
          readonly: true,
          value: detail.value.date
        }),
        e: common_vendor.p({
          label: "预订时间",
          readonly: true,
          value: detail.value.start + "-" + detail.value.end
        }),
        f: common_vendor.p({
          label: "状态",
          readonly: true,
          value: detail.value.status
        }),
        g: common_vendor.o(pass),
        h: common_vendor.p({
          customStyle: "width:100px",
          round: true,
          color: "#2196f3"
        }),
        i: common_vendor.o(refuse),
        j: common_vendor.p({
          customStyle: "width:100px",
          round: true,
          type: "danger"
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-0f7b1e01"], ["__file", "/Users/apple/sub-work/booking/booking/pages/admin/meeting/approveDetail.vue"]]);
wx.createPage(MiniProgramPage);
