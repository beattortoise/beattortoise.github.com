var calUtil = {  
  //当前日历显示的年份  
  showYear: '',  
  //当前日历显示的月份  
  showMonth: '',  
  //当前日历显示的天数  
  nowDays:1,  
  eventName:"load",  
  data: '',
  //初始化日历  
  init:function(){  
	var signList = this.data;
	calUtil.showYear = this.showYear;
	calUtil.showMonth = this.showMonth;
    calUtil.setMonthAndDay();  
    calUtil.draw(signList);  
    calUtil.bindEnvent();  
  },  
  draw:function(signList){  
    //绑定日历  
    var str = calUtil.drawCal(calUtil.showYear,calUtil.showMonth,calUtil.nowDays,signList);  
    $("#calendar").html(str);  
    //绑定日历表头  
    var calendarName=calUtil.showYear+"年"+calUtil.showMonth+"月";  
    $(".calendar_month_span").html(calendarName);    
  },  
  //绑定事件  
  bindEnvent:function(){  
    //绑定上个月事件  
    $(".calendar_month_prev").click(function(){  
      //ajax获取日历json数据  
      calUtil.eventName="prev";  
      calUtil.init();  
    });  
    //绑定下个月事件  
    $(".calendar_month_next").click(function(){  
      //ajax获取日历json数据  
      calUtil.eventName="next";  
      calUtil.init();  
    });  
	//hover 显示回款信息 
	$('.on').hover(function() {
		$(this).find('p').show();
		
	},function() {
		$(this).find('p').hide();

	})
  },  
  //获取当前选择的年月  
  setMonthAndDay:function(){  
    switch(calUtil.eventName)  
    {  
      case "load":  
        var current = new Date();  
        calUtil.showYear = calUtil.showYear||current.getFullYear();  
        calUtil.showMonth = calUtil.showMonth||current.getMonth() + 1;  
        calUtil.nowDay = current.getDate(); 
        break;  
      case "prev":  
        var nowMonth=$(".calendar_month_span").html().split("年")[1].split("月")[0];  
        calUtil.showMonth=parseInt(nowMonth)-1;  
        if(calUtil.showMonth==0)  
        {  
            calUtil.showMonth=12;  
            calUtil.showYear-=1;  
        }  
        break;  
      case "next":  
        var nowMonth=$(".calendar_month_span").html().split("年")[1].split("月")[0];  
        calUtil.showMonth=parseInt(nowMonth)+1;  
        if(calUtil.showMonth==13)  
        {  
            calUtil.showMonth=1;  
            calUtil.showYear+=1;  
        }  
        break;  
    }  
  },  
  getDaysInmonth : function(iMonth, iYear){  
   var dPrevDate = new Date(iYear, iMonth, 0);  
   return dPrevDate.getDate();  
  },  
  bulidCal : function(iYear, iMonth) {  
   var aMonth = new Array();  
   aMonth[0] = new Array(7);  
   aMonth[1] = new Array(7);  
   aMonth[2] = new Array(7);  
   aMonth[3] = new Array(7);  
   aMonth[4] = new Array(7);  
   aMonth[5] = new Array(7);  
   aMonth[6] = new Array(7);  
   var dCalDate = new Date(iYear, iMonth - 1, 1);  
   var iDayOfFirst = dCalDate.getDay();  
   var iDaysInMonth = calUtil.getDaysInmonth(iMonth, iYear);  
   var iVarDate = 1;  
   var d, w;  
   aMonth[0][0] = "日";  
   aMonth[0][1] = "一";  
   aMonth[0][2] = "二";  
   aMonth[0][3] = "三";  
   aMonth[0][4] = "四";  
   aMonth[0][5] = "五";  
   aMonth[0][6] = "六";  
   for (d = iDayOfFirst; d < 7; d++) {  
    aMonth[1][d] = iVarDate;  
    iVarDate++;  
   }  
   for (w = 2; w < 7; w++) {  
    for (d = 0; d < 7; d++) {  
     if (iVarDate <= iDaysInMonth) {  
      aMonth[w][d] = iVarDate;  
      iVarDate++;  
     }  
    }  
   }  
   return aMonth;  
  },  
  ifHasSigned : function(signList,day){  
   var signed = '';  
   $.each(signList,function(index,item){  
		 // 扩展
		 var item_s = item.payday;
		 var item_d = item_s.substr(8,2);
		 var item_m = item_s.substr(5,2);

		if(item_m.substr(0,1) == 0) {
			item_m = item_m.substr(1,1);
		}

		if(item_d.substr(0,1) == 0) {
			item_d = item_d.substr(1,1);
		}
		console.log(item_d);

		if(item_s.substr(0,4) == calUtil.showYear && item_m == calUtil.showMonth && item_d == day) {  
		 signed = item.plat+'-'+item.mark;  
		}  
   });  

   return signed ;  
  },  
  drawCal : function(iYear, iMonth ,iDay,signList) {  
   var myMonth = calUtil.bulidCal(iYear, iMonth);  
   var htmls = new Array();  
   htmls.push("<div class='sign_main' id='sign_layer'>");  
   htmls.push("<div class='sign_succ_calendar_title'>");  
   htmls.push("<div class='calendar_month_next'>下月</div>");  
   htmls.push("<div class='calendar_month_prev'>上月</div>");  
   htmls.push("<div class='calendar_month_span'></div>");  
   htmls.push("</div>");  
   htmls.push("<div class='sign' id='sign_cal'>");  
   htmls.push("<table>");  
   htmls.push("<tr>");  
   htmls.push("<th>" + myMonth[0][0] + "</th>");  
   htmls.push("<th>" + myMonth[0][1] + "</th>");  
   htmls.push("<th>" + myMonth[0][2] + "</th>");  
   htmls.push("<th>" + myMonth[0][3] + "</th>");  
   htmls.push("<th>" + myMonth[0][4] + "</th>");  
   htmls.push("<th>" + myMonth[0][5] + "</th>");  
   htmls.push("<th>" + myMonth[0][6] + "</th>");  
   htmls.push("</tr>");  
   var d, w;  

   //做判断 是否今天
   var date = new Date();

   for (w = 1; w < 6; w++) {  
    htmls.push("<tr>");  
    for (d = 0; d < 7; d++) {  
     var ifHasSigned = calUtil.ifHasSigned(signList,myMonth[w][d]);  

     if(ifHasSigned){  
      htmls.push("<td class='on "+ (iYear == date.getFullYear() && iMonth == date.getMonth()+1 && date.getDate() == myMonth[w][d]? "nowday": "")+"'><span>" + (!isNaN(myMonth[w][d]) ? myMonth[w][d] : " ") + "</span><p>"+ifHasSigned+"</p></td>");  
     } else {  
      htmls.push("<td class='"+ (iYear == date.getFullYear() && iMonth == date.getMonth()+1 && date.getDate() == myMonth[w][d]? "nowday": "")+"'><span>" + (!isNaN(myMonth[w][d]) ? myMonth[w][d] : " ") + "</span></td>");  
     }  
    }  
    htmls.push("</tr>");  
   }  
   htmls.push("</table>");  
   htmls.push("</div>");  
   htmls.push("</div>");  
   return htmls.join('');  
  }  
};  
