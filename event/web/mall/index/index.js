var chart_value;
var chart;
//删除冗余代码要查看请至svn20150702之前版本
/**
 * Spline Chart Template
 */
function getCandlestick(series) {
    return {
        chart: {
			backgroundColor: 'rgba(255, 255, 255, 0)',
            width: 750,
            height: 322
        },
        rangeSelector: {
            enabled:false,			//暂时关闭
            inputEnabled: false   //关闭日期区间的输入
        },
        credits:{
            enabled: false
        },
        scrollbar:{
            enabled:false
        },
        navigator: {
            enabled:false
        },
        title: {
            text: ''
        },
        xAxis:[{
            type: 'date', //定义x轴上日期的显示格式
            gridLineColor:'#dcdcdc',
            gridLineDashStyle:'Dot',
            labels: {
                formatter: function() { return Highcharts.dateFormat('%m/%d', this.value);},
                align: 'center'
            }
        }],
        yAxis: [{
            labels:{
                enabled:false
            },
            gridLineColor:'#dcdcdc',
            gridLineDashStyle:'Dot',
            height: 100,
            opposite: false
        }, {
            labels:{
                enabled:false
            },
            gridLineColor:'#dcdcdc',
            gridLineDashStyle:'Dot',
            top: 160,
            height: 130,
            offset: 20
        },{
            labels:{
                enabled:false
            },
            gridLineColor:'#dcdcdc',
            gridLineDashStyle:'Dot',
            top: 160,
            height: 130,
            opposite: false,
            offset: 0
        }],
        tooltip:{
            xDateFormat:"%Y年%m月%d日",
            backgroundColor: 'rgba(255, 255, 255, 0.8)',   // 背景颜色
            borderColor: 'rgba(255, 255, 255, 0.8)',         // 边框颜色
            style: {                      // 文字内容相关样式
                color: "#666",
                fontSize: "12px",
                fontFamily: "Courir new"
            }
        },
        legend:{
            enabled: true,
            layout: 'vertical',
            backgroundColor: '#FFFFFF',
            floating: false,
            align: 'right',
            verticalAlign: 'top',
            x: 0,
            y: 200,
            itemMarginBottom:5,
            itemStyle:{
                color:'#999',
                fontWeight:'normal'
            }
        }, 
        series:series
    }
}
function getCandlestick1(series) {
    return {
        chart: {
            backgroundColor: 'rgba(255, 255, 255, 0)',
            width: 750,
            height: 302
        },
        rangeSelector: {
            enabled:false,			//暂时关闭
            inputEnabled: false   //关闭日期区间的输入
        },
        credits:{
            enabled: false
        },
        scrollbar:{
            enabled:false
        },
        navigator: {
            enabled:false
        },
        title: {
            text: ''
        },
        xAxis:[{
            type: 'date', //定义x轴上日期的显示格式
            gridLineColor:'#dcdcdc',
            gridLineDashStyle:'Dot',
            labels: {
                formatter: function() { return Highcharts.dateFormat('%m/%d', this.value);},
                align: 'center'
            }
        }],
        yAxis: [{        
            labels:{
                enabled:false
            },
            gridLineColor:'#dcdcdc',
            gridLineDashStyle:'Dot',
            height: 100,
            opposite: false
        }, {
            labels:{
                enabled:false
            },
            gridLineColor:'#dcdcdc',
            gridLineDashStyle:'Dot',
            top: 120,
            height: 130,
            offset: 20
        },{
            labels:{
                enabled:false
            },
            gridLineColor:'#dcdcdc',
            gridLineDashStyle:'Dot',
            top: 120,
            height: 130,
            opposite: false,
            offset: 0
        }],
        tooltip:{
            xDateFormat:"%Y年%m月%d日",
            backgroundColor: 'rgba(255, 255, 255, 0.8)',   // 背景颜色
            borderColor: 'rgba(255, 255, 255, 0.8)',         // 边框颜色
            style: {                      // 文字内容相关样式
                color: "#666",
                fontSize: "12px",
                fontFamily: "Courir new"
            }
        },
        legend:{
            enabled: true,
            layout: 'vertical',
            backgroundColor: '#FFFFFF',
            floating: false,
            align: 'right',
            verticalAlign: 'top',
            x: 0,
            y: 200,
            itemMarginBottom:5,
            itemStyle:{
                color:'#999',
                fontWeight:'normal'
            }
        },    
        series:series
    }
}
function paserStockData(data){
    var rate = [],money = [],outCount = [];

    for (var i = 0; i < data.length; i++) {
        rate.push([
            data[i][0], // the date
            data[i][1] // spline
        ]);
        money.push([
            data[i][0], // the date
            data[i][3] // the exponent
        ]);
        outCount.push([
            data[i][0], // the date
            data[i][2]
        ])
    }

    var groupingUnits = [
        ['week',[1]],
        ['month',[1, 2, 3, 4, 5, 6]]
    ];

    var series=[{
        name: '利率指数',
        data: rate,
        dataGrouping: {
            units: groupingUnits
        },
        events: {
            legendItemClick: function(e) {
                return false; // 直接 return false 即可禁用图例点击事件
            }
        },
        color:'#ff694c'
    }, {
        type: 'areaspline',
        name: '成交量指数',
        data: money,
        yAxis: 1,
        dataGrouping: {
            units: groupingUnits
        },
        events: {
            legendItemClick: function(e) {
                return false; // 直接 return false 即可禁用图例点击事件
            }
        },
        color:'#ffff36',
    }, {
        type: 'areaspline',
        name: '人气指数',
        data: outCount,
        yAxis: 2,
        dataGrouping: {
            units: groupingUnits
        },
        events: {
            legendItemClick: function(e) {
                return false; // 直接 return false 即可禁用图例点击事件
            }
        },
        color:'#1499f9'
    }];
    return series;
}
$(function(){
    Highcharts.setOptions({
        global: {
            useUTC: false
        }
    });
    $.ajax({
        url:"http://www.wdzj.com/wdzj/html/json/exponent-chart-10.json",
        dataType:"jsonp",
        jsonpCallback: 'chartJsonpData',
        success: function (json){
            chart_value = json;
            daySpline('0','总交易量');
        }
    });
});
var firstFlag = false;
var zeroData;
function daySpline(id, name){
	if(firstFlag == true) {
		$(".data_dwm li a").removeClass("cur");
		$(".data_dwm li a").eq(0).addClass("cur");
	}
	firstFlag = true;
	
    if(chart_value){
        if(chart_value.length > 1){
            $.each(chart_value, function(i, item){
                if(item.platId == id){
                    var json = paserStockData(item.data);
                    if(id == 0){
                        $("#chartdiv"+id).highcharts('StockChart',getCandlestick1(json));
                    }else{
                        $("#chartdiv"+id).highcharts('StockChart',getCandlestick(json));
                    }
                    return;
                }
            });
        }else{
            if(!zeroData){
                zeroData = [];
                var data = chart_value.day[0].data;
                for(var i = 0; i < data.length; i++){
                    zeroData[i] = [];
                    zeroData[i][0] = data[i][0];
                    for(var j = 1; j < data[i].length; j++){
                        zeroData[i][j] = 0;
                    }
                }
            }
            var json = paserStockData(zeroData);
            if(id == 0){
                $("#chartdiv"+id).highcharts('StockChart',getCandlestick1(json));
            }else{
                $("#chartdiv"+id).highcharts('StockChart',getCandlestick(json));
            }
        }
    }
}

//图表数据平台切换
function changeDiv(id){

	$("div[id^=chartdiv]").hide();
	
	$("#chartdiv"+id).show();
	if($("#chartdiv"+id).html() == ""){
        daySpline(id);
	}
	
	if(id==0) {
		$("#versionShow").show();
	} else {
		$("#versionShow").hide();
	}
	$('.tabUl li').removeClass('on')

	$("#chart_btn_"+id).addClass('on');
}
