var ostd_scene = {};

(function (ctx) {

    ctx.render = function(ct, can) {
        ct.save();
        ct.fillStyle = '#EEE';
        ct.fillRect(0, 0, can.width, can.height);
        ct.restore();
    };

})(ostd_scene);
