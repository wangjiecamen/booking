"use strict";
const userFunctions = [{
  url: "/pages/meeting/index",
  title: "会议室预约",
  bg: "linear-gradient(#1A237E,#2196F3);"
}, {
  url: "/pages/meeting-record/index",
  title: "会议室记录",
  bg: "linear-gradient(#87CEFA,#00BFFF);"
}, {
  url: "/pages/notice/index",
  title: "公告",
  bg: "linear-gradient(#607D8B,#1976D2);"
}];
const adminFunctions = [
  {
    url: "/pages/admin/branch/index",
    title: "部门管理",
    bg: "linear-gradient(#1A237E,#2196F3);"
  },
  {
    url: "/pages/admin/staff/list",
    title: "员工管理",
    bg: "linear-gradient(#1A237E,#2196F3);"
  },
  {
    url: "/pages/admin/meeting/list",
    title: "会议室管理",
    bg: "linear-gradient(#1A237E,#2196F3);"
  },
  {
    url: "/pages/admin/meeting/approve",
    title: "会议室审批",
    bg: "linear-gradient(#1A237E,#2196F3);"
  }
];
const bookingStatus = {
  0: {
    text: "待审批",
    color: "#222"
  },
  1: {
    text: "审批通过",
    color: "#4cd964"
  },
  2: {
    text: "审批拒绝",
    color: "#dd524d"
  },
  3: {
    text: "已取消",
    color: "#222"
  }
};
exports.adminFunctions = adminFunctions;
exports.bookingStatus = bookingStatus;
exports.userFunctions = userFunctions;
