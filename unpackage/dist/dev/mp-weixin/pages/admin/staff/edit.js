"use strict";
const common_vendor = require("../../../common/vendor.js");
if (!Array) {
  const _component_van_field = common_vendor.resolveComponent("van-field");
  const _component_van_picker = common_vendor.resolveComponent("van-picker");
  const _component_van_popup = common_vendor.resolveComponent("van-popup");
  const _easycom_uni_captcha2 = common_vendor.resolveComponent("uni-captcha");
  const _component_van_cell = common_vendor.resolveComponent("van-cell");
  const _component_van_switch = common_vendor.resolveComponent("van-switch");
  const _component_van_cell_group = common_vendor.resolveComponent("van-cell-group");
  const _component_van_button = common_vendor.resolveComponent("van-button");
  (_component_van_field + _component_van_picker + _component_van_popup + _easycom_uni_captcha2 + _component_van_cell + _component_van_switch + _component_van_cell_group + _component_van_button)();
}
const _easycom_uni_captcha = () => "../../../uni_modules/uni-captcha/components/uni-captcha/uni-captcha.js";
if (!Math) {
  _easycom_uni_captcha();
}
const _sfc_main = {
  __name: "edit",
  setup(__props) {
    const captcha = common_vendor.ref();
    const formData = common_vendor.ref({
      status: 0,
      username: "",
      nickname: "",
      password: "",
      password2: "",
      captcha: "",
      department_id: "",
      role: ["user"]
    });
    const branchName = common_vendor.ref("");
    const showPicker = common_vendor.ref(false);
    const branchList = common_vendor.ref([]);
    common_vendor.onLoad(async (options) => {
      common_vendor.index.setNavigationBarTitle({
        title: options.id ? "员工详情" : "新增员工"
      });
      await getBranchList();
      if (options.id) {
        formData.value.uid = options.id;
        await getDetail();
        getBranchName(formData.value.department_id);
      }
    });
    const getBranchList = async () => {
      const {
        data
      } = await common_vendor.Ls.importObject("branch").getBranchList();
      branchList.value = data.map((i) => {
        return {
          text: i.name,
          value: i._id
        };
      });
    };
    const setFormData = (field, value) => {
      formData.value[field] = value;
    };
    const onConfirm = (e) => {
      branchName.value = branchList.value[e.detail.index].text;
      formData.value.department_id = branchList.value[e.detail.index].value;
      showPicker.value = false;
    };
    const getBranchName = (id) => {
      branchName.value = branchList.value.find((i) => i.value === id).text;
    };
    const getDetail = async () => {
      const {
        data
      } = await common_vendor.Ls.importObject("staff").getItem({
        _id: formData.value.uid
      });
      console.log(data);
      formData.value.username = data.username;
      formData.value.nickname = data.nickname;
      formData.value.status = data.status;
      formData.value.department_id = data.department_id;
    };
    const submit = async () => {
      if (formData.value.department_id === "") {
        return common_vendor.index.showToast({
          title: "请选择所属部门",
          icon: "none",
          duration: 3e3
        });
      }
      if (formData.value.captcha.length != 4) {
        captcha.value.focusCaptchaInput = true;
        return common_vendor.index.showToast({
          title: "请输入验证码",
          icon: "none",
          duration: 3e3
        });
      }
      if (formData.value.uid) {
        await common_vendor.Ls.importObject("uni-id-co").updateUser(formData.value);
      } else {
        await common_vendor.Ls.importObject("uni-id-co").addUser(formData.value);
      }
      common_vendor.index.navigateBack();
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o((e) => setFormData("username", e.detail)),
        b: common_vendor.p({
          label: "账号",
          value: formData.value.username,
          placeholder: "请输入"
        }),
        c: common_vendor.o((e) => setFormData("password", e.detail)),
        d: common_vendor.p({
          type: "password",
          label: "密码",
          value: formData.value.password,
          placeholder: "请输入"
        }),
        e: common_vendor.o((e) => setFormData("password2", e.detail)),
        f: common_vendor.p({
          type: "password",
          label: "密码",
          value: formData.value.password2,
          placeholder: "请再次输入密码"
        }),
        g: common_vendor.o((e) => setFormData("nickname", e.detail)),
        h: common_vendor.p({
          label: "昵称",
          value: formData.value.nickname,
          placeholder: "请输入"
        }),
        i: common_vendor.p({
          value: branchName.value,
          isLink: true,
          readonly: true,
          label: "所属部门",
          placeholder: "选择部门"
        }),
        j: common_vendor.o(($event) => showPicker.value = true),
        k: common_vendor.o(($event) => showPicker.value = false),
        l: common_vendor.o(onConfirm),
        m: common_vendor.p({
          showToolbar: true,
          columns: branchList.value
        }),
        n: common_vendor.p({
          show: showPicker.value,
          round: true,
          position: "bottom"
        }),
        o: common_vendor.sr(captcha, "4fbebcf8-9,4fbebcf8-8", {
          "k": "captcha"
        }),
        p: common_vendor.o(($event) => formData.value.captcha = $event),
        q: common_vendor.p({
          scene: "register",
          modelValue: formData.value.captcha
        }),
        r: common_vendor.p({
          title: "验证码"
        }),
        s: common_vendor.o((e) => setFormData("status", e.detail)),
        t: common_vendor.p({
          size: "20",
          checked: formData.value.status,
          activeValue: 0,
          inactiveValue: 1
        }),
        v: common_vendor.p({
          title: "账号状态"
        }),
        w: common_vendor.o(submit),
        x: common_vendor.p({
          block: true,
          round: true,
          color: "#2196f3"
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/apple/sub-work/booking/booking/pages/admin/staff/edit.vue"]]);
wx.createPage(MiniProgramPage);
