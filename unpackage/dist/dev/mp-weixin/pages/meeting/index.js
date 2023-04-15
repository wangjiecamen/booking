"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_date = require("../../utils/date.js");
const utils_user = require("../../utils/user.js");
const wxcomponents_vant_dialog_dialog = require("../../wxcomponents/vant/dialog/dialog.js");
if (!Array) {
  const _component_van_dialog = common_vendor.resolveComponent("van-dialog");
  _component_van_dialog();
}
if (!Math) {
  AddBtn();
}
const AddBtn = () => "../../components/AddBtn.js";
const _sfc_main = {
  __name: "index",
  setup(__props) {
    common_vendor.useCssVars((_ctx) => ({
      "b621dde2": common_vendor.unref(roomDomTotalLength),
      "cdf83bfe": roomDomLength.value
    }));
    const weekStr = utils_date.getWeekStr();
    const currentDateIndex = common_vendor.ref(0);
    const scrollTop = common_vendor.ref(0);
    const roomDomLength = common_vendor.ref("200rpx");
    const showSubmitBtn = common_vendor.ref(false);
    const timeList = utils_date.getTimeList();
    let lastIndexSelectedByTapTime = null;
    let lastCellSelectedByTapCell = {};
    let currentRowCells = [];
    let completeCellSelected = false;
    let completeTimeSelected = false;
    const roomList = common_vendor.ref([]);
    const currentMonth = common_vendor.computed(() => {
      const m = utils_date.getWeeks()[currentDateIndex.value].getMonth() + 1;
      return String(m).padStart(2, "0");
    });
    const roomDomTotalLength = common_vendor.computed(() => {
      return roomList.value.length * parseInt(roomDomLength.value) + "rpx";
    });
    const date = common_vendor.computed(() => {
      return new Date().getFullYear() + "-" + currentMonth.value + "-" + weekStr[currentDateIndex.value].d;
    });
    const selectDate = (index) => {
      currentDateIndex.value = index;
      getList();
    };
    const onTimeScroll = (event) => {
      scrollTop.value = -event.detail.scrollTop;
    };
    const submit = () => {
      const cells = currentRowCells.filter((i) => i.selected);
      const startTime = cells[0].time;
      let endTime = cells[cells.length - 1].time;
      const [e, e_h] = endTime.split(":");
      if (e_h === "00")
        endTime = e + ":30";
      if (e_h === "30")
        endTime = Number(e) + 1 + ":00";
      const userinfo = common_vendor.index.getStorageSync("userinfo");
      const result = {
        room_id: cells[0].roomId,
        audit: cells[0].roomAudit,
        start_time: startTime,
        end_time: endTime,
        date: date.value,
        room_name: cells[0].roomName,
        branch_name: userinfo.branchName,
        branch_id: userinfo.branchId,
        user_id: userinfo._id,
        user_name: userinfo.username
      };
      common_vendor.index.navigateTo({
        url: `/pages/meeting-record/detail?form=${encodeURIComponent(JSON.stringify(result))}`
      });
    };
    const goToDetail = (cell) => {
      if (utils_user.isAdmin())
        return;
      const currentBranchId = utils_user.getUserInfo().branchId;
      if (cell.defaultSelected) {
        const type = currentBranchId === cell.branch_id ? "edit" : "detail";
        common_vendor.index.navigateTo({
          url: `/pages/meeting-record/detail?id=${cell.id}&type=${type}`
        });
      }
    };
    const onClickCell = (cell, cell_index) => {
      const currentBranchId = utils_user.getUserInfo().branchId;
      cell.selected = !cell.selected;
      currentRowCells = getCellsByRoomId(cell.roomId);
      if (lastCellSelectedByTapCell.roomId !== cell.roomId) {
        const lastCells = getCellsByRoomId(lastCellSelectedByTapCell.roomId);
        lastCells.forEach((i) => i.selected = false);
        completeCellSelected = false;
      } else {
        const currentIndex = timeList.findIndex((i2) => i2 === cell.time);
        if (completeCellSelected) {
          currentRowCells.forEach((_, i2) => currentRowCells[i2].selected = i2 === currentIndex);
          completeCellSelected = false;
          lastCellSelectedByTapCell = cell;
          return;
        }
        const lastIndex = timeList.findIndex((i2) => i2 === lastCellSelectedByTapCell.time);
        const minIndex = Math.min(lastIndex, currentIndex);
        const maxIndex = Math.max(lastIndex, currentIndex);
        let i = minIndex;
        while (maxIndex - i > 0) {
          if (currentRowCells[i].defaultSelected && currentRowCells[i].branch_id && currentBranchId && currentBranchId !== currentRowCells[i].branch_id) {
            wxcomponents_vant_dialog_dialog.Dialog.confirm({
              showCancelButton: false,
              message: `会议室已被其他部门占用，请重新选择`
            }).then(() => {
              currentRowCells.forEach((_, i2) => currentRowCells[i2].selected = false);
              showSubmitBtn.value = false;
            });
            break;
          }
          i++;
          console.log(i);
          currentRowCells[i].selected = true;
        }
        completeCellSelected = true;
      }
      lastCellSelectedByTapCell = cell;
      showSubmitBtn.value = true;
    };
    const getCellsByRoomId = (roomId) => {
      const target = roomList.value.find((i) => i.roomId === roomId) || {};
      return target.cell || [];
    };
    const onClickTime = (index) => {
      for (let i of roomList.value) {
        i.cell[index].selectedByTapTime = !i.cell[index].selectedByTapTime;
      }
      if (lastIndexSelectedByTapTime !== null) {
        if (completeTimeSelected) {
          for (let k of roomList.value) {
            k.cell.forEach((_, i2) => _.selectedByTapTime = i2 === index);
          }
          lastIndexSelectedByTapTime = index;
          completeTimeSelected = false;
          return;
        }
        const minIndex = Math.min(lastIndexSelectedByTapTime, index);
        const maxIndex = Math.max(lastIndexSelectedByTapTime, index);
        let i = minIndex;
        while (maxIndex - i > 0) {
          for (let k of roomList.value) {
            k.cell[i].selectedByTapTime = true;
          }
          i++;
        }
        completeTimeSelected = true;
      }
      lastIndexSelectedByTapTime = index;
    };
    const getCellOfMeeting = (meeting) => {
      let arr = [];
      meeting.forEach((i) => {
        if (i.start_time && i.end_time) {
          const [s, s_h] = i.start_time.split(":");
          const [e, e_h] = i.end_time.split(":");
          let l = utils_date.getTimeList(s, e);
          if (s_h === "30")
            l = common_vendor.lodash_drop(l, 1);
          if (e_h === "30")
            l = common_vendor.lodash_dropright(l, 1);
          if (e_h === "00")
            l = common_vendor.lodash_dropright(l, 2);
          const item = l.map((t) => ({
            id: i._id,
            branch_name: i.branch_name,
            branch_id: i.branch_id,
            remark: i.remark,
            time: t
          }));
          arr.push(...item);
        }
      });
      return arr;
    };
    const getList = async () => {
      const {
        data
      } = await common_vendor.Ls.importObject("room").getRoomListWithBooking(date.value);
      roomList.value = data.map((i) => {
        i.cell = [];
        const t = getCellOfMeeting(i.meeting);
        let count = 0;
        for (let k of timeList) {
          const targetIndex = t.findIndex((i2) => i2.time === k);
          if (targetIndex !== -1) {
            count++;
            i.cell.push({
              ...count == 1 && {
                label: t[targetIndex].branch_name
              },
              roomId: i.roomId,
              roomName: i.roomName,
              roomAudit: i.roomAudit,
              defaultSelected: true,
              selected: false,
              time: k,
              id: t[targetIndex].id,
              branch_name: t[targetIndex].branch_name,
              branch_id: t[targetIndex].branch_id,
              remark: t[targetIndex].remark,
              selectedByTapTime: false
            });
          } else {
            count = 0;
            i.cell.push({
              roomAudit: i.roomAudit,
              roomName: i.roomName,
              roomId: i.roomId,
              defaultSelected: false,
              selected: false,
              time: k,
              selectedByTapTime: false
            });
          }
        }
        return i;
      });
    };
    common_vendor.onShow(() => {
      getList();
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.t(common_vendor.unref(currentMonth)),
        b: common_vendor.f(common_vendor.unref(weekStr), (item, index, i0) => {
          return {
            a: common_vendor.t(item.s),
            b: common_vendor.t(item.d),
            c: common_vendor.o(($event) => selectDate(index), index),
            d: currentDateIndex.value === index ? 1 : "",
            e: index
          };
        }),
        c: common_vendor.s(_ctx.__cssVars()),
        d: common_vendor.f(common_vendor.unref(timeList), (item, index, i0) => {
          return {
            a: common_vendor.t(item),
            b: common_vendor.o(($event) => onClickTime(index), index),
            c: index
          };
        }),
        e: common_vendor.o(onTimeScroll),
        f: common_vendor.f(roomList.value, (item, room_index, i0) => {
          return {
            a: common_vendor.t(item.roomName),
            b: common_vendor.f(item.cell, (i, cell_index, i1) => {
              return common_vendor.e({
                a: i.label
              }, i.label ? {
                b: common_vendor.t(i.label)
              } : {}, {
                c: i.selected ? 1 : "",
                d: i.defaultSelected ? 1 : "",
                e: i.selectedByTapTime ? 1 : "",
                f: common_vendor.o(($event) => goToDetail(i), room_index + "_" + cell_index),
                g: common_vendor.o(($event) => onClickCell(i), room_index + "_" + cell_index),
                h: room_index + "_" + cell_index
              });
            }),
            c: room_index
          };
        }),
        g: `translateY(${scrollTop.value}px)`,
        h: common_vendor.p({
          id: "van-dialog"
        }),
        i: common_vendor.s(_ctx.__cssVars()),
        j: showSubmitBtn.value && common_vendor.unref(utils_user.isUser)()
      }, showSubmitBtn.value && common_vendor.unref(utils_user.isUser)() ? {
        k: common_vendor.o(submit),
        l: common_vendor.s(_ctx.__cssVars())
      } : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-f3707b27"], ["__file", "/Users/apple/sub-work/booking/booking/pages/meeting/index.vue"]]);
wx.createPage(MiniProgramPage);
