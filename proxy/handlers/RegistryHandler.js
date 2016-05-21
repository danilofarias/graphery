module.exports = (function(){
    'use strict'
    var Handler = function() {};
    Handler.register = function(req, res) {
        res.status(201).json({ name: 'tobi' })
    };
    return Handler;
})();