"use strict";const e=require("../common/vendor.js"),t=require("../contants.js"),n={__name:"Functions",setup(n){const o=e.ref([]);e.onBeforeMount((()=>{console.log(e.Ls.getCurrentUserInfo().role[0]);const n=e.Ls.getCurrentUserInfo().role[0];"admin"===n&&(o.value=t.adminFunctions),"user"===n&&(o.value=t.userFunctions)}));return(t,n)=>({a:e.f(o.value,((t,n,o)=>({a:e.t(t.title),b:e.o((n=>(t=>{e.index.navigateTo({url:t.url,fail:()=>{e.index.switchTab({url:t.url})}})})(t)),t.title),c:t.title,d:t.bg})))})}},o=e._export_sfc(n,[["__scopeId","data-v-ea07f775"]]);wx.createComponent(o);