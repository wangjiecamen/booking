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
  url: "/pages/phonebook/index",
  title: "通讯录",
  bg: "linear-gradient(#1E90FF,#00FFFF);"
}, {
  url: "/pages/notice/index",
  title: "公告",
  bg: "linear-gradient(#607D8B,#1976D2);"
}];
const adminFunctions = [
  {
    url: "/pages/admin/branchManage",
    title: "部门管理",
    bg: "linear-gradient(#1A237E,#2196F3);"
  },
  {
    url: "/pages/admin/staffManage",
    title: "员工管理",
    bg: "linear-gradient(#1A237E,#2196F3);"
  },
  {
    url: "/pages/admin/meetingManage",
    title: "会议室管理",
    bg: "linear-gradient(#1A237E,#2196F3);"
  },
  {
    url: "/pages/admin/meetingApprove",
    title: "会议室审批",
    bg: "linear-gradient(#1A237E,#2196F3);"
  }
];
exports.adminFunctions = adminFunctions;
exports.userFunctions = userFunctions;
