"use strict";
const common_vendor = require("../../common/vendor.js");
const contants = require("../../contants.js");
const utils_user = require("../../utils/user.js");
if (!Array) {
  const _component_van_empty = common_vendor.resolveComponent("van-empty");
  _component_van_empty();
}
const _sfc_main = {
  __name: "index",
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
      const data = await common_vendor.Ls.importObject("booking").getListByUser({
        pageNo: pageNo.value,
        pageSize: 10,
        user_id: utils_user.getUserInfo()._id
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
    const goToDetail = (id) => {
      common_vendor.index.navigateTo({
        url: `/pages/meeting-record/detail?id=${id}&type=edit`
      });
    };
    common_vendor.onReachBottom(() => {
      getList();
    });
    common_vendor.onPullDownRefresh(() => {
      getList(true);
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
            g: common_vendor.o(($event) => goToDetail(item._id), item._id),
            h: item._id
          };
        })
      } : {}, {
        c: fetched.value && !list.value.length
      }, fetched.value && !list.value.length ? {
        d: common_vendor.p({
          description: "暂无会议记录"
        })
      } : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-9fc208c6"], ["__file", "/Users/apple/sub-work/booking/booking/pages/meeting-record/index.vue"]]);
wx.createPage(MiniProgramPage);
