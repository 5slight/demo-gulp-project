(function() {
    var canvas = document.getElementById('can'),
        ctx = canvas.getContext('2d');

    function resize() {
        var w = window.innerWidth,
            h = window.innerHeight;
        canvas.width = w;
        canvas.height = h;
    }
    window.addEventListener('resize', resize);
    resize();

    function frame() {
        ostd_time.update();
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ostd_scene.render(ctx, canvas);
        ostd_cube.render(ctx, canvas);
        loop();
    }

    function loop() {
        window.requestAnimationFrame(frame);
    }
    loop();

})();
