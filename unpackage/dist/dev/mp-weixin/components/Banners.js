"use strict";
const common_vendor = require("../common/vendor.js");
const _sfc_main = {
  __name: "Banners",
  setup(__props) {
    const banners = common_vendor.ref([
      "https://i0.hdslb.com/bfs/sycp/creative_img/202303/f2cd53517d531e8253a57220044057a5.jpg@976w_550h_1c_!web-home-carousel-cover",
      "https://i0.hdslb.com/bfs/archive/56806e57d97b19e4caf07702390785497b1c7afa.jpg@976w_550h_1c_!web-home-carousel-cover"
    ]);
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(banners.value, (b, k0, i0) => {
          return {
            a: b,
            b
          };
        })
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-97bc2207"], ["__file", "/Users/apple/sub-work/booking/booking/components/Banners.vue"]]);
wx.createComponent(Component);
