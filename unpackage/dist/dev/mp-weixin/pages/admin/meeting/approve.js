"use strict";
const common_vendor = require("../../../common/vendor.js");
const contants = require("../../../contants.js");
if (!Array) {
  const _component_van_button = common_vendor.resolveComponent("van-button");
  const _component_van_swipe_cell = common_vendor.resolveComponent("van-swipe-cell");
  const _component_van_empty = common_vendor.resolveComponent("van-empty");
  (_component_van_button + _component_van_swipe_cell + _component_van_empty)();
}
const _sfc_main = {
  __name: "approve",
  setup(__props) {
    const fetched = common_vendor.ref(true);
    const pageNo = common_vendor.ref(1);
    const list = common_vendor.ref([]);
    common_vendor.onShow(() => {
      getList(true);
    });
    const getList = async (isRefresh = false) => {
      if (isRefresh)
        pageNo.value = 1;
      fetched.value = false;
      const data = await common_vendor.Ls.importObject("booking").getList({
        pageNo: pageNo.value,
        pageSize: 10
      });
      if (isRefresh)
        list.value = [];
      if (list.value.length < data.total) {
        list.value.push(...data.data);
      }
      fetched.value = true;
      common_vendor.index.stopPullDownRefresh();
      console.log(data);
    };
    const onDelete = async (id) => {
      await common_vendor.Ls.importObject("booking").deleteItem({
        _id: id
      });
      getList(true);
    };
    const goToDetail = (id) => {
      common_vendor.index.navigateTo({
        url: `/pages/admin/meeting/approveDetail?id=${id}`
      });
    };
    common_vendor.onReachBottom(() => {
      getList();
    });
    common_vendor.onPullDownRefresh(() => {
      list.value = [];
      pageNo.value = 1;
      getList();
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: list.value.length
      }, list.value.length ? {
        b: common_vendor.f(list.value, (item, k0, i0) => {
          return {
            a: common_vendor.t(item.room_name),
            b: common_vendor.t(item.date),
            c: common_vendor.t(item.start_time),
            d: common_vendor.t(item.end_time),
            e: common_vendor.t(common_vendor.unref(contants.bookingStatus)[item.status].text),
            f: common_vendor.unref(contants.bookingStatus)[item.status].color,
            g: common_vendor.o(($event) => goToDetail(_ctx.id), item._id),
            h: common_vendor.o(($event) => onDelete(item._id), item._id),
            i: "26045047-1-" + i0 + "," + ("26045047-0-" + i0),
            j: item._id,
            k: "26045047-0-" + i0
          };
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
          description: "暂无审批记录"
        })
      } : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-26045047"], ["__file", "/Users/apple/sub-work/booking/booking/pages/admin/meeting/approve.vue"]]);
wx.createPage(MiniProgramPage);
