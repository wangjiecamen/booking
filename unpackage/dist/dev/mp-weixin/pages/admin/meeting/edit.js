"use strict";
const common_vendor = require("../../../common/vendor.js");
if (!Array) {
  const _component_van_field = common_vendor.resolveComponent("van-field");
  const _component_van_switch = common_vendor.resolveComponent("van-switch");
  const _component_van_cell = common_vendor.resolveComponent("van-cell");
  const _component_van_cell_group = common_vendor.resolveComponent("van-cell-group");
  const _component_van_button = common_vendor.resolveComponent("van-button");
  (_component_van_field + _component_van_switch + _component_van_cell + _component_van_cell_group + _component_van_button)();
}
const _sfc_main = {
  __name: "edit",
  setup(__props) {
    const formData = common_vendor.ref({
      roomRoom: "",
      audit: 0,
      status: 0
    });
    common_vendor.onLoad((options) => {
      common_vendor.index.setNavigationBarTitle({
        title: options.id ? "会议室详情" : "新增会议室"
      });
      if (options.id) {
        getDetail();
      }
    });
    const getDetail = () => {
    };
    const onChangeRoomName = (e) => {
      formData.value.roomRoom = e.detail;
    };
    const onChangeAudit = (e) => {
      formData.value.audit = e.detail;
    };
    const onChangeStatus = (e) => {
      formData.value.status = e.detail;
    };
    const submit = () => {
      console.log(formData.value);
      common_vendor.index.navigateBack();
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(onChangeRoomName),
        b: common_vendor.p({
          label: "会议室名称",
          value: formData.value.roomRoom,
          placeholder: "请输入"
        }),
        c: common_vendor.o(onChangeStatus),
        d: common_vendor.p({
          size: "20",
          checked: formData.value.status,
          activeValue: 1,
          inactiveValue: 0
        }),
        e: common_vendor.p({
          title: "会议室状态"
        }),
        f: common_vendor.o(onChangeAudit),
        g: common_vendor.p({
          size: "20",
          checked: formData.value.audit,
          activeValue: 1,
          inactiveValue: 0
        }),
        h: common_vendor.p({
          title: "是否需要审核"
        }),
        i: common_vendor.o(submit),
        j: common_vendor.p({
          block: true,
          round: true,
          color: "#2196f3"
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-f7ddd165"], ["__file", "/Users/apple/sub-work/booking/booking/pages/admin/meeting/edit.vue"]]);
wx.createPage(MiniProgramPage);
