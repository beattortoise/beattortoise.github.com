var Task = function(isTip) {

    this.isTip = isTip || false; // 是否开启任务提示
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
        if(this.tasks[-1]) {
            this.startTime = +new Date();
            this.isRunning = true;
            this.isTip && console.log('\n---- 任务开始 次数：' + (this.times++) + ' ---\n');
            this.tasks[0]();
        }else {
            this.isTip && console.log('\n---- 任务队列已为空 ---\n');
        }
    };

    this.end = function() {
        if(this.isRunning == false) return ;

        this.tasks.shift();
        this.isRunning = false;
        this.endTime = +new Date();
        this.isTip && console.log('\n---- 任务结束 总耗时：' + (this.endTime - this.startTime)/1000 + '秒, 时间：'+ Date() +'---\n');
        this.start();
    };

    this.isEmpty = function() {
        return this.tasks.length == 0;
    }
};

var tasks = {};
var Tasks = function(name, isTip) {
    if(!name) {
        name = 'null';
    }

    var task = tasks[name];

    if(!task) {
        task= new Task(isTip);
        tasks[name] = task;
    }

    return task;
};

module.exports = Tasks;
