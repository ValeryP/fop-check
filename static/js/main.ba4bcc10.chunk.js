(this["webpackJsonpfop-check"]=this["webpackJsonpfop-check"]||[]).push([[0],{124:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),c=a(8),i=a.n(c),l=a(18),s=a(157),o=a(77),m=a.n(o),u=a(44),d=a(152),p=a(154),f=a(170),b=Object(d.a)((function(e){var t;return Object(p.a)({textField:(t={margin:e.spacing(4)},Object(u.a)(t,e.breakpoints.up("xs"),{minWidth:270}),Object(u.a)(t,e.breakpoints.up("sm"),{minWidth:500}),t)})}));function g(e){var t=e.updateResultsCallback,a=b(),c=Object(n.useState)(""),i=Object(l.a)(c,2),s=i[0],o=i[1],m=Object(n.useState)(),u=Object(l.a)(m,2),d=u[0],p=u[1];Object(n.useEffect)((function(){d&&clearTimeout(d),p(setTimeout((function(){t(s)}),500))}),[s]);return r.a.createElement(f.a,{className:a.textField,variant:"outlined",onChange:function(e){return e.persist(),new Promise((function(t,a){t(e.target.value)})).then((function(e){o(e)}))},label:"\u041f\u043e\u0448\u0443\u043a",placeholder:"\u0432\u0430\u0441\u0438\u043b\u044c \u0456\u0432\u0430\u043d\u043e\u0432\u0438\u0447, 40885849, \u043a\u0438\u0457\u0432"})}a(99);var h=a(158),E=a(159);function j(){return r.a.createElement(s.a,{container:!0,justify:"center",alignContent:"center",style:{textAlign:"center"}},r.a.createElement(s.a,{item:!0,xs:12},r.a.createElement(h.a,{maxWidth:"xs",className:"loader",style:{maxWidth:75}},r.a.createElement("div",{className:"loader__bar"}),r.a.createElement("div",{className:"loader__bar"}),r.a.createElement("div",{className:"loader__bar"}),r.a.createElement("div",{className:"loader__bar"}),r.a.createElement("div",{className:"loader__bar"}),r.a.createElement("div",{className:"loader__ball"}))),r.a.createElement(s.a,{item:!0,xs:12},r.a.createElement(E.a,{variant:"h4",style:{fontWeight:100,letterSpacing:4}},"\u0417\u0430\u0432\u0430\u043d\u0442\u0430\u0436\u0435\u043d\u043d\u044f")))}var y=a(31),O=a(58),v=a.n(O),k=function(e){var t={skipEmptyLines:!0,header:!0,download:!0,worker:!0,delimiter:","};v.a.parse("https://fop-check.s3.eu-central-1.amazonaws.com/map_type.csv",Object(y.a)(Object(y.a)({},t),{},{complete:function(a,n){var r=a.data.flatMap((function(e){return Object.keys(e).map((function(t){return e[t]}))}));v.a.parse("https://fop-check.s3.eu-central-1.amazonaws.com/map_map_department.csv",Object(y.a)(Object(y.a)({},t),{},{complete:function(a,n){var c=a.data.flatMap((function(e){return Object.keys(e).map((function(t){return e[t]}))}));v.a.parse("https://fop-check.s3.eu-central-1.amazonaws.com/db2020.csv",Object(y.a)(Object(y.a)({},t),{},{complete:function(t,a){e(t.data.map((function(e,t){return function(e,t,a,n){var r=String(n[Number(t.type_id)]),c=String(a[Number(t.department_id)]);return{index:e,name:t.name,address:t.address,code:t.code,type:r[0].toUpperCase()+r.slice(1),risk:t.risk,department:c[0].toUpperCase()+c.slice(1),date:t.date,duration:t.duration}}(t+1,e,c,r)})))}}))}}))}}))};var x=a(80),w=a.n(x),_=a(160),C=a(161),z=a(162),S=a(163),N=a(164),P=a(165),W=a(166),A=a(169),F=a(57),L=a(81),R=a.n(L),T=Object(d.a)((function(e){return Object(p.a)({paper:{height:"80vh"}})}));function B(e){var t=e.domains,a=e.items,n=T(),c=r.a.useState(0),i=Object(l.a)(c,2),s=i[0],o=i[1],m=r.a.useState(50),u=Object(l.a)(m,2),d=u[0],p=u[1],f=["index","name","address","code","type","risk","department","date","duration"],b={index:{name:"#",size:"1%",align:"center"},name:{name:"\u041f\u0456\u0434\u043f\u0440\u0438\u0454\u043c\u0441\u0442\u0432\u043e",size:"10%",align:"left"},address:{name:"\u0410\u0434\u0440\u0435\u0441\u0430",size:"20%",align:"left"},code:{name:"\u0404\u0414\u0420\u041f\u041e\u0423 \u0430\u0431\u043e \u0420\u041d\u041e\u041a\u041f\u041f",size:"4%",align:"center"},type:{name:"\u041f\u0440\u0435\u0434\u043c\u0435\u0442 \u043a\u043e\u043d\u0442\u0440\u043e\u043b\u044e",size:"20%",align:"left"},risk:{name:"\u0420\u0438\u0437\u0438\u043a",size:"5%",align:"left"},department:{name:"\u0414\u0435\u043f\u0430\u0440\u0442\u0430\u043c\u0435\u043d\u0442",size:"30%",align:"left"},date:{name:"\u0414\u0430\u0442\u0430",size:"5%",align:"left"},duration:{name:"\u0422\u0440\u0438\u0432\u0430\u043b\u0456\u0441\u0442\u044c",size:"5%",align:"left"}};return r.a.createElement(z.a,{className:n.paper},r.a.createElement(S.a,{stickyHeader:!0,size:"small","aria-label":"custom pagination table"},r.a.createElement(N.a,null,r.a.createElement(_.a,{style:{background:F.a[100]}},f.map((function(e,t){return function(e,t){return r.a.createElement(C.a,{key:e,style:{width:b[t].size,textAlign:b[t].align}},b[t].name)}(t,e)})))),r.a.createElement(P.a,null,a.slice(s*d,s*d+d).map((function(e,a){return function(e,a){return r.a.createElement(_.a,{key:e},f.map((function(e,n){return r.a.createElement(C.a,{style:{verticalAlign:"top"},key:n},["name","address","code"].includes(e)?r.a.createElement(w.a,{searchWords:t,autoEscape:!0,highlightStyle:{fontWeight:"bold"},textToHighlight:a[e].toString()}):a[e])})))}(a,e)}))),r.a.createElement(W.a,null,r.a.createElement(_.a,null,r.a.createElement(A.a,{labelRowsPerPage:"\u0412\u0456\u0434\u043e\u0431\u0440\u0430\u0436\u0430\u0442\u0438 \u0440\u0435\u0437\u0443\u043b\u044c\u0442\u0430\u0442\u0456\u0432 \u043d\u0430 \u0441\u0442\u043e\u0440\u0456\u043d\u0446\u0456:",rowsPerPageOptions:[50,100,250],count:a.length,rowsPerPage:d,page:s,onChangePage:function(e,t){o(t)},onChangeRowsPerPage:function(e){p(parseInt(e.target.value,10)),o(0)},ActionsComponent:R.a})))))}var H=function(){var e=Object(n.useState)(""),t=Object(l.a)(e,2),a=t[0],c=t[1],i=Object(n.useState)(!1),o=Object(l.a)(i,2),u=o[0],d=o[1],p=Object(n.useState)([]),f=Object(l.a)(p,2),b=f[0],h=f[1];Object(n.useEffect)((function(){d(!0),k((function(e){d(!1),h(e)}))}),[]);var E=a.trim().toLowerCase().split(/[, ]+/).map((function(e){return e.toString().trim()})).filter((function(e){return e})),y=b.filter((function(e){return E.map((function(t){return-1!=="".concat(e.name," ").concat(e.address," ").concat(e.code).toLowerCase().indexOf(t)})).some((function(e){return e}))})).map((function(e){return e.similarity=m.a.compareTwoStrings(a.trim().toLowerCase(),"".concat(e.name," ").concat(e.address," ").concat(e.code).toLowerCase()),e})).sort((function(e,t){return t.similarity<e.similarity?-1:1})).map((function(e,t){return e.index=t+1,e}));return r.a.createElement(s.a,{container:!0,justify:"center",alignContent:"center",style:{height:"100vh"}},u?r.a.createElement(s.a,{item:!0,xs:12},r.a.createElement(j,null)):r.a.createElement(r.a.Fragment,null,r.a.createElement(s.a,{item:!0,xs:12,style:{textAlign:"center"}},r.a.createElement(g,{updateResultsCallback:c})),r.a.createElement(s.a,{item:!0,xs:12},0!==a.length&&r.a.createElement(B,{domains:E,items:y}))))},I=a(82),J=a(167);i.a.render(r.a.createElement(J.a,{theme:Object(I.a)({palette:{primary:{main:"#607D8B"},secondary:{main:"#FFC107"}}})},r.a.createElement(H,null)),document.getElementById("root")),document.body.style.margin="0"},91:function(e,t,a){e.exports=a(124)},99:function(e,t,a){}},[[91,1,2]]]);
//# sourceMappingURL=main.ba4bcc10.chunk.js.map