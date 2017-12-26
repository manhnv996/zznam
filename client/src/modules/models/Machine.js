
var Machine = ConstructedObject.extend({
    machineId: null,
    machineType: null,
    slot: 2,
    startTime: 0,

    productQueue: null,

    ctor: function (machineId, machineType, slot, startTime,  productQueue, boostBuild, completed, startBuildTime, remainBuildTime, coordinate) {
        //
        this._super(startBuildTime, remainBuildTime, boostBuild, completed, coordinate);
        this.machineId = machineId;
        this.machineType = machineType;
        this.slot = slot;
        this.startTime = startTime;
        this.productQueue = productQueue ? productQueue : [];
    },
    getProductInQueue:function(index){
        if (index >=0) return this.productQueue[index];
        return null;
    },
    setStartTime:function(startTime){
        this.startTime = startTime;
    },
    addProductInQueue:function(product){
        var now = getTime();
        var currNotFinishedProducts = this.productQueue.length - this.getNumberOfCompletedProducts(now);
        if (currNotFinishedProducts < this.slot){
            if (this.productQueue.length == 0){
                this.setStartTimeByCurrentTime();
                cc.log("29 +  this.setStartTimeByCurrentTime();")
            } else {
                if (this.productQueue.length == this.getNumberOfCompletedProducts(now)){
                    var newStartTime = now;
                    for (var i = 0; i < this.productQueue.length; i++){
                        newStartTime -= this.getProductTime(this.productQueue[i]);
                    }
                    this.setStartTime(newStartTime);
                }
            }
            this.productQueue.push(product);
            return true;
        }
        return false;
    },

    setStartTimeByCurrentTime:function(){
        var now = getTime();
        this.startTime = now;
    },
    //tinh thoi gian hoan thanh cua tat ca san pham dang co trong list (miliseconds)
    totalTimeToFinish:function(){
        var totalTime = 0;
        for (var i =0; i < this.productQueue.length;i++){
            totalTime += this.getProductTime(this.machineType, this.productQueue[i]) ;
        }
        return totalTime;
    },

    getProductResPath:function (productType) {
        var indexMachine  = MachineController.instance.getIndexMachineInConfigByType(this.machineType);
        if (indexMachine == -1){
            cc.log("getIndexMachineByType ERROR");
            return null;
        }
        for (var i = 0; i < MACHINE_LIST[indexMachine].productList.length; i++){
            if (productType == MACHINE_LIST[indexMachine].productList[i].productType ){
                return MACHINE_LIST[indexMachine].productList[i].res_path;
            }
        }
        return null;

    },

    createProduct: function (productType) {
        ////boolean
        //if (this.productQueue.length >= this.slot){
        //    return false;
        //} else if (this.checkRawMaterial(productType) == "last_seed"){
        //    //todo
        //}
    },
    getRemainSlotCount: function () {
        //int

    },
    unlockSlot: function () {
        //boolean
        if (this.slot >= 9) return false;
        else {
            this.slot += 1;
            return true;
        }


    },
    takeProduct: function () {
        //productType

    },
    boostCurrentProduct: function () {
        //boolean
        var now = getTime();
        var remainingTime = this.getRemainingTimeToFinishCurrentProduct(now);
        if (remainingTime > 0 ){
            var newStartTime = this.startTime - remainingTime;
            this.setStartTime(newStartTime);
            return true;
        }
        return false;

    },
    //// var now = new Date().getTime();
    //updateCompletedProducts: function (now) {
    //
    //
    //
    //    //for (var i = 0; i < this.productQueue.length; i++){
    //    //    now -= this.getProductTime(this.productQueue[i]);
    //    //    if (now  >= this.startTime){
    //    //        completedProducts.push(this.productQueue[i]);
    //    //
    //    //    } else break;
    //    //}
    //    //return completedProducts;
    //    while (now > this.startTime){
    //        now -= this.getProductTime(this.machineType, this.productQueue[0]);
    //        if (now >= this.startTime){
    //            this.startTime += this.getProductTime(this.machineType, this.productQueue[0]);
    //            this.completedProducts.push(this.productQueue.shift());
    //        }
    //    }
    //
    //
    //},
    getPendingProduct: function () {
        //productType enum

    },
    //var now = new Date().getTime();
    takeCompletedProduct: function (now) {
        //productType enum

        var nextStartTime = this.startTime + this.getProductTime( this.productQueue[0]);
        if (now > nextStartTime ){
            //check kho day show
            this.setStartTime(nextStartTime);
            //todo check server,  update storage
            cc.log("z120 ", this.startTime);
            return this.productQueue.shift();
        } else {
            return null;
        }
    },
    getNumberOfCompletedProducts: function (now){
        var index = 0;
        var numberOfProducts = 0;
        var tempStartTime = this.startTime;
        //cc.log("125" + tempStartTime);
        while (now > tempStartTime && index < this.productQueue.length){
            //cc.log("130 " + this.machineType +'==' + this.productQueue[index]);
            //cc.log("127" +this.getProductTime(this.productQueue[index]));
            tempStartTime += this.getProductTime( this.productQueue[index]);
            if (now >= tempStartTime){
                numberOfProducts++;
            }
            index++;
        }
        return numberOfProducts;
    },
    //lay ra thoi gian san xuat cua san pham theo productType
    getProductTime:function( productType){
        //var indexMachine  = MachineController.instance.getIndexMachineInConfigByType(this.machineType);
        ////cc.log("72 " + indexMachine);
        //if (indexMachine == -1){
        //    cc.log("getIndexMachineByType ERROR");
        //    return null;
        //}
        //for (var i = 0; i < MACHINE_LIST[indexMachine].productList.length; i++){
        //    if (productType == MACHINE_LIST[indexMachine].productList[i].productType ){
        //
        //        //cc.log("getProductTime " + MACHINE_LIST[indexMachine].productList[i].time  * 60 * 1000);
        //        return MACHINE_LIST[indexMachine].productList[i].time  * 60 * 1000;
        //    }
        //}
        //cc.log("getProductTime ERROR");
        var productConfig = getProductConfigById(productType);
        return productConfig.timeMin * 60000;

    },
    getRemainingTimeToFinishCurrentProduct:function(now){
        var numberOfCompletedProducts = this.getNumberOfCompletedProducts(now);
        var futureTime = this.startTime;
        if (numberOfCompletedProducts < this.productQueue.length){
            for (var i = 0; i < numberOfCompletedProducts + 1; i++){
                futureTime += this.getProductTime(this.productQueue[i]);
            }
            return futureTime - now;
        }
        return 0;
    },
    isFullSlot:function() {
        var now = getTime();
        var currNotFinishedProducts = this.productQueue.length - this.getNumberOfCompletedProducts(now);
        if (currNotFinishedProducts < this.slot) return false;
        return true;
    }
});