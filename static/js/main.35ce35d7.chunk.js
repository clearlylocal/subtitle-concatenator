(this["webpackJsonpsubtitle-concatenator"]=this["webpackJsonpsubtitle-concatenator"]||[]).push([[0],{22:function(e,t,n){},32:function(e,t,n){"use strict";n.r(t);var r=n(0),c=n.n(r),o=n(13),a=n.n(o),i=(n(22),n(2)),u=n.n(i),s=n(1),l=n(5),f=n(4),p=n(17),d=n(14),v=function(e){return e[e.length-1]},h=/(<[^>]+>)/g,m=function(e){return e.replace(h,"")},j=("LED,V,AC,DC,DP,CP,ISO,E,I,R".split(","),function(e){return function(t){return function(e){return m(e)===m(e).toUpperCase()}(t)?function(e){return function(t){var n=-1;return t.split(h).map((function(t,r){return r%2?t:t.replace(/\w+/g,(function(t){return++n,e.find((function(e){return e.toLowerCase()===t.toLowerCase()}))||(0===n?function(e){return e.slice(0,1).toUpperCase()+e.slice(1)}(t.toLowerCase()):t.toLowerCase())}))})).join("")}}(e)(t):t}}),b=function(e){return function(t){return t.reduce((function(e,t){var n=Object(f.a)(t,3),r=n[0],c=n[1],o=n[2];return e.length&&!/[.?!]$/.test(m(v(v(e).chunks)))||e.push({ts:[],chunks:[]}),v(e).ts.push(r),v(e).ts.push(c),v(e).chunks.push(o),e}),[]).map((function(t){var n=t.ts,r=t.chunks;return{ts:[n[0],v(n)],sentence:r.join(" ").split(".").map(j(e)).join(".")}}))}},w=function(e){return function(t){var n=t.split(":").reverse(),r=Object(d.a)(n),c=r[0],o=r.slice(1),a=String(function(e){return function(t){return(n=0,r=999,function(e){return[n,r,e].sort((function(e,t){return t-e}))[1]})(Math.round(t/e*1e3));var n,r}}(e)(Number(c))).padStart(3,"0");return[o.reverse().join(":"),a].join(".")}},x=function(e){return"- ".concat(e)},O=function(e){return e.reduce((function(e,t){var n=t.ts,r=t.sentence,c=[n.map(w(30)).join(" --\x3e "),x(r)].join("\n");return[].concat(Object(s.a)(e),[c])}),["WEBVTT"]).join("\n\n")},g=n(15),C=n.n(g),S=n(16),k=n.n(S),E=n(3),y=function(e){return new Promise((function(t){var n=new FileReader;n.onload=function(e){return t(e.target.result)},n.readAsArrayBuffer(e)}))},L=function(e,t,n){var r=new Blob([t],{type:n}),c=document.createElement("a");c.href=window.URL.createObjectURL(r);var o=e;c.download=o,c.click()},R=function(){var e,t,n=Object(p.a)({defaultValues:{customWords:"LED,V,AC,DC,DP,CP,ISO,E,I,R"}}),c=n.register,o=n.watch,a=n.handleSubmit,i=Object(r.useMemo)((function(){var e;return null!==(e=o("file"))&&void 0!==e?e:[]}),[o]),d=Object(r.useRef)((null!==(e=null===(t=o("customWords"))||void 0===t?void 0:t.split(","))&&void 0!==e?e:[]).map((function(e){return e.trim()})));Object(r.useEffect)((function(){var e,t;d.current=null!==(e=null===(t=o("customWords"))||void 0===t?void 0:t.split(","))&&void 0!==e?e:[]}),[o]);var v=Object(r.useState)(null),h=Object(f.a)(v,2),m=(h[0],h[1]);return Object(r.useEffect)((function(){i.length&&Object(l.a)(u.a.mark((function e(){var t,n,r,c,o,a,l,p,v,h;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=i[0],e.next=3,y(t);case 3:return n=e.sent,r=new C.a.Workbook,e.next=7,r.xlsx.load(n);case 7:return c=[],r.eachSheet((function(e,t){var n=[];c[t]=n,e.eachRow((function(e,t){if(1!==t){var r=[];n.push(r),e.eachCell((function(e){r.push(String(e.value))}))}}))})),o=Object(s.a)(c.entries()).reduce((function(e,t){var n=Object(f.a)(t,2),r=n[0],c=n[1];return c?(e[r]=b(d.current)(c),e):e}),[]),r.eachSheet((function(e,t){e.properties.defaultRowHeight=0,e.columns.forEach((function(e,t){[0,1].includes(t)&&(e.width=12)})),e.eachRow((function(e,n){1!==n&&e.eachCell((function(e,r){var c,a,i=null!==(c=null===(a=o[t])||void 0===a?void 0:a[n-2])&&void 0!==c?c:{},u=i.ts,s=i.sentence;switch(r){case 1:e.alignment={vertical:"top",horizontal:"left",wrapText:!0},e.value=null===u||void 0===u?void 0:u[0];break;case 2:e.alignment={vertical:"top",horizontal:"left",wrapText:!0},e.value=null===u||void 0===u?void 0:u[1];break;case 3:e.alignment={vertical:"top",horizontal:"left",wrapText:!0},e.value=s;break;default:e.value=void 0}}))}))})),m(r),e.next=14,r.xlsx.writeBuffer();case 14:return a=e.sent,l=[],p="".concat(t.name.split(".").slice(0,-1).join("."),"_concat"),l.push({filename:"".concat(p,".xlsx"),content:a,mimeType:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"}),o.map(O).forEach((function(e,t){l.push({filename:"".concat(r.worksheets.find((function(e){return e.id===t})).name,".vtt"),content:(new TextEncoder).encode(e),mimeType:"text/plain"})})),v=new k.a,l.forEach((function(e){var t=e.filename,n=e.content;e.mimeType;v.file(t,n,{})})),e.next=23,v.generateAsync({type:"blob"});case 23:h=e.sent,L("".concat(p,"_").concat((new Date).toISOString(),".zip"),h,"application/zip");case 25:case"end":return e.stop()}}),e)})))()}),[i]),Object(E.jsxs)("form",{onChange:a((function(e){localStorage.setItem("form",JSON.stringify(e))})),children:[Object(E.jsx)("br",{}),Object(E.jsxs)("label",{children:["Upload file (XLSX)",Object(E.jsx)("input",{type:"file",name:"file",ref:c})]}),Object(E.jsx)("br",{}),Object(E.jsx)("br",{}),Object(E.jsxs)("label",{children:["Words not to lower-case (comma separated, case sensitive for output)",Object(E.jsx)("textarea",{name:"customWords",ref:c})]})]})};a.a.render(Object(E.jsx)(c.a.StrictMode,{children:Object(E.jsx)(R,{})}),document.getElementById("root"))}},[[32,1,2]]]);
//# sourceMappingURL=main.35ce35d7.chunk.js.map