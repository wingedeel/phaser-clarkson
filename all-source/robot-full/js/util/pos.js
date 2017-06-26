function centerX(obj) {

    var realCenter = game.width / 2 - obj.width;

    obj.x = realCenter;
}

function centerY(obj) {
    var realCenter = game.width / 2 - obj.width;
    obj.y = realCenter;
}

function center(obj) {
    centerAnchor(obj);
    centerX(obj);
    centerY(obj);
}

function centerAnchor(obj) {
    obj.anchor.set(0.5, 0.5);
}