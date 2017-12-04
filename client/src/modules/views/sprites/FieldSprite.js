/**
 * Created by CPU60133_LOCAL on 11/9/2017.
 */

//var FieldSprite = cc.Sprite.extend({
var FieldSprite = MapBlockSprite.extend({

    fieldId: null,
    field: null, // Field object

    plantSprite: null,
    seedType: null,

    //
    popupBackground: null,
    popupItemList: [],
    fieldList: [],

    isShowProgressBar: false,


    // ctor: function(parent, fieldId, x, y) {
    ctor: function(fieldId, x, y) {
        //this._super();
        this._super(res.field,
                MapConfigs.Field.size.width, 
                MapConfigs.Field.size.height,
                x, y, MapItemEnum.FIELD
        );

        //
        // this.render(fieldId);

        // this.addTouchEventListener(parent, fieldId);
        this.registerTouchEvents();

///////////
//        this.schedule(this.updateFieldStatus, 0.5);
        //this.schedule(this.updateProgressBarInprogress, 0.2);

    // },
    // render: function (fieldId) {
        this.fieldId = fieldId;
        // Find field in asset
        this.field = user.asset.getFieldById(this.fieldId);
        // this.showDebugPriorityPoint();
    },


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
                // cc.log("sprite onTouchesEnded.. ");
                // var target = event.getCurrentTarget();
                var target = this;
                target.opacity = 255;
                //
                if (touchListener._lock) {
                    PlantCtrl.instance.onFieldSelected(fieldId);
                }

            }.bind(this)
        });
        cc.eventManager.addListener(touchListener, this.lx + this.ly);
        //cc.eventManager.addListener(touchListener, this);
    },

    // When click
    onClick: function() {
        PlantCtrl.instance.onFieldSelected(this.fieldId);
        cc.log('Field clicked', this.getLocalZOrder(), this.lx, this.ly);
    },

    // When begin click
    onBeginClick: function() {
        this.setOpacity(180);
        if (this.plantSprite){
            this.plantSprite.setOpacity(180);
        }
    },

    // When end click    
    onEndClick: function() {
        this.setOpacity(255);
        if (this.plantSprite){
            this.plantSprite.setOpacity(255);
        }
    },


    createAni: function(seedType){
        this.removeAllChildrenWithCleanup(true);

        this.seedType = seedType;

        this.plantSprite = fr.createAnimationById(getResAniIdBySeedType(seedType), this);
        this.plantSprite.setPosition(cc.p(0, this.height));
        this.plantSprite.setVisible(true);
        this.addChild(this.plantSprite);

        this.isPlant = false;
        this.unschedule(this.updateFieldStatus);
        this.schedule(this.updateFieldStatus, 0.5);
    },

    plantAnimation: function (seedType) {
        //this.removeAllChildrenWithCleanup(true);

        if (this.fieldId != null){

            var plantTypeObj = getProductObjByType(seedType);


            this.createAni(seedType);
            // this.plantSprite.getAnimation().setTimeScale(1);
            this.plantSprite.getAnimation().gotoAndPlay(plantTypeObj.plantAni, -1, -1, 1);


            //
            this.isGrow3 = false;
            this.isGrow2 = false;
            this.isGrow1 = false;

            this.isPlant = true;

            this.unschedule(this.updateFieldStatus);
            this.schedule(this.updateFieldStatus, 0.5);
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
    //
    updateFieldStatus: function (curr, duration) {
        // var field = user.getAsset().getFieldList().find(function(f) {
        //     return f.field === this.fieldId;
        // });
        if (!this.field) {

            this.unschedule(this.updateFieldStatus);
            return;
        }        

        if (this.field.getPlantedTime() == null){

            //this.changeTexture(res.field);
            this.unschedule(this.updateFieldStatus);
            return false;
        }


        if (this.plantSprite != null){

            // var parsePlantTime = user.getAsset().getFieldList()[this.fieldId].getPlantedTime().getTime();
            // var parseCropTime = user.getAsset().getFieldList()[this.fieldId].getCropTime().getTime();
            var parsePlantTime = this.field.getPlantedTime().getTime();
            var parseCropTime = this.field.getCropTime().getTime();
            
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
                this.unschedule(this.updateFieldStatus);

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
                if (!this.isPlant){
                    this.plantSprite.getAnimation().gotoAndPlay(plantTypeObj.plantAni,-1, -1, 1);

                }
                this.isPlant = true;
            }

            if (!this.plantSprite.isVisible()){
                this.plantSprite.setVisible(true);
            }
        }

    },

    runAction: function(action) {
        if (this.seedType) {
            this.plantSprite.runAction(action);
        } else {
            this._super(action);
        }
    },

    stopAllActions: function() {
        if (this.seedType) {
            this.plantSprite.stopAllActions();
        } else {
            this._super();
        }
    },

    setColor: function(color) {
        if (this.seedType) {
            this.plantSprite.setColor(color);
        } else {
            this._super(color);
        }
    },

    // On finish move on map, update model and push to server
    onFinishMove: function(lx, ly) {
        cc.log("Field moved to", lx, ly);
        
        this.field.coordinate.x = lx;
        this.field.coordinate.y = ly;
        // Send to server
        testnetwork.connector.sendMoveMapBlock(MapItemEnum.FIELD, this.fieldId, lx, ly);
        ///
    }
});
