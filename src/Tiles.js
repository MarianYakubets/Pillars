function Tile() {
    return {
        size: 1,
        top: "",
        bottom: ""
    };
}

function TileMap() {
    this.size = 0;
    this.bucket = {};
}

TileMap.prototype = {

    set: function (key, value) {
        this.size++;
        this.bucket[hexToNumber(key)] = value;
    },

    get: function (key) {
        return this.bucket[hexToNumber(key)];
    },

    has: function (key) {
        return this.bucket.hasOwnProperty(hexToNumber(key));
    },

    delete: function (key) {
        delete this.bucket.hasOwnProperty(hexToNumber(key));
    },

    keys: function () {
        return Object.keys(this.bucket);

    },

    values: function () {

    },

    entries: function () {

    }
};

function hexToNumber(hex) {
    return 100000 * Math.round(hex.q) + 1000 * Math.round(hex.r) + Math.round(hex.s);
}

function numberToHex(number) {
    var q = Math.round(number / 100000);
    var r = Math.round((number - q * 100000) / 1000);
    var s = Math.round(number - q * 100000 - r * 1000);
    return new Hex(q, r, s);
}