"use strict";const e=require("../../../common/vendor.js");if(!Array){(e.resolveComponent("van-field")+e.resolveComponent("van-cell")+e.resolveComponent("van-cell-group")+e.resolveComponent("van-button"))()}Math||a();const a=()=>"../../../components/PreviewImage.js",l={__name:"approveDetail",setup(a){const l=e.ref({}),o=e.ref("");e.onLoad((async e=>{o.value=e.id,t()}));const t=async()=>{const{data:a}=await e.Ls.importObject("booking").getItem({id:o.value});l.value=a},n=async()=>{await e.Ls.importObject("booking").auditItem({id:o.value,status:1}),e.index.navigateBack()},r=async()=>{await e.Ls.importObject("booking").auditItem({id:o.value,status:2}),e.index.navigateBack()};return(a,o)=>e.e({a:e.p({label:"会议室名称",readonly:!0,value:l.value.room_name}),b:e.p({label:"预订部门",readonly:!0,value:l.value.branch_name}),c:e.p({label:"预订人",readonly:!0,value:l.value.user_name}),d:e.p({label:"预订日期",readonly:!0,value:l.value.date}),e:e.p({label:"预订时间",readonly:!0,value:l.value.start_time+"-"+l.value.end_time}),f:e.p({label:"备注",readonly:!0,value:l.value.remark||"无"}),g:l.value.doc_url},l.value.doc_url?{h:e.p({url:l.value.doc_url})}:{},{i:e.p({title:"会议纪要"}),j:0===l.value.status},0===l.value.status?{k:e.o(n),l:e.p({block:!0,round:!0,color:"#2196f3"}),m:e.o(r),n:e.p({block:!0,round:!0,type:"danger"})}:{})}},o=e._export_sfc(l,[["__scopeId","data-v-6e9c2ef6"]]);wx.createPage(o);