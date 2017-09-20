var KeyMaker = function (myArray) {
    var newArray = _.map(myArray, function (item) {
        item.key = UidMaker();
        return item;
    });
    return newArray;
};
var UidMaker = function () {
    function S4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }

    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
};

module.exports = {
    KeyMaker,
    UidMaker
};
