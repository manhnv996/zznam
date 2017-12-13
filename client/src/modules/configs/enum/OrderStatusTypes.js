
var OrderStatusTypes = {
    REALIZABLE: 0,
    WAITTING: 1,
    // CANCEL: 2
};

function getNumberOfOrderByLevel(level){
    if (level < 2){
        return 3;
    } else if (level < 12){
        return 4;
    } else if (level < 15){
        return 5;
    } else if (level < 17){
        return 6;
    } else if (level < 19){
        return 7;
    } else if (level < 22){
        return 8;
    } else {
        return 9;
    }

}
