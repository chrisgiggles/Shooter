function Animation(){

}
Animation.prototype = {

    log: function() {
        console.log('log');
    },
    draw: function(a, x, y) {
        var coinImage = new Image();
        // var coinImage =a.sprite.div;
        coinImage.src = a.sprite.div.src;
        // var valued = coinImage + ',' + x + ',' + y + ',' + a.sprite.width + ',' + a.sprite.height + ',' + a.pos.x + ',' + a.pos.y + ',' + a.width + ',' + a.height;

        var value = [
            [a.sprite.div],
            [x],
            [y],
            [a.sprite.width],
            [a.sprite.height],
            [a.pos.x],
            [a.pos.y],
            [a.width],
            [a.height]
        ];
        // console.log(value.toString());
        value = value.join();
        // console.log(value.join());

        return value;

    },
};
return Animation;
