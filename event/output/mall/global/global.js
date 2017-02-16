var F ={}
F.parseURL=function(e){var n=document.createElement("a");e=e||window.location.href,n.href=e;var t=n.pathname.replace(/^\//,"").split("/");return{source:e,protocol:n.protocol.replace(":",""),host:n.hostname,port:n.port,query:n.search,params:function(){for(var e,t={},r=n.search.replace(/^\?/,"").split("&"),a=r.length,o=0;a>o;o++)r[o]&&(e=r[o].split("="),t[e[0]]=e[1]);return t}(),file:(n.pathname.match(/\/([^\/?#]+)$/i)||[,""])[1],hash:n.hash.replace("#",""),path:n.pathname.replace(/^([^\/])/,"/$1"),relative:(n.href.match(/tps?:\/\/[^\/]+(.+)/)||[,""])[1],segments:t,controller:t[0]?t[0]:"index",action:"undefined"==typeof t[1]||!isNaN(t[1])||t[1].indexOf("html")>-1?"index":t[1]}}

//html分页样式
var PageHtml = function(opts) {
	this.opts = $.extend({
		wrap: '',
		num: 3,  //定义当前页面的前后显示个数
		currentPage: 1,
		totalPage: 0,
		next: true,
		prev: true
	}, opts);
	this.init();
};

PageHtml.prototype = {
	init: function() {
		this.setStyle(this.opts.currentPage);
	},
	setStyle: function(cp) {
		this.currentPage = cp;
		this.totalPage = this.opts.totalPage;
		var html = '';
		var begin = 1;
		var end = this.opts.totalPage;
		var cNum = this.opts.num;   
		var showPage = 2*cNum+3;  
		var cltNum = (showPage+1)/2;  
		this.currentPage = parseInt(this.currentPage);

		//设定上一页
		var getUrl = function(i) {
			var url = F.parseURL().source;
			var regPage = /page=([0-9]*)/;
			if(regPage.test(url)) {
				var urlPage = parseInt(RegExp.$1);
				url = url.replace(regPage,'page=' + i);
			}else {
				url = F.parseURL().path + '?page=' + i;
			}
			return url;
		}

		if(this.opts.prev && this.currentPage >1 ) {
			html += '<a class="prev"  data-value='+ this.currentPage + ' href="' + getUrl(this.currentPage-1) + '"> &lt;</a>';
		}

		var pageLink = function(i, type) {
			type = type || '';
			
			if(type == 'current') {
				return '<a href="' + getUrl(i) + '" class="curr page">' +i+ '</a>';
			} else if(type == 'dot') {
				return '<span>&nbsp;</span>';
			}
			return '<a href="' + getUrl(i) + '" class="page" title="第'+i+'页">'+i+'</a>';  
		};

        //首尾样式...
		var dot = pageLink('','dot');
		var dotEnd = pageLink('','dot')+pageLink(this.totalPage);  

		//分页处理 1~9
		if(this.totalPage <= showPage) {
			for(var i=1; i<=this.totalPage; i++) {
				if(this.currentPage == i) {
					html += pageLink(i, 'current');
				}else {
					html += pageLink(i);
				}
			}

		} else {
			// 当前页小于6页 1~8...end 
			if(this.currentPage <=cltNum) {
				for(var i=1; i<=showPage-1; i++) {
					if(this.currentPage == i) {
						html += pageLink(i, 'current');
					}else {
						html += pageLink(i);
					}
				}
				html += dotEnd;

			}else {
				//当前页大于6页前面加上1...c-3~c+3...end
				 html += pageLink(1);
				 html += dot; 

				 begin = this.currentPage - cNum;
				 end =  this.currentPage + cNum;

				 //当最后4页的时候不显示后面的
				 //1...end-7~end
				 if(this.totalPage - this.currentPage <= cNum+1) {
					 end = this.totalPage;
					 begin = this.totalPage - (2*cNum+1);
				 }

				 //当前页切换
				 for(var i=begin; i<=end; i++) {
					if(this.currentPage == i) {
						html += pageLink(i, 'current');
					}else {
						html += pageLink(i);
					}
				 }
				 if(end != this.totalPage) {
					html += dotEnd;
				 }
			}
		}



		this.$wrap = $(this.opts.wrap);
		this.$page = $('<div class="global_page">');

		if(this.opts.next && this.currentPage < this.totalPage) {
			html += '<a class="next" data-value='+ this.currentPage+' href="' + getUrl(this.currentPage+1) + '">&gt; </a>';
		}

        //如果只有一页，不显示分页
		if(this.totalPage <= 1 || isNaN(this.totalPage)) {
			html = '';
		}
	
		this.$page.html(html);
		this.$wrap.empty().append(this.$page);
	}
}

var Page = function(opts) {
	this.opts = $.extend({
		wrap: '',
		num: 3,  
		currentPage: 1,
		totalPage: 0,
		data: {},
		url: '',
		type: 'json',
		next: true,
		prev: true,
		loadWrap: '',
		callback: function(data, currentPage, isCache) {
		}
	}, opts);
	this.init();
};

Page.prototype = {
	init: function() {
		this.dataCache = {};
		var _page = F.parseURL().params.page;
		if(_page) {
			this.setStyle(_page);
			this.getData(_page);
		}else{
		    this.setStyle(this.opts.currentPage);
		}
	},

	setStyle: function(cp) {

		this.currentPage = cp;
		this.totalPage = this.opts.totalPage;
		var html = '';
		var begin = 1;
		var end = this.opts.totalPage;
		var cNum = this.opts.num;
		var showPage = 2*cNum+3;
		var cltNum = (showPage+1)/2;
		this.currentPage = parseInt(this.currentPage);

		//\u8bbe\u5b9a\u4e0a\u4e00\u9875
		//\u83b7\u53d6url\u5f53\u524d\u9875\u9762

		var queryPage = F.parseURL().query;
		var i = queryPage.search(/page=/);
		queryPage = queryPage.slice(i+5);

		if(this.opts.prev) {
			html += '<a class="prev" style="display: none" data-value='+ this.currentPage+' href="javascript:;"> &lt;</a>';
			if(queryPage && queryPage>1) {
				$('.global_page').find('.prev').show().data('value', queryPage);
			}
		}
		var pageLink = function(i, type) {
			type = type || '';

			if(type == 'current') {
				return '<a href="javascript:;" class="curr page">' +i+ '</a>';
			} else if(type == 'dot') {
				return '<span>&nbsp;</span>';
			}
			return '<a href="javascript:;" class="page" title="\u7b2c'+i+'\u9875">'+i+'</a>';
		};

        //\u9996\u5c3e\u6837\u5f0f...
		var dot = pageLink('','dot');
		var dotEnd = pageLink('','dot')+pageLink(this.totalPage);

		//\u5206\u9875\u5904\u7406 1~9
		if(this.totalPage <= showPage) {
			for(var i=1; i<=this.totalPage; i++) {
				if(this.currentPage == i) {
					html += pageLink(i, 'current');
				}else {
					html += pageLink(i);
				}
			}

		} else {
			// \u5f53\u524d\u9875\u5c0f\u4e8e6\u9875 1~8...end
			if(this.currentPage <=cltNum) {
				for(var i=1; i<=showPage-1; i++) {
					if(this.currentPage == i) {
						html += pageLink(i, 'current');
					}else {
						html += pageLink(i);
					}
				}
				html += dotEnd;

			}else {
				//\u5f53\u524d\u9875\u5927\u4e8e6\u9875\u524d\u9762\u52a0\u4e0a1...c-3~c+3...end
				 html += pageLink(1);
				 html += dot;

				 begin = this.currentPage - cNum;
				 end =  this.currentPage + cNum;

				 //\u5f53\u6700\u540e4\u9875\u7684\u65f6\u5019\u4e0d\u663e\u793a\u540e\u9762\u7684
				 //1...end-7~end
				 if(this.totalPage - this.currentPage <= cNum+1) {
					 end = this.totalPage;
					 begin = this.totalPage - (2*cNum+1);
				 }

				 //\u5f53\u524d\u9875\u5207\u6362
				 for(var i=begin; i<=end; i++) {
					if(this.currentPage == i) {
						html += pageLink(i, 'current');
					}else {
						html += pageLink(i);
					}
				 }
				 if(end != this.totalPage) {
					html += dotEnd;
				 }
			}
		}



		this.$wrap = $(this.opts.wrap);
		this.$page = $('<div class="global_page">');

		if(this.opts.next) {
			html += '<a class="next" data-value='+ this.currentPage+' href="javascript:;">&gt; </a>';
		}

        //\u5982\u679c\u53ea\u6709\u4e00\u9875\uff0c\u4e0d\u663e\u793a\u5206\u9875
		if(this.totalPage <= 1) {
			html = '';
		}

		this.$page.html(html);
		this.$wrap.empty().append(this.$page);
		this.$pageNum = this.$page.find('a');

		this.bindEvent();

	},
	bindEvent: function() {
		var self = this;

		/*$(window).bind('popstate',  function(event) {
			var page = (event.originalEvent.state && event.originalEvent.state.page) ? event.originalEvent.state.page : '1';
		    self.setStyle(page);
			self.getData(page);
		});*/

		//\u5206\u9875\u64cd\u4f5c
		this.$page.on('click', '.page', function() {
			var $this = $(this);
			//\u5f53\u524d\u9875\u4e0d\u8fdb\u884c\u64cd\u4f5c
			if($this.hasClass("curr")) {
				return false;
			}
			self.currentPage = parseInt($this.text());

			//\u8bbe\u5b9a\u6837\u5f0f
		    self.setStyle(self.currentPage);
			//\u83b7\u53d6\u6570\u636e
			self.getData(self.currentPage);

			//\u4e0a\u4e00\u9875\u9690\u85cf
			if(self.currentPage == 1) {
				$('.global_page').find('.prev').hide();
			}else {
				$('.global_page').find('.prev').show();
			}
			//\u4e0b\u4e00\u9875\u9690\u85cf
			if(self.currentPage >=  self.opts.totalPage) {
				$('.global_page').find('.next').hide();
			}

			var urlQuery = F.parseURL().query.replace(/[?&]page=(\d)*/, '');
			//console.log(urlQuery);
			var type =  (urlQuery === '') ? 'all' : urlQuery.split('=')[1];
			//console.log(type);

			window.history.pushState && window.history.pushState({"page": self.currentPage, "type": type}, '');

			//\u4e0a\u4e00\u9875\u9690\u85cf
			if(this.currentPage == 1) {
				$('.global_page').find('.prev').hide();
			}else {
				$('.global_page').find('.prev').show();
			}
			//\u4e0b\u4e00\u9875\u9690\u85cf
			if(this.currentPage >=  self.opts.totalPage) {
				$('.global_page').find('.next').hide();
			}

			var urlQuery = F.parseURL().query.replace(/[?&]page=(\d)*/, '');
			var params = urlQuery + (urlQuery.indexOf('?') > -1 ? '&' : '?') + 'page='+this.currentPage;
			//console.log(urlQuery);
			var type =  (urlQuery === '') ? 'all' : urlQuery.split('=')[1];
			//console.log(type);

			//window.history.pushState && window.history.pushState({"page": this.currentPage, "type": type}, '', params);

			return false;
		})

		//\u4e0a\u4e00\u9875
		this.$page.on('click', '.prev', function() {
			var $this = $(this);
			var prevPage = $this.data('value')-1;

			if(prevPage >= 1) {
				self.setStyle(prevPage);
				self.getData(prevPage);
			}

			//\u4e0a\u4e00\u9875\u9690\u85cf
			if(prevPage == 1) {
				$('.global_page').find('.prev').hide();
			}else {
				$('.global_page').find('.prev').show();
			}
			//window.history.pushState && window.history.pushState({"page": prevPage}, '', '?page='+prevPage);
		})
		//\u4e0b\u4e00\u9875
		this.$page.on('click', '.next', function() {
			var $this = $(this);
			var nextPage = $this.data('value')+1;

			if(nextPage <= self.opts.totalPage) {
				self.setStyle(nextPage);
				self.getData(nextPage);
			}
			$('.global_page').find('.prev').show();

			//\u4e0b\u4e00\u9875\u9690\u85cf
			if(nextPage >= self.opts.totalPage) {
				$('.global_page').find('.next').hide();
			}
			//window.history.pushState && window.history.pushState({"page": nextPage}, '', '?page='+nextPage);
		})

	},

	getData: function(cp) {
		var self = this;
		this.currentPage = cp;
		if(this.opts.loadWrap) {
			this.opts.loadWrap.html('<div class="load_wrap"><span class="loading"></span></div>');
		}
		if(this.dataCache[this.currentPage]) {
			this.opts.callback && this.opts.callback(this.dataCache[this.currentPage], this.currentPage, true);
			return ;
		}

		if(this.opts.type == 'html') {
			$.get(this.opts.url, $.extend({page: self.currentPage}, this.opts.data), function(html) {
				self.dataCache[self.currentPage] = html;
				self.opts.callback && self.opts.callback(html, self.currentPage, false);
			});
		}else {
			this.opts.data.pageIndex = self.currentPage;
			$.get(this.opts.url,this.opts.data, function(json) {
				self.dataCache[self.currentPage] = json;
				self.opts.callback && self.opts.callback(json, self.currentPage, false);
			}, 'json');
		}
	}
}

//搜索
$(function() {
	var $searchBtn = $('.search_icon');
	var $searchInput = $('.search_btn');


	 $searchBtn.click(function(){
		var keyword = $.trim($searchInput.val()) || '';
		window.location.href="nlist.html?name=" + keyword;
	}); 

	$searchInput.keydown(function(e) {
		var $this = $(this);
		if(e.which == 13) {
			$searchBtn.click();
		}   
	}); 

})
