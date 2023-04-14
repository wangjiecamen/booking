"use strict";
const common_vendor = require("../common/vendor.js");
const getUserInfo = () => {
  return common_vendor.index.getStorageSync("userinfo") || {};
};
exports.getUserInfo = getUserInfo;
