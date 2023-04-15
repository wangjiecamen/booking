"use strict";
const common_vendor = require("../common/vendor.js");
if (!Array) {
  const _component_van_icon = common_vendor.resolveComponent("van-icon");
  _component_van_icon();
}
const _sfc_main = {
  __name: "uploader",
  props: {
    readonly: {
      type: Boolean,
      default: false
    },
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
    common_vendor.watch(() => props.fileList, (v) => {
      fileListRef.value = v;
    });
    const preview = (index) => {
      console.log(fileListRef.value);
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
        success: async (chooseImageRes) => {
          let filePath = chooseImageRes.tempFilePaths[0];
          console.log(filePath);
          const fileExtension = filePath.split(".").pop();
          const result = await common_vendor.Ls.uploadFile({
            filePath,
            cloudPath: `meeting_doc_${new Date().getTime()}.${fileExtension}`
          });
          console.log(result);
          fileListRef.value.push(result.fileID);
        }
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.f(__props.fileList, (file, index, i0) => {
          return common_vendor.e({
            a: common_vendor.o(($event) => preview(index), file),
            b: file
          }, !__props.readonly ? {
            c: "cb0d792e-0-" + i0,
            d: common_vendor.p({
              name: "cross"
            }),
            e: common_vendor.o(($event) => deleteFile(index), file)
          } : {}, {
            f: file
          });
        }),
        b: !__props.readonly,
        c: __props.fileList.length < __props.max && !__props.readonly
      }, __props.fileList.length < __props.max && !__props.readonly ? {
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
