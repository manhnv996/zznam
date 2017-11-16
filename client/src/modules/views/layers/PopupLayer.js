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


        this.schedule(this.updateProgressBarInprogress, 0.2);
    },


    ///

    ////////////////////
    addBoostEvent: function (sender) {

        PlantCtrl.instance.boostPlant(this.fieldId);

    },

    updateProgressBarInprogress: function () {

        if (this.isShowProgressBar){
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
        //this.disablePopup(null);

        this.disableProgressBarInprogress();


        this.progressBar = cc.Sprite.create(res.progressbar);
        //this.progressBar.setPosition(0, this.height);
        this.progressBar.setPosition(cc.winSize.width / 2, cc.winSize.height / 2);
        this.progressBar.setScale(0.5);
        this.addChild(this.progressBar);


        this.progress = cc.Sprite.create(res.progress);
        this.progress.setScale(0, 1);
        this.progress.setPosition(this.progressBar.width / 2 + 28 - 148, this.progressBar.height / 2);
        this.progressBar.addChild(this.progress);


        // time remain
        // this.timeRemain = new cc.LabelTTF("", "res/fonts/eff_number.fnt", 32);
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





    ///////////////////////
    showSeedPopup: function(fieldId, seedList){
        //cc.log("showPopup");

        this.disablePopup(null);


        this.popupItemList = [];

        //
        if (seedList != null){

            if (seedList.length > 3){
                this.popupBackground = new cc.Sprite(res.popup5);
            } else if (seedList.length == 3){
                this.popupBackground = new cc.Sprite(res.popup4);
            } else {
                this.popupBackground = new cc.Sprite(res.popup2)
            }


            //this.popupBackground.setPosition(- this.width / 4, this.height * 7 / 4);
            this.popupBackground.setPosition(cc.winSize.width / 2, cc.winSize.height / 2);
            this.addChild(this.popupBackground);

            var index = MapLayer.instance.getIndexOfFieldList(fieldId);
            //cc.log("index = " + index);
            if (index != null) {
                //this.popupBackground.setPosition(MapLayer.instance.fieldList[index].getPosition().x - MapLayer.instance.fieldList[index].width / 1.5,
                //    MapLayer.instance.fieldList[index].getPosition().y + MapLayer.instance.fieldList[index].height / 1.5);
            }


            //
            for (var i = 0; i < seedList.length; i++){

                var seed_type = seedList[i].getTypeItem();


                var seed_img = getSeedImgBySeedTypeAndQuantity(seed_type, seedList[i].getQuantityItem());

                var seed = new SeedSprite(this, seed_img, seed_type);
                seed.quantity = seedList[i].getQuantityItem();


                seed.setPosition(cc.p(this.popupBackground.x, this.popupBackground.y));

                /////
                seed.addQuantityInfo();



                this.popupItemList.push(seed);
                //seed.setScale(1.0 / MapLayer.instance.scale);
                this.addChild(seed);
            }


            //setPosition
            switch (seedList.length){
                case 1:

                    break;
                case 2:
                    this.popupItemList[0].runAction(new cc.moveBy(0.1, - (this.popupItemList[0].width / 2), 0));
                    this.popupItemList[1].runAction(new cc.moveBy(0.1, (this.popupItemList[1].height / 2), 0));
                    break;
                case 3:
                    this.popupItemList[0].runAction(new cc.moveBy(0.1, - (this.popupItemList[0].width), 0));
                    // this.popupItemList[1].runAction(new cc.moveBy(0.1, (this.popupItemList[1].height / 2), 0));
                    this.popupItemList[2].runAction(new cc.moveBy(0.1, (this.popupItemList[2].width), 0));

                    break;
                case 4:
                    this.popupItemList[0].runAction(new cc.moveBy(0.1, - (this.popupItemList[0].width), (this.popupItemList[0].height / 2)));
                    this.popupItemList[1].runAction(new cc.moveBy(0.1, 0, (this.popupItemList[1].height / 2)));
                    this.popupItemList[2].runAction(new cc.moveBy(0.1, (this.popupItemList[2].width), (this.popupItemList[1].height / 2)));

                    this.popupItemList[3].runAction(new cc.moveBy(0.1, - (this.popupItemList[3].width / 2), - (this.popupItemList[3].height / 2)));

                    break;
                case 5:
                    this.popupItemList[0].runAction(new cc.moveBy(0.1, - (this.popupItemList[0].width), (this.popupItemList[0].height / 2)));
                    this.popupItemList[1].runAction(new cc.moveBy(0.1, 0, (this.popupItemList[1].height / 2)));
                    this.popupItemList[2].runAction(new cc.moveBy(0.1, (this.popupItemList[2].width), (this.popupItemList[1].height / 2)));

                    this.popupItemList[3].runAction(new cc.moveBy(0.1, - (this.popupItemList[3].width / 2), - (this.popupItemList[3].height / 2)));
                    this.popupItemList[4].runAction(new cc.moveBy(0.1, + (this.popupItemList[3].width / 2), - (this.popupItemList[3].height / 2)));

                    break;

                default:
                    var temp = Math.floor(this.popupItemList.length / 2);
                    for (var i = 0; i < this.popupItemList.length; i++){
                        if (i < temp + 1){
                            this.popupItemList[i].runAction(new cc.moveBy(0.1, - (Math.pow(-1, i)) * (temp - i - 1) * (this.popupItemList[i].width), (this.popupItemList[i].height / 2)));
                        } else {
                            this.popupItemList[i].runAction(new cc.moveBy(0.1, + (Math.pow(-1, i)) * (temp * 2 - i) * (this.popupItemList[i].width) + (this.popupItemList[i].width / 2), - (this.popupItemList[i].height / 2)));
                        }
                    }

            }



        } else {
            this.popupBackground = cc.Sprite.create(res.popup2);
            this.popupBackground.setPosition(- this.width / 4, this.height * 3 / 2);
            this.addChild(this.popupBackground);
//
            var index = this.getIndexOfFieldList(fieldId);
            //cc.log("index = " + index);
            if (index != null) {
                this.popupBackground.setPosition(this.fieldList[index].x - this.fieldList[index].width / 1.5, this.fieldList[index].y + this.fieldList[index].height / 1.5);
            }
        }

    },

    showToolPopup: function(fieldId){
        //cc.log("showPopup");

        this.disablePopup(null);


        this.popupBackground = cc.Sprite.create(res.popup2);
        //this.popupBackground.setPosition(- this.width / 8, this.height * 4 / 3);
        this.popupBackground.setPosition(cc.winSize.width / 2, cc.winSize.height / 2);
        this.addChild(this.popupBackground);


        var tool = new CropToolSprite(this, res.liem);

        tool.setPosition(cc.p(this.popupBackground.x, this.popupBackground.y));


        this.popupItemList = [];
        this.popupItemList.push(tool);
        this.addChild(tool);

    },

    disablePopup: function(seedId){
        //cc.log("disvisible");
        this.disablePopupBackground();

        this.disVisibleItemOfPopup(seedId);

    },

    //
    disablePopupBackground: function () {
        if (this.popupBackground != null) {
            /*
             BUGG
             WHY ?!
             */
            // if (this.popupBackground.isVisible()) {
            this.popupBackground.setVisible(false);

            this.popupBackground = null;
            // }
        }
//
    },//
    disVisibleItemOfPopup: function(seedId){
        var index = this.getIndexSeedOfPopupItemList(seedId);
        if (index == null){
            for (var i = 0; i < this.popupItemList.length; i++){
                if (this.popupItemList[i] != null){
                    if (this.popupItemList[i].isVisible()){
                        this.popupItemList[i].setVisible(false);

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

                        }

                    }

                }
            }
            this.popupItemList = [];

        }

    },
    getIndexSeedOfPopupItemList: function (seedId) {
        if (seedId == null){    //
            if (this.popupItemList.length == 1){
                if (!this.popupItemList[0].seedType){    //tool
                    // return 0;
                }
            }
            return null;
        }
        for (var i = 0; i < this.popupItemList.length; i++){    //seed list
            if (this.popupItemList[i].seedType == seedId){
                return i;
            }
        }
        return null;
    },



});
//PopupLayer.instance = new PopupLayer();