$(function(){
	var myDate = {};
	var normalDate = {};

	myData = [
		{plat: '支付宝', 
		 mark: '财付通',
		 money: 1,
		 year: 1,
		 week: 1,
		 day: '2017/01/01',
		 cal: 0.000027397260273972603,
		 payment: 1.000027397260274,
		 payday: '2017/01/08',
		 type: 'bank'
		}
	];

	function getChart(sel) {  //处理类型
		var bank=0,insurance =0;
		var shortNum=0,longNum=0, midNum=0;
		var data = [];
		for(var i=0; i<myData.length; i++) {
			if(sel == 'type') {
				switch(myData[i].type) {
					case'bank':
						bank++;
						break;
					case'insurance':
						insurance++;
						break;
				}

				data = [
					{value: bank, name: '银行理财'},
					{value: insurance, name: '保险'},
				]

			}

			if(sel == 'week') {
				if(myData[i].week > 11) {
					longNum++;
				}else if(myData[i].week > 5) {
					midNum++;
				}else if(myData[i].week > 0) {
					shortNum++;
				}
				data = [
					{value: shortNum, name: '短期'},
					{value: midNum, name: '中期'},
					{value: longNum, name: '长期'}
				]
			}

			if(sel == 'year') {
				if(myData[i].year > 10) {
					longNum++;
				}else if(myData[i].year > 5) {
					midNum++;
				}else if(myData[i].year > 0) {
					shortNum++;
				}
				data = [
					{value: shortNum, name: '<=5%'},
					{value: midNum, name: '5%<x<=10%'},
					{value: longNum, name: '>10%'}
				]
			}
		}
		return data;
	}

	var	option = {
			color: ['#fd6649','#54dc8a', '#0ba57f', '#5ca0ca', '#4f5e73','#95a8ad',  '#b68f6b', '#f8937f','#6e7074', '#546570', '#c4ccd3'],
			legend: {
				orient: 'vertical',
				x: 'right',
				top: '40',
				itemWidth: '15',
				formatter: '{name}',
				data: [],
			},
			series: [
				{
					name:'数据分析',
					type:'pie',
					radius: ['50%', '80%'],
					avoidLabelOverlap: false,
					label: {
						normal: {
							show: false,
							position: 'center'
						},
						emphasis: {
							show: true,
							formatter: "{b}\n({d}%)",
							textStyle: {
								fontSize: '22',
								fontWeight: 'bold',
							}
						}
					},
					labelLine: {
						normal: {
							show: false
						}
					},
					data: [

					]
				}
			]
	};



	function pageLoad() {
		 $('.circle').map(function(i,item){
			var _sel = $(this).attr('id');   //初始化chart
			option.series[0].data = getChart(_sel); 
			option.legend.data = getChart(_sel);

			echarts.init(document.getElementById(_sel)).setOption(option);

		 })
		$(".form_datetime").datetimepicker({
			format: 'yyyy/mm/dd',
			minView: 2,
			autoclose: true,
			startDate: "",
		});  //初始化日期插件

		calUtil.data = myData;
		calUtil.init();
	}

	pageLoad();  //执行

	var date = new Date();

	normalData = {
		plat: '',
		mark: '',
		money: '',
		year: '',
		week: '',
		day: '',
		cal: '',
		payment: '',
		payday: '',
		type: 'bank'  //  默认银行产品
	}  

	var dataArr = ['plat','mark','money','year','week','day','cal','payment','payday','type'];


	var app =  new Vue({
		el: '#app',
		data: {
			myData: myData,
			normalData: normalData,
			old: ''  // 记录旧值做对比

		},
		mounted: function() {
			$(".form_datetime").datetimepicker({
				format: 'yyyy/mm/dd',
				minView: 2,
				autoclose: true
			});  //初始化日期插件
		},
		methods: {
			doDiv: function(data,e,isAdd) {  //data是传进来的数据组值，add是判断是否新增 
				$(".form_datetime").datetimepicker({
					format: 'yyyy/mm/dd',
					minView: 2,
					autoclose: true,
					startDate: "",
				});  //初始化日期插件
				var $this = $(e.target);
				$this.hide();
				$this.siblings('input').show().focus();
				this.old = $this.html();
			},
			doInput: function(data,e,isAdd) {
				var $this = $(e.target);
				$this.hide();
				$this.siblings('div').show();
				//判断当输入条件 满足时发生  值的改变
				if($this.hasClass('form_datetime')) {
					$this.change(function() {
						data.day = $(this).val();
						cal();
						//新建
						if(isAdd == 'add') {
							add();
						}else {
							if(this.old != $.trim($this.val())) {
								pageLoad();
							}
						}
					})
				}else {
					cal();
					if(isAdd == 'add') {
						add();
					}else {
						if(this.old != $.trim($this.val())) {
							pageLoad();
						}
					}
				}

				function cal() { //运算
					if(data.day && data.week) {
						var time = new Date(data.day).getTime()+60*60*24*7*data.week*1000;  //多少周
						var arr = new Date(time).toLocaleString().split(" ")[0].split('/');
						for(var a=0; a<arr.length; a++) {  //1转换01
							if(arr[a].length ==  1) {
								arr[a] = '0'+arr[a];
							}
						}
						data.payday = arr.join('/');
					}
					if(data.week && data.year && data.money) {
							data.cal = parseFloat(data.money)*parseFloat(data.week)/365 * parseFloat(data.year/100);  //预计收益
							data.payment= parseFloat(data.money)*parseFloat(data.week)/365 * parseFloat(data.year/100)+parseFloat(data.money);  //预计收益
							pageLoad();
					}
				}

				function add() {  // 新增 
					if(data.plat && data.money && data.year && data.week && data.day) {
						myData.push(JSON.parse(JSON.stringify(data)));
						for(var i=0; i<dataArr.length; i++) {
							this.normalData[dataArr[i]] = '';
						}

						setTimeout(function() {
							this.normalData.day = '';
						},1);   //hackbug

						pageLoad();
					}
				}
			},
			doDelete: function(i) {
				if(confirm("确定要删除吗？")) {
					myData.splice(i,1);  //删除
					pageLoad();
				}
			}
		}
	})


	$('.intro_now').on('click', function() {  //跳到当前日期
		var $this = $(this);
		calUtil.showYear= '';
		calUtil.showMonth= '';
		calUtil.data = myData;
		calUtil.eventName= 'load';

		calUtil.init(); 

	})

	$('#app').on('click','.payCheck', function() { //查看日期
		var $this = $(this);
		var _date = $this.siblings('span').text();

		var fYear = _date.substr(0,4);
		var fMonth = _date.substr(5,2);
		if(fMonth.substr(0,1) == 0) {
			fMonth = fMonth.substr(1,1);
		}

		calUtil.showYear= fYear;
		calUtil.showMonth= fMonth;
		calUtil.data = myData;
		calUtil.eventName= 'load';

		calUtil.init(); 

	})
})

