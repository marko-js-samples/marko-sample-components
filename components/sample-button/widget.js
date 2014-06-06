function Widget() {
    var _this = this;

    console.log('Initializing widget for "sample-button" (' + this.id + ')');
    
    this.$().click(function(e) {
        _this.emit('click', {
            event: e
        });
    });
}

Widget.prototype = {

};

module.exports = Widget;