var gulp = require('gulp'),
	path = require('path'),
	less = require('gulp-less'),
	processWidget = require('./libs/processWidget'),
	processAll = require('./libs/processAll'),
	imagemin = require('gulp-imagemin'),
	pngquant= require('imagemin-pngquant'),
	cache= require('gulp-cache'),
	stacks = require('./libs/stack');

var Widget = function(src) {
	var self = this;

}

widget.prototype = {
	initialize: function() {
		var self = this;
		self.findWdiget();

	},
	findWidget: function() {

	}
}
module.exports = Widget;
