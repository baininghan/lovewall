$k.fn.drag = function (config) {
    var obj = function (selector, config) {
        this.selector = selector;
        this.config = $.extendEx({}, this.defConfig, config);
    }
    obj.prototype.defConfig = {
       
    };
    obj.prototype.drag = function () {
        var _obj = this;
        var target = null;
        if (!_obj.config.target) {
            target = _obj.selector;
        }
        else {
            target =$(_obj.config.target,_obj.selector);
        }
        target.css('cursor', 'move');
        $(target).mousedown(function (e) {
            _obj.dragState = { preX: e.pageX, preY: e.pageY };
        });
        $(document).mousemove(function (e) {
            if (!_obj.dragState) {
                return;
            }
            var cssLeft = _obj.selector.css('left');
            var cssTop = _obj.selector.css('top');
            var left = cssLeft.substr(0, cssLeft.length - 2);
            left = parseFloat(left);
            var top = cssTop.substr(0, cssTop.length - 2);
            top = parseFloat(top);
            _obj.selector.css('left', left + (e.pageX - _obj.dragState.preX));
            _obj.selector.css('top', top + (e.pageY - _obj.dragState.preY));
            _obj.dragState.preX = e.pageX;
            _obj.dragState.preY = e.pageY;
        });
        $(document).mouseup(function (e) {
            if (!_obj.dragState) {
                return;
            }
            _obj.dragState = undefined;
        });
    }
    var _obj = new obj($(this.jo), config || {});
    _obj.drag();
    return _obj;
}