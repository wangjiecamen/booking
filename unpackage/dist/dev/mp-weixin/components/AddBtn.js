"use strict";
const common_vendor = require("../common/vendor.js");
const _sfc_main = {
  __name: "AddBtn",
  emits: ["onClick"],
  setup(__props, { emit: emits }) {
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(($event) => emits("onClick"))
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-b18b5a7f"], ["__file", "/Users/apple/sub-work/booking/booking/components/AddBtn.vue"]]);
wx.createComponent(Component);
