"use strict";const t=()=>{let t=1;const e=[new Date];for(;t<7;){const r=new Date;r.setDate(r.getDate()+t),t++,e.push(r)}return e},e=["周日","周一","周二","周三","周四","周五","周六"];exports.getTimeList=(t=9,e=22)=>{let r=t,s=[];for(;r<=e;)s.push(String(r).padStart(2,"0")+":00",String(r).padStart(2,"0")+":30"),r++;return s},exports.getWeekStr=()=>t().map((t=>({s:e[t.getDay()],d:String(t.getDate()).padStart(2,"0")}))),exports.getWeeks=t;
