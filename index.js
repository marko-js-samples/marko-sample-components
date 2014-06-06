var raptorRenderer = require('raptor-renderer');

/*
Export a method that can be used to render each button to allow the following:

var button = require('raptor-sample-ui-components').button;
button({
        label: 'Hello World'
    })
    .appendTo(document.body);
*/

var components = [
    { name: 'button', renderer: require('./components/sample-button/renderer') },
    { name: 'alert', renderer: require('./components/sample-alert/renderer') }
];

components.forEach(function(component) {
    exports[component.name] = function render(data, context) {
        return raptorRenderer.render(component.renderer, data, context);
    };
});