/**
 * Created by CPU60133_LOCAL on 11/8/2017.
 */

var lstScale = 1.0;
var runnerBoundingBox = null;

var MapLayer = cc.Layer.extend({
    currentScale: 1.0,
    popupBackground: null,
    popupItemList: [],

    popupQuantityItemList: [],

    popupItemSelected: null,

    fieldList: [],

    ctor: function() {
        this._super();



        this.fieldList = [];

        var field1 = new FieldSprite(this, 0);
        var field2 = new FieldSprite(this, 1);

        this.fieldList.push(field1);
        this.fieldList.push(field2);


        field1.setPosition(cc.p(cc.winSize.width / 2 + 200, cc.winSize.height / 2));
        field2.setPosition(cc.p(cc.winSize.width / 2 + 200 - field2.width / 2, cc.winSize.height / 2 - field2.height / 2));

        this.addChild(field1);
        this.addChild(field2);


        runnerBoundingBox = this.fieldList[1].getBoundingBox();
        //this.initFieldPlant(4, res.caroot_plist, res.caroot_png, "caroot", 2);



        /////////////////////////////////////////////
        this.label1 = new cc.LabelTTF("FoodStorage:\n", "res/fonts/eff_number.fnt", 18);
        this.addChild(this.label1);
        // label1.x = cc.winSize - 100;
        // label1.y = cc.winSize - 100;
        this.label1.setPosition(new cc.p(100, cc.winSize.height - 100));
////////////////////////////


        //this.testAni();

////////////
        var listener1 = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function (touch, event) {
                cc.log('Touch began');
                return true;
            },
            onTouchMoved: function (touch, event) {
                var target = event.getCurrentTarget();
                var delta = touch.getDelta();
                target.x += delta.x;
                target.y += delta.y;
            }.bind(this),
            onTouchEnded: function (touch, event) {
                var target = event.getCurrentTarget();
                cc.log("sprite onTouchesEnded.. ");
                target.setOpacity(255);

                //
                // target.disVisiblePopup(this.popupItemSelected);
                target.disVisiblePopup(null);

            }
        });
        cc.eventManager.addListener(listener1, this);


        var listener2 = cc.EventListener.create({
            event: cc.EventListener.MOUSE,
            onMouseScroll: this.handleMouse.bind(this)
        });
        cc.eventManager.addListener(listener2, this);


        cc.log(this.getContentSize().width + " :: " + this.getContentSize().height);
        this.centerPoint = cc.p(this.getContentSize().width / 2, this.getContentSize().height / 2);
    },

    handleMouse: function(e) {
        lstScale = this.currentScale;
        var winSize = cc.winSize;
        var cex = this.centerPoint.x + this.getPosition().x;
        var cey = this.centerPoint.y + this.getPosition().y;
        var cursorX = e.getLocation().x;
        var cursorY = e.getLocation().y;

        var cx = - cursorX + cex;
        var cy = - cursorY + cey;
        cc.log("cex : " + cex + "; cey = " + cey);
        cc.log("cursorX : " + cursorX + "; cursorY = " + cursorY);
        cc.log("cx : " + cx + "; cy = " + cy);
        if (e.getScrollY() === 1) {
            if (this.currentScale > 0.5) {
                this.currentScale = this.currentScale - 0.1;
                this.setScale(this.currentScale);
                this.x -= cx * 0.1 / lstScale;
                this.y -= cy * 0.1 / lstScale;
                // this.x -= 10;
                // this.y -= 10;
            }
        } else {
            if (this.currentScale < 2) {
                this.currentScale = this.currentScale + 0.1;
                this.setScale(this.currentScale);
                this.x += cx * 0.1 / lstScale;
                this.y += cy * 0.1 / lstScale;
                // this.x += 100 * 0.1;
                // this.y += 100 * 0.1;
            }
        }
    },

    _getScale: function() {
        return this.currentScale;
    },

    //
    initFieldPlant: function (num, seed_plist, seed_png, str_first_seed, speed) {

        ////////////
        cc.spriteFrameCache.addSpriteFrames(seed_plist, seed_png); // sprite cache

        //var sprite = new cc.Sprite("#runner0.png"); // create sprite
        var sprite = new cc.Sprite("#" + str_first_seed + "0" + ".png"); // create sprite
        //var sprite = new FieldSprite("#" + str_first_seed + "0" + ".png"); // create sprite
        //sprite.setPosition(cc.p(cc.winSize.width / 2 + 200, cc.winSize.height / 2 + 200));
        sprite.setPosition(cc.p(this.fieldList[0].getPosition().x, this.fieldList[0].getPosition().y));

        var spriteBatch = new cc.SpriteBatchNode(seed_png);
        //spriteBatch.addChild(sprite);
        spriteBatch.addChild(this.fieldList[0]);
        this.addChild(spriteBatch);

        //
        //runnerBoundingBox = sprite.getBoundingBox();



        var animFrames = [];
        // num equal to spriteSheet
        for (var i = 0; i < num; i++) {
            //var str = "runner" + i + ".png";
            var str = str_first_seed + i + ".png";
            var frame = cc.spriteFrameCache.getSpriteFrame(str);
            animFrames.push(frame);

        }

        //var animation = new cc.Animation(animFrames, 0.2);
        var animation = new cc.Animation(animFrames, speed);
        // var runningAction = new cc.RepeatForever(new cc.Animate(animation));
        // sprite.runAction(runningAction);
        // this.runningAction.retain();
        //sprite.runAction(cc.animate(animation).repeatForever());
        //sprite.runAction(cc.animate(animation).repeat(1));  //repeat one time
        this.fieldList[0].runAction(cc.animate(animation).repeat(1));  //repeat one time
        ///////////

    },

    showSeedPopup: function(fieldId, seedList){

        //cc.log("showPopup");

        this.disVisiblePopup(null);


        // var crops = new SeedSprite(this, res.crops, ProductTypes.CROP_WHEAT);
        // var caroot = new SeedSprite(this, res.caroot, ProductTypes.CROP_CARROT);
        //
        // crops.setPosition(cc.p(this.popupBackground.x - crops.width / 2, this.popupBackground.y));
        // caroot.setPosition(cc.p(this.popupBackground.x + caroot.width / 2, this.popupBackground.y));


        this.popupItemList = [];
        // this.popupItemList.push(crops);
        // this.popupItemList.push(caroot);

        // this.addChild(crops);
        // this.addChild(caroot);
        this.popupQuantityItemList = [];

        //
        if (seedList != null){

            if (seedList.length > 3){
                this.popupBackground = new cc.Sprite(res.popup5);
            } else if (seedList.length == 3){
                this.popupBackground = new cc.Sprite(res.popup4);
            } else {
                this.popupBackground = new cc.Sprite(res.popup2)
            }


            // this.popupBackground = cc.Sprite.create(res.popup2);
            this.popupBackground.setPosition(cc.winSize.width/2, cc.winSize.height/2);
            this.addChild(this.popupBackground, 10);

            //
            var index = this.getIndexOfFieldList(fieldId);
            cc.log("index = " + index);
            if (index != null) {
                this.popupBackground.setPosition(this.fieldList[index].x - this.fieldList[index].width / 1.5, this.fieldList[index].y + this.fieldList[index].height / 1.5);
            }

            //
            for (var i = 0; i < seedList.length; i++){
                // var seed = new SeedSprite(this, seedList[i].seed_img, seedList[i].seedType);

                var seed_img = null;
                var seed_type = seedList[i].getTypeItem();
                switch (seed_type){
                    case ProductTypes.CROP_WHEAT:
                        seed_img = res.crops;
                        if (seedList[i].getQuantityItem() == null){
                            seed_img = res.crops_null;
                        }
                        break;
                    case ProductTypes.CROP_CARROT:
                        seed_img = res.caroot;
                        if (seedList[i].getQuantityItem() == null){
                            seed_img = res.caroot_null;
                        }
                        break;
                    case ProductTypes.CROP_CORN:
                        seed_img = res.corn;
                        if (seedList[i].getQuantityItem() == null){
                            seed_img = res.corn_null;
                        }
                        break;
                    case ProductTypes.CROP_SOYBEAN:
                        seed_img = res.sausages;
                        if (seedList[i].getQuantityItem() == null){
                            seed_img = res.sausages_null;
                        }
                        break;
                    default:
                        seed_img = res.mia;
                        if (seedList[i].getQuantityItem() == null){
                            seed_img = res.mia_null;
                        }
                        break;
                }
                var seed = new SeedSprite(this, seed_img, seed_type);


                seed.setPosition(cc.p(this.popupBackground.x, this.popupBackground.y));

                /////
                var quantitySeed = new cc.LabelTTF(seedList[i].getQuantityItem(), "res/fonts/eff_number.fnt", 18);
                seed.addChild(quantitySeed);
                quantitySeed.setPosition(new cc.p(0, 0));
                this.popupQuantityItemList.push(quantitySeed);

                ////
                //if (seedList[i].getQuantityItem() == null){
                //    seed.removeDragEventListener();
                //}

                this.popupItemList.push(seed);
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

            }

            for (var i = 0; i < this.popupQuantityItemList.length; i++){
                this.popupQuantityItemList[i].runAction(new cc.moveTo(0.1, this.popupItemList[i].width / 4, this.popupItemList[i].height));
            }


        } else {
            this.popupBackground = cc.Sprite.create(res.popup2);
            this.popupBackground.setPosition(cc.winSize.width/2, cc.winSize.height/2);
            this.addChild(this.popupBackground, 10);
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

        this.disVisiblePopup(null);


        this.popupBackground = cc.Sprite.create(res.popup2);
        this.popupBackground.setPosition(cc.winSize.width/2, cc.winSize.height/2);
        this.addChild(this.popupBackground, 10);

        //
        var index = this.getIndexOfFieldList(fieldId);
        cc.log("index = " + index);
        if (index != null) {
            this.popupBackground.setPosition(this.fieldList[index].x - this.fieldList[index].width / 1.5, this.fieldList[index].y + this.fieldList[index].height / 1.5);
        }


        var tool = new CropToolSprite(this, res.liem);

        tool.setPosition(cc.p(this.popupBackground.x, this.popupBackground.y));

        // this.popupBackground.addChild(tool);
        this.popupItemList = [];
        this.popupItemList.push(tool);
        this.addChild(tool);

    },
    disVisiblePopup: function(seedId){
        //cc.log("disvisible");
        this.disVisiblePopupBackground();

        this.disVisibleItemOfPopup(seedId);

    },
    removePopup: function(){
        //cc.log("remove popup");

        if (this.popupBackground != null){
            this.popupBackground.removeFromParent(true);

        }
        // if (this.getChildByTag(10)){
        //     this.removeChild(this.popupBackground);
        // }
    },

    //runAnimationPlantting: function(num, str_seed_key, speed, fieldId){
    runAnimationPlantting: function(fieldId, seedType){
        var index = this.getIndexOfFieldList(fieldId);
        if (index != null){

            //var plantTypeObj = getProductObjByType(seedType);
            //
            //var plantAni = fr.createAnimationById(resAniId.Carot, this);
            //plantAni.setPosition(cc.p(0, this.fieldList[index].height));
            //this.fieldList[index].addChild(plantAni);
            //plantAni.getAnimation().setTimeScale(0.5);
            //plantAni.getAnimation().gotoAndPlay(plantTypeObj.plantAni,-1, -1, 1);


            this.fieldList[index].plantAnimation(seedType);

        }


    },
    //runAnimationCrop: function (num, str_seed_key, speed, fieldId) {
    runAnimationCrop: function (fieldId, seedType) {
        var index = this.getIndexOfFieldList(fieldId);
        if (index != null){
            ////this.fieldList[index].loadAnimFrames(num, str_seed_key, speed);
            ////
            ////this.fieldList[index].runAnimationRepeat(1);
            //
            ////var plantTypeObj = getProductObjByType(user.getAsset().getFieldList()[this.fieldId].getPlantType());
            //var plantTypeObj = getProductObjByType(seedType);
            //
            //var plantAni = fr.createAnimationById(resAniId.Carot, this);
            //plantAni.setPosition(cc.p(0, this.fieldList[index].height));
            //this.fieldList[index].addChild(plantAni);
            //plantAni.getAnimation().setTimeScale(0.5);
            //plantAni.getAnimation().gotoAndPlay(plantTypeObj.cropAni,-1, -1, 1);


            this.fieldList[index].cropAnimation(seedType);

            this.fieldList[index].changeTexture(res.field);
        }

    },


    //
    disVisiblePopupBackground: function () {
        if (this.popupBackground != null) {
            if (this.popupBackground.isVisible()) {
                this.popupBackground.setVisible(false);
            }

        }
//
    },

    getIndexOfFieldList: function (fieldId) {
        if (fieldId == null){
            return null;
        }
        for (var i = 0; i < this.fieldList.length; i++){
            if (this.fieldList[i].fieldId == fieldId){
                return i;
            }
        }
        return null;
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
    //
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
            this.popupItemList = []
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
    removeItemOfPopup: function () {

    },

    testAni: function () {
        // var carootCan = fr.createAnimation(resAni.caroot_ani, resAniId.caroot_ani, this);
        // this.addChild(carootCan);
        // carootCan.setPosition(cc.p(cc.winSize.width / 2, cc.winSize.height / 2));
        // carootCan.gotoAndPlay('idle', -1);

        this.nodeAnimation = new cc.Node();
        this.nodeAnimation.setPosition(cc.p(cc.winSize.width / 2, cc.winSize.height / 2));
        this.nodeAnimation.setScaleX(-1);
        this.addChild(this.nodeAnimation);


        // this.character = fr.createAnimationById(resAniId.chipu,this);
        // //doi mau, yeu cau phai co file shader, nhung bone co ten bat dau tu color_ se bi doi mau
        // this.character.setBaseColor(255,255,0);
        // //chinh toc do play animation
        // this.character.getAnimation().setTimeScale(0.5);
        // this.nodeAnimation.addChild(this.character);
        // //play animation gotoAndPlay(animationName, fadeInTime, duration, playTimes) //playTimes == 0 is repeatForever
        // this.character.getAnimation().gotoAndPlay("idle_0_",-1);


        var carootCan = fr.createAnimationById(resAniId.Carot, this);
        // this.addChild(carootCan);
        // carootCan.getAnimation().setTimeScale(0.5);
        // carootCan.setPosition(cc.p(cc.winSize.width / 2, cc.winSize.height / 2));
        // carootCan.gotoAndPlay('idle', -1);

        this.nodeAnimation.addChild(carootCan);
        carootCan.getAnimation().gotoAndPlay("Carot_Harvest",-1, 5, 0);
    }

});
//MapLayer.instance = new MapLayer();