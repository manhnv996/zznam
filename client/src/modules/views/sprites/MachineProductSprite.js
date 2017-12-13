/**
 * Created by CPU60135_LOCAL on 12/8/2017.
 */
var MachineProductSprite = ProductSprite.extend({
    _productConfig: null,
    _toolTip: null,
    ctor:function(productConfig){
        this._super(productConfig.res_path);
        this._productConfig = productConfig;

        this.addDragEventListener();
        this.renderMuiTen();
        if (user.getLevel() < this._productConfig.levelUnlock){
            this.runAction(cc.TintBy(0, 96, 102, 114));
        }
    },
    addDragEventListener:function(){
        this.dragListener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function (touch, event){
                var target = this;
                var locationInNode = target.convertToNodeSpace(touch.getLocation());
                var s = target.getContentSize();
                var rect = cc.rect(0, 0, s.width, s.height);
                if (cc.rectContainsPoint(rect, locationInNode)){
                    this.onTouchBeganJobs(target);
                    return true;
                };
                return false;
            }.bind(this),
            onTouchMoved: function (touch, event){
                this.onTouchMovedJobs(touch, event);
            }.bind(this),
            onTouchEnded:function (touch, event){
                var target = this;
                this.onTouchEndedJobs();

            }.bind(this)
        });
        cc.eventManager.addListener(this.dragListener, this);
    },


    onTouchBeganJobs: function (target) {
        this._toolTip = new cc.Sprite(res.tooltip_png);
        this._toolTip.setPosition(this._toolTip.width / 2 + this.width , this.height/2  );
        this.addChild(this._toolTip);
        if (user.getLevel() >= this._productConfig.levelUnlock){
            this._defaultPosition = new cc.p(this.x, this.y);
            target.runAction(new cc.ScaleTo(0.1, 1.5, 1.5));
            this.dragListener._isFirstMove = false;
            this._muiten.setVisible(false);

            //add toolTip information product: raw material, current quanlity in storages/
            var name = new cc.LabelBMFont(this._productConfig.name, res.FONT_OUTLINE_20);
            name.x = this._toolTip.width / 2;
            name.y = this._toolTip.height;
            name.setAnchorPoint(0.5, 1);
            this._toolTip.addChild(name);
            var labelTime = new cc.LabelBMFont(this._productConfig.time +" phút", res.FONT_OUTLINE_20);
            labelTime.x = this._toolTip.width /2;
            labelTime.y = 0;
            labelTime.setAnchorPoint(.5,0);
            this._toolTip.addChild(labelTime);

            var rawMaterialList = this._productConfig.rawMaterialList;

            switch (rawMaterialList.length){
                case 1:
                    var rawMaterialIcon = cc.Sprite(rawMaterialList[0].res_raw);
                    rawMaterialIcon.setScale(.5);
                    rawMaterialIcon.x = this._toolTip.width / 4 ;
                    rawMaterialIcon.y = this._toolTip.height/2;
                    var rawMaterialInfo = new cc.LabelBMFont(user.getAsset().getQuantityOfTwoStorageByProductId(rawMaterialList[0].rawMaterialId)+"/"+rawMaterialList[0].quantity,res.FONT_OUTLINE_20);
                    rawMaterialInfo.x = this._toolTip.width /4;
                    rawMaterialInfo.y = this._toolTip.height/2;
                    this._toolTip.addChild(rawMaterialIcon);
                    this._toolTip.addChild(rawMaterialInfo);
                    rawMaterialInfo.runAction(new cc.moveBy(0.1, rawMaterialIcon.width/2 , 0));
                    break;
                case 2:
                    var rawMaterialIcon = cc.Sprite(rawMaterialList[1].res_raw);
                    rawMaterialIcon.setScale(.5);
                    rawMaterialIcon.x = this._toolTip.width / 4 ;
                    rawMaterialIcon.y = this._toolTip.height/2;
                    var rawMaterialInfo = new cc.LabelBMFont(user.getAsset().getQuantityOfTwoStorageByProductId(rawMaterialList[1].rawMaterialId)+"/"+rawMaterialList[1].quantity,res.FONT_OUTLINE_20);
                    rawMaterialInfo.x = this._toolTip.width /4;
                    rawMaterialInfo.y = this._toolTip.height/2;
                    this._toolTip.addChild(rawMaterialIcon);
                    this._toolTip.addChild(rawMaterialInfo);
                    rawMaterialInfo.runAction(new cc.moveBy(0.1, rawMaterialIcon.width/2 , 0));

                    var rawMaterialIcon2 = cc.Sprite(rawMaterialList[0].res_raw);
                    rawMaterialIcon2.setScale(.5);
                    rawMaterialIcon2.x = this._toolTip.width *3/5;
                    rawMaterialIcon2.y = this._toolTip.height/2;
                    var rawMaterialInfo2 = new cc.LabelBMFont(user.getAsset().getQuantityOfTwoStorageByProductId(rawMaterialList[0].rawMaterialId)+"/"+rawMaterialList[0].quantity,res.FONT_OUTLINE_20);
                    rawMaterialInfo2.x = this._toolTip.width *3/5;
                    rawMaterialInfo2.y = this._toolTip.height/2;
                    this._toolTip.addChild(rawMaterialIcon2);
                    this._toolTip.addChild(rawMaterialInfo2);
                    rawMaterialInfo2.runAction(new cc.moveBy(0.1, rawMaterialIcon2.width/2, 0));
                    break;

                case 3:

                    var rawMaterialIcon2 = cc.Sprite(rawMaterialList[0].res_raw);
                    rawMaterialIcon2.setScale(.5);
                    rawMaterialIcon2.x = this._toolTip.width *3/5;
                    rawMaterialIcon2.y = this._toolTip.height*3/5;
                    var rawMaterialInfo2 = new cc.LabelBMFont(user.getAsset().getQuantityOfTwoStorageByProductId(rawMaterialList[0].rawMaterialId)+"/"+rawMaterialList[0].quantity,res.FONT_OUTLINE_20);
                    rawMaterialInfo2.x = this._toolTip.width *3/5;
                    rawMaterialInfo2.y = this._toolTip.height *3/5;
                    this._toolTip.addChild(rawMaterialIcon2);
                    this._toolTip.addChild(rawMaterialInfo2);
                    rawMaterialInfo2.runAction(new cc.moveBy(0.1, rawMaterialIcon2.width/2, 0));

                    var rawMaterialIcon = cc.Sprite(rawMaterialList[1].res_raw);
                    rawMaterialIcon.setScale(.5);
                    rawMaterialIcon.x = this._toolTip.width / 4 ;
                    rawMaterialIcon.y = this._toolTip.height*.3;
                    var rawMaterialInfo = new cc.LabelBMFont(user.getAsset().getQuantityOfTwoStorageByProductId(rawMaterialList[1].rawMaterialId)+"/"+rawMaterialList[1].quantity,res.FONT_OUTLINE_20);
                    rawMaterialInfo.x = this._toolTip.width /4;
                    rawMaterialInfo.y = this._toolTip.height*.3;
                    this._toolTip.addChild(rawMaterialIcon);
                    this._toolTip.addChild(rawMaterialInfo);
                    rawMaterialInfo.runAction(new cc.moveBy(0.1, rawMaterialIcon.width/2 , 0));


                    var rawMaterialIcon3 = cc.Sprite(rawMaterialList[2].res_raw);
                    rawMaterialIcon3.setScale(.5);
                    rawMaterialIcon3.x = this._toolTip.width / 4 ;
                    rawMaterialIcon3.y = this._toolTip.height*3/5;
                    var rawMaterialInfo3 = new cc.LabelBMFont(user.getAsset().getQuantityOfTwoStorageByProductId(rawMaterialList[2].rawMaterialId)+"/"+rawMaterialList[2].quantity,res.FONT_OUTLINE_20);
                    rawMaterialInfo3.x = this._toolTip.width /4;
                    rawMaterialInfo3.y = this._toolTip.height*3/5;
                    this._toolTip.addChild(rawMaterialIcon3);
                    this._toolTip.addChild(rawMaterialInfo3);
                    rawMaterialInfo3.runAction(new cc.moveBy(0.1, rawMaterialIcon3.width/2 , 0));
                    break;
                case 4:

                    var rawMaterialIcon2 = cc.Sprite(rawMaterialList[0].res_raw);
                    rawMaterialIcon2.setScale(.5);
                    rawMaterialIcon2.x = this._toolTip.width *3/5;
                    rawMaterialIcon2.y = this._toolTip.height*3/5;
                    var rawMaterialInfo2 = new cc.LabelBMFont(user.getAsset().getQuantityOfTwoStorageByProductId(rawMaterialList[0].rawMaterialId)+"/"+rawMaterialList[0].quantity,res.FONT_OUTLINE_20);
                    rawMaterialInfo2.x = this._toolTip.width *3/5;
                    rawMaterialInfo2.y = this._toolTip.height *3/5;
                    this._toolTip.addChild(rawMaterialIcon2);
                    this._toolTip.addChild(rawMaterialInfo2);
                    rawMaterialInfo2.runAction(new cc.moveBy(0.1, rawMaterialIcon2.width/2, 0));

                    var rawMaterialIcon = cc.Sprite(rawMaterialList[1].res_raw);
                    rawMaterialIcon.setScale(.5);
                    rawMaterialIcon.x = this._toolTip.width / 4 ;
                    rawMaterialIcon.y = this._toolTip.height*.3;
                    var rawMaterialInfo = new cc.LabelBMFont(user.getAsset().getQuantityOfTwoStorageByProductId(rawMaterialList[1].rawMaterialId)+"/"+rawMaterialList[1].quantity,res.FONT_OUTLINE_20);
                    rawMaterialInfo.x = this._toolTip.width /4;
                    rawMaterialInfo.y = this._toolTip.height*.3;
                    this._toolTip.addChild(rawMaterialIcon);
                    this._toolTip.addChild(rawMaterialInfo);
                    rawMaterialInfo.runAction(new cc.moveBy(0.1, rawMaterialIcon.width/2 , 0));


                    var rawMaterialIcon3 = cc.Sprite(rawMaterialList[2].res_raw);
                    rawMaterialIcon3.setScale(.5);
                    rawMaterialIcon3.x = this._toolTip.width / 4 ;
                    rawMaterialIcon3.y = this._toolTip.height*3/5;
                    var rawMaterialInfo3 = new cc.LabelBMFont(user.getAsset().getQuantityOfTwoStorageByProductId(rawMaterialList[2].rawMaterialId)+"/"+rawMaterialList[2].quantity,res.FONT_OUTLINE_20);
                    rawMaterialInfo3.x = this._toolTip.width /4;
                    rawMaterialInfo3.y = this._toolTip.height*3/5;
                    this._toolTip.addChild(rawMaterialIcon3);
                    this._toolTip.addChild(rawMaterialInfo3);
                    rawMaterialInfo3.runAction(new cc.moveBy(0.1, rawMaterialIcon3.width/2 , 0));

                    var rawMaterialIcon4 = cc.Sprite(rawMaterialList[3].res_raw);
                    rawMaterialIcon4.setScale(.5);
                    rawMaterialIcon4.x = this._toolTip.width  *3/5;
                    rawMaterialIcon4.y = this._toolTip.height * .3;
                    var rawMaterialInfo4 = new cc.LabelBMFont(user.getAsset().getQuantityOfTwoStorageByProductId(rawMaterialList[3].rawMaterialId)+"/"+rawMaterialList[3].quantity,res.FONT_OUTLINE_20);
                    rawMaterialInfo4.x = this._toolTip.width *3/5;
                    rawMaterialInfo4.y = this._toolTip.height * .3;
                    this._toolTip.addChild(rawMaterialIcon4);
                    this._toolTip.addChild(rawMaterialInfo4);
                    rawMaterialInfo4.runAction(new cc.moveBy(0.1, rawMaterialIcon4.width/2 , 0));
                    break;


            };

        } else {
            //show tooltip, level not enough


            var description = new cc.LabelBMFont("Có tại cấp" + " " + this._productConfig.levelUnlock, res.FONT_NORMAL_30);
            description.x = this._toolTip.width / 2;
            description.y = this._toolTip.height / 2;
            description.setContentSize(this._toolTip.width / 7 * 5, this._toolTip.height / 3);
            description.setBoundingWidth(this._toolTip.width / 7 * 5);
            description.setAlignment(cc.TEXT_ALIGNMENT_CENTER);
            description.color = cc.color(77, 41, 1);
            var action1 = new cc.ScaleTo(0.1, 1.35);
            var action2 = new cc.ScaleTo(0.1, 1.15);
            this._toolTip.runAction(cc.sequence(action1, cc.delayTime(0.01), action2));
            this._toolTip.addChild(description);
        }
    },

    onTouchMovedJobs: function (touch, event) {
       if (user.getLevel() >= this._productConfig.levelUnlock){
           var delta = touch.getDelta();
           //var target = this;
           //todo check level before can move product
           this.x += delta.x;
           this.y += delta.y;
       } else {

       }

        //call controller
        //var mouse = touch.getLocation();
        //todo controller jobs
        //MachineController.instance.onProductMove(productConfig, mouse.x, mouse.y);

    },

    onTouchEndedJobs: function () {
        if (user.getLevel() >= this._productConfig.levelUnlock) {
            var action1 = new cc.moveTo(0.05,0, this._defaultPosition.y);
            var action2 = new cc.moveTo(0.3,this._defaultPosition.x, this._defaultPosition.y);
            var seq = new  cc.Sequence(action1, action2);
            this.runAction(seq);
            this._muiten.setVisible(true);
            this.setScale(1);
        }
        this._toolTip.removeFromParent(true);
    },
    renderMuiTen: function () {
        this._muiten = new cc.Sprite(res.ten);
        this._muiten.setPosition(new cc.p(this.width * 4 / 5, this.height / 5));
        this.addChild(this._muiten);
    }
})