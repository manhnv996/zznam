
var Storages = CoordinatedObject.extend({

    storageId: 0,
    capacity: Infinity,
    itemList: [],

    ctor: function (coordinate, storageId, capacity) {
        //
        this._super(coordinate);

        this.render(storageId, capacity);

    },
    render: function (storageId, capacity) {

        this.storageId = storageId;

        this.capacity = capacity;
        // this.itemList = [];
        //this.itemList.push(new StorageItem(ProductTypes.CROP_CARROT.TYPE, 5));
        //this.itemList.push(new StorageItem(ProductTypes.CROP_WHEAT.TYPE, 4));
        //this.itemList.push(new StorageItem(ProductTypes.CUT_AXE.TYPE, 2));

    },

    upgrade: function () {
        //boolean

    },
    getCapacity: function () {
        return this.capacity;
    },
    getQuantity: function (productType) {
        //int
        for (var i in this.getItemList()){
            if (this.getItemList()[i].getTypeItem() == productType){
                return this.getItemList()[i].getQuantityItem();
            }

        }
        return 0;

    },
    getStorageItem: function (productType) {
        //return index of productType in list
        for (var i in this.getItemList()){
            if (this.getItemList()[i].getTypeItem() == productType){
                return i;
            }

        }
        return null;
    },
    getItemList: function () {
        //StorageItem
        return this.itemList;
    },


    /*
    NOT YET STARTED
    SHOW Effect if Add or Reduce item (call controller)
     */
    addItem: function (productType, number) {
        //boolean
        if ((this.getCurrentQuantity() + number) <= this.capacity){

            var index = this.getStorageItem(productType);
            if (index != null){
                this.itemList[index].addQuantity(number);

            } else {
                this.itemList.push(new StorageItem(productType, number));
            }

            return true;
        }
        return false;
    },
    takeItem: function (productType, number) {
        //boolean
        var index = this.getStorageItem(productType);
        if (index != null){
            if (this.getQuantity(productType) > number){
                this.itemList[index].reduceQuantity(number);
                return true;

            } else if (this.getQuantity(productType) == number){
                this.itemList[index].reduceQuantity(number);

                this.itemList.splice(index, 1); //remove productType of list if quantity == 0
                return true;

            } else {
                return false;
            }
        }
        return false;
    },
    getCurrentQuantity: function () {
        var total = 0;
        // for (var i in this.getItemList()){
        //     total += this.getItemList()[i].quantity;
        //
        //     cc.log("Type: " + this.getItemList()[i].typeItem);
        // }
        for (var i = 0; i < this.getItemList().length; i++){
            total += this.getItemList()[i].quantity;

        }

        return total;
    }
});