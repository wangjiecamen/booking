"use strict";
const common_vendor = require("../common/vendor.js");
const _sfc_main = {
  __name: "PreviewImage",
  props: {
    url: {
      type: String,
      default: ""
    }
  },
  setup(__props) {
    const props = __props;
    const preview = () => {
      common_vendor.index.previewImage({
        current: props.url,
        urls: [props.url]
      });
    };
    return (_ctx, _cache) => {
      return {
        a: __props.url,
        b: common_vendor.o(preview)
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-6208be70"], ["__file", "/Users/apple/sub-work/booking/booking/components/PreviewImage.vue"]]);
wx.createComponent(Component);
