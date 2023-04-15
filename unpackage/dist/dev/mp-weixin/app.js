"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
const uni_modules_uniIdPages_init = require("./uni_modules/uni-id-pages/init.js");
require("./uni_modules/uni-id-pages/config.js");
if (!Math) {
  "./pages/index/index.js";
  "./uni_modules/uni-id-pages/pages/login/login-withpwd.js";
  "./pages/sign/index.js";
  "./pages/setting/index.js";
  "./pages/meeting/index.js";
  "./pages/notice/index.js";
  "./pages/notice/detail.js";
  "./pages/meeting-record/index.js";
  "./pages/meeting-record/detail.js";
  "./pages/admin/branch/index.js";
  "./pages/admin/branch/edit.js";
  "./pages/admin/meeting/approve.js";
  "./pages/admin/meeting/approveDetail.js";
  "./pages/admin/meeting/list.js";
  "./pages/admin/meeting/edit.js";
  "./pages/admin/staff/list.js";
  "./pages/admin/staff/edit.js";
  "./pages/admin/notice/detail.js";
  "./pages/admin/notice/index.js";
  "./uni_modules/uni-id-pages/pages/userinfo/userinfo.js";
  "./uni_modules/uni-id-pages/pages/register/register.js";
  "./uni_modules/uni-id-pages/pages/common/webview/webview.js";
  "./uni_modules/uni-id-pages/pages/register/register-admin.js";
}
const _sfc_main = {
  onLaunch: async function() {
    console.log("App Launch");
    await uni_modules_uniIdPages_init.uniIdPageInit();
  },
  onShow: function() {
    console.log("App Show");
  },
  onHide: function() {
    console.log("App Hide");
  }
};
const App = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/apple/sub-work/booking/booking/App.vue"]]);
function createApp() {
  const app = common_vendor.createSSRApp(App);
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
