(this.webpackJsonpstopwatch=this.webpackJsonpstopwatch||[]).push([[0],{26:function(t,e,c){},27:function(t,e,c){},28:function(t,e,c){"use strict";c.r(e);var n=c(3),u=c(4),s=c(17),i=c.n(s),b=(c(26),c(11)),o=(c(27),c(33)),r=c(18),a=c(29),j=c(32),l=c(30),p=c(31);function O(t){var e=t.click,c=t.value,s=t.trottleTime;return Object(u.useEffect)((function(){var t=document.querySelector("#btnStop"),c=Object(a.a)(t,"click"),n=c.pipe(Object(j.a)(c.pipe(Object(l.a)(s))),Object(p.a)((function(t){return t.length>1}))).subscribe(e);return function(){return n.unsubscribe()}}),[e,c,s]),Object(n.jsx)("input",{type:"button",value:c,id:"btnStop"})}function f(){var t=Object(u.useState)("0:0:0"),e=Object(b.a)(t,2),c=e[0],s=e[1],i=Object(u.useState)(),a=Object(b.a)(i,2),j=a[0],l=a[1],p=Object(u.useState)(!0),f=Object(b.a)(p,2),v=f[0],h=f[1],m=Object(u.useState)(!1),d=Object(b.a)(m,2),S=d[0],k=d[1],x=Object(u.useState)({sec:0,min:0,hours:0}),y=Object(b.a)(x,2),g=y[0],w=y[1],C={sec:0,min:0,hours:0},E=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:g,e=t;return Object(o.a)(1e3).pipe(Object(r.a)((function(){e.sec++,e.sec>60&&(e.min++,e.sec=0),e.min>60&&(e.hours++,e.min=0),s("".concat(e.hours,":").concat(e.min,":").concat(e.sec)),w(e)})))},J=function(){if(v){if(S){var t=E(g).subscribe();l(t),k(!1)}else{var e=E(C).subscribe();l(e)}h(!1)}else s("0:0:0"),j.unsubscribe(),h(!0)};return Object(n.jsxs)("div",{className:"App",children:[Object(n.jsx)("h1",{children:c}),v?Object(n.jsx)("input",{type:"button",value:"Start",onClick:J}):Object(n.jsx)("input",{type:"button",value:"Stop",onClick:J}),Object(n.jsx)(O,{trottleTime:200,value:"Wait",click:function(){console.log("Double Click"),v||(h(!0),k(!0),j.unsubscribe())}}),Object(n.jsx)("input",{type:"button",value:"Reset",id:"btnReset",onClick:function(){s("0:0:0");var t=function(){var t=E(C).subscribe();l(t)};v?(t(),h(!1)):(j.unsubscribe(),t(),h(!1))}})]})}i.a.render(Object(n.jsx)(f,{}),document.getElementById("root"))}},[[28,1,2]]]);
//# sourceMappingURL=main.5c240543.chunk.js.map