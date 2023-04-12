"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _component_van_field = common_vendor.resolveComponent("van-field");
  const _easycom_uqrcode2 = common_vendor.resolveComponent("uqrcode");
  const _component_van_cell = common_vendor.resolveComponent("van-cell");
  const _component_van_cell_group = common_vendor.resolveComponent("van-cell-group");
  (_component_van_field + _easycom_uqrcode2 + _component_van_cell + _component_van_cell_group)();
}
const _easycom_uqrcode = () => "../../uni_modules/Sansnn-uQRCode/components/uqrcode/uqrcode.js";
if (!Math) {
  (_easycom_uqrcode + Uploader)();
}
const Uploader = () => "../../components/uploader.js";
const _sfc_main = {
  __name: "detail",
  setup(__props) {
    const formData = common_vendor.ref({
      date: "2020-02-03",
      start_time: "10:00",
      end_time: "12:00",
      remark: "13",
      userName: "moby"
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          readonly: true,
          label: "日期",
          value: formData.value.date
        }),
        b: common_vendor.p({
          readonly: true,
          label: "开始时间",
          value: formData.value.start_time
        }),
        c: common_vendor.p({
          readonly: true,
          label: "结束时间",
          value: formData.value.end_time
        }),
        d: common_vendor.p({
          label: "备注",
          value: formData.value.remark,
          type: "textarea"
        }),
        e: common_vendor.p({
          label: "发起人",
          value: formData.value.userName
        }),
        f: common_vendor.sr("uqrcode", "0cde6ae2-7,0cde6ae2-6"),
        g: common_vendor.p({
          ["canvas-id"]: "qrcode",
          value: "https://uqrcode.cn/doc",
          size: 100
        }),
        h: common_vendor.p({
          title: "二维码"
        }),
        i: common_vendor.p({
          max: 1
        }),
        j: common_vendor.p({
          title: "会议纪要"
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/apple/sub-work/booking/booking/pages/meeting-record/detail.vue"]]);
wx.createPage(MiniProgramPage);
