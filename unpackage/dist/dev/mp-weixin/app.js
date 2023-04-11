"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
if (!Math) {
  "./pages/login/index.js";
  "./pages/register/index.js";
  "./pages/index/index.js";
  "./pages/setting/index.js";
  "./pages/phonebook/index.js";
  "./pages/meeting/index.js";
  "./pages/notice/index.js";
  "./pages/notice/detail.js";
  "./pages/meeting-record/index.js";
  "./pages/meeting-record/detail.js";
  "./pages/admin/branch/index.js";
  "./pages/admin/branch/edit.js";
  "./pages/admin/meeting/approve.js";
  "./pages/admin/meeting/list.js";
  "./pages/admin/meeting/edit.js";
  "./pages/admin/staff/list.js";
  "./pages/admin/staff/edit.js";
}
const _sfc_main = {
  onLaunch: function() {
    console.log("App Launch");
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
