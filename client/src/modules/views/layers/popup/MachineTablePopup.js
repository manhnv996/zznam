/**
 * Created by CPU60135_LOCAL on 12/5/2017.
 */
var MachineTablePopup = TablePopup.extend({

    _machineId: null,
    _machine: null,
    _machineConfig: null,
    _popUpItemSpriteList: [],
    _FirstSlotSprite: null,
    _queueSpriteList:null,
    _unlockSlotSprite: null,
    _labelRubyToUnlockSlot: null,
    _labelMaChineName: null,
    _labelTime: null,
    _machineWidth: null,
    _machineHeight: null,
    _screenPosition: null,
    _currPage: null,
    _btnBoost: null,
    _labelRubyToBoost: null,
    _currCompletedProduct: 0,

    ctor: function (machineId){

        this._machineId = machineId;

        cc.log(MA_LOG_TAG +"23 " +machineId);
        //lay ra may da goi trong Model
        this._machine = user.getAsset().getMachineById(machineId);
        this._machineConfig = MachineController.instance.getMachineConfigByType(this._machine.machineType);
        cc.log(this._machineConfig);

        //lay ra width height cua machine sprite da goi
        var index =  MachineController.instance.getIndexInMachineSpriteList(machineId);
        cc.log("12082017" + index);
        var spriteCalled = MapLayer.instance.machineSpriteList[index];
        this._machineWidth = spriteCalled.width;
        this._machineHeight = spriteCalled.height;

        //lay ra trang san pham cuoi cung nguoi choi mo, mac dinh bang 0
        this._currPage = LastPageUtil.instance.findLastPageOpenedByType(this._machine.machineType);

        // nếu số sản phẩm có  thể sản xuất lớn hơn 5 thì luôn hiển thị popup bg5
        if (this._machineConfig.productList.length > 5){
            this._super(res.popup5, this._machine.coordinate.x, this._machine.coordinate.y,
                spriteCalled);
            this._bg.setScale(1.05);
        } else {
            switch ( this._machineConfig.productList.length % 5 ){
                case 0:
                    this._super(res.popup5, this._machine.coordinate.x, this._machine.coordinate.y,
                        spriteCalled);
                    this._bg.setScale(1.05);
                    break;
                case 1:
                    this._super(res.popup1, this._machine.coordinate.x, this._machine.coordinate.y,
                        spriteCalled);
                    break;
                case 2:
                    this._super(res.popup2, this._machine.coordinate.x, this._machine.coordinate.y,
                        spriteCalled);
                    break;
                case 3:
                    this._super(res.popup3, this._machine.coordinate.x, this._machine.coordinate.y,
                        spriteCalled);
                    break;
                case 4:
                    this._super(res.popup4, this._machine.coordinate.x, this._machine.coordinate.y,
                        spriteCalled);
                    break;
                default:
                    this._super(res.popup3, this._machine.coordinate.x, this._machine.coordinate.y,
                        spriteCalled);
                    break;
            };
        }
        this._screenPosition = MapValues.logicToScreenPosition( this._machine.coordinate.x, this._machine.coordinate.y);
        this._bg.setPosition(this._screenPosition.x - this._machineWidth * 1 / 3,
            this._screenPosition.y + this._machineHeight * 1 / 3);

        this.renderItemList(this._machineConfig.productList);
        this.renderFirstSlot(this._machineId, spriteCalled);
        this.initSlotlist(this._machineId);
        this.setPositionSlotList(this._machineId);
        this.renderUnlockButton(this._machineId);
    },
    renderItemList: function(productList){

        //init
        this._popUpItemSpriteList = [];
        //add item sprite by productlist config of each machine.
        for (var i = 0; i < productList.length; i++){
            //var item = new ProductSprite(this, productList[i]);
            var item = new MachineProductSprite(productList[i]);
            this._popUpItemSpriteList.push(item);
            this.addChild(this._popUpItemSpriteList[i], 1);
        }

        var numberOfPages = Math.ceil(this._popUpItemSpriteList.length / 5);
        if (numberOfPages > 1){
            this.btTurnPage = new ccui.Button(res.btTurnPage);
            this.btTurnPage.setPosition(cc.p(this._bg.x - this._bg.width *.4,
                this._bg.y - this._bg.height / 2));
            this.addChild(this.btTurnPage);
            //
            this.btTurnPage.addClickEventListener(this.turnPageEvent.bind(this));
            //
            this.pagesSpriteList = [];
            for (var i = 0; i < numberOfPages; i++){
                var page;
                if (i == this._currPage){
                    page = new cc.Sprite(res.pageSelected);
                } else {
                    page = new cc.Sprite(res.page);
                }
                page.setPosition(this.btTurnPage.width + page.width * 4 / 3 * (i + 1), this.btTurnPage.height / 2);
                this.btTurnPage.addChild(page);

                this.pagesSpriteList.push(page);
            }

        }

        this.setProductListPosition(this._currPage);




    },
    onUnlockSlotEvent: function(){
        //todo unlock slot, do logic in controller
        var index = MachineController.instance.getIndexMachineInListById(this._machineId);
        if (index == -1){
            cc.log("ERROR, cant find machine by id");
        } else {
            if (user.asset.machineList[index].slot == 2) {
                this._labelRubyToUnlockSlot.setString(MACHINE_CONFIG.NEXT_PRICE_BUY_SLOT);
            }
            user.asset.machineList[index].slot += 1;
            //add new slot square to queue
            var squareSprite = new SquareSprite(res.o_trong_2_2);
            this._queueSpriteList.push(squareSprite);
            this.addChild(this._queueSpriteList[this._queueSpriteList.length -1]);

            //set position to queue square list again...
            this.setPositionSlotList(this._machineId);
            this.setPositionForUnlockButton(this._machineId);
        }

    },
    onBoostEvent:function(){
        //todo boost by ruby, do logic in controller
        cc.log("Boost button is clicked");
        var index = MachineController.instance.getIndexMachineInListById(this._machineId);
    },
    turnPageEvent: function(){

        this.removeAllCurrentItemSprite();


        this.pagesSpriteList[this._currPage].setTexture(res.page);

        this._currPage = (this._currPage + 1) % (Math.ceil(this._popUpItemSpriteList.length / 5));
        LastPageUtil.instance.setLastOpenPage(this._machineConfig.machineType, this._currPage);
        this.setProductListPosition(this._currPage);

        this.pagesSpriteList[this._currPage].setTexture(res.pageSelected);
    },
    removeAllCurrentItemSprite:function(){
        var numberOfPages = Math.ceil(this._popUpItemSpriteList.length / 5);
        var visibleProducts = 5;
        if (numberOfPages > 1) {
            if (this._currPage < numberOfPages - 1){
                visibleProducts = 5;
            } else {
                visibleProducts = this._popUpItemSpriteList.length - (numberOfPages - 1) * 5;
            }
        } else {
            visibleProducts = this._popUpItemSpriteList.length;
        }
        for (var i = 0; i < visibleProducts; i++){
            this._popUpItemSpriteList[5* this._currPage + i].setVisible(false);
        }
    },
    setProductListPosition: function(pageIndex){
        var numberOfPages = Math.ceil(this._popUpItemSpriteList.length / 5);
        var visibleProducts = 5;
        if (numberOfPages > 1) {
            if (pageIndex < numberOfPages - 1){
                visibleProducts = 5;
            } else {
                visibleProducts = this._popUpItemSpriteList.length - (numberOfPages - 1) * 5;
            }
        } else {
            visibleProducts = this._popUpItemSpriteList.length;
        }
        for (var  i = 0; i < visibleProducts; i++){
            this._popUpItemSpriteList[5 * pageIndex + i].setVisible(true);
        }
        //setPosition
        switch (visibleProducts % 5){
            case 1:

                this._popUpItemSpriteList[5 * pageIndex + 0].setPosition(cc.p(this._bg.x, this._bg.y));

                //
                break;
            case 2:
                this._popUpItemSpriteList[5 * pageIndex + 1].setPosition(cc.p(this._bg.x, this._bg.y));
                this._popUpItemSpriteList[5 * pageIndex + 0].setPosition(cc.p(this._bg.x, this._bg.y));
                //
                this._popUpItemSpriteList[5 * pageIndex + 1].runAction(new cc.moveBy(0.1, - (this._popUpItemSpriteList[0].width / 2), - (this._popUpItemSpriteList[5 * pageIndex + 1].height / 4)));
                this._popUpItemSpriteList[5 * pageIndex + 0].runAction(new cc.moveBy(0.1, (this._popUpItemSpriteList[1].height / 2), (this._popUpItemSpriteList[5 * pageIndex + 0].height / 4)));
                break;
            case 3:
                this._popUpItemSpriteList[5 * pageIndex + 2].setPosition(cc.p(this._bg.x ,this._bg.y));
                this._popUpItemSpriteList[5 * pageIndex + 1].setPosition(cc.p(this._bg.x, this._bg.y));
                this._popUpItemSpriteList[5 * pageIndex + 0].setPosition(cc.p(this._bg.x, this._bg.y));
                //
                this._popUpItemSpriteList[5 * pageIndex + 2].runAction(new cc.moveBy(0.1, -(this._popUpItemSpriteList[5 * pageIndex + 2].width/2), 0));
                this._popUpItemSpriteList[5 * pageIndex + 1].runAction(new cc.moveBy(0.1,  (this._popUpItemSpriteList[5 * pageIndex + 2].width)/2,  (this._popUpItemSpriteList[5 * pageIndex + 2].height / 2)));
                this._popUpItemSpriteList[5 * pageIndex + 0].runAction(new cc.moveBy(0.1, (this._popUpItemSpriteList[5 * pageIndex + 0].width)/2, -(this._popUpItemSpriteList[5 * pageIndex + 2].height / 2)));

                break;
            case 4:
                this._popUpItemSpriteList[5 * pageIndex + 3].setPosition(cc.p(this._bg.x, this._bg.y));
                this._popUpItemSpriteList[5 * pageIndex + 2].setPosition(cc.p(this._bg.x, this._bg.y));
                this._popUpItemSpriteList[5 * pageIndex + 1].setPosition(cc.p(this._bg.x, this._bg.y));
                this._popUpItemSpriteList[5 * pageIndex + 0].setPosition(cc.p(this._bg.x, this._bg.y));
                //
                this._popUpItemSpriteList[5 * pageIndex + 3].runAction(new cc.moveBy(0.1, - (this._popUpItemSpriteList[5 * pageIndex + 3].width *1.5), 0));
                this._popUpItemSpriteList[5 * pageIndex + 2].runAction(new cc.moveBy(0.1,  - (this._popUpItemSpriteList[5 * pageIndex + 2].width *.5),0));
                this._popUpItemSpriteList[5 * pageIndex + 1].runAction(new cc.moveBy(0.1, (this._popUpItemSpriteList[5 * pageIndex + 1].width)*.5, 0));

                this._popUpItemSpriteList[5 * pageIndex + 0].runAction(new cc.moveBy(0.1, (this._popUpItemSpriteList[5 * pageIndex + 0].width * 1.5), 0));

                break;
            case 0:
                this._popUpItemSpriteList[5 * pageIndex + 4].setPosition(cc.p(this._bg.x, this._bg.y));
                this._popUpItemSpriteList[5 * pageIndex + 3].setPosition(cc.p(this._bg.x, this._bg.y));
                this._popUpItemSpriteList[5 * pageIndex + 2].setPosition(cc.p(this._bg.x, this._bg.y));
                this._popUpItemSpriteList[5 * pageIndex + 1].setPosition(cc.p(this._bg.x, this._bg.y));
                this._popUpItemSpriteList[5 * pageIndex + 0].setPosition(cc.p(this._bg.x, this._bg.y));
                //
                this._popUpItemSpriteList[5 * pageIndex + 4].runAction(new cc.moveBy(0.1, - (this._popUpItemSpriteList[5 * pageIndex + 4].width * 5 / 4), (this._popUpItemSpriteList[5 * pageIndex + 4].width / 4)));
                this._popUpItemSpriteList[5 * pageIndex + 3].runAction(new cc.moveBy(0.1, - (this._popUpItemSpriteList[5 * pageIndex + 3].width / 4), (this._popUpItemSpriteList[5 * pageIndex + 3].height / 2)));
                this._popUpItemSpriteList[5 * pageIndex + 2].runAction(new cc.moveBy(0.1, (this._popUpItemSpriteList[5 * pageIndex + 2].width * 3 / 4), (this._popUpItemSpriteList[5 * pageIndex + 2].height * 3 / 4)));

                this._popUpItemSpriteList[5 * pageIndex + 1].runAction(new cc.moveBy(0.1, - (this._popUpItemSpriteList[5 * pageIndex + 1].width / 4), - (this._popUpItemSpriteList[5 * pageIndex + 1].height / 2)));
                this._popUpItemSpriteList[5 * pageIndex + 0].runAction(new cc.moveBy(0.1, (this._popUpItemSpriteList[5 * pageIndex + 0].width * 3 / 4), - (this._popUpItemSpriteList[5 * pageIndex + 0].height / 4)));

                break;

        }
    },
    renderFirstSlot: function(machineId, spriteCalled){
        var screenPosition = this._screenPosition;
        var machine = user.getAsset().getMachineById(machineId);

        this._FirstSlotSprite = new SquareSprite(res.o_trong_1_1);
        this._FirstSlotSprite.setPosition(screenPosition.x + spriteCalled.width * 1 / 3,
            screenPosition.y );
        this._FirstSlotSprite.setScale(1.1);
        this.addChild(this._FirstSlotSprite);
        this._btnBoost = ccui.Button(res.button_energy_2);
        this._btnBoost.setPosition(screenPosition.x + spriteCalled.width * 1 / 3  , screenPosition.y - this._FirstSlotSprite.height/2);
        this.addChild(this._btnBoost);


        var rubiImage = new ccui.ImageView(res.rubi);
        rubiImage.setPosition(cc.p(this._btnBoost.width * 3 / 4, this._btnBoost.height / 2));
        this._btnBoost.addChild(rubiImage);

        this._labelRubyToBoost = new cc.LabelBMFont("4", res.FONT_OUTLINE_30);
        this._labelRubyToBoost.setPosition(cc.p(this._btnBoost.width   / 2, this._btnBoost.height /2));
        this._btnBoost.addChild(this._labelRubyToBoost);


        this._labelTime = cc.LabelBMFont("15:34",res.FONT_NORMAL_30);
        this._labelTime.setPosition(screenPosition.x + spriteCalled.width * 1 / 3  , screenPosition.y + this._FirstSlotSprite.height * 0.7);
        this._btnBoost.addChild(this._labelTime);

        this._btnBoost.addClickEventListener(this.onBoostEvent());
    },
    initSlotlist: function(machineId){
        var machine = user.getAsset().getMachineById(machineId);
        var slot = machine.slot;
        this._queueSpriteList = [];
        for (var i = 0 ; i < slot - 1; i++){

            var squareSprite = new SquareSprite(res.o_trong_2_2);
            this._queueSpriteList.push(squareSprite);
            this.addChild(this._queueSpriteList[i]);
        }
    },
    setPositionSlotList: function (machineId){

        var machine = user.getAsset().getMachineById(machineId);
        var slot = machine.slot;
        for (var i = 0 ; i < slot - 1; i++){
            this._queueSpriteList[i].setPosition(cc.p(this._FirstSlotSprite.x, this._FirstSlotSprite.y));

            if (i < 4){
                if (i == 0) {
                    this._queueSpriteList[i].runAction(new cc.moveBy(0.1, (i +1)*this._FirstSlotSprite.width * 1.1, 0));
                } else {
                    this._queueSpriteList[i].runAction(new cc.moveBy(0.1, (i +1)*this._FirstSlotSprite.width * 1.05, 0));
                }
            } else {
               switch (i){
                   case 4: this._queueSpriteList[i].runAction(new cc.moveBy(0.1, this._FirstSlotSprite.width * 1.1, - this._FirstSlotSprite.height * 1.1)); break;
                   case 5: this._queueSpriteList[i].runAction(new cc.moveBy(0.1, 2*this._FirstSlotSprite.width * 1.05, - this._FirstSlotSprite.height * 1.1)); break;
                   case 6: this._queueSpriteList[i].runAction(new cc.moveBy(0.1, 3*this._FirstSlotSprite.width * 1.05, - this._FirstSlotSprite.height * 1.1)); break;
                   case 7: this._queueSpriteList[i].runAction(new cc.moveBy(0.1, 4*this._FirstSlotSprite.width * 1.05, - this._FirstSlotSprite.height * 1.1)); break;
               }

            }
        }


    },
    renderUnlockButton:function(machineId){
        var machine = user.getAsset().getMachineById(machineId);
        var slot = machine.slot;
        if (slot < 9){
            this._unlockSlotSprite = new ccui.Button(res.button_congG_1);
            this._unlockSlotSprite.setScale(this._queueSpriteList[0].width/this._unlockSlotSprite.width);
            this.addChild(this._unlockSlotSprite);

            var rubiImage = new ccui.ImageView(res.rubi);
            rubiImage.setPosition(cc.p(this._unlockSlotSprite.width * 2 / 3, this._unlockSlotSprite.height / 4));
            this._unlockSlotSprite.addChild(rubiImage);
            if (slot == 2){
                this._labelRubyToUnlockSlot = new cc.LabelBMFont(MACHINE_CONFIG.FIRST_PRICE_BUY_SLOT, res.FONT_OUTLINE_30);
            } else {
                this._labelRubyToUnlockSlot = new cc.LabelBMFont(MACHINE_CONFIG.NEXT_PRICE_BUY_SLOT, res.FONT_OUTLINE_30);
            }
            this._labelRubyToUnlockSlot.setPosition(cc.p(this._unlockSlotSprite.width * 1 / 3, this._unlockSlotSprite.height /4));
            this._unlockSlotSprite.addChild(this._labelRubyToUnlockSlot);
        }
        this.setPositionForUnlockButton(machineId);
    },
    setPositionForUnlockButton:function(machineId){
        var machine = user.getAsset().getMachineById(machineId);
        var slot = machine.slot;
       if (slot < 9){
           this._unlockSlotSprite.setPosition(this._FirstSlotSprite.x, this._FirstSlotSprite.y);
           this._unlockSlotSprite.addClickEventListener(this.onUnlockSlotEvent.bind(this));

           if (slot <= 5){
               this._unlockSlotSprite.runAction(new cc.moveBy(0.1, slot*this._FirstSlotSprite.width * 1.05, 0));
           }
           else {
               this._unlockSlotSprite.runAction(new cc.moveBy(0.1, ((slot + 1) % 5)*this._FirstSlotSprite.width * 1.05, - this._FirstSlotSprite.height * 1.1));
           }
       } else {
           if (this._unlockSlotSprite != null) this._unlockSlotSprite.setVisible(false);
       }
    },

    updateProductQueue:function(){

    }
});

var SquareSprite = cc.Sprite.extend({
    nullLabel: null,
    ctor:function(state){
        this._super(state);
    }
})