var ostd_time = {};

(function (ctx) {
    var last  = Date.now();

    ctx.delta = 0;

    ctx.update = function () {
        var now = Date.now();

        ctx.delta = now - last;

        last = now;
    };

})(ostd_time);
