"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _component_van_button = common_vendor.resolveComponent("van-button");
  _component_van_button();
}
if (!Math) {
  (uniEasyinput + uniFormsItem + uniForms)();
}
const uniEasyinput = () => "../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const uniForms = () => "../../uni_modules/uni-forms/components/uni-forms/uni-forms.js";
const uniFormsItem = () => "../../uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.js";
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
        a: common_vendor.o(($event) => formData.value.username = $event),
        b: common_vendor.p({
          type: "text",
          placeholder: "请输入账号",
          modelValue: formData.value.username
        }),
        c: common_vendor.p({
          label: "账号",
          name: "username"
        }),
        d: common_vendor.o(($event) => formData.value.password = $event),
        e: common_vendor.p({
          type: "password",
          placeholder: "请输入密码",
          modelValue: formData.value.password
        }),
        f: common_vendor.p({
          label: "密码",
          name: "password"
        }),
        g: common_vendor.o(submit),
        h: common_vendor.p({
          block: true,
          round: true,
          color: "#2196F3"
        }),
        i: common_vendor.o(goToRegister),
        j: common_vendor.p({
          block: true,
          round: true
        }),
        k: common_vendor.p({
          modelValue: formData.value,
          ["label-width"]: "45"
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/apple/sub-work/booking/booking/pages/login/index.vue"]]);
wx.createPage(MiniProgramPage);
