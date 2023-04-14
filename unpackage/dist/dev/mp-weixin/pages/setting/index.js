"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_user = require("../../utils/user.js");
if (!Array) {
  const _component_van_cell = common_vendor.resolveComponent("van-cell");
  const _component_van_cell_group = common_vendor.resolveComponent("van-cell-group");
  const _component_van_button = common_vendor.resolveComponent("van-button");
  (_component_van_cell + _component_van_cell_group + _component_van_button)();
}
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const info = common_vendor.ref({
      branchName: "",
      username: "",
      nickname: "",
      role: []
    });
    common_vendor.onMounted(async () => {
      info.value = utils_user.getUserInfo();
    });
    const logout = async () => {
      if (common_vendor.Ls.getCurrentUserInfo().tokenExpired > Date.now()) {
        try {
          await common_vendor.Ls.importObject("uni-id-co").logout();
        } catch (e) {
          console.error(e);
        }
      }
      common_vendor.index.removeStorageSync("uni_id_token");
      common_vendor.index.setStorageSync("uni_id_token_expired", 0);
      common_vendor.index.reLaunch({
        url: "/uni_modules/uni-id-pages/pages/login/login-withpwd"
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.p({
          title: "账号名称",
          value: info.value.username
        }),
        b: common_vendor.p({
          title: "昵称名称",
          value: info.value.nickname
        }),
        c: common_vendor.p({
          title: "角色",
          value: info.value.role.join(",")
        }),
        d: info.value.branchName
      }, info.value.branchName ? {
        e: common_vendor.p({
          title: "所属部门",
          value: info.value.branchName
        })
      } : {}, {
        f: common_vendor.o(logout),
        g: common_vendor.p({
          block: true,
          round: true
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-861f37f2"], ["__file", "/Users/apple/sub-work/booking/booking/pages/setting/index.vue"]]);
wx.createPage(MiniProgramPage);
