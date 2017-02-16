var keys = [
    'box-shadow',
    'transform',
    'transition',
    'filter',
    'animation',
    'flex',
], _compileReg = [];
for (var i = 0; i < keys.length; i++) {
    var attr = keys[i];

    _compileReg.push(
        [new RegExp('-webkit-'+ attr +':', 'gi'), attr +':']
    );
    _compileReg.push(
        [new RegExp('-ms-'+ attr +':', 'gi'), attr +':']
    );
    _compileReg.push(
        [new RegExp('-moz-'+ attr +':', 'gi'), attr +':']
    );
    _compileReg.push(
        [new RegExp( attr +':(.*?)}', 'gi'), attr +':$1;}']
    );
    _compileReg.push(
        [new RegExp( attr +':(.*?);', 'gi'), attr +':$1;-webkit-'+ attr +':$1;-ms-'+ attr +':$1;-moz-'+ attr +':$1;']
    );
};


module.exports = function(content) {
    var reg = _compileReg;

    for(var i=0, l=reg.length; i< l; i++) {
        content = content.replace(reg[i][0], reg[i][1]);
    }

    return content;
};
      
