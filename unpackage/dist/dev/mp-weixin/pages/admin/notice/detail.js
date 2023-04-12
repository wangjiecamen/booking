"use strict";
const common_vendor = require("../../../common/vendor.js");
if (!Array) {
  const _component_van_field = common_vendor.resolveComponent("van-field");
  const _component_van_cell_group = common_vendor.resolveComponent("van-cell-group");
  const _component_van_button = common_vendor.resolveComponent("van-button");
  (_component_van_field + _component_van_cell_group + _component_van_button)();
}
const _sfc_main = {
  __name: "detail",
  setup(__props) {
    const formData = common_vendor.ref({
      title: "12",
      content: "fddefe"
    });
    common_vendor.onLoad((options) => {
      common_vendor.index.setNavigationBarTitle({
        title: options.id ? "公告详情" : "新增公告"
      });
      if (options.id) {
        getDetail();
      }
    });
    const setFormData = (field, value) => {
      formData.value[field] = value;
    };
    const getDetail = () => {
    };
    const submit = () => {
      common_vendor.index.navigateBack();
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o((e) => setFormData("title", e.detail)),
        b: common_vendor.p({
          label: "标题",
          value: formData.value.title,
          placeholder: "请输入"
        }),
        c: common_vendor.o((e) => setFormData("title", e.detail)),
        d: common_vendor.p({
          maxlength: 500,
          type: "textarea",
          label: "内容",
          value: formData.value.title,
          placeholder: "请输入"
        }),
        e: common_vendor.o(submit),
        f: common_vendor.p({
          block: true,
          round: true,
          color: "#2196f3"
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-9d247785"], ["__file", "/Users/apple/sub-work/booking/booking/pages/admin/notice/detail.vue"]]);
wx.createPage(MiniProgramPage);
