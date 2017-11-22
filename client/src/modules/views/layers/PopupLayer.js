/**
 * Created by CPU60133_LOCAL on 11/16/2017.
 */

var PopupLayer = cc.Layer.extend({
//
    popupBackground: null,
    popupItemList: [],
    fieldList: [],

    isShowProgressBar: false,


    ctor: function () {
        this._super();


        this.pageCurr = 0;
        this.schedule(this.updateProgressBarInprogress, 0.2);
    },


    ///

    ////////////////////
    addBoostEvent: function (sender) {
        cc.log("addboostevent");
        PlantCtrl.instance.boostPlant(this.fieldId);

    },

    updateProgressBarInprogress: function () {

        if (this.isShowProgressBar){
//          ///
            var parsePlantTime = user.getAsset().getFieldList()[this.fieldId].getPlantedTime().getTime();
            var parseCropTime = user.getAsset().getFieldList()[this.fieldId].getCropTime().getTime();
            var currTime = new Date().getTime();

            var duration = parseCropTime - parsePlantTime;
            var curr = currTime - parsePlantTime;

            if (curr > duration){
                this.isShowProgressBar = false;

                this.disableProgressBarInprogress();
                return false;
            }

            this.progress.setScale(curr / duration, 1);
            this.progress.setPositionX(this.progressBar.width / 2 + 28 - 180 + this.progress.getScaleX() * 180);

            //
            var remain = new Date();
            remain.setTime(duration - curr);
            var timeRemainShow = "";
            if (duration - curr > 60 * 60 * 1000){
                timeRemainShow = remain.getHours() + ": " + remain.getMinutes() + ": " + remain.getSeconds();
            } else {
                timeRemainShow = remain.getMinutes() + ": " + remain.getSeconds();
            }
            this.timeRemain.setString(timeRemainShow);

        }
    },

    showProgressBarInprogress: function (fieldId) {
        this.fieldId = fieldId;

        this.disablePopup(null);
        this.disableProgressBarInprogress();


        this.progressBar = cc.Sprite.create(res.progressbar);
        this.progressBar.setPosition(cc.winSize.width / 2, cc.winSize.height / 2);
        this.progressBar.setScale(0.5);
        this.addChild(this.progressBar);


        var index = MapLayer.instance.getIndexOfFieldList(fieldId);
        //cc.log("index = " + index);
        if (index != null) {
            var fieldSelected = user.getAsset().getFieldById(MapLayer.instance.fieldList[index].fieldId);
            //
            var fieldScreenPosition = MapValues.logicToScreenPosition(fieldSelected.getCoordinate().getCurrX(), fieldSelected.getCoordinate().getCurrY());
            this.progressBar.setPosition(fieldScreenPosition.x, fieldScreenPosition.y);
        }


        this.progress = cc.Sprite.create(res.progress);
        this.progress.setScale(0, 1);
        this.progress.setPosition(this.progressBar.width / 2 + 28 - 148, this.progressBar.height / 2);
        this.progressBar.addChild(this.progress);


        // time remain
        this.timeRemain = new cc.LabelBMFont("", res.FONT_OUTLINE_50);
        this.timeRemain.setPosition(cc.p(this.progressBar.width / 2, this.progressBar.height));
        // this.timeRemain.setPosition(cc.p(0, 0));
        this.progressBar.addChild(this.timeRemain);


        // button boost
        var btBoost = new ccui.Button(res.btBoost);
        btBoost.setPosition(cc.p(this.progressBar.width * 10 / 9, this.progressBar.height / 2));
        this.progressBar.addChild(btBoost);

        var rubi = new cc.Sprite(res.rubi);
        rubi.setPosition(cc.p(btBoost.width * 4 / 5, btBoost.height / 2));
        btBoost.addChild(rubi);


        var rubi_buy_seed = new cc.LabelBMFont("1", res.FONT_OUTLINE_30);
        rubi_buy_seed.setPosition(cc.p(btBoost.width / 2, btBoost.height / 2));
        btBoost.addChild(rubi_buy_seed);
        //
        btBoost.addClickEventListener(this.addBoostEvent.bind(this));


        //
        if (user.getAsset().getFieldList()[fieldId].getPlantedTime() == null){

            return false;
        }
        this.isShowProgressBar = true;

    },
    disableProgressBarInprogress: function () {

        this.isShowProgressBar = false;

        if (this.progressBar != null){
            // if (this.progressBar.isVisible()){
            this.progressBar.setVisible(false);


            this.progressBar = null;
            // }

        }
    },



////////////////
    disableItemOfPopupByListIndex: function (pageIndex, seedShowNumber) {
        for (var i = 0; i < this.popupItemList.length; i++){
            if (i >= (5 * pageIndex) && i < (5 * pageIndex + seedShowNumber)) {
                this.popupItemList[i].setVisible(true);
                this.popupItemList[i].resume();

            } else {
                this.popupItemList[i].setVisible(false);
                this.popupItemList[i].pause();
            }

        }
    },

    setSeedListPosition: function (pageIndex, seedList) {
        var pageNumber = Math.ceil(this.popupItemList.length / 5);
        var seedShowNumber = 5;
        if (pageNumber > 1) {
            if (pageIndex < pageNumber - 1){
                seedShowNumber = 5;
            } else {
                seedShowNumber = seedList.length - (pageNumber - 1) * 5;
            }
        } else {
            seedShowNumber = seedList.length;
        }

        this.disableItemOfPopupByListIndex(pageIndex, seedShowNumber);

        //setPosition
        switch (seedShowNumber % 5){
            case 1:
                this.popupItemList[5 * pageIndex + 0].setPosition(cc.p(this.popupBackground.x, this.popupBackground.y));
                //
                break;
            case 2:
                this.popupItemList[5 * pageIndex + 1].setPosition(cc.p(this.popupBackground.x, this.popupBackground.y));
                this.popupItemList[5 * pageIndex + 0].setPosition(cc.p(this.popupBackground.x, this.popupBackground.y));
                //
                this.popupItemList[5 * pageIndex + 1].runAction(new cc.moveBy(0.1, - (this.popupItemList[0].width / 2), - (this.popupItemList[5 * pageIndex + 1].height / 4)));
                this.popupItemList[5 * pageIndex + 0].runAction(new cc.moveBy(0.1, (this.popupItemList[1].height / 2), (this.popupItemList[5 * pageIndex + 0].height / 4)));
                break;
            case 3:
                this.popupItemList[5 * pageIndex + 2].setPosition(cc.p(this.popupBackground.x, this.popupBackground.y));
                this.popupItemList[5 * pageIndex + 1].setPosition(cc.p(this.popupBackground.x, this.popupBackground.y));
                this.popupItemList[5 * pageIndex + 0].setPosition(cc.p(this.popupBackground.x, this.popupBackground.y));
                //
                this.popupItemList[5 * pageIndex + 2].runAction(new cc.moveBy(0.1, - (this.popupItemList[5 * pageIndex + 2].width), - (this.popupItemList[5 * pageIndex + 2].height / 4)));
                // this.popupItemList[5 * pageIndex + 1].runAction(new cc.moveBy(0.1, 0, 0));
                this.popupItemList[5 * pageIndex + 0].runAction(new cc.moveBy(0.1, (this.popupItemList[5 * pageIndex + 0].width), (this.popupItemList[5 * pageIndex + 2].height / 4)));

                break;
            case 4:
                this.popupItemList[5 * pageIndex + 3].setPosition(cc.p(this.popupBackground.x, this.popupBackground.y));
                this.popupItemList[5 * pageIndex + 2].setPosition(cc.p(this.popupBackground.x, this.popupBackground.y));
                this.popupItemList[5 * pageIndex + 1].setPosition(cc.p(this.popupBackground.x, this.popupBackground.y));
                this.popupItemList[5 * pageIndex + 0].setPosition(cc.p(this.popupBackground.x, this.popupBackground.y));
                //
                this.popupItemList[5 * pageIndex + 3].runAction(new cc.moveBy(0.1, - (this.popupItemList[5 * pageIndex + 3].width), 0));
                this.popupItemList[5 * pageIndex + 2].runAction(new cc.moveBy(0.1, 0, (this.popupItemList[5 * pageIndex + 2].height / 4)));
                this.popupItemList[5 * pageIndex + 1].runAction(new cc.moveBy(0.1, (this.popupItemList[5 * pageIndex + 1].width), (this.popupItemList[5 * pageIndex + 1].height / 2)));

                this.popupItemList[5 * pageIndex + 0].runAction(new cc.moveBy(0.1, (this.popupItemList[5 * pageIndex + 0].width * 2 / 4), - (this.popupItemList[5 * pageIndex + 0].height / 2)));

                break;
            case 0:
                this.popupItemList[5 * pageIndex + 4].setPosition(cc.p(this.popupBackground.x, this.popupBackground.y));
                this.popupItemList[5 * pageIndex + 3].setPosition(cc.p(this.popupBackground.x, this.popupBackground.y));
                this.popupItemList[5 * pageIndex + 2].setPosition(cc.p(this.popupBackground.x, this.popupBackground.y));
                this.popupItemList[5 * pageIndex + 1].setPosition(cc.p(this.popupBackground.x, this.popupBackground.y));
                this.popupItemList[5 * pageIndex + 0].setPosition(cc.p(this.popupBackground.x, this.popupBackground.y));
                //
                this.popupItemList[5 * pageIndex + 4].runAction(new cc.moveBy(0.1, - (this.popupItemList[5 * pageIndex + 4].width * 5 / 4), (this.popupItemList[5 * pageIndex + 4].width / 4)));
                this.popupItemList[5 * pageIndex + 3].runAction(new cc.moveBy(0.1, - (this.popupItemList[5 * pageIndex + 3].width / 4), (this.popupItemList[5 * pageIndex + 3].height / 2)));
                this.popupItemList[5 * pageIndex + 2].runAction(new cc.moveBy(0.1, (this.popupItemList[5 * pageIndex + 2].width * 3 / 4), (this.popupItemList[5 * pageIndex + 2].height * 3 / 4)));

                this.popupItemList[5 * pageIndex + 1].runAction(new cc.moveBy(0.1, - (this.popupItemList[5 * pageIndex + 1].width / 4), - (this.popupItemList[5 * pageIndex + 1].height / 2)));
                this.popupItemList[5 * pageIndex + 0].runAction(new cc.moveBy(0.1, (this.popupItemList[5 * pageIndex + 0].width * 3 / 4), - (this.popupItemList[5 * pageIndex + 0].height / 4)));

                break;

        }
    },

    turnPageEvent: function () {
        this.pageListNumber[this.pageCurr].setTexture(res.page);

        this.pageCurr = (this.pageCurr + 1) % (Math.ceil(this.popupItemList.length / 5));
        this.setSeedListPosition(this.pageCurr, this.popupItemList);

        this.pageListNumber[this.pageCurr].setTexture(res.pageSelected);
    },

    ///////////////////////
    showSeedPopup: function(fieldId, seedList){
        //cc.log("showPopup");

        this.disablePopup(null);
        this.disableProgressBarInprogress();

        this.popupItemList = [];

        //
        if (seedList != null){

            this.popupBackground = new cc.Sprite(res.popup5);

            this.popupBackground.setPosition(cc.winSize.width / 2, cc.winSize.height / 2);
            this.addChild(this.popupBackground);

            var index = MapLayer.instance.getIndexOfFieldList(fieldId);
            //cc.log("index = " + index);
            if (index != null) {
                var fieldSelected = user.getAsset().getFieldById(MapLayer.instance.fieldList[index].fieldId);

                var fieldScreenPosition = MapValues.logicToScreenPosition(fieldSelected.getCoordinate().getCurrX(), fieldSelected.getCoordinate().getCurrY());
                this.popupBackground.setPosition(fieldScreenPosition.x - MapLayer.instance.fieldList[index].width * 2 / 3,
                    fieldScreenPosition.y + MapLayer.instance.fieldList[index].height * 2 / 3);
            }


            //
            for (var i = 0; i < seedList.length; i++){
                var seed_type = seedList[i].getTypeItem();

                var seed_img = getSeedImgBySeedTypeAndQuantity(seed_type, seedList[i].getQuantityItem());

                var seed = new SeedSprite(this, seed_img, seed_type);
                seed.quantity = seedList[i].getQuantityItem();

                // seed.setPosition(cc.p(this.popupBackground.x, this.popupBackground.y));

                /////
                seed.addQuantityInfo();

                this.popupItemList.push(seed);
                // this.addChild(seed);
            }

            for (var i = this.popupItemList.length - 1; i >= 0; i--){
                this.addChild(this.popupItemList[i]);
            }


            var pageNumber = Math.ceil(this.popupItemList.length / 5);
            if (pageNumber > 1){
                this.btTurnPage = new ccui.Button(res.btTurnPage);
                this.btTurnPage.setPosition(cc.p(this.popupBackground.x - this.popupBackground.width / 2,
                    this.popupBackground.y - this.popupBackground.height / 2));
                this.addChild(this.btTurnPage);
                //
                this.btTurnPage.addClickEventListener(this.turnPageEvent.bind(this));

                this.pageListNumber = [];
                for (var i = 0; i < pageNumber; i++){
                    var page;
                    if (i == this.pageCurr){
                        page = new cc.Sprite(res.pageSelected);
                    } else {
                        page = new cc.Sprite(res.page);
                    }
                    page.setPosition(this.btTurnPage.width + page.width * 4 / 3 * (i + 1), this.btTurnPage.height * 3 / 4);
                    this.btTurnPage.addChild(page);

                    this.pageListNumber.push(page);
                }

            }


            this.setSeedListPosition(this.pageCurr, seedList);

        }

    },

    showToolPopup: function(fieldId){
        //cc.log("showPopup");

        this.disablePopup(null);
        this.disableProgressBarInprogress();


        this.popupBackground = cc.Sprite.create(res.popup2);
        //this.popupBackground.setPosition(- this.width / 8, this.height * 4 / 3);
        this.popupBackground.setPosition(cc.winSize.width / 2, cc.winSize.height / 2);
        this.addChild(this.popupBackground);

        var index = MapLayer.instance.getIndexOfFieldList(fieldId);
        if (index != null) {
            var fieldSelected = user.getAsset().getFieldById(MapLayer.instance.fieldList[index].fieldId);

            var fieldScreenPosition = MapValues.logicToScreenPosition(fieldSelected.getCoordinate().getCurrX(), fieldSelected.getCoordinate().getCurrY());
            this.popupBackground.setPosition(fieldScreenPosition.x - MapLayer.instance.fieldList[index].width * 1 / 2,
                fieldScreenPosition.y + MapLayer.instance.fieldList[index].height * 2 / 3);

        }



        var tool = new CropToolSprite(this, res.liem);

        tool.setPosition(cc.p(this.popupBackground.x, this.popupBackground.y));


        this.popupItemList = [];
        this.popupItemList.push(tool);
        this.addChild(tool);

    },

    disablePopup: function(seedId){
        //cc.log("disvisible");
        this.disablePopupBackground();

        this.disableItemOfPopup(seedId);

    },

    //
    disablePopupBackground: function () {
        if (this.popupBackground != null) {

            this.popupBackground.setVisible(false);
            this.popupBackground.removeFromParent(true);

            this.popupBackground = null;
        }
        if (this.btTurnPage != null){
            this.btTurnPage.setVisible(false);
            this.btTurnPage.removeFromParent(true);
            this.btTurnPage = null;
        }
//
    },//
    disableItemOfPopup: function(seedId){
        var index = this.getIndexSeedOfPopupItemList(seedId);
        if (index == null){
            for (var i = 0; i < this.popupItemList.length; i++){
                if (this.popupItemList[i] != null){
                    if (this.popupItemList[i].isVisible()){
                        this.popupItemList[i].setVisible(false);
                        // this.popupItemList[i].pause();
                        this.popupItemList[i].removeFromParent(true);
                        this.popupItemList[i].clearListener();
                    }

                }
            }
            this.popupItemList = [];
        } else {
            for (var i = 0; i < this.popupItemList.length; i++){
                if (index != i){
                    if (this.popupItemList[i] != null){
                        if (this.popupItemList[i].isVisible()){
                            this.popupItemList[i].setVisible(false);
                            // this.popupItemList[i].pause();
                            this.popupItemList[i].removeFromParent(true);
                            this.popupItemList[i].clearListener();
                        }

                    }

                }
            }
            this.popupItemList = [];

        }

    },
    getIndexSeedOfPopupItemList: function (seedId) {
        if (seedId == null){    //

            return null;
        }
        for (var i = 0; i < this.popupItemList.length; i++){    //seed list
            if (this.popupItemList[i].seedType == seedId){
                return i;
            }
        }
        return null;
    },

    
//    ////
    showNoticeFullFoodStorageBG: function () {

        this.addCloseBGEvent();
        this.setPauseBackground(MapLayer.instance.fieldList, true);


        this.noticeBG = new cc.Sprite(res.bgNotice);
        this.noticeBG.setPosition(cc.winSize.width / 2, cc.winSize.height / 2);
        this.addChild(this.noticeBG);

        var action1 = new cc.ScaleTo(0.1, 1.25);
        var action2 = new cc.ScaleTo(0.1, 1.15);
        this.noticeBG.runAction(cc.sequence(action1, cc.delayTime(0.01), action2));



        var msgFullFoodStorage = new cc.Sprite(res.msgFullFoodStorage);
        msgFullFoodStorage.setPosition(this.noticeBG.width / 2, this.noticeBG.height / 2);
        this.noticeBG.addChild(msgFullFoodStorage);


        var btTick = new ccui.Button(res.btTick);
        btTick.setPosition(this.noticeBG.width * 3 / 4, this.noticeBG.height / 4);
        this.noticeBG.addChild(btTick);
//
        btTick.addClickEventListener(this.addCloseBGEvent.bind(this));

    },

    addCloseBGEvent: function (sender) {
        if (this.noticeBG != null){
            this.noticeBG.setVisible(false);

            this.noticeBG.removeFromParent(true);
            this.noticeBG = null;
        }

        this.setPauseBackground(MapLayer.instance.fieldList, false);
    },


//    ////
    showSuggestBuyingSeedBG: function (seedType) {

        this.addCloseBGEvent();
        this.setPauseBackground(MapLayer.instance.fieldList, true);


        this.noticeBG = new cc.Sprite(res.bgNotice2);
        this.noticeBG.setPosition(cc.winSize.width / 2, cc.winSize.height / 2);
        this.addChild(this.noticeBG);

        var action1 = new cc.ScaleTo(0.1, 1.25);
        var action2 = new cc.ScaleTo(0.1, 1.15);
        this.noticeBG.runAction(cc.sequence(action1, cc.delayTime(0.01), action2));



        var btCancle = new ccui.Button(res.btCancle);
        btCancle.setPosition(this.noticeBG.width * 19 / 20, this.noticeBG.height * 7 / 8);
        this.noticeBG.addChild(btCancle);
        btCancle.addClickEventListener(this.addCloseBGEvent.bind(this));

        var msgNotice = new cc.LabelBMFont("Thông Báo", res.FONT_OUTLINE_50);
        msgNotice.setPosition(cc.p(this.noticeBG.width / 2, this.noticeBG.height * 7 / 8));
        this.noticeBG.addChild(msgNotice);

//
        var msgContent = new cc.LabelBMFont("Bạn bị thiếu vật phẩm", res.FONT_OUTLINE_30);
        msgContent.setPosition(cc.p(this.noticeBG.width / 2, this.noticeBG.height * 2 / 3));
        this.noticeBG.addChild(msgContent);

        var seedImg = new cc.Sprite(getSeedImgBySeedTypeAndQuantity(seedType, 1));
        seedImg.setPosition(cc.p(this.noticeBG.width / 2, this.noticeBG.height / 2));
        this.noticeBG.addChild(seedImg);


        var count = new cc.LabelBMFont("1", res.FONT_OUTLINE_30);
        count.setPosition(cc.p(this.noticeBG.width / 2, this.noticeBG.height * 1 / 3));
        this.noticeBG.addChild(count);

//
        var btBuy = new ccui.Button(res.btSuggest);
        btBuy.setPosition(this.noticeBG.width / 2, this.noticeBG.height / 8);
        this.noticeBG.addChild(btBuy);
        // btBuy.addClickEventListener(this.addBuyingSeedEvent.bind(this));
        btBuy.addClickEventListener(function () {
            if (PlantCtrl.instance.buySeed(seedType)){
                PopupLayer.instance.addCloseBGEvent();

            } else {
                msgContent.setString("Mua vật phẩm không thành công");
            }

        });

        var msgSuggest = new cc.LabelBMFont("Để thực hiện hành động", res.FONT_OUTLINE_30);
        msgSuggest.setPosition(cc.p(btBuy.width * 3 / 5, btBuy.height / 2));
        btBuy.addChild(msgSuggest);

        var rubi = new cc.Sprite(res.rubi);
        rubi.setPosition(cc.p(btBuy.width * 1 / 5, btBuy.height / 2));
        btBuy.addChild(rubi);


        var rubi_buy = getProductObjByType(seedType).rPrice;
        var rubi_buy_seed = new cc.LabelBMFont(rubi_buy, res.FONT_OUTLINE_30);
        rubi_buy_seed.setPosition(cc.p(btBuy.width * 1 / 8, btBuy.height / 2));
        btBuy.addChild(rubi_buy_seed);

    },


    setPauseBackground: function(listSprite, isPause){
        if (isPause){
            for (var i = 0; i < listSprite.length; i++){
                listSprite[i].pause();
            }
        } else {
            for (var i = 0; i < listSprite.length; i++){
                listSprite[i].resume();
            }
        }
    }


});