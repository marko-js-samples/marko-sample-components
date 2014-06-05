var template = require('raptor-templates').load(require.resolve('./template.rhtml'));

exports.tag = {
    attributes: {
        label: 'string',
        href: 'string',
        variant: 'string', // primary | info | success | warning | danger | inverse
        size: 'string', // large | small | mini
        toggle: 'boolean',
        toggled: 'boolean',
        dropdown: 'boolean',
        '*': 'string'
    }
};

module.exports = function render(input, context) {
    
    var rootAttrs = {};
                    
    var classParts = ["btn"];

    var type = 'button';

    if (input.href) {
        type = 'link';
        input.variant = "link";
    }
    
    if (input.variant) {                    
        classParts.push("btn-" + input.variant);
    }
    
    if (input.size) {                    
        classParts.push("btn-" + input.size);
    }
    
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
        type: type,
        tag: input, 
        label: input.label,
        rootAttrs: rootAttrs,
        isDropdown: input.dropdown === true,
        href: input.href
    }, context);
};

     