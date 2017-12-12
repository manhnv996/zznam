
var Machine = ConstructedObject.extend({
    machineId: null,
    machineType: null,
    slot: 2,
    startTime: 0,
    productQueue: null,
    completedProducts: [],

    ctor: function (machineId, machineType, slot, startTime,  productQueue, boostBuild, completed, startBuildTime, remainBuildTime, coordinate) {
        //
        this._super(startBuildTime, remainBuildTime, boostBuild, completed, coordinate);
        this.machineId = machineId;
        this.machineType = machineType;
        this.slot = slot;
        this.startTime = startTime;
        this.productQueue = productQueue ? productQueue : [];
    },
    setStartTime:function(startTime){
        this.startTime = startTime;
    },

    setStartTimeByCurrentTime:function(){
        var now = new Date().getTime();
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
    //lay ra thoi gian san xuat cua san pham theo productType
    getProductTime:function(machineType, productType){
        var indexMachine  = this.getIndexMachineInConfigByType(machineType);
        cc.log(indexMachine);
        if (indexMachine == -1){
            cc.log("getIndexMachineByType ERROR");
            return 0;
        }
        for (var i = 0; i < MACHINE_LIST[indexMachine].productList.length; i++){
             if (productType === MACHINE_LIST[indexMachine].productList[i].productType ){
                 return MACHINE_LIST[indexMachine].productList[i].time  * 60 * 1000;
             }

        }
        return 0;
    },
    // lấy ra index của máy trong MACHINE_LIST theo loại máy
    getIndexMachineInConfigByType: function(machineType){
        for (var i = 0; i < MACHINE_LIST.length; i++){
            if (MACHINE_LIST[i].machineType == machineType){
                for (var i = 0; i < MACHINE_LIST.length; i++){
                    if (MACHINE_LIST[i].machineType == machineType){
                        return i;
                    }
                }
            }
        }
        return -1;
    },
    getProductResPath:function (machineType, productType) {
        var indexMachine  = this.getIndexMachineInConfigByType(machineType);
        if (indexMachine == -1){
            cc.log("getIndexMachineByType ERROR");
            return null;
        }
        for (var i = 0; i < MACHINE_LIST[indexMachine].productList.length; i++){
            if (productType == MACHINE_LIST[indexMachine].productList[i].productType ){
                return MACHINE_LIST[indexMachine].productList[i].res_path;
            }
            return null;
        }

    },

    createProduct: function (productType) {
        //boolean
        if (this.productQueue.length >= this.slot){
            return false;
        } else if (this.checkRawMaterial(productType) == "last_seed"){
            //todo
        }
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
    boost: function () {
        //boolean

    },
    // var now = new Date().getTime();
    updateCompletedProducts: function (now) {



        //for (var i = 0; i < this.productQueue.length; i++){
        //    now -= this.getProductTime(this.productQueue[i]);
        //    if (now  >= this.startTime){
        //        completedProducts.push(this.productQueue[i]);
        //
        //    } else break;
        //}
        //return completedProducts;
        while (now > this.startTime){
            now -= this.getProductTime(this.machineType, this.productQueue[0]);
            if (now >= this.startTime){
                this.startTime += this.getProductTime(this.machineType, this.productQueue[0]);
                this.completedProducts.push(this.productQueue.shift());
            }
        }


    },
    getPendingProduct: function () {
        //productType enum

    },
    //var now = new Date().getTime();
    takeCompletedProduct: function (now) {
        //productType enum

        if (now > this.startTime + this.getProductTime(this.machineType, this.productQueue[0])){
            //check kho day show
            //todo check server,  update storage
            return this.productQueue.shift();
        } else {
            return "nothing_done";
        }
    }

});