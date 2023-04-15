"use strict";
const common_vendor = require("../common/vendor.js");
const getUserInfo = () => {
  return common_vendor.index.getStorageSync("userinfo") || {};
};
const getUserType = () => {
  return common_vendor.Ls.getCurrentUserInfo().role[0];
};
const isAdmin = () => {
  return getUserType() === "admin";
};
const isUser = () => {
  return getUserType() === "user";
};
exports.getUserInfo = getUserInfo;
exports.isAdmin = isAdmin;
exports.isUser = isUser;
