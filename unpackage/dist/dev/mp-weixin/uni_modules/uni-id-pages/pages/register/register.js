"use strict";
const common_vendor = require("../../../../common/vendor.js");
const uni_modules_uniIdPages_pages_register_validator = require("./validator.js");
const uni_modules_uniIdPages_common_loginPage_mixin = require("../../common/login-page.mixin.js");
require("../../common/store.js");
require("../../common/password.js");
require("../../config.js");
const uniIdCo = common_vendor.Ls.importObject("uni-id-co");
const branchCo = common_vendor.Ls.importObject("branch");
const _sfc_main = {
  mixins: [uni_modules_uniIdPages_common_loginPage_mixin.mixin],
  data() {
    return {
      formData: {
        username: "",
        nickname: "",
        password: "",
        password2: "",
        captcha: "",
        department_id: ""
      },
      rules: uni_modules_uniIdPages_pages_register_validator.rules,
      focusUsername: false,
      focusNickname: false,
      focusPassword: false,
      focusPassword2: false,
      branchList: [],
      branchName: "",
      showPicker: false
    };
  },
  onReady() {
    this.$refs.form.setRules(this.rules);
  },
  onShow() {
  },
  mounted() {
    this.getBranchList();
  },
  methods: {
    async getBranchList() {
      const {
        data
      } = await branchCo.getBranchList();
      this.branchList = data.map((i) => {
        return {
          text: i.name,
          value: i._id
        };
      });
    },
    onConfirm(e) {
      this.branchName = this.branchList[e.detail.index].text;
      console.log(this.branchName);
      this.formData.department_id = this.branchList[e.detail.index].value;
      this.showPicker = false;
    },
    /**
     * 触发表单提交
     */
    submit() {
      if (this.formData.department_id === "") {
        return common_vendor.index.showToast({
          title: "请选择所属部门",
          icon: "none",
          duration: 3e3
        });
      }
      this.$refs.form.validate().then((res) => {
        if (this.formData.captcha.length != 4) {
          this.$refs.captcha.focusCaptchaInput = true;
          return common_vendor.index.showToast({
            title: "请输入验证码",
            icon: "none",
            duration: 3e3
          });
        }
        if (this.needAgreements && !this.agree) {
          return this.$refs.agreements.popup(() => {
            this.submitForm(res);
          });
        }
        this.submitForm(res);
      }).catch((errors) => {
        let key = errors[0].key;
        key = key.replace(key[0], key[0].toUpperCase());
        this["focus" + key] = true;
      });
    },
    submitForm(params) {
      uniIdCo.registerUser(this.formData).then((e) => {
        this.loginSuccess(e);
      }).catch((e) => {
        console.log(e.message);
        this.$refs.captcha.getImageCaptcha();
      });
    },
    navigateBack() {
      common_vendor.index.navigateBack();
    }
  }
};
if (!Array) {
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uni_forms_item2 = common_vendor.resolveComponent("uni-forms-item");
  const _component_van_icon = common_vendor.resolveComponent("van-icon");
  const _component_van_picker = common_vendor.resolveComponent("van-picker");
  const _component_van_popup = common_vendor.resolveComponent("van-popup");
  const _easycom_uni_captcha2 = common_vendor.resolveComponent("uni-captcha");
  const _easycom_uni_id_pages_agreements2 = common_vendor.resolveComponent("uni-id-pages-agreements");
  const _easycom_uni_forms2 = common_vendor.resolveComponent("uni-forms");
  (_easycom_uni_easyinput2 + _easycom_uni_forms_item2 + _component_van_icon + _component_van_picker + _component_van_popup + _easycom_uni_captcha2 + _easycom_uni_id_pages_agreements2 + _easycom_uni_forms2)();
}
const _easycom_uni_easyinput = () => "../../../uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_uni_forms_item = () => "../../../uni-forms/components/uni-forms-item/uni-forms-item.js";
const _easycom_uni_captcha = () => "../../../uni-captcha/components/uni-captcha/uni-captcha.js";
const _easycom_uni_id_pages_agreements = () => "../../components/uni-id-pages-agreements/uni-id-pages-agreements.js";
const _easycom_uni_forms = () => "../../../uni-forms/components/uni-forms/uni-forms.js";
if (!Math) {
  (_easycom_uni_easyinput + _easycom_uni_forms_item + _easycom_uni_captcha + _easycom_uni_id_pages_agreements + _easycom_uni_forms)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o(($event) => $data.focusUsername = false),
    b: common_vendor.o(($event) => $data.formData.username = $event),
    c: common_vendor.p({
      inputBorder: false,
      focus: $data.focusUsername,
      placeholder: "请输入用户名",
      trim: "both",
      modelValue: $data.formData.username
    }),
    d: common_vendor.p({
      name: "username",
      required: true
    }),
    e: common_vendor.o(($event) => $data.focusNickname = false),
    f: common_vendor.o(($event) => $data.formData.nickname = $event),
    g: common_vendor.p({
      inputBorder: false,
      focus: $data.focusNickname,
      placeholder: "请输入用户昵称",
      trim: "both",
      modelValue: $data.formData.nickname
    }),
    h: common_vendor.p({
      name: "nickname"
    }),
    i: common_vendor.o(($event) => $data.focusPassword = false),
    j: common_vendor.o(($event) => $data.formData.password = $event),
    k: common_vendor.p({
      inputBorder: false,
      focus: $data.focusPassword,
      maxlength: "20",
      placeholder: "请输入" + (_ctx.config.passwordStrength == "weak" ? "6" : "8") + "-16位密码",
      type: "password",
      trim: "both",
      modelValue: $data.formData.password
    }),
    l: common_vendor.o(($event) => $data.formData.password = $event),
    m: common_vendor.p({
      name: "password",
      required: true,
      modelValue: $data.formData.password
    }),
    n: common_vendor.o(($event) => $data.focusPassword2 = false),
    o: common_vendor.o(($event) => $data.formData.password2 = $event),
    p: common_vendor.p({
      inputBorder: false,
      focus: $data.focusPassword2,
      placeholder: "再次输入密码",
      maxlength: "20",
      type: "password",
      trim: "both",
      modelValue: $data.formData.password2
    }),
    q: common_vendor.o(($event) => $data.formData.password2 = $event),
    r: common_vendor.p({
      name: "password2",
      required: true,
      modelValue: $data.formData.password2
    }),
    s: common_vendor.t($data.branchName),
    t: common_vendor.p({
      name: "arrow",
      color: "#ccc"
    }),
    v: common_vendor.o(($event) => $data.showPicker = true),
    w: common_vendor.o(($event) => $data.showPicker = false),
    x: common_vendor.o($options.onConfirm),
    y: common_vendor.p({
      showToolbar: true,
      columns: $data.branchList
    }),
    z: common_vendor.p({
      show: $data.showPicker,
      round: true,
      position: "bottom"
    }),
    A: common_vendor.sr("captcha", "4ea04cbb-14,4ea04cbb-13"),
    B: common_vendor.o(($event) => $data.formData.captcha = $event),
    C: common_vendor.p({
      scene: "register",
      modelValue: $data.formData.captcha
    }),
    D: common_vendor.sr("agreements", "4ea04cbb-15,4ea04cbb-0"),
    E: common_vendor.p({
      scope: "register"
    }),
    F: common_vendor.o((...args) => $options.submit && $options.submit(...args)),
    G: common_vendor.o((...args) => $options.navigateBack && $options.navigateBack(...args)),
    H: common_vendor.sr("form", "4ea04cbb-0"),
    I: common_vendor.p({
      value: $data.formData,
      rules: $data.rules,
      ["validate-trigger"]: "submit",
      ["err-show-type"]: "toast"
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/apple/sub-work/booking/booking/uni_modules/uni-id-pages/pages/register/register.vue"]]);
wx.createPage(MiniProgramPage);
