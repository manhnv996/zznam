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

        //
        this.render(fieldId);
        this.addTouchEventListener(parent, fieldId);


///////////
        this.schedule(this.updateFieldStatus, 0.5);
        //this.schedule(this.updateProgressBarInprogress, 0.2);

    },
    render: function (fieldId) {
        this.fieldId = fieldId;

    },


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

                    target.opacity = 225;
                    touchListener._lock = true;
                    return true;
                }



                return false;
            },
            onTouchMoved: function (touch, event) {
                touchListener._lock = false;
                var delta = touch.getDelta();
                MapLayer.instance.move(delta.x, delta.y);


            }.bind(this),

            onTouchEnded: function (touch, event) {
                cc.log("sprite onTouchesEnded.. ");
                var target = event.getCurrentTarget();
                target.opacity = 255;
                //
                if (touchListener._lock) {
                    PlantCtrl.instance.onFieldSelected(fieldId);
                }

            }
        });
        cc.eventManager.addListener(touchListener, this);
    },


    plantAnimation: function (seedType) {

        this.removeAllChildrenWithCleanup(true);

        if (this.fieldId != null){

            var plantTypeObj = getProductObjByType(seedType);

            //
            this.seedType = seedType;

            this.plantSprite = fr.createAnimationById(getResAniIdBySeedType(seedType), this);

            this.plantSprite.setPosition(cc.p(0, this.height));
            this.plantSprite.setVisible(true);

            this.addChild(this.plantSprite);
            // this.plantSprite.getAnimation().setTimeScale(1);
            this.plantSprite.getAnimation().gotoAndPlay(plantTypeObj.plantAni, -1, -1, 1);


            //
            this.isGrow3 = false;
            this.isGrow2 = false;
            this.isGrow1 = false;
        }
    },
    cropAnimation: function (seedType) {
        if (this.fieldId != null){

            //var plantTypeObj = getProductObjByType(user.getAsset().getFieldList()[this.fieldId].getPlantType());
            var plantTypeObj = getProductObjByType(seedType);


            this.plantSprite.getAnimation().setTimeScale(1);

            this.plantSprite.setCompleteListener(function () {
                this.plantSprite.setVisible(false);

            }.bind(this));
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


        if (this.plantSprite != null){

            var parsePlantTime = user.getAsset().getFieldList()[this.fieldId].getPlantedTime().getTime();
            var parseCropTime = user.getAsset().getFieldList()[this.fieldId].getCropTime().getTime();
            var currTime = new Date().getTime();

            duration = parseCropTime - parsePlantTime;
            curr = currTime - parsePlantTime;


            var plantTypeObj = getProductObjByType(this.seedType);

            if (curr >= duration){
                //
                if (!this.isGrow3){
                    this.plantSprite.getAnimation().gotoAndPlay(plantTypeObj.grow3, -1, -1, 0);

                }
                this.isGrow3 = true;

            } else if (curr >= duration * 3 / 4) {
                //
                if (!this.isGrow2){
                    this.plantSprite.getAnimation().gotoAndPlay(plantTypeObj.grow2, -1, -1, 1);

                }
                this.isGrow2 = true;
            } else if (curr >= duration / 2) {
                if (!this.isGrow1){
                    this.plantSprite.getAnimation().gotoAndPlay(plantTypeObj.grow1, -1, -1, 1);

                }
                this.isGrow1 = true;
            } else {    // < / 2
                // this.plantSprite.getAnimation().gotoAndPlay(plantTypeObj.plantAni,-1, -1, 1);

            }
        }

    },



});