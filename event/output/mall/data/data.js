$(function() {
// 基于准备好的dom，初始化echarts实例
	var xAxis = [];
	var yAxis=[];
	$.ajax({
			type: 'get',
			url:'http://m.boardwalk.cn/api/sk/GetChartList?compId=14&chartType=1',
			success: function(data)  {
				var data = $.parseJSON(data);
				var chartList = data.ChartList;
				for(var i=0; i<chartList.length; i++) {
					xAxis.push(chartList[i].XAxis);
					yAxis.push(chartList[i].YAxis);
				}
				var myChart = echarts.init(document.getElementById('profit'));
				makeOneChart(myChart);
			}
	})
	function makeOneChart(myChart) {
		option = {
			backgroundColor: '#3babfd',
			color: ['#fff'],
			tooltip: {
				trigger: 'axis',
				position: function (pt) {
					return [pt[0], '10%'];
				}
				
			},
			title: {
				left: 'center',
				top: '10',
				text: '利率走势',
				textStyle: {
					color: '#fff'
				}
			},
			toolbox : {
				show : false
			},
			xAxis: {
				axisLabel: {
					textStyle: {
						color: '#fff'
					},
				},
				axisTick: {
					"show": false
				},
				axisLine: {
					lineStyle: {
						color: '#fff'
					}
				},
				type: 'category',
				boundaryGap: false,
				data: xAxis

			},
			yAxis: {
				type: 'value',
				boundaryGap : [ 0.05, 0.05 ],
				axisTick: {
					"show": false
				},
				axisLine: {
					lineStyle: {
						color: '#fff'
					}
				},
				axisLabel: {
					formatter: '{value} %',
					textStyle: {
						color: '#fff'
					},
				}
			},
			dataZoom: [
			{
					"show": true,
					"height": 15,
					"xAxisIndex": [
						0
					],
					start: 98,
					end: 100,
					bottom: 10,
					handleIcon: 'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
					handleSize: '120%',
					handleStyle:{
						color:"#fff",
						width: '20',
					},
				   textStyle:{
				   color:"#fff"},
				   borderColor:"#fff"
					
					
				}, {
					"type": "inside",
					"show": true,
					"height": 15,
				}
			],
			series: [
				{
					name:'利率',
					type:'line',
					smooth: true,
					data: yAxis
				}
			]
		};

		// 使用刚指定的配置项和数据显示图表。
		myChart.setOption(option);
	}
})
