/*
 * 任务栈
 * 示例:
 * var stacks = require('stack');
 * stacks('name').push(function() {
 * 		setTimeout(function() {
 * 			console.log(1);
 * 			stacks('name').end();
 * 		}, 100);
 * });
 * stacks('name').push(function() {
 * 		setTimeout(function() {
 * 			console.log(2);
 * 			stacks('name').end();
 * 		}, 200);
 * });
 * 会依次输出1、2，按push的顺序执行，在一个任务中，只有遇到stack('name').end()时才会执行下一个任务。
 * 根据name的不同，建立不同的任务栈
*/

var Stack = function(isTip) {

	this.isTip = isTip;
	this.startTime = '';
	this.endTime = '';
	this.times = 1;
	this.tasks = [];
	this.isRunning = false;

	this.push = function(fn) {
		this.tasks.push(fn);
		if(!this.isRunning) {
			this.start();
		}
	};
	this.start = function() {
		if(this.tasks[0]) {
			this.startTime = +new Date();
			this.isRunning = true;
			this.isTip && console.log('\n---- 任务开始 次数：' + (this.times++) + ' ---\n');
			this.tasks[0]();
		}
	};
	this.end = function() {
		if(this.isRunning == false) return ;
		this.tasks.shift();
		this.isRunning = false;
		this.endTime = +new Date();
		this.isTip && console.log('\n---- 任务结束 总耗时：' + (this.endTime - this.startTime)/1000 + '秒 ---\n');
		this.start();
	};
	this.isEmpty = function() {
		return this.tasks.length == 0;
	}
};

var stacks = {};
var Stacks = function(name, isTip) {
	if(!name) {
		name = 'null';
	}

	var stack = stacks[name];

	if(!stack) {
		stack = new Stack(isTip);
		stacks[name] = stack;
	}

	return stack;
};


module.exports = Stacks;
