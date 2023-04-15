"use strict";
const common_vendor = require("../../../common/vendor.js");
if (!Array) {
  const _component_van_field = common_vendor.resolveComponent("van-field");
  const _component_van_cell = common_vendor.resolveComponent("van-cell");
  const _component_van_cell_group = common_vendor.resolveComponent("van-cell-group");
  const _component_van_button = common_vendor.resolveComponent("van-button");
  (_component_van_field + _component_van_cell + _component_van_cell_group + _component_van_button)();
}
if (!Math) {
  PreviewImage();
}
const PreviewImage = () => "../../../components/PreviewImage.js";
const _sfc_main = {
  __name: "approveDetail",
  setup(__props) {
    const detail = common_vendor.ref({});
    const id = common_vendor.ref("");
    common_vendor.onLoad(async (options) => {
      id.value = options.id;
      getDetail();
    });
    const getDetail = async () => {
      const {
        data
      } = await common_vendor.Ls.importObject("booking").getItem({
        id: id.value
      });
      detail.value = data;
    };
    const pass = async () => {
      await common_vendor.Ls.importObject("booking").auditItem({
        id: id.value,
        status: 1
      });
      common_vendor.index.navigateBack();
    };
    const refuse = async () => {
      await common_vendor.Ls.importObject("booking").auditItem({
        id: id.value,
        status: 2
      });
      common_vendor.index.navigateBack();
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.p({
          label: "会议室名称",
          readonly: true,
          value: detail.value.room_name
        }),
        b: common_vendor.p({
          label: "预订部门",
          readonly: true,
          value: detail.value.branch_name
        }),
        c: common_vendor.p({
          label: "预订人",
          readonly: true,
          value: detail.value.user_name
        }),
        d: common_vendor.p({
          label: "预订日期",
          readonly: true,
          value: detail.value.date
        }),
        e: common_vendor.p({
          label: "预订时间",
          readonly: true,
          value: detail.value.start_time + "-" + detail.value.end_time
        }),
        f: common_vendor.p({
          label: "备注",
          readonly: true,
          value: detail.value.remark || "无"
        }),
        g: detail.value.doc_url
      }, detail.value.doc_url ? {
        h: common_vendor.p({
          url: detail.value.doc_url
        })
      } : {}, {
        i: common_vendor.p({
          title: "会议纪要"
        }),
        j: detail.value.status === 0
      }, detail.value.status === 0 ? {
        k: common_vendor.o(pass),
        l: common_vendor.p({
          block: true,
          round: true,
          color: "#2196f3"
        }),
        m: common_vendor.o(refuse),
        n: common_vendor.p({
          block: true,
          round: true,
          type: "danger"
        })
      } : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-0f7b1e01"], ["__file", "/Users/apple/sub-work/booking/booking/pages/admin/meeting/approveDetail.vue"]]);
wx.createPage(MiniProgramPage);
