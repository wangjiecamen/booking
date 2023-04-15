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
      } = await common_vendor.Ls.importObject("booking").getItem({
        id: formData.value._id
      });
      formData.value = data;
      if (data.doc_url)
        fileList.value = [data.doc_url];
      console.log(fileList.value);
    };
    const cancel = async () => {
      await common_vendor.Ls.importObject("booking").auditItem({
        status: 3,
        id: formData.value._id
      });
      common_vendor.index.navigateBack();
    };
    const submit = async () => {
      if (fileList.value.length)
        formData.value.doc_url = fileList.value[0];
      else
        formData.value.doc_url = "";
      console.log(formData.value);
      if (formData.value._id) {
        await common_vendor.Ls.importObject("booking").updateItem(formData.value);
      } else {
        await common_vendor.Ls.importObject("booking").addItem(formData.value);
      }
      common_vendor.index.navigateBack();
    };
    common_vendor.onShareAppMessage(() => {
      return {
        title: "会议室",
        path: `/pages/meeting-record/detail?id=${formData.value._id}&type=detail`
      };
    });
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
        h: common_vendor.o((e) => formData.value.remark = e.detail),
        i: common_vendor.p({
          label: " 备注",
          value: formData.value.remark,
          type: "textarea"
        }),
        j: formData.value._id
      }, formData.value._id ? {
        k: common_vendor.sr("uqrcode", "e7b6dd0b-10,e7b6dd0b-9"),
        l: common_vendor.p({
          ["canvas-id"]: "qrcode",
          value: `https://fc-mp-cc99a23f-d23b-4970-81b7-caad20480fff.next.bspapp.com/sign?id=${formData.value._id}`,
          size: 100
        }),
        m: common_vendor.p({
          title: "二维码"
        })
      } : {}, {
        n: common_vendor.p({
          max: 1,
          ["file-list"]: fileList.value,
          readonly: readonly.value
        }),
        o: common_vendor.p({
          title: "会议纪要"
        }),
        p: common_vendor.p({
          title: "签到人数",
          value: formData.value.sign_num
        }),
        q: !readonly.value
      }, !readonly.value ? common_vendor.e({
        r: common_vendor.o(submit),
        s: common_vendor.p({
          block: true,
          round: true,
          color: "#2196f3"
        }),
        t: formData.value.status === 0 || formData.value.status === 1
      }, formData.value.status === 0 || formData.value.status === 1 ? {
        v: common_vendor.o(cancel),
        w: common_vendor.p({
          block: true,
          round: true
        })
      } : {}) : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-e7b6dd0b"], ["__file", "/Users/apple/sub-work/booking/booking/pages/meeting-record/detail.vue"]]);
_sfc_main.__runtimeHooks = 2;
wx.createPage(MiniProgramPage);
