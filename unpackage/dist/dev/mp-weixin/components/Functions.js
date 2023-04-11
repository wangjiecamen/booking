"use strict";
const common_vendor = require("../common/vendor.js");
const contants = require("../contants.js");
const _sfc_main = {
  __name: "Functions",
  setup(__props) {
    const userType = common_vendor.index.getStorageSync("USER_TYPE") || 1;
    const functions = common_vendor.ref([]);
    common_vendor.onBeforeMount(() => {
      console.log(userType);
      if (userType === 0)
        functions.value = contants.adminFunctions;
      if (userType === 1)
        functions.value = contants.userFunctions;
    });
    const goTo = (b) => {
      common_vendor.index.navigateTo({
        url: b.url,
        fail: () => {
          common_vendor.index.switchTab({
            url: b.url
          });
        }
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(functions.value, (b, k0, i0) => {
          return {
            a: common_vendor.t(b.title),
            b: common_vendor.o(($event) => goTo(b), b.title),
            c: b.title,
            d: b.bg
          };
        })
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-73a8d901"], ["__file", "/Users/apple/sub-work/booking/booking/components/Functions.vue"]]);
wx.createComponent(Component);
