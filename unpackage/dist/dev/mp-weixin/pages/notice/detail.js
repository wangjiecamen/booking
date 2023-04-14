"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_time = require("../../utils/time.js");
const _sfc_main = {
  __name: "detail",
  setup(__props) {
    const detail = common_vendor.ref({
      title: "",
      content: "",
      update_time: ""
    });
    common_vendor.onLoad(async (options) => {
      const {
        data
      } = await common_vendor.Ls.importObject("notice").getItem({
        _id: options.id
      });
      detail.value.title = data.title;
      detail.value.content = data.content;
      detail.value.update_time = utils_time.formatTimestamp(data.update_time);
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(detail.value.title),
        b: common_vendor.t(detail.value.update_time),
        c: common_vendor.t(detail.value.content)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-0f737f11"], ["__file", "/Users/apple/sub-work/booking/booking/pages/notice/detail.vue"]]);
wx.createPage(MiniProgramPage);
