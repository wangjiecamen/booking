"use strict";
const common_vendor = require("../common/vendor.js");
if (!Array) {
  const _component_van_icon = common_vendor.resolveComponent("van-icon");
  _component_van_icon();
}
const _sfc_main = {
  __name: "uploader",
  props: {
    max: {
      type: Number,
      default: 5
    },
    fileList: {
      type: Array,
      default: () => []
    }
  },
  setup(__props) {
    const props = __props;
    const fileListRef = common_vendor.ref(props.fileList);
    const preview = (index) => {
      common_vendor.index.previewImage({
        current: fileListRef.value[index],
        urls: fileListRef.value
      });
    };
    const deleteFile = (index) => {
      fileListRef.value.splice(index, 1);
    };
    const upload = () => {
      common_vendor.index.chooseImage({
        count: 1,
        success: (chooseImageRes) => {
          chooseImageRes.tempFilePaths;
        }
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.f(__props.fileList, (file, index, i0) => {
          return {
            a: common_vendor.o(($event) => preview(index), file),
            b: file,
            c: "cb0d792e-0-" + i0,
            d: common_vendor.o(($event) => deleteFile(index), file),
            e: file
          };
        }),
        b: common_vendor.p({
          name: "cross"
        }),
        c: __props.fileList.length < 5
      }, __props.fileList.length < 5 ? {
        d: common_vendor.p({
          name: "plus",
          size: "30"
        }),
        e: common_vendor.o(upload)
      } : {});
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-cb0d792e"], ["__file", "/Users/apple/sub-work/booking/booking/components/uploader.vue"]]);
wx.createComponent(Component);
