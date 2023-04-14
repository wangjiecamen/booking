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
  __name: "list",
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
      const data = await common_vendor.Ls.importObject("staff").getList({
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
      await common_vendor.Ls.importObject("staff").deleteItem({
        _id: id
      });
      getList(true);
    };
    const goToAdd = () => {
      common_vendor.index.navigateTo({
        url: `/pages/admin/staff/edit`
      });
    };
    const goToDetail = (id) => {
      common_vendor.index.navigateTo({
        url: `/pages/admin/staff/edit?id=${id}`
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
          return common_vendor.e({
            a: common_vendor.t(item.username),
            b: item.status === 0
          }, item.status === 0 ? {} : {}, {
            c: common_vendor.o(($event) => goToDetail(item._id), item._id),
            d: common_vendor.o(($event) => onDelete(item._id), item._id),
            e: "a19e3bd9-1-" + i0 + "," + ("a19e3bd9-0-" + i0),
            f: item._id,
            g: "a19e3bd9-0-" + i0
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
          description: "暂无员工记录"
        })
      } : {}, {
        g: common_vendor.o(goToAdd)
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-a19e3bd9"], ["__file", "/Users/apple/sub-work/booking/booking/pages/admin/staff/list.vue"]]);
wx.createPage(MiniProgramPage);
