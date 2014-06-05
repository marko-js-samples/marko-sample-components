var raptorDust = require('raptor-dust');

exports.registerHelpers = function(dust) {
    raptorDust.registerHelpers({
        'sample-button': require('../components/sample-button/renderer')
    }, dust);
};