"use strict";const e=require("../../../common/vendor.js");if(!Array){(e.resolveComponent("van-button")+e.resolveComponent("van-swipe-cell")+e.resolveComponent("van-empty"))()}Math||t();const t=()=>"../../../components/AddBtn.js",a={__name:"index",setup(t){const a=e.ref(!0),n=e.ref(1),o=e.ref([]);e.onShow((()=>{i(!0)}));const i=async(t=!1)=>{t&&(n.value=1),a.value=!1;const i=await e.Ls.importObject("notice").getList({pageNo:n.value,pageSize:10});t&&(o.value=[]),o.value.length<i.total&&o.value.push(...i.data),a.value=!0,e.index.stopPullDownRefresh(),console.log(i)},l=()=>{e.index.navigateTo({url:"/pages/admin/notice/detail"})};return e.onReachBottom((()=>{i()})),e.onPullDownRefresh((()=>{i(!0)})),(t,n)=>e.e({a:o.value.length},o.value.length?{b:e.f(o.value,((t,a,n)=>({a:e.t(t.title),b:e.o((a=>{return n=t._id,void e.index.navigateTo({url:`/pages/admin/notice/detail?id=${n}`});var n}),t._id),c:e.o((a=>(async t=>{await e.Ls.importObject("notice").deleteItem({_id:t}),i(!0)})(t._id)),t._id),d:"e711ac7f-1-"+n+",e711ac7f-0-"+n,e:t._id,f:"e711ac7f-0-"+n}))),c:e.p({square:!0,type:"danger"}),d:e.p({rightWidth:65})}:{},{e:a.value&&!o.value.length},a.value&&!o.value.length?{f:e.p({description:"暂无公告"})}:{},{g:e.o(l)})}},n=e._export_sfc(a,[["__scopeId","data-v-e711ac7f"]]);wx.createPage(n);