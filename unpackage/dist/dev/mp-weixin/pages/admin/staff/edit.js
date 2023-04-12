"use strict";
const common_vendor = require("../../../common/vendor.js");
if (!Array) {
  const _component_van_field = common_vendor.resolveComponent("van-field");
  const _component_van_picker = common_vendor.resolveComponent("van-picker");
  const _component_van_popup = common_vendor.resolveComponent("van-popup");
  const _component_van_switch = common_vendor.resolveComponent("van-switch");
  const _component_van_cell = common_vendor.resolveComponent("van-cell");
  const _component_van_cell_group = common_vendor.resolveComponent("van-cell-group");
  const _component_van_button = common_vendor.resolveComponent("van-button");
  (_component_van_field + _component_van_picker + _component_van_popup + _component_van_switch + _component_van_cell + _component_van_cell_group + _component_van_button)();
}
const _sfc_main = {
  __name: "edit",
  setup(__props) {
    const formData = common_vendor.ref({
      userName: "",
      status: 1,
      password: "",
      branchName: ""
    });
    const showPicker = common_vendor.ref(false);
    const branchList = common_vendor.ref([
      {
        text: "杭州",
        value: "Hangzhou"
      },
      {
        text: "宁波",
        value: "Ningbo"
      },
      {
        text: "温州",
        value: "Wenzhou"
      },
      {
        text: "绍兴",
        value: "Shaoxing"
      },
      {
        text: "湖州",
        value: "Huzhou"
      }
    ]);
    common_vendor.onLoad((options) => {
      common_vendor.index.setNavigationBarTitle({
        title: options.id ? "部门详情" : "新增部门"
      });
      if (options.id) {
        getDetail();
      }
    });
    const setFormData = (field, value) => {
      formData.value[field] = value;
    };
    const onConfirm = (e) => {
      showPicker.value = false;
      console.log(e);
    };
    const getDetail = () => {
    };
    const submit = () => {
      console.log(formData.value);
      common_vendor.index.navigateBack();
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o((e) => setFormData("userName", e.detail)),
        b: common_vendor.p({
          label: "账号",
          value: formData.value.userName,
          placeholder: "请输入"
        }),
        c: common_vendor.o((e) => setFormData("password", e.detail)),
        d: common_vendor.p({
          label: "密码",
          value: formData.value.password,
          placeholder: "请输入"
        }),
        e: common_vendor.p({
          value: formData.value.branchName,
          isLink: true,
          readonly: true,
          label: "所属部门",
          placeholder: "选择部门"
        }),
        f: common_vendor.o(($event) => showPicker.value = true),
        g: common_vendor.o(($event) => showPicker.value = false),
        h: common_vendor.o(onConfirm),
        i: common_vendor.p({
          showToolbar: true,
          columns: branchList.value
        }),
        j: common_vendor.p({
          show: showPicker.value,
          round: true,
          position: "bottom"
        }),
        k: common_vendor.o((e) => setFormData("status", e.detail)),
        l: common_vendor.p({
          size: "20",
          checked: formData.value.status,
          activeValue: 1,
          inactiveValue: 0
        }),
        m: common_vendor.p({
          title: "账号状态"
        }),
        n: common_vendor.o(submit),
        o: common_vendor.p({
          block: true,
          round: true,
          color: "#2196f3"
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-a8dc17fe"], ["__file", "/Users/apple/sub-work/booking/booking/pages/admin/staff/edit.vue"]]);
wx.createPage(MiniProgramPage);
