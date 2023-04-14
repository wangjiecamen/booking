"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _component_van_field = common_vendor.resolveComponent("van-field");
  const _easycom_uqrcode2 = common_vendor.resolveComponent("uqrcode");
  const _component_van_cell = common_vendor.resolveComponent("van-cell");
  const _component_van_cell_group = common_vendor.resolveComponent("van-cell-group");
  const _component_van_button = common_vendor.resolveComponent("van-button");
  (_component_van_field + _easycom_uqrcode2 + _component_van_cell + _component_van_cell_group + _component_van_button)();
}
const _easycom_uqrcode = () => "../../uni_modules/Sansnn-uQRCode/components/uqrcode/uqrcode.js";
if (!Math) {
  (_easycom_uqrcode + Uploader)();
}
const Uploader = () => "../../components/uploader.js";
const _sfc_main = {
  __name: "detail",
  setup(__props) {
    const fileList = common_vendor.ref([]);
    const readonly = common_vendor.ref(false);
    const formData = common_vendor.ref({
      date: "",
      start_time: "",
      end_time: "",
      remark: "",
      user_name: "",
      user_id: "",
      room_id: "",
      room_name: "",
      branch_id: "",
      branch_name: "",
      doc_url: ""
    });
    common_vendor.onLoad((options) => {
      console.log(options);
      common_vendor.index.setNavigationBarTitle({
        title: options.id ? "会议详情" : "新增会议"
      });
      if (options.id) {
        readonly.value = options.type === "detail";
        formData.value._id = options.id;
        getDetail();
      } else {
        formData.value = JSON.parse(decodeURIComponent(options.form));
      }
    });
    const getDetail = async () => {
      const {
        data
      } = await common_vendor.Ls.importObject("booking").getItem(formData.value._id);
      console.log(data);
      formData.value = data;
      if (data.doc_url)
        fileList.value = [data.doc_url];
    };
    const submit = async () => {
      if (fileList.value.length)
        formData.value.doc_url = fileList.value[0];
      console.log(formData.value);
      if (formData.value._id) {
        await common_vendor.Ls.importObject("booking").updateItem(formData.value);
      } else {
        await common_vendor.Ls.importObject("booking").addItem(formData.value);
      }
      common_vendor.index.navigateBack();
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.p({
          readonly: true,
          label: "日期",
          value: formData.value.date
        }),
        b: common_vendor.p({
          readonly: true,
          label: "开始时间",
          value: formData.value.start_time
        }),
        c: common_vendor.p({
          readonly: true,
          label: "结束时间",
          value: formData.value.end_time
        }),
        d: common_vendor.p({
          readonly: true,
          label: "发起人",
          value: formData.value.user_name
        }),
        e: common_vendor.p({
          readonly: true,
          label: "发起部门",
          value: formData.value.branch_name
        }),
        f: common_vendor.p({
          readonly: true,
          label: "预订会议室",
          value: formData.value.room_name
        }),
        g: common_vendor.p({
          readonly: true,
          label: "是否需要审核",
          value: formData.value.audit === 1 ? "需要" : "不需要"
        }),
        h: common_vendor.p({
          label: " 备注",
          value: formData.value.remark,
          type: "textarea"
        }),
        i: formData.value._id
      }, formData.value._id ? {
        j: common_vendor.sr("uqrcode", "e7b6dd0b-10,e7b6dd0b-9"),
        k: common_vendor.p({
          ["canvas-id"]: "qrcode",
          value: "https://uqrcode.cn/doc",
          size: 100
        }),
        l: common_vendor.p({
          title: "二维码"
        })
      } : {}, {
        m: common_vendor.p({
          max: 1,
          ["file-list"]: fileList.value,
          readonly: readonly.value
        }),
        n: common_vendor.p({
          title: "会议纪要"
        }),
        o: common_vendor.p({
          title: "签到人数",
          value: formData.value.sign_num
        }),
        p: !readonly.value
      }, !readonly.value ? {
        q: common_vendor.o(submit),
        r: common_vendor.p({
          block: true,
          round: true,
          color: "#2196f3"
        })
      } : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-e7b6dd0b"], ["__file", "/Users/apple/sub-work/booking/booking/pages/meeting-record/detail.vue"]]);
wx.createPage(MiniProgramPage);
