"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_date = require("../../utils/date.js");
const wxcomponents_vant_dialog_dialog = require("../../wxcomponents/vant/dialog/dialog.js");
if (!Array) {
  const _component_van_dialog = common_vendor.resolveComponent("van-dialog");
  _component_van_dialog();
}
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
    let selectedCells = [];
    let completeCellSelected = false;
    let completeTimeSelected = false;
    const roomList = common_vendor.ref([{
      roomId: 0,
      roomName: "会议室A",
      meeting: [
        {
          start: "09:30",
          end: "10:30",
          remark: "remark",
          branch: "产品部",
          branchId: "29",
          id: "1"
        },
        {
          start: "12:30",
          end: "13:00",
          remark: "remark1",
          branch: "产品部",
          branchId: "30",
          id: "3"
        }
      ]
    }, {
      roomId: 1,
      roomName: "会议室B",
      meeting: [{
        start: "16:00",
        //16:00 16:30,17:00 17:30 18:00   
        end: "18:30",
        remark: "remark",
        branch: "产品部",
        branchId: "90",
        id: "7"
      }]
    }, {
      roomId: 2,
      roomName: "会议室C",
      meeting: []
    }, {
      roomId: 3,
      roomName: "会议室D",
      meeting: []
    }, {
      roomId: 4,
      roomName: "会议室E",
      meeting: []
    }, {
      roomId: 5,
      roomName: "会议室F",
      meeting: []
    }]);
    const currentMonth = common_vendor.computed(() => {
      const m = utils_date.getWeeks()[currentDateIndex.value].getMonth() + 1;
      return String(m).padStart(2, "0");
    });
    const roomDomTotalLength = common_vendor.computed(() => {
      return roomList.value.length * parseInt(roomDomLength.value) + "rpx";
    });
    const selectDate = (index) => {
      currentDateIndex.value = index;
    };
    const onTimeScroll = (event) => {
      scrollTop.value = -event.detail.scrollTop;
    };
    const submit = () => {
      const cells = selectedCells.filter((i) => i.selected);
      console.log(cells);
      const startTime = cells[0].time;
      let endTime = cells[cells.length - 1].time;
      const [e, e_h] = endTime.split(":");
      if (e_h === "00")
        endTime = e + ":30";
      if (e_h === "30")
        endTime = Number(e) + 1 + ":00";
      const result = {
        roomId: cells[0].roomId,
        start: startTime,
        end: endTime,
        date: new Date().getFullYear() + "-" + currentMonth.value + "-" + weekStr[currentDateIndex.value].d
      };
      console.log(result);
    };
    const onClickCell = (cell, time_index) => {
      console.log(cell);
      if (cell.defaultSelected) {
        wxcomponents_vant_dialog_dialog.Dialog.confirm({
          showCancelButton: false,
          message: `部门：${cell.branch}
备注：${cell.remark}`
        });
      } else {
        cell.selected = !cell.selected;
        selectedCells = getCellsByRoomId(cell.roomId);
        if (lastCellSelectedByTapCell.roomId !== cell.roomId) {
          const lastCells = getCellsByRoomId(lastCellSelectedByTapCell.roomId);
          lastCells.forEach((i) => i.selected = false);
          completeCellSelected = false;
        } else {
          const index = timeList.findIndex((i2) => i2 === cell.time);
          if (completeCellSelected) {
            selectedCells.forEach((_, i2) => selectedCells[i2].selected = i2 === index);
            completeCellSelected = false;
            lastCellSelectedByTapCell = cell;
            return;
          }
          const lastIndex = timeList.findIndex((i2) => i2 === lastCellSelectedByTapCell.time);
          const minIndex = Math.min(lastIndex, index);
          const maxIndex = Math.max(lastIndex, index);
          let i = minIndex;
          while (maxIndex - i > 0) {
            if (selectedCells[i].defaultSelected) {
              wxcomponents_vant_dialog_dialog.Dialog.confirm({
                showCancelButton: false,
                message: `会议室已被其他部门占用，请重新选择`
              }).then(() => {
                selectedCells.forEach((_, i2) => selectedCells[i2].selected = false);
                showSubmitBtn.value = false;
              });
              break;
            }
            i++;
            selectedCells[i].selected = true;
          }
          completeCellSelected = true;
        }
        lastCellSelectedByTapCell = cell;
      }
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
        console.log(minIndex, maxIndex);
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
        if (i.start && i.end) {
          const [s, s_h] = i.start.split(":");
          const [e, e_h] = i.end.split(":");
          let l = utils_date.getTimeList(s, e);
          if (s_h === "30")
            l = common_vendor.lodash_drop(l, 1);
          if (e_h === "30")
            l = common_vendor.lodash_dropright(l, 1);
          if (e_h === "00")
            l = common_vendor.lodash_dropright(l, 2);
          const item = l.map((t) => ({
            id: i.id,
            branch: i.branch,
            branchId: i.branchId,
            remark: i.remark,
            time: t
          }));
          arr.push(...item);
        }
      });
      return arr;
    };
    common_vendor.onMounted(() => {
      roomList.value.forEach((i) => {
        i.cell = [];
        const t = getCellOfMeeting(i.meeting);
        for (let k of timeList) {
          const targetIndex = t.findIndex((i2) => i2.time === k);
          if (targetIndex !== -1) {
            i.cell.push({
              roomId: i.roomId,
              defaultSelected: true,
              selected: false,
              time: k,
              id: t[targetIndex].id,
              branch: t[targetIndex].branch,
              branchId: t[targetIndex].branchId,
              remark: t[targetIndex].remark,
              selectedByTapTime: false
            });
          } else {
            i.cell.push({
              roomId: i.roomId,
              defaultSelected: false,
              selected: false,
              time: k,
              selectedByTapTime: false
            });
          }
        }
      });
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
            b: common_vendor.f(item.cell, (i, time_index, i1) => {
              return common_vendor.e({
                a: (item.cell[time_index - 1] ? !item.cell[time_index - 1].id : false) && i.defaultSelected
              }, (item.cell[time_index - 1] ? !item.cell[time_index - 1].id : false) && i.defaultSelected ? {
                b: common_vendor.t(i.branch)
              } : {}, {
                c: i.selected ? 1 : "",
                d: i.defaultSelected ? 1 : "",
                e: i.selectedByTapTime ? 1 : "",
                f: common_vendor.o(($event) => onClickCell(i), room_index + "_" + time_index),
                g: room_index + "_" + time_index
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
        j: showSubmitBtn.value
      }, showSubmitBtn.value ? {
        k: common_vendor.o(submit),
        l: common_vendor.s(_ctx.__cssVars())
      } : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-f3707b27"], ["__file", "/Users/apple/sub-work/booking/booking/pages/meeting/index.vue"]]);
wx.createPage(MiniProgramPage);
