"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _component_van_field = common_vendor.resolveComponent("van-field");
  const _component_van_picker = common_vendor.resolveComponent("van-picker");
  const _component_van_popup = common_vendor.resolveComponent("van-popup");
  const _component_van_cell_group = common_vendor.resolveComponent("van-cell-group");
  const _component_van_button = common_vendor.resolveComponent("van-button");
  (_component_van_field + _component_van_picker + _component_van_popup + _component_van_cell_group + _component_van_button)();
}
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const userModel = common_vendor.Ls.importObject("user");
    const showPicker = common_vendor.ref(false);
    const formData = common_vendor.ref({
      username: "",
      password: "",
      branch: ""
    });
    const goToRegister = async () => {
      try {
        console.log(formData.value);
        await userModel.register(formData.value);
      } catch (e) {
        console.log(e, "<<<<");
      }
    };
    const onChangeUserName = (e) => {
      formData.value.username = e.detail;
    };
    const onChangePassword = (e) => {
      formData.value.password = e.detail;
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(onChangeUserName),
        b: common_vendor.p({
          label: "账号",
          value: formData.value.username,
          placeholder: "请输入账号"
        }),
        c: common_vendor.o(onChangePassword),
        d: common_vendor.p({
          label: "密码",
          value: formData.value.password,
          placeholder: "请输入密码"
        }),
        e: common_vendor.p({
          value: formData.value.branchName,
          isLink: true,
          readonly: true,
          label: "所属部门",
          placeholder: "选择部门"
        }),
        f: common_vendor.o(($event) => showPicker.value = true),
        g: common_vendor.o(($event) => showPicker.value = false),
        h: common_vendor.o(_ctx.onConfirm),
        i: common_vendor.p({
          showToolbar: true,
          columns: _ctx.branchList
        }),
        j: common_vendor.p({
          show: showPicker.value,
          round: true,
          position: "bottom"
        }),
        k: common_vendor.o(goToRegister),
        l: common_vendor.p({
          block: true,
          round: true,
          color: "#2196F3"
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/apple/sub-work/booking/booking/pages/register/index.vue"]]);
wx.createPage(MiniProgramPage);
