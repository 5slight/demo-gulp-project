var ostd_cube = {};

(function (ctx) {

    var speed = 0.2,
        margin = 50,

        min_x = margin, min_y = margin,
        max_x = null, max_y = null,
        x = 100, y = 100,
        w = 50, h = w,

        dir_left  = 0,
        dir_right = 1,
        dir_down  = 2,
        dir_up    = 3,

        dir = dir_left;



    function setMaxPos(can) {
        max_x = can.width - margin;
        max_y = can.height - margin;
    }

    function move() {
        function calc() {
            return ostd_time.delta * speed;
        }

        switch(dir) {
            case dir_left:  x += calc(); break;
            case dir_right: x -= calc(); break;
            case dir_down:  y += calc(); break;
            case dir_up:    y -= calc(); break;
        }
    }

    function animate(can) {
        setMaxPos(can);

        if(dir == dir_left  && x >= (max_x - w)) dir = dir_down;
        if(dir == dir_down  && y >= (max_y - h)) dir = dir_right;
        if(dir == dir_right && x <= min_x) dir = dir_up;
        if(dir == dir_up    && y <= min_y) dir = dir_left;

        move();
    }

    ctx.render = function(ct, can) {
        animate(can);
        ct.save();

        ct.fillStyle = '#F55';
        ct.fillRect(x, y, w, h);

        ct.restore();
    };

})(ostd_cube);
