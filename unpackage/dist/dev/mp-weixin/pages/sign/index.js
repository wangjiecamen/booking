"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const success = common_vendor.ref(false);
    common_vendor.onLoad(async (options) => {
      console.log(options);
      if (options.scene)
        await common_vendor.Ls.callFunction({
          name: "sign",
          data: {
            id: options.scene
          }
        });
      success.value = true;
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: success.value
      }, success.value ? {} : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-8b70e6ba"], ["__file", "/Users/apple/sub-work/booking/booking/pages/sign/index.vue"]]);
wx.createPage(MiniProgramPage);
