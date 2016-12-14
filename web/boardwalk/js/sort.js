$(function() {
	//banenr
	/*
    var swiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        slidesPerView: 1,
        paginationClickable: true,
        spaceBetween: 30,
        loop: true
    });
	*/


	$('tr td').on('click', function() {
		if($(this).hasClass('active')) {
			$(this).removeClass('active');
		}else {
			$(this).addClass('active');
		}
	})

	$('.add').on('click', function() {
		var $brand = $('.brand');
		var tableArr = [];
		$brand.each(function(eq) {
			var item = $(this);
			var $table = item.find('table');
			var tableLength = $table.length;  //多少个table
			var html = '';
			var table = '';

			//做一个数组
			var arr = [];   //[1,2,3,2,1]  

			for(var i=0; i<tableLength; i++) {  //
				i == 0 ? arr[i] = 1 : arr[i] = $table.eq(i).find('.active').length;  //每个数据记录
			}
			//if(item.find('.active').length >= tableLength){ arr.length = 0};//都没有选中

			var sort = function(arr) {
				//两个开始组合
				var num1 = arr[0];
				var num2 = arr[1];

				var len = arr.length;

				var cacheArr = new Array();  //做缓存比较结果

				//如果前者是数组
				if($.isArray(num1)) {
					for(var i = 0; i < num1.length; i++) {
						for(var j=0; j<num2; j++) {
							var k = num1[i].slice();
							k.push(j);
							cacheArr.push(k);
						}
					}

				}else{   //简单组合
					for(var i=0; i<num1; i++) {
						for(var j=0; j<num2; j++) {
							var value = [i,j];
							cacheArr.push(value);
						}
					}
				}

				var newArr = [];
				newArr[0] = cacheArr;
				if(len > 2) {

					for(var d=2; d<len; d++) {
						newArr.push(arr[d])
					}
					if(newArr.length >= 2) {
						sort(newArr);
					}
				}else {
					tableArr.push(cacheArr);
				}

			}

			//做组合排列,通过递归2个数组
			if(arr.length) {
				sort(arr);

				//table
				function makeTable(tableArr) {
					for(var a = 0; a <tableArr.length; a++) {
						html += '<table border=1>';
						for(var i=0;i<tableArr[a].length;i++) {
							html += '<tr>';
							for(var j=0;j<tableArr[a][i].length;j++){
							   var value = $brand.eq(a).find('table').eq(j).find('td.active').eq(tableArr[a][i][j]).html() || 'x';
								html += '<td>' + value + '</td>';
		
							}
							html += '</tr>';
						 }
						html += '</table>';
					}

				}
				makeTable(tableArr);

				$('#newtable').html(html);
			}

		})

	})


})
