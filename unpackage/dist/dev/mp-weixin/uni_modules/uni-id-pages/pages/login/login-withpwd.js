"use strict";
const common_vendor = require("../../../../common/vendor.js");
const uni_modules_uniIdPages_common_loginPage_mixin = require("../../common/login-page.mixin.js");
require("../../common/store.js");
require("../../config.js");
const uniIdCo = common_vendor.Ls.importObject("uni-id-co", {
  errorOptions: {
    type: "toast"
  }
});
const _sfc_main = {
  mixins: [uni_modules_uniIdPages_common_loginPage_mixin.mixin],
  data() {
    return {
      "password": "",
      "username": "",
      "captcha": "",
      "needCaptcha": false,
      "focusUsername": false,
      "focusPassword": false,
      uniIdRedirectUrl: "/pages/index/index"
    };
  },
  onShow() {
  },
  methods: {
    // 页面跳转，找回密码
    toRetrievePwd() {
      let url = "/uni_modules/uni-id-pages/pages/retrieve/retrieve";
      if (/^1\d{10}$/.test(this.username)) {
        url += `?phoneNumber=${this.username}`;
      }
      common_vendor.index.navigateTo({
        url
      });
    },
    /**
     * 密码登录
     */
    pwdLogin() {
      if (!this.password.length) {
        this.focusPassword = true;
        return common_vendor.index.showToast({
          title: "请输入密码",
          icon: "none",
          duration: 3e3
        });
      }
      if (!this.username.length) {
        this.focusUsername = true;
        return common_vendor.index.showToast({
          title: "请输入手机号/用户名/邮箱",
          icon: "none",
          duration: 3e3
        });
      }
      if (this.needCaptcha && this.captcha.length != 4) {
        this.$refs.captcha.getImageCaptcha();
        return common_vendor.index.showToast({
          title: "请输入验证码",
          icon: "none",
          duration: 3e3
        });
      }
      if (this.needAgreements && !this.agree) {
        return this.$refs.agreements.popup(this.pwdLogin);
      }
      let data = {
        "password": this.password,
        "captcha": this.captcha
      };
      if (/^1\d{10}$/.test(this.username)) {
        data.mobile = this.username;
      } else if (/@/.test(this.username)) {
        data.email = this.username;
      } else {
        data.username = this.username;
      }
      uniIdCo.login(data).then(async (e) => {
        this.loginSuccess(e);
        const user = common_vendor.Ls.getCurrentUserInfo();
        const {
          data: data2
        } = await common_vendor.Ls.importObject("user").getUserInfo(user.uid);
        console.log(data2, "999999");
        common_vendor.index.setStorageSync("userinfo", data2);
      }).catch((e) => {
        if (e.errCode == "uni-id-captcha-required") {
          this.needCaptcha = true;
        } else if (this.needCaptcha) {
          this.$refs.captcha.getImageCaptcha();
        }
      });
    },
    /* 前往注册 */
    toRegister() {
      common_vendor.index.navigateTo({
        url: this.config.isAdmin ? "/uni_modules/uni-id-pages/pages/register/register-admin" : "/uni_modules/uni-id-pages/pages/register/register",
        fail(e) {
          console.error(e);
        }
      });
    }
  }
};
if (!Array) {
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uni_forms_item2 = common_vendor.resolveComponent("uni-forms-item");
  const _easycom_uni_forms2 = common_vendor.resolveComponent("uni-forms");
  const _easycom_uni_captcha2 = common_vendor.resolveComponent("uni-captcha");
  const _easycom_uni_id_pages_agreements2 = common_vendor.resolveComponent("uni-id-pages-agreements");
  (_easycom_uni_easyinput2 + _easycom_uni_forms_item2 + _easycom_uni_forms2 + _easycom_uni_captcha2 + _easycom_uni_id_pages_agreements2)();
}
const _easycom_uni_easyinput = () => "../../../uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_uni_forms_item = () => "../../../uni-forms/components/uni-forms-item/uni-forms-item.js";
const _easycom_uni_forms = () => "../../../uni-forms/components/uni-forms/uni-forms.js";
const _easycom_uni_captcha = () => "../../../uni-captcha/components/uni-captcha/uni-captcha.js";
const _easycom_uni_id_pages_agreements = () => "../../components/uni-id-pages-agreements/uni-id-pages-agreements.js";
if (!Math) {
  (_easycom_uni_easyinput + _easycom_uni_forms_item + _easycom_uni_forms + _easycom_uni_captcha + _easycom_uni_id_pages_agreements)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.o(($event) => $data.focusUsername = false),
    b: common_vendor.o(($event) => $data.username = $event),
    c: common_vendor.p({
      focus: $data.focusUsername,
      inputBorder: false,
      placeholder: "请输入手机号/用户名/邮箱",
      modelValue: $data.username
    }),
    d: common_vendor.p({
      name: "username"
    }),
    e: common_vendor.o(($event) => $data.focusPassword = false),
    f: common_vendor.o(($event) => $data.password = $event),
    g: common_vendor.p({
      focus: $data.focusPassword,
      clearable: true,
      type: "password",
      inputBorder: false,
      placeholder: "请输入密码",
      modelValue: $data.password
    }),
    h: common_vendor.p({
      name: "password"
    }),
    i: $data.needCaptcha
  }, $data.needCaptcha ? {
    j: common_vendor.sr("captcha", "58ed63b0-5"),
    k: common_vendor.o(($event) => $data.captcha = $event),
    l: common_vendor.p({
      focus: true,
      scene: "login-by-pwd",
      modelValue: $data.captcha
    })
  } : {}, {
    m: common_vendor.sr("agreements", "58ed63b0-6"),
    n: common_vendor.p({
      scope: "login"
    }),
    o: common_vendor.o((...args) => $options.pwdLogin && $options.pwdLogin(...args)),
    p: common_vendor.t(_ctx.config.isAdmin ? "注册管理员账号" : "注册账号"),
    q: common_vendor.o((...args) => $options.toRegister && $options.toRegister(...args))
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-58ed63b0"], ["__file", "/Users/apple/sub-work/booking/booking/uni_modules/uni-id-pages/pages/login/login-withpwd.vue"]]);
wx.createPage(MiniProgramPage);
