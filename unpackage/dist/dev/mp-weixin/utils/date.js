"use strict";
const getWeeks = () => {
  let d = 1;
  const weeks = [new Date()];
  while (d < 7) {
    const today = new Date();
    today.setDate(today.getDate() + d);
    d++;
    weeks.push(today);
  }
  return weeks;
};
const weekArr = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
const getWeekStr = () => {
  const weeks = getWeeks();
  return weeks.map((i) => {
    return {
      s: weekArr[i.getDay()],
      d: String(i.getDate()).padStart(2, "0")
    };
  });
};
const getTimeList = (startTime = 9, endTime = 22) => {
  let t = startTime;
  let arr = [];
  while (t <= endTime) {
    arr.push(...[String(t).padStart(2, "0") + ":00", String(t).padStart(2, "0") + ":30"]);
    t++;
  }
  return arr;
};
exports.getTimeList = getTimeList;
exports.getWeekStr = getWeekStr;
exports.getWeeks = getWeeks;
