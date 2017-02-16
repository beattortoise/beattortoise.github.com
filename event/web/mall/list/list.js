$(function() {
	var $sift = $('.sift');
	//设定一个筛选数据的结构
	var province = []; //省份
	var	profit = [];  //收益
	var onlineTime = []; //上线时间
	var plat = []; //平台 

	var $trd = $sift.find('.s_right');
	var $tmd = $sift.find('.s_mid');
	var data = {
			province: 0, 
			income: 0, 
			onlineTime: 0, 
			platForm: 0,
			pageIndex: 1,
			pageSize: 20
		}

	Ajax(data);


	$tmd.on('click', 'a', function() {  //控制全选按钮 
		var $this = $(this);
		if($this.hasClass('active')) {
			$this.removeClass('active');
		}else {
			$this.addClass('active');
			var $type = $this.closest('tr');
			if($type.hasClass('province')) {  
				data.province = 0;
				province.length = 0;;
			}
			if($type.hasClass('profit')) {  
				data.income= 0;
				profit.length=0;
			}
			if($type.hasClass('onlineTime')) {  
				data.onlineTime =0;
				onlineTime.length=0;
			}
			if($type.hasClass('plat')) {  
				data.platForm = 0;
				plat.length=0;
			}
			$type.find('.s_right').find('a').removeClass('active');
			data.pageIndex = 1;

			Ajax(data);
		}
	})


	$trd.on('click', 'a', function() {
		var $this = $(this);
		//获取类型 
		var $type = $this.closest('tr');

		//样式处理 
		if($this.hasClass('active')) {
			$this.removeClass('active');
			if($type.hasClass('province')) {  
				province.splice($.inArray($this.html(),province),1);
			}
			if($type.hasClass('profit')) {
				profit.splice($.inArray($this.data('val'),profit),1);
			}
			if($type.hasClass('onlineTime')) {
				onlineTime.splice($.inArray($this.data('val'),onlineTime),1);
			}
			if($type.hasClass('plat')) {
				plat.splice($.inArray($this.data('val'),plat),1);
			}
			if(!$type.find('.s_right .active').length) {
				$type.find('.s_mid').find('a').addClass('active');
			}
		}else {
			$this.addClass('active');
			$type.find('.s_mid').find('a').removeClass('active');//移除 全部样式

			if($type.hasClass('province')) {  
				province.push($this.html())
				$('.province').find('.s_mid').find('a').removeClass('active');
			}
			if($type.hasClass('profit')) {
				profit.push($this.data('val'));
				$('.profit').find('.s_mid').find('a').removeClass('active');
			}
			if($type.hasClass('onlineTime')) {
				onlineTime.push($this.data('val'));
				$('.onlineTime').find('.s_mid').find('a').removeClass('active');
			}
			if($type.hasClass('plat')) {
				plat.push($this.data('val'));
				$('.plat').find('.s_mid').find('a').removeClass('active');
			}
		}

		data = {
			province: province.join(',')||0, 
			income: profit.join(',')||0, 
			onlineTime: onlineTime.join(',')||0, 
			platForm: plat.join(',')||0,
			pageIndex: 1,
			pageSize: 20
		}
		Ajax(data);

	})
	function Ajax(data) {
		var url = 'http://m.boardwalk.cn/api/sk/GetCompanyPagingListByCondition';
		var html = '';
		$.ajax({
				type:"get",
				data: data,
				url: url,
				success: function (json) {
					var json = $.parseJSON(json);
					createHtml(json.CompanyList);
					var $resultNum = $('.result span');
					$resultNum.html(json.rowCount);
					var page = new Page({
						wrap: $('.page_list'),
						url: url,
						data: data,
						type: 'json',
						totalPage: Math.ceil(json.rowCount/20), 
						callback: function(json, page) {
							html = '';
							var json = $.parseJSON(json);
							createHtml(json.CompanyList);

						}   
					}); 
				}
		})
		var $resultList = $('.result_list');
		function createHtml(list) {
			for(var i = 0; i<list.length; i++) {
				html += '<div class="margin30 r_list">'+
					'<div class="header_box clear">'+
						'<div class="header_left">'+
							'<a href="data.html"><img src="images/Company/'+list[i].CompLogo+'" /></a>'+
							'<a class="right_button" href="data.html">+ 关注</a>'+
						'</div>'+
						'<div class="header_right">'+
							'<a href="data.html" class="r_title">'+list[i].Name+'</a>'+
							'<p>平均收益：'+list[i].AverageIncome*100+'% <span></span>              投资期限：'+list[i].InvestmentTerm+'</p>'+
							'<p>上线时间：'+list[i].OnlineTime+'  <span></span>     注册资本：'+list[i].RegisteredCapital+'   <span></span>      注册地：'+list[i].RegisteredProvince+'</p>'+
						'</div>'+
					'</div>'+
				'</div>'
		

			}
			$resultList.html(html);

		}

	}
})
