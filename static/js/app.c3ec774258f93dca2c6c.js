webpackJsonp([0,2],[,,,,,,,,,,function(e,t,s){"use strict";var n=s(3),a=s(66),r=s(54),i=s.n(r),o=s(51),c=s.n(o);n.a.use(a.a),t.a=new a.a({routes:[{path:"/index",name:"Index",component:i.a},{path:"/",name:"Home",component:c.a}]})},function(e,t,s){"use strict";var n=s(3),a=s(2),r=s(15),i=s.n(r);n.a.use(a.a),t.a=new a.a.Store({state:{step:{done:0,current:1},message:{user:{},goods:[{name:"",id:""}]},order:{phone:{name:"",id:""},fault:{id:"",name:"",faults:{id:"",name:"",price:""}},store:[{id:"",area:"",time:{day:"",range:""}},{id:""},{id:""}]}},mutations:{SET_MESSAGE:function(e,t){e.message=t.res.data.message,console.log(e.message)},CHOOSE_ONE:function(e,t){console.log(e),e.step.done===e.step.current-1&&e.step.done++,e.step.current=e.step.done+1},GO_STEP:function(e,t){console.log(e),e.step.current=t}},actions:{setMessage:function(e,t){var s=e.commit;setTimeout(function(){i.a.get("/vue/index").then(function(e){s("SET_MESSAGE",{res:e})})},5e3)},chooseOne:function(e,t){(0,e.commit)("CHOOSE_ONE",t)},goStep:function(e,t){(0,e.commit)("GO_STEP",t)}},getters:{getUser:function(e){return e.message.user},getGoods:function(e){return e.message.goods},getFaults:function(e){return e.message.fault},getOrder:function(e){return e.order},getStep:function(e){return e.step}}})},function(e,t){},function(e,t){},function(e,t,s){s(48);var n=s(1)(s(33),s(64),null,null);e.exports=n.exports},,,,,,,,,,,,,,,,,,,function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={name:"app",data:function(){return{}},created:function(){this.$store.dispatch("setMessage")},computed:{},components:{}}},function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={name:"home",data:function(){return{show:!0}},created:function(){this.cal()},computed:{user:function(){return this.$store.getters.getUser}},methods:{cal:function(){var e=this,t=setInterval(function(){e.user.uid&&(e.show=!1,clearInterval(t))},1e3)}}}},function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=s(41),a=s.n(n);t.default={name:"date",props:{area:{}},data:function(){return{tindex:"",range:[],cindex:0}},created:function(){},watch:{area:function(){this.cal(),this.$nextTick(function(){this.dateScroll=new a.a(this.$refs.date,{click:!0,scrollX:!0})})}},computed:{times:function(){return["9:00 ~ 11:00","11:00 ~ 13:00","12:00 ~ 13:00","11:00 ~ 13:00","11:00 ~ 13:00","11:00 ~ 13:00"]},order:function(){return this.$store.getters.getOrder}},methods:{choose_time:function(e,t){this.tindex=e,this.order.store[0].time.range=t},choose_range:function(e,t){this.cindex=e,this.order.store[0].time.day=t.month+"月"+t.day+"日"},cal:function(){var e=[31,28,31,30,31,30,31,31,30,31,30,31],t=new Date,s={year:t.getFullYear(),month:t.getMonth()+1,day:t.getDate(),week:t.getDay(),time:[1,4,5,3,2,1]};(s.year%400==0||s.year%4==0&&s.year%100!=0)&&(e[1]=29),this.order.store[0].time.day=s.month+"月"+s.day+"日";for(var n=[],a=0;a<14;a++){var r=s.day+a,i=s.month,o=s.year;r>e[s.month]&&(r-=e[s.month],(i+=1)>12&&(o+=1));var c={year:o,month:i,day:r,time:s.time};n.push(c)}n[0].time=[3,4,11,22,33,11],this.range=n}}}},function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=s(2);t.default={data:function(){return{}},computed:n.a.mapGetters({user:"getUser"})}},function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=s(53),a=s.n(n),r=s(55),i=s.n(r),o=s(56),c=s.n(o),d=s(57),u=s.n(d);t.default={name:"index",data:function(){return{tabs:[{show:!1,name:"维修流程",list:[{name:"报价",link:"xx"},{name:"服务",link:"javascript:;"}]},{show:!1,name:"维修流程",list:[{name:"报价",link:"xx"},{name:"服务",link:"javascript:;"}]},{show:!1,name:"维修流程",list:[{name:"报价",link:"xx"},{name:"服务",link:"javascript:;"}]}]}},created:function(){this.user.id||(location.href="/#")},components:{"v-header":a.a,pageOne:i.a,pageTwo:c.a,pageThree:u.a},computed:{step:function(){return this.$store.getters.getStep},user:function(){return this.$store.getters.getUser}}}},function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=s(2);t.default={name:"page1",computed:n.a.mapGetters({items:"getGoods",step:"getStep",order:"getOrder"}),methods:{editOne:function(){this.$store.dispatch("goStep",1)},choose_one:function(e,t){this.order.phone=t,this.$store.dispatch("chooseOne")}}}},function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=s(2);t.default={name:"index",data:function(){return{cindex:"",type:"fault",result:{data:[{name:"屏幕类",id:1,faults:[{id:1,name:"屏幕破碎",desc:"屏幕破裂或出现气泡,暂不支持单独内外屏更换",methods:[{name:"更换屏幕总成",price:100},{name:"触摸线路维修",price:300}]},{id:2,name:"屏幕破碎2",desc:"屏幕破裂或出现气泡,暂不支持单独内外屏更换",methods:[{name:"更换屏幕",price:100}]}]},{name:"电池类",id:2,faults:[{id:1,name:"电池损毁",desc:"屏幕破裂或出现气泡,暂不支持单独内外屏更换",methods:[{name:"更换电池总成",price:100},{id:2,name:"触摸线路维修",price:300}]},{name:"电池损毁2",desc:"屏幕破裂或出现气泡,暂不支持单独内外屏更换"}]}]}}},computed:n.a.mapGetters({items:"getFaults",step:"getStep",order:"getOrder"}),methods:{editOne:function(){this.$store.dispatch("goStep",2)},choose_one:function(e,t){this.order.fault.name=t.name,this.order.fault.id=t.id,this.order.fault.faults="",this.cindex=""},choose_next:function(e,t){this.cindex=e,this.order.fault.faults=t,this.$store.dispatch("chooseOne")}}}},function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=s(52),a=s.n(n);t.default={name:"index",data:function(){return{show:!1,stores:["上门维修","寄送维修","到店维修"],areas:[{city:"深圳总部",area:"罗湖，福田，南山，龙华，宝安"},{city:"江苏",area:"罗湖，福田，南山，龙华，宝安"},{city:"河南",area:"罗湖，福田，南山，龙华，宝安"}],cindex:"",aindex:""}},mounted:function(){},computed:{order:function(){return this.$store.getters.getOrder}},methods:{editOne:function(){this.$store.dispatch("goStep",1)},choose_one:function(e){this.cindex=e;for(var t=0;t<this.order.store.length;t++)this.order.store[t].id="",t===e&&(this.order.store[t].id=e)},choose_area:function(e){this.aindex=e,this.order.store[0].area=e,this.order.store[0].time.day=0},edit_one:function(e){this.aindex=""},submit:function(e){/active/.test(e.target.getAttribute("class"))&&(this.show=!0)},goHome:function(){window.location.href="/"}},components:{vDate:a.a}}},,function(e,t){},function(e,t){},function(e,t){},function(e,t){},function(e,t){},function(e,t){},function(e,t){},function(e,t){},,function(e,t,s){s(43);var n=s(1)(s(34),s(59),"data-v-15447c95",null);e.exports=n.exports},function(e,t,s){s(49);var n=s(1)(s(35),s(65),"data-v-f4892ea8",null);e.exports=n.exports},function(e,t,s){s(42);var n=s(1)(s(36),s(58),"data-v-03d300a9",null);e.exports=n.exports},function(e,t,s){s(47);var n=s(1)(s(37),s(63),null,null);e.exports=n.exports},function(e,t,s){s(46);var n=s(1)(s(38),s(62),"data-v-69048442",null);e.exports=n.exports},function(e,t,s){s(45);var n=s(1)(s(39),s(61),"data-v-68e85540",null);e.exports=n.exports},function(e,t,s){s(44);var n=s(1)(s(40),s(60),"data-v-68cc263e",null);e.exports=n.exports},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"head_top",class:{isLogin:e.user.is_login}},[s("a",{staticClass:"top",attrs:{href:"/#/"}},[e._v("header")])])},staticRenderFns:[]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"hello v_middle"},[e.show?s("div",{staticClass:"loader1"},[s("i"),s("i")]):e._e(),e._v(" "),e.show?e._e():s("div",{staticClass:"finished"},[s("a",{staticClass:"enter",attrs:{href:"/#/index"}},[e._v("Enter")])])])},staticRenderFns:[]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"page3"},[s("div",{staticClass:"title"},[e._v("\n    请选择一个维修方式\n  ")]),e._v(" "),s("ul",{staticClass:"store_list clearfix"},e._l(e.stores,function(t,n){return s("li",{class:{active:e.cindex===n},on:{click:function(t){e.choose_one(n)}}},[e._v(e._s(t))])})),e._v(" "),s("div",{directives:[{name:"show",rawName:"v-show",value:0===e.order.store[0].id,expression:"order.store[0].id === 0"}]},[s("div",{staticClass:"name"},[e._v("\n      请选择上门维修区域：\n      "),""!==e.order.store[0].area?s("span",{staticClass:"edit_one",on:{click:e.edit_one}},[e._v("修改")]):e._e(),e._v(" "),e.areas[e.order.store[0].area]?s("div",[e._v(e._s(e.areas[e.order.store[0].area].city)+"("+e._s(e.areas[e.order.store[0].area].area)+")")]):e._e()]),e._v(" "),s("ul",{staticClass:"area"},e._l(e.areas,function(t,n){return""===e.aindex?s("li",{class:{active:e.aindex===n||e.order.store[0].area===n},on:{click:function(t){e.choose_area(n)}}},[s("div",[e._v(e._s(t.city))]),e._v(" "),s("div",{staticClass:"area_desc"},[e._v(e._s(t.area))])]):e._e()})),e._v(" "),s("div",{directives:[{name:"show",rawName:"v-show",value:""!==e.order.store[0].area,expression:"order.store[0].area !== '' "}]},[s("v-date",{attrs:{area:e.order.store[0].area}})],1)]),e._v(" "),s("div",{directives:[{name:"show",rawName:"v-show",value:2===e.order.store[2].id,expression:"order.store[2].id  === 2"}]},[e._v("\n    深圳总部地址\n  ")]),e._v(" "),s("button",{staticClass:"submit",class:{active:2===e.order.store[2].id||1===e.order.store[1].id||""!==this.order.store[0].time.range},on:{click:e.submit}},[e._v("确认维修")]),e._v(" "),e.show?s("div",{staticClass:"mask_result",on:{click:function(t){e.show=!e.show}}},[s("div",{staticClass:"inner"},[s("p",[e._v("你选择的是"+e._s(e.order.phone.name))]),e._v(" "),s("p",[e._v("故障类型: "+e._s(e.order.fault.name))]),e._v(" "),s("p",[e._v("故障描述:  "+e._s(e.order.fault.faults.name)+"-"+e._s(e.order.fault.faults.desc))]),e._v(" "),s("p",[e._v("解决方法:\n        ")]),e._l(e.order.fault.faults.methods,function(t){return s("p",[e._v("\n          "+e._s(t.name)+"---"+e._s(t.price)+"\n        ")])}),e._v(" "),s("p"),e._v(" "),""!==e.order.store[0].id?s("div",[s("p",[e._v(" 选择： 上门维修")]),e._v(" "),e._l(e.areas,function(t,n){return n===e.order.store[0].area?s("p",[e._v("\n          区域地址： "+e._s(t.city)+"--"+e._s(t.area))]):e._e()}),e._v(" "),s("p",[e._v("选择时间: "+e._s(e.order.store[0].time.day)+e._s(e.order.store[0].time.range))])],2):e._e(),e._v(" "),""!==e.order.store[1].id?s("div",[s("p",[e._v(" 选择： 寄送维修")])]):e._e(),e._v(" "),""!==e.order.store[2].id?s("div",[s("p",[e._v(" 选择： 到店维修")])]):e._e(),e._v(" "),s("a",{staticClass:"enter",attrs:{href:"/#/"},on:{click:function(t){t.stopPropagation(),t.preventDefault(),e.goHome(t)}}},[e._v("首页")])],2)]):e._e()])},staticRenderFns:[]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"page2"},[s("transition",{attrs:{name:"fade"}},[e.step.done>1||""!==e.order.fault.name?s("div",{staticClass:"name  border-1px"},[e._v("\n    "+e._s(e.order.fault.name)),e.order.fault.faults.name?s("span",[e._v("("+e._s(e.order.fault.faults.name)+")"),s("br")]):e._e(),e._v(" "),""!==e.order.fault.faults?s("span",{staticClass:"edit_one",on:{click:e.editOne}},[e._v("修改")]):e._e(),e._v(" "),s("div",[e._v(e._s(e.order.fault.faults.desc))]),e._v(" "),e._l(e.result.data,function(t){return e.order.fault.name===t.name?s("div",{staticClass:"fault_detail"},e._l(t.faults,function(t,n){return s("div",[""!==e.order.fault.faults.name&&t===e.order.fault.faults?s("div",{staticClass:"method_wrap"},[s("div",{staticClass:"method_name"},[e._v("相关维修方案")]),e._v(" "),e._l(t.methods,function(t){return s("div",{staticClass:"method"},[e._v("\n            "+e._s(t.name)),s("span",{staticClass:"price"},[e._v("¥"+e._s(t.price))])])})],2):e._e()])})):e._e()})],2):e._e()]),e._v(" "),s("transition",{attrs:{name:"fade"}},[1===e.step.done||2===e.step.current?s("div",{staticClass:"choose"},[""===e.order.fault.name||""!==e.order.fault.faults?s("div",[s("div",{staticClass:"title"},[e._v("\n      选择故障\n     ")]),e._v(" "),s("ul",{staticClass:"phone_list clearfix"},e._l(e.items,function(t){return s("li",{staticClass:"list_item col-xs-6 col-sm-3",class:{active:e.step.done>=1&&t.name===e.order.fault.name},on:{click:function(s){e.choose_one(s,t)}}},[s("div",{staticClass:"item_texts"},[e._v(e._s(t.name))])])}))]):e._e(),e._v(" "),e._l(e.result.data,function(t){return e.order.fault.name===t.name&&""===e.order.fault.faults?s("div",{staticClass:"fault_detail"},[s("div",{staticClass:"name"},[e._v("请选择:")]),e._v(" "),e._l(t.faults,function(t,n){return s("div",{on:{click:function(s){e.choose_next(n,t)}}},[""!=e.order.fault.name?s("div",{staticClass:"fault",class:{active:e.cindex===n}},[s("h3",[e._v(e._s(t.name)+" "),s("span",{class:{"icon-check_circle":e.cindex===n}})]),e._v(" "),s("div",[e._v(e._s(t.desc))])]):e._e()])})],2):e._e()})],2):e._e()])],1)},staticRenderFns:[]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"page1"},[s("transition",{attrs:{name:"fade"}},[e.step.done>0?s("div",{staticClass:"name border-1px"},[e._v("\n    "+e._s(e.order.phone.name)+"\n    "),s("span",{staticClass:"edit_one",on:{click:e.editOne}},[e._v("修改")])]):e._e()]),e._v(" "),s("transition",{attrs:{name:"fade"}},[0===e.step.done||1===e.step.current?s("div",{staticClass:"choose"},[s("div",{staticClass:"title"},[e._v("\n      选择机型\n    ")]),e._v(" "),s("ul",{staticClass:"phone_list clearfix"},e._l(e.items,function(t){return s("li",{staticClass:"list_item col-xs-6 col-sm-3",class:{active:e.step.done>=1&&t.name===e.order.phone.name},on:{click:function(s){e.choose_one(s,t)}}},[s("div",{staticClass:"item_texts"},[e._v(e._s(t.name))])])}))]):e._e()])],1)},staticRenderFns:[]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"index"},[s("v-header"),e._v(" "),e.step.done>=0?s("page-one"):e._e(),e._v(" "),e.step.done>=1?s("page-two"):e._e(),e._v(" "),e.step.done>=2?s("page-three"):e._e(),e._v(" "),0===e.step.done?s("ul",{staticClass:"phone_process"},e._l(e.tabs,function(t){return s("li",{staticClass:"process_list"},[s("div",{staticClass:"title",on:{click:function(e){e.stopPropagation(),t.show=!t.show}}},[e._v(e._s(t.name)),s("span",{class:{"icon-add_circle":!t.show,"icon-remove_circle_outline":t.show}})]),e._v(" "),t.show?s("transition",{attrs:{name:"fade"}},[s("div",{staticClass:"inner"},e._l(t.list,function(t){return s("div",{staticClass:"list_name"},[s("a",{attrs:{href:t.link}},[e._v(e._s(t.name))])])}))]):e._e()],1)})):e._e()],1)},staticRenderFns:[]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{attrs:{id:"app"}},[s("keep-alive",[s("router-view")],1)],1)},staticRenderFns:[]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",[s("div",{staticClass:"name time"},[e._v("\n    请选择上门维修时间：\n  ")]),e._v(" "),s("div",{ref:"date",attrs:{id:"d_wrapper"}},[s("ul",e._l(e.range,function(t,n){return s("li",{class:{active:n===e.cindex},on:{click:function(s){e.choose_range(n,t)}}},[e._v(e._s(t.month)+"月"+e._s(t.day)+"日")])}))]),e._v(" "),s("transition",{attrs:{name:"fade"}},e._l(e.range,function(t,n){return n===e.cindex?s("ul",{staticClass:"phone_list clearfix"},e._l(t.time,function(t,n){return s("li",{staticClass:"list_item col-xs-6 col-sm-3",class:{active:n===e.tindex},on:{click:function(t){e.choose_time(n,e.times[n])}}},[s("div",{staticClass:"item_texts",staticStyle:{"line-height":"2.4rem"}},[e._v(e._s(e.times[n])),s("div",[e._v(e._s(t))])])])})):e._e()}))],1)},staticRenderFns:[]}},,,,function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=s(3),a=s(11),r=s(14),i=s.n(r),o=s(10),c=s(13),d=(s.n(c),s(12));s.n(d);n.a.config.productionTip=!1,new n.a({el:"#app",router:o.a,store:a.a,render:function(e){return e(i.a)}})}],[69]);
//# sourceMappingURL=app.c3ec774258f93dca2c6c.js.map