/**
 * Created by CPU60133_LOCAL on 11/9/2017.
 */

//var FieldSprite = cc.Sprite.extend({
var FieldSprite = MapBlockSprite.extend({

    fieldId: null,

    plantSprite: null,
    seedType: null,

    //
    popupBackground: null,
    popupItemList: [],
    fieldList: [],

    isShowProgressBar: false,


    ctor: function(parent, fieldId, x, y) {
        //this._super();
        this._super(res.field, 1, 1, x, y);

        ////////
        //this.initWithFile(seed_plist_img);

        //
        this.render(fieldId);

        // this.addTouchEventListener(parent, fieldId);
        this.registerTouchEvents();

///////////
        this.schedule(this.updateFieldStatus, 0.5);
        //this.schedule(this.updateProgressBarInprogress, 0.2);
        //this.schedule(PopupLayer.instance.updateProgressBarInprogress, 0.2);

    },
    render: function (fieldId) {
        this.fieldId = fieldId;

    },

    // render: function(fieldId, seed_plist_img, seed_plist){
    //     this.fieldId = fieldId;
    //
    //
    //     if (seed_plist != null){
    //         ////////////
    //         //cc.spriteFrameCache.addSpriteFrames(res.caroot_plist, res.caroot_png); // sprite cache
    //         cc.spriteFrameCache.addSpriteFrames(seed_plist); // sprite cache
    //
    //         this.animation = new cc.Animation([cc.spriteFrameCache.getSpriteFrame("field.png")], 0.1);
    //         this.runAction(cc.animate(this.animation).repeat(1));  //repeat one time
    //         ///////////
    //
    //     }
    //
    // },


    // Not use
    addTouchEventListener: function (parent, fieldId) {

        var touchListener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function (touch, event) {
                // var target = event.getCurrentTarget();
                var target = this;

                var locationInNode = target.convertToNodeSpace(touch.getLocation());
                var s = target.getContentSize();
                var rect = cc.rect(0, 0, s.width, s.height);

                if (cc.rectContainsPoint(rect, locationInNode)) {
                    //cc.log("sprite began... x = " + locationInNode.x + ", y = " + locationInNode.y);

                    target.opacity = 180;
                    touchListener._lock = true;
                    return true;
                }



                return false;
            }.bind(this),
            onTouchMoved: function (touch, event) {
                touchListener._lock = false;
                var delta = touch.getDelta();
                MapLayer.instance.move(delta.x, delta.y);


            }.bind(this),

            onTouchEnded: function (touch, event) {
                cc.log("sprite onTouchesEnded.. ");
                // var target = event.getCurrentTarget();
                var target = this;
                target.opacity = 255;
                //
                if (touchListener._lock) {
                    PlantCtrl.instance.onFieldSelected(fieldId);
                }
                //parent.showSeedPopup();

            }.bind(this)
        });
        cc.eventManager.addListener(touchListener, this.lx + this.ly);
    },

    // When click
    onClick: function() {
        PlantCtrl.instance.onFieldSelected(this.fieldId);
    },

    // When begin click
    onBeginClick: function() {
        this.setOpacity(180);
    },

    // When end click    
    onEndClick: function() {
        this.setOpacity(255);
    },

    //loadAnimFrames: function(num, str_seed_key, speed){
    //    //cc.spriteFrameCache.addSpriteFrames(seed_plist); // sprite cache
    //
    //    this.animFrames = [];
    //    // num equal to spriteSheet
    //    for (var i = 0; i < num; i++) {
    //        var str = str_seed_key + i + ".png";
    //        var frame = cc.spriteFrameCache.getSpriteFrame(str);
    //        this.animFrames.push(frame);
    //
    //    }
    //
    //    this.animation = new cc.Animation(this.animFrames, speed);
    //},
    //runAnimationForever: function(){
    //    this.runAction(cc.animate(this.animation).repeatForever());  //repeatForever
    //},
    //runAnimationRepeat: function(num){
    //    this.runAction(cc.animate(this.animation).repeat(num));  //repeat num time
    //},


    plantAnimation: function (seedType) {

        this.removeAllChildrenWithCleanup(true);

        if (this.fieldId != null){

            var plantTypeObj = getProductObjByType(seedType);

            //
            this.seedType = seedType;

            this.plantSprite = fr.createAnimationById(getResAniIdBySeedType(seedType), this);

            this.plantSprite.setPosition(cc.p(0, this.height));
            this.addChild(this.plantSprite);
            // this.plantSprite.getAnimation().setTimeScale(1);
            this.plantSprite.getAnimation().gotoAndPlay(plantTypeObj.plantAni, -1, -1, 1);

        }
    },
    cropAnimation: function (seedType) {
        if (this.fieldId != null){

            //var plantTypeObj = getProductObjByType(user.getAsset().getFieldList()[this.fieldId].getPlantType());
            var plantTypeObj = getProductObjByType(seedType);


            this.plantSprite.getAnimation().setTimeScale(1);
            this.plantSprite.getAnimation().gotoAndPlay(plantTypeObj.cropAni,-1, -1, 1);

        }
        this.seedType = null;

    },

    //
    //
    changeTexture: function (texture) {
        this.setTexture(texture);
    },
    ////
    updateFieldStatus: function (curr, duration) {

        if (user.getAsset().getFieldList()[this.fieldId].getPlantedTime() == null){

            this.changeTexture(res.field);
            return false;
        }

        var parsePlantTime = user.getAsset().getFieldList()[this.fieldId].getPlantedTime().getTime();
        var parseCropTime = user.getAsset().getFieldList()[this.fieldId].getCropTime().getTime();
        var currTime = new Date().getTime();

        duration = parseCropTime - parsePlantTime;
        curr = currTime - parsePlantTime;


        if (this.plantSprite != null){

            var plantTypeObj = getProductObjByType(this.seedType);

            if (curr > duration + 1000){

                return true;
            }
            else if (curr >= duration){
                //

                //this.plantSprite.getAnimation().setTimeScale(0.5);
                this.plantSprite.getAnimation().gotoAndPlay(plantTypeObj.grow3,-1, -1, 0);
            } else if (curr >= duration * 3 / 4) {
                //
                this.plantSprite.getAnimation().gotoAndPlay(plantTypeObj.grow2,-1, -1, 1);
            } else if (curr >= duration / 2) {
                this.plantSprite.getAnimation().gotoAndPlay(plantTypeObj.grow1,-1, -1, 1);

            } else if(curr >= duration * 1 / 4){
                this.plantSprite.getAnimation().gotoAndPlay(plantTypeObj.plantAni,-1, -1, 1);

            } else {    // < / 2
                this.plantSprite.getAnimation().gotoAndPlay(plantTypeObj.plantAni,-1, -1, 1);

            }
        }

    },



//    ////////////////////
//    addBoostEvent: function (sender) {
//
//        PlantCtrl.instance.boostPlant(this.fieldId);
//
//    },
//
//    updateProgressBarInprogress: function () {
//
//        if (this.isShowProgressBar){
//            var parsePlantTime = user.getAsset().getFieldList()[this.fieldId].getPlantedTime().getTime();
//            var parseCropTime = user.getAsset().getFieldList()[this.fieldId].getCropTime().getTime();
//            var currTime = new Date().getTime();
//
//            var duration = parseCropTime - parsePlantTime;
//            var curr = currTime - parsePlantTime;
//
//            if (curr > duration){
//                this.isShowProgressBar = false;
//
//                this.disableProgressBarInprogress();
//                return false;
//            }
//
//            this.progress.setScale(curr / duration, 1);
//            this.progress.setPositionX(this.progressBar.width / 2 + 28 - 180 + this.progress.getScaleX() * 180);
//
//            //
//            var remain = new Date();
//            remain.setTime(duration - curr);
//            var timeRemainShow = "";
//            if (duration - curr > 60 * 60 * 1000){
//                timeRemainShow = remain.getHours() + ": " + remain.getMinutes() + ": " + remain.getSeconds();
//            } else {
//                timeRemainShow = remain.getMinutes() + ": " + remain.getSeconds();
//            }
//            this.timeRemain.setString(timeRemainShow);
//
//        }
//    },
//
//    showProgressBarInprogress: function () {
//        //this.disablePopup(null);
//
//        this.disableProgressBarInprogress();
//
//
//        this.progressBar = cc.Sprite.create(res.progressbar);
//        this.progressBar.setPosition(0, this.height);
//        this.progressBar.setScale(0.5);
//        this.addChild(this.progressBar);
//
//
//        this.progress = cc.Sprite.create(res.progress);
//        this.progress.setScale(0, 1);
//        this.progress.setPosition(this.progressBar.width / 2 + 28 - 148, this.progressBar.height / 2);
//        this.progressBar.addChild(this.progress);
//
//
//        // time remain
//        // this.timeRemain = new cc.LabelTTF("", "res/fonts/eff_number.fnt", 32);
//        this.timeRemain = new cc.LabelBMFont("", res.FONT_OUTLINE_50);
//        this.timeRemain.setPosition(cc.p(this.progressBar.width / 2, this.progressBar.height));
//        // this.timeRemain.setPosition(cc.p(0, 0));
//        this.progressBar.addChild(this.timeRemain);
//
//
//        // button boost
//        var btBoost = new ccui.Button(res.btBoost);
//        btBoost.setPosition(cc.p(this.progressBar.width * 10 / 9, this.progressBar.height / 2));
//        this.progressBar.addChild(btBoost);
//
//        var rubi = new cc.Sprite(res.rubi);
//        rubi.setPosition(cc.p(btBoost.width * 4 / 5, btBoost.height / 2));
//        btBoost.addChild(rubi);
//        //
//        btBoost.addClickEventListener(this.addBoostEvent.bind(this));
//
//
//
//        //
//        if (user.getAsset().getFieldList()[this.fieldId].getPlantedTime() == null){
//
//            return false;
//        }
//
//        this.isShowProgressBar = true;
//
//    },
//    disableProgressBarInprogress: function () {
//
//        this.isShowProgressBar = false;
//
//        if (this.progressBar != null){
//            // if (this.progressBar.isVisible()){
//                this.progressBar.setVisible(false);
//
//                this.progressBar = null;
//            // }
//
//        }
//    },
//
//
//
//
//    ///////////////////////
//    showSeedPopup: function(fieldId, seedList){
//        //cc.log("showPopup");
//
//        this.disablePopup(null);
//
//
//        this.popupItemList = [];
//
//        //
//        if (seedList != null){
//
//            if (seedList.length > 3){
//                this.popupBackground = new cc.Sprite(res.popup5);
//            } else if (seedList.length == 3){
//                this.popupBackground = new cc.Sprite(res.popup4);
//            } else {
//                this.popupBackground = new cc.Sprite(res.popup2)
//            }
//
//
//            this.popupBackground.setPosition(- this.width / 4, this.height * 7 / 4);
//            this.addChild(this.popupBackground);
//
//
//            //
//            for (var i = 0; i < seedList.length; i++){
//
//                var seed_type = seedList[i].getTypeItem();
//
//
//                var seed_img = getSeedImgBySeedTypeAndQuantity(seed_type, seedList[i].getQuantityItem());
//
//                var seed = new SeedSprite(this, seed_img, seed_type);
//                seed.quantity = seedList[i].getQuantityItem();
//
//
//                seed.setPosition(cc.p(this.popupBackground.x, this.popupBackground.y));
//
//                /////
//                seed.addQuantityInfo();
//
//
//
//                this.popupItemList.push(seed);
//                //seed.setScale(1.0 / MapLayer.instance.scale);
//                this.addChild(seed);
//            }
//
//
//            //setPosition
//            switch (seedList.length){
//                case 1:
//
//                    break;
//                case 2:
//                    this.popupItemList[0].runAction(new cc.moveBy(0.1, - (this.popupItemList[0].width / 2), 0));
//                    this.popupItemList[1].runAction(new cc.moveBy(0.1, (this.popupItemList[1].height / 2), 0));
//                    break;
//                case 3:
//                    this.popupItemList[0].runAction(new cc.moveBy(0.1, - (this.popupItemList[0].width), 0));
//                    // this.popupItemList[1].runAction(new cc.moveBy(0.1, (this.popupItemList[1].height / 2), 0));
//                    this.popupItemList[2].runAction(new cc.moveBy(0.1, (this.popupItemList[2].width), 0));
//
//                    break;
//                case 4:
//                    this.popupItemList[0].runAction(new cc.moveBy(0.1, - (this.popupItemList[0].width), (this.popupItemList[0].height / 2)));
//                    this.popupItemList[1].runAction(new cc.moveBy(0.1, 0, (this.popupItemList[1].height / 2)));
//                    this.popupItemList[2].runAction(new cc.moveBy(0.1, (this.popupItemList[2].width), (this.popupItemList[1].height / 2)));
//
//                    this.popupItemList[3].runAction(new cc.moveBy(0.1, - (this.popupItemList[3].width / 2), - (this.popupItemList[3].height / 2)));
//
//                    break;
//                case 5:
//                    this.popupItemList[0].runAction(new cc.moveBy(0.1, - (this.popupItemList[0].width), (this.popupItemList[0].height / 2)));
//                    this.popupItemList[1].runAction(new cc.moveBy(0.1, 0, (this.popupItemList[1].height / 2)));
//                    this.popupItemList[2].runAction(new cc.moveBy(0.1, (this.popupItemList[2].width), (this.popupItemList[1].height / 2)));
//
//                    this.popupItemList[3].runAction(new cc.moveBy(0.1, - (this.popupItemList[3].width / 2), - (this.popupItemList[3].height / 2)));
//                    this.popupItemList[4].runAction(new cc.moveBy(0.1, + (this.popupItemList[3].width / 2), - (this.popupItemList[3].height / 2)));
//
//                    break;
//
//                default:
//                    var temp = Math.floor(this.popupItemList.length / 2);
//                    for (var i = 0; i < this.popupItemList.length; i++){
//                        if (i < temp + 1){
//                            this.popupItemList[i].runAction(new cc.moveBy(0.1, - (Math.pow(-1, i)) * (temp - i - 1) * (this.popupItemList[i].width), (this.popupItemList[i].height / 2)));
//                        } else {
//                            this.popupItemList[i].runAction(new cc.moveBy(0.1, + (Math.pow(-1, i)) * (temp * 2 - i) * (this.popupItemList[i].width) + (this.popupItemList[i].width / 2), - (this.popupItemList[i].height / 2)));
//                        }
//                    }
//
//            }
//
//
//
//        } else {
//            this.popupBackground = cc.Sprite.create(res.popup2);
//            this.popupBackground.setPosition(- this.width / 4, this.height * 3 / 2);
//            this.addChild(this.popupBackground);
////
//            var index = this.getIndexOfFieldList(fieldId);
//            //cc.log("index = " + index);
//            if (index != null) {
//                this.popupBackground.setPosition(this.fieldList[index].x - this.fieldList[index].width / 1.5, this.fieldList[index].y + this.fieldList[index].height / 1.5);
//            }
//        }
//
//    },
//
//    showToolPopup: function(fieldId){
//        //cc.log("showPopup");
//
//        this.disablePopup(null);
//
//
//        this.popupBackground = cc.Sprite.create(res.popup2);
//        this.popupBackground.setPosition(- this.width / 8, this.height * 4 / 3);
//        this.addChild(this.popupBackground);
//
//
//        var tool = new CropToolSprite(this, res.liem);
//
//        tool.setPosition(cc.p(this.popupBackground.x, this.popupBackground.y));
//
//
//        this.popupItemList = [];
//        this.popupItemList.push(tool);
//        this.addChild(tool);
//
//    },
//
//    disablePopup: function(seedId){
//        //cc.log("disvisible");
//        this.disablePopupBackground();
//
//        this.disVisibleItemOfPopup(seedId);
//
//    },
//
//    //
//    disablePopupBackground: function () {
//        if (this.popupBackground != null) {
//            /*
//            BUGG
//            WHY ?!
//             */
//            // if (this.popupBackground.isVisible()) {
//                this.popupBackground.setVisible(false);
//
//                this.popupBackground = null;
//            // }
//        }
////
//    },//
//    disVisibleItemOfPopup: function(seedId){
//        var index = this.getIndexSeedOfPopupItemList(seedId);
//        if (index == null){
//            for (var i = 0; i < this.popupItemList.length; i++){
//                if (this.popupItemList[i] != null){
//                    if (this.popupItemList[i].isVisible()){
//                        this.popupItemList[i].setVisible(false);
//
//                    }
//
//                }
//            }
//            this.popupItemList = [];
//        } else {
//            for (var i = 0; i < this.popupItemList.length; i++){
//                if (index != i){
//                    if (this.popupItemList[i] != null){
//                        if (this.popupItemList[i].isVisible()){
//                            this.popupItemList[i].setVisible(false);
//
//                        }
//
//                    }
//
//                }
//            }
//            this.popupItemList = [];
//
//        }
//
//    },
//    getIndexSeedOfPopupItemList: function (seedId) {
//        if (seedId == null){    //
//            if (this.popupItemList.length == 1){
//                if (!this.popupItemList[0].seedType){    //tool
//                    // return 0;
//                }
//            }
//            return null;
//        }
//        for (var i = 0; i < this.popupItemList.length; i++){    //seed list
//            if (this.popupItemList[i].seedType == seedId){
//                return i;
//            }
//        }
//        return null;
//    },


});