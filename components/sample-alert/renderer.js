var template = require('raptor-templates').load(require.resolve('./template.rhtml'));

exports.tag = {
    attributes: {
        type: 'string',
        dismissable: 'boolean',
        '*': 'string'
    }
};

module.exports = function render(input, context) {
    
    var rootAttrs = {};

    var type = input.type || 'info';                
    var classParts = ["alert", "alert-" + type];
    
    var splatAttrs = input['*'];
    if (splatAttrs) {
        var className = splatAttrs["class"];
        if (className) {
            delete splatAttrs["class"];
            classParts.push(className);
        }

        for (var splatAttr in splatAttrs) {
            if (splatAttrs.hasOwnProperty(splatAttr)) {
                rootAttrs[splatAttr] = splatAttrs[splatAttr];
            }
        }
    }
    
    rootAttrs["class"] = classParts.join(" ");

    template.render({
        dismissable: input.dismissable === true, 
        message: input.message,
        invokeBody: input.invokeBody,
        rootAttrs: rootAttrs
    }, context);
};

     