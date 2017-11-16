/**
 * Created by CPU60133_LOCAL on 11/9/2017.
 */

//var FieldSprite = cc.Sprite.extend({
var FieldSprite = MapBlockSprite.extend({

    fieldId: null,
    animFrames: [],
    animation: null,

    plantSprite: null,
    seedType: null,

    // ctor: function(parent, fieldId, seed_plist_img, seed_plist) {
    ctor: function(parent, fieldId, x, y) {
        //this._super();
        this._super(res.field, 1, 1, x, y);

        ////////
        //this.initWithFile(seed_plist_img);

        //
        // this.render(fieldId, seed_plist_img, seed_plist);
        this.render(fieldId);


        this.addTouchEventListener(parent, fieldId);


///////////
        this.schedule(this.updateFieldStatus, 0.5);


    },
    render: function (fieldId) {
        this.fieldId = fieldId;

        //this.plantSprite = fr.createAnimationById(resAniId.Carot, this);
        // this.addChild(carootCan);
        // carootCan.getAnimation().setTimeScale(0.5);
        // carootCan.setPosition(cc.p(cc.winSize.width / 2, cc.winSize.height / 2));
        // carootCan.gotoAndPlay('idle', -1);


        //this.plantSprite = new cc.Sprite(res.field);
        //
        //this.addChild(this.plantSprite);


        //this.plantSprite.getAnimation().gotoAndPlay("Carot_Harvest",-1, 5, 0);

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

    //
    //
    addTouchEventListener: function (parent, fieldId) {

        var touchListener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function (touch, event) {
                var target = event.getCurrentTarget();

                var locationInNode = target.convertToNodeSpace(touch.getLocation());
                var s = target.getContentSize();
                var rect = cc.rect(0, 0, s.width, s.height);

                if (cc.rectContainsPoint(rect, locationInNode)) {
                    //cc.log("sprite began... x = " + locationInNode.x + ", y = " + locationInNode.y);

                    target.opacity = 180;
                    return true;
                }



                return false;
            },
            onTouchMoved: function (touch, event) {

                var delta = touch.getDelta();

                //this.x += delta.x / lstScale;
                //this.y += delta.y / lstScale;
                //this.x = x / lstScale;
                //this.y = y / lstScale;

                //cc.log("onTouchMoved: " + delta.x + ", " + delta.y);

                //Call ctrl
                //var fieldSelected = PlantCtrl.instance.onDragCropTool(this.x, this.y);
                /*
                 INPROGRESS
                 *
                 */




                //var seedBoundingBox = this.getBoundingBox();
                //if (cc.rectIntersectsRect(seedBoundingBox, runnerBoundingBox)){
                //    cc.log("va chạm");
                //}

            }.bind(this),

            onTouchEnded: function (touch, event) {
                cc.log("sprite onTouchesEnded.. ");
                var target = event.getCurrentTarget();
                target.opacity = 255;
                //
                PlantCtrl.instance.onFieldSelected(fieldId);
                //parent.showSeedPopup();

                //this.loadAnimFrames(4, "caroot", 0.2);
                //this.runAnimationForever();

            }
        });
        cc.eventManager.addListener(touchListener, this);
    },


    loadAnimFrames: function(num, str_seed_key, speed){
        //cc.spriteFrameCache.addSpriteFrames(seed_plist); // sprite cache

        this.animFrames = [];
        // num equal to spriteSheet
        for (var i = 0; i < num; i++) {
            var str = str_seed_key + i + ".png";
            var frame = cc.spriteFrameCache.getSpriteFrame(str);
            this.animFrames.push(frame);

        }

        this.animation = new cc.Animation(this.animFrames, speed);
    },
    runAnimationForever: function(){
        this.runAction(cc.animate(this.animation).repeatForever());  //repeatForever
    },
    runAnimationRepeat: function(num){
        this.runAction(cc.animate(this.animation).repeat(num));  //repeat num time
    },


    plantAnimation: function (seedType) {

        this.removeAllChildrenWithCleanup(true);

        if (this.fieldId != null){

            var plantTypeObj = getProductObjByType(seedType);

            //
            this.seedType = seedType;

            this.plantSprite = fr.createAnimationById(getResAniIdBySeedType(seedType), this);

            this.plantSprite.setPosition(cc.p(0, this.height));
            this.addChild(this.plantSprite);
            this.plantSprite.getAnimation().setTimeScale(0.5);
            this.plantSprite.getAnimation().gotoAndPlay(plantTypeObj.plantAni,-1, -1, 1);

        }
    },
    cropAnimation: function (seedType) {
        if (this.fieldId != null){

            //var plantTypeObj = getProductObjByType(user.getAsset().getFieldList()[this.fieldId].getPlantType());
            var plantTypeObj = getProductObjByType(seedType);

            //this.plantSprite = fr.createAnimationById(resAniId.Carot, this);
            //this.addChild(this.plantSprite);
            this.plantSprite.getAnimation().setTimeScale(0.5);
            this.plantSprite.getAnimation().gotoAndPlay(plantTypeObj.cropAni,-1, -1, 1);


            //this.fieldList[index].changeTexture(res.field);
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


        //if (this.fieldId != null){
        if (this.plantSprite != null){

            var plantTypeObj = getProductObjByType(this.seedType);

            if (curr >= duration){
                //
                //this.changeTexture(getProductObjByType(user.getAsset().getFieldList()[this.fieldId].getPlantType()).growImg4);


                this.plantSprite.getAnimation().setTimeScale(0.5);
                this.plantSprite.getAnimation().gotoAndPlay(plantTypeObj.grow4,-1, -1, 1);
            } else if (curr >= duration * 3 / 4) {
                //
                this.plantSprite.getAnimation().setTimeScale(0.5);
                this.plantSprite.getAnimation().gotoAndPlay(plantTypeObj.grow3,-1, -1, 1);
            } else if (curr >= duration / 2) {
                this.plantSprite.getAnimation().setTimeScale(0.5);
                this.plantSprite.getAnimation().gotoAndPlay(plantTypeObj.grow2,-1, -1, 1);

            } else if(curr >= duration * 1 / 4){
                this.plantSprite.getAnimation().setTimeScale(0.5);
                this.plantSprite.getAnimation().gotoAndPlay(plantTypeObj.grow1,-1, -1, 1);

            } else {    // < / 2
                this.plantSprite.getAnimation().setTimeScale(0.5);
                this.plantSprite.getAnimation().gotoAndPlay(plantTypeObj.plantAni,-1, -1, 1);

            }
        }

    }

});