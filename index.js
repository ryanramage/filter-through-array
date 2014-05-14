var through = require('through');

/**
 * Filter an array based stream using a filter function, eg:
 *
 * var filter = function(data, emit) {
 *     if (condition) emit(thing)
 * }
 *
 */
module.exports = function(filter) {
    var first = true,
        anyData = false;

    return through(function(data){
        var stream = this,
            json = JSON.parse(data),
            emit = function(item) {
                anyData = true;
                if(first) { first = false ; stream.queue('[' + item)}
                else stream.queue(',' + item)
            };
        filter(json, emit);

    }, function(){

        if(!anyData) this.queue('[')
        this.queue(']');
        this.queue(null);
    });
}