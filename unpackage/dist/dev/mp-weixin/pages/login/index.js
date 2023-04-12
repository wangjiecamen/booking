"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _component_van_field = common_vendor.resolveComponent("van-field");
  const _component_van_cell_group = common_vendor.resolveComponent("van-cell-group");
  const _component_van_button = common_vendor.resolveComponent("van-button");
  (_component_van_field + _component_van_cell_group + _component_van_button)();
}
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const userModel = common_vendor.Ls.importObject("user");
    const formData = common_vendor.ref({
      username: "",
      password: ""
    });
    const goToRegister = () => {
      common_vendor.index.navigateTo({
        url: "/pages/register/index"
      });
    };
    const onChangeUserName = (e) => {
      formData.value.username = e.detail;
    };
    const onChangePassword = (e) => {
      formData.value.password = e.detail;
    };
    const submit = async () => {
      try {
        console.log(formData.value);
        await userModel.login(formData.value);
        common_vendor.index.redirectTo({
          url: "/pages/index/index"
        });
      } catch (e) {
      }
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
        e: common_vendor.o(submit),
        f: common_vendor.p({
          block: true,
          round: true,
          color: "#2196F3"
        }),
        g: common_vendor.o(goToRegister),
        h: common_vendor.p({
          block: true,
          round: true
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/apple/sub-work/booking/booking/pages/login/index.vue"]]);
wx.createPage(MiniProgramPage);
