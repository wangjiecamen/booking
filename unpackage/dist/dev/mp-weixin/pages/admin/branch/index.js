"use strict";
const common_vendor = require("../../../common/vendor.js");
if (!Array) {
  const _component_van_button = common_vendor.resolveComponent("van-button");
  const _component_van_swipe_cell = common_vendor.resolveComponent("van-swipe-cell");
  const _component_van_empty = common_vendor.resolveComponent("van-empty");
  (_component_van_button + _component_van_swipe_cell + _component_van_empty)();
}
if (!Math) {
  AddBtn();
}
const AddBtn = () => "../../../components/AddBtn.js";
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const fetched = common_vendor.ref(true);
    const pageNo = common_vendor.ref(1);
    const list = common_vendor.ref([{
      branchName: "亚马逊",
      status: 0
    }, {
      branchName: "亚马22逊",
      status: 1
    }]);
    const goToAdd = () => {
      common_vendor.index.navigateTo({
        url: `/pages/admin/branch/edit`
      });
    };
    const onDelete = (id) => {
    };
    const goToDetail = (id) => {
      common_vendor.index.navigateTo({
        url: `/pages/admin/branch/edit?id=${id}`
      });
    };
    common_vendor.onReachBottom(() => {
    });
    common_vendor.onPullDownRefresh(() => {
      list.value = [];
      pageNo.value = 1;
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: list.value.length
      }, list.value.length ? {
        b: common_vendor.f(list.value, (item, k0, i0) => {
          return common_vendor.e({
            a: common_vendor.t(item.branchName),
            b: item.status === 1
          }, item.status === 1 ? {} : {}, {
            c: common_vendor.o(($event) => goToDetail(_ctx.id), item.id),
            d: common_vendor.o(($event) => onDelete(_ctx.id), item.id),
            e: "d67da128-1-" + i0 + "," + ("d67da128-0-" + i0),
            f: item.id,
            g: "d67da128-0-" + i0
          });
        }),
        c: common_vendor.p({
          square: true,
          type: "danger"
        }),
        d: common_vendor.p({
          rightWidth: 65
        })
      } : {}, {
        e: fetched.value && !list.value.length
      }, fetched.value && !list.value.length ? {
        f: common_vendor.p({
          description: "暂无部门记录"
        })
      } : {}, {
        g: common_vendor.o(goToAdd)
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-d67da128"], ["__file", "/Users/apple/sub-work/booking/booking/pages/admin/branch/index.vue"]]);
wx.createPage(MiniProgramPage);
