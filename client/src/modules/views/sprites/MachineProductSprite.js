/**
 * Created by CPU60135_LOCAL on 12/8/2017.
 */
var MachineProductSprite = cc.Sprite.extend({
    _productConfig: null,
    _toolTip: null,
    _parent: null,
    _xMachine: null,
    _yMachine: null,
    _widthMachine: null,
    _heightMachine: null,
    _canProduce:true,
    _lastSeed: false,
    _touchInProduceZone: false,
    _tempProductSprite: null,
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
                //cc.log("onTouchBegan");
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
                //cc.log("onTouchMoved");
                this.onTouchMovedJobs(touch, event);
            }.bind(this),
            onTouchEnded:function (touch, event){
                //cc.log("onTouchEnded");
                var target = this;
                this.onTouchEndedJobs(touch);

            }.bind(this)
        });

        //cc.log("product event: ", this._productConfig.name);
        cc.eventManager.addListener(this.dragListener, this);
    },


    onTouchBeganJobs: function (target) {
        //cc.log("z16 "+ TablePopupLayer.instance._layout);
        //cc.log("z47 "+ this.getParent());
        this._toolTip = new cc.Sprite(res.tooltip_png);
        this._toolTip.setPosition(this._toolTip.width / 2 + this.width , this.height/2  );
        this.addChild(this._toolTip,3);
        this.setLocalZOrder(2);
        if (user.getLevel() >= this._productConfig.levelUnlock){
            this._defaultPosition = new cc.p(this.x, this.y);
            target.runAction(new cc.ScaleTo(0.1, 1.5, 1.5));
            this._muiten.setVisible(false);

            //add toolTip information product: raw material, current quanlity in storages/
            var name = new cc.LabelBMFont(this._productConfig.name, res.FONT_OUTLINE_20);
            name.x = this._toolTip.width / 2;
            name.y = this._toolTip.height;
            name.setAnchorPoint(0.5, 1);
            this._toolTip.addChild(name);
            var labelTime = new cc.LabelBMFont(getProductConfigById(this._productConfig.productType).timeMin +" phút", res.FONT_OUTLINE_20);
            labelTime.x = this._toolTip.width /2;
            labelTime.y = 0;
            labelTime.setAnchorPoint(.5,0);
            this._toolTip.addChild(labelTime);

            var rawMaterialList = this._productConfig.rawMaterialList;

            switch (rawMaterialList.length){
                case 1:
                    //cc.log("rawMaterialList[0].res_raw: " + rawMaterialList[0].res_raw);
                    var rawMaterialIcon = cc.Sprite(rawMaterialList[0].res_raw);
                    rawMaterialIcon.setScale(.5);
                    rawMaterialIcon.x = this._toolTip.width / 4 ;
                    rawMaterialIcon.y = this._toolTip.height/2;
                    var currQuantity = user.getAsset().getQuantityOfTwoStorageByProductId(rawMaterialList[0].rawMaterialId);
                    var rawMaterialInfo = new cc.LabelBMFont( currQuantity+"/"+rawMaterialList[0].quantity,res.FONT_OUTLINE_20);
                    if (currQuantity < rawMaterialList[0].quantity){
                        this._canProduce = false;
                        rawMaterialInfo.setColor(cc.color(244, 66, 66));
                    } else if (currQuantity == rawMaterialList[0].quantity && rawMaterialList[0].rawMaterialId.indexOf("crop_") >= 0){
                        this._lastSeed = true;
                    }
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
                    var currQuantity = user.getAsset().getQuantityOfTwoStorageByProductId(rawMaterialList[1].rawMaterialId);
                    var rawMaterialInfo = new cc.LabelBMFont( currQuantity+"/"+rawMaterialList[1].quantity,res.FONT_OUTLINE_20);
                    if (currQuantity < rawMaterialList[1].quantity){
                        this._canProduce = false;
                        rawMaterialInfo.setColor(cc.color(244, 66, 66));
                    } else if (currQuantity == rawMaterialList[1].quantity && rawMaterialList[1].rawMaterialId.indexOf("crop_") >= 0){
                        this._lastSeed = true;
                    }
                    rawMaterialInfo.x = this._toolTip.width /4;
                    rawMaterialInfo.y = this._toolTip.height/2;
                    this._toolTip.addChild(rawMaterialIcon);
                    this._toolTip.addChild(rawMaterialInfo);
                    rawMaterialInfo.runAction(new cc.moveBy(0.1, rawMaterialIcon.width/2 , 0));

                    var rawMaterialIcon2 = cc.Sprite(rawMaterialList[0].res_raw);
                    rawMaterialIcon2.setScale(.5);
                    rawMaterialIcon2.x = this._toolTip.width *3/5;
                    rawMaterialIcon2.y = this._toolTip.height/2;
                    var currQuantity2 = user.getAsset().getQuantityOfTwoStorageByProductId(rawMaterialList[0].rawMaterialId);
                    var rawMaterialInfo2 = new cc.LabelBMFont( currQuantity2+"/"+rawMaterialList[0].quantity,res.FONT_OUTLINE_20);
                    if (currQuantity2 < rawMaterialList[0].quantity){
                        this._canProduce = false;
                        rawMaterialInfo2.setColor(cc.color(244, 66, 66));
                    } else if (currQuantity2 == rawMaterialList[0].quantity && rawMaterialList[0].rawMaterialId.indexOf("crop_") >= 0){
                        this._lastSeed = true;
                    }
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

                    var currQuantity = user.getAsset().getQuantityOfTwoStorageByProductId(rawMaterialList[0].rawMaterialId);
                    var rawMaterialInfo2 = new cc.LabelBMFont( currQuantity+"/"+rawMaterialList[0].quantity,res.FONT_OUTLINE_20);
                    if (currQuantity < rawMaterialList[0].quantity){
                        this._canProduce = false;
                        rawMaterialInfo2.setColor(cc.color(244, 66, 66));
                    } else if (currQuantity == rawMaterialList[0].quantity && rawMaterialList[0].rawMaterialId.indexOf("crop_") >= 0){
                        this._lastSeed = true;
                    }
                    rawMaterialInfo2.x = this._toolTip.width *3/5;
                    rawMaterialInfo2.y = this._toolTip.height *3/5;
                    this._toolTip.addChild(rawMaterialIcon2);
                    this._toolTip.addChild(rawMaterialInfo2);
                    rawMaterialInfo2.runAction(new cc.moveBy(0.1, rawMaterialIcon2.width/2, 0));

                    var rawMaterialIcon = cc.Sprite(rawMaterialList[1].res_raw);
                    rawMaterialIcon.setScale(.5);
                    rawMaterialIcon.x = this._toolTip.width / 4 ;
                    rawMaterialIcon.y = this._toolTip.height*.3;
                    var currQuantity = user.getAsset().getQuantityOfTwoStorageByProductId(rawMaterialList[1].rawMaterialId);
                    var rawMaterialInfo= new cc.LabelBMFont( currQuantity+"/"+rawMaterialList[1].quantity,res.FONT_OUTLINE_20);
                    if (currQuantity < rawMaterialList[1].quantity){
                        this._canProduce = false;
                        rawMaterialInfo.setColor(cc.color(244, 66, 66));
                    } else if (currQuantity == rawMaterialList[1].quantity && rawMaterialList[1].rawMaterialId.indexOf("crop_") >= 0){
                        this._lastSeed = true;
                    }
                    rawMaterialInfo.x = this._toolTip.width /4;
                    rawMaterialInfo.y = this._toolTip.height*.3;
                    this._toolTip.addChild(rawMaterialIcon);
                    this._toolTip.addChild(rawMaterialInfo);
                    rawMaterialInfo.runAction(new cc.moveBy(0.1, rawMaterialIcon.width/2 , 0));


                    var rawMaterialIcon3 = cc.Sprite(rawMaterialList[2].res_raw);
                    rawMaterialIcon3.setScale(.5);
                    rawMaterialIcon3.x = this._toolTip.width / 4 ;
                    rawMaterialIcon3.y = this._toolTip.height*3/5;
                    var currQuantity = user.getAsset().getQuantityOfTwoStorageByProductId(rawMaterialList[2].rawMaterialId);
                    var rawMaterialInfo3 = new cc.LabelBMFont( currQuantity+"/"+rawMaterialList[2].quantity,res.FONT_OUTLINE_20);
                    if (currQuantity < rawMaterialList[0].quantity){
                        this._canProduce = false;
                        rawMaterialInfo3.setColor(cc.color(244, 66, 66));
                    } else if (currQuantity == rawMaterialList[2].quantity && rawMaterialList[2].rawMaterialId.indexOf("crop_") >= 0){
                        this._lastSeed = true;
                    }
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
                    var currQuantity = user.getAsset().getQuantityOfTwoStorageByProductId(rawMaterialList[0].rawMaterialId);
                    var rawMaterialInfo2 = new cc.LabelBMFont( currQuantity+"/"+rawMaterialList[0].quantity,res.FONT_OUTLINE_20);
                    if (currQuantity < rawMaterialList[0].quantity){
                        this._canProduce = false;
                        rawMaterialInfo2.setColor(cc.color(244, 66, 66));
                    } else if (currQuantity == rawMaterialList[0].quantity && rawMaterialList[0].rawMaterialId.indexOf("crop_") >= 0){
                        this._lastSeed = true;
                    }
                    rawMaterialInfo2.x = this._toolTip.width *3/5;
                    rawMaterialInfo2.y = this._toolTip.height *3/5;
                    this._toolTip.addChild(rawMaterialIcon2);
                    this._toolTip.addChild(rawMaterialInfo2);
                    rawMaterialInfo2.runAction(new cc.moveBy(0.1, rawMaterialIcon2.width/2, 0));

                    var rawMaterialIcon = cc.Sprite(rawMaterialList[1].res_raw);
                    rawMaterialIcon.setScale(.5);
                    rawMaterialIcon.x = this._toolTip.width / 4 ;
                    rawMaterialIcon.y = this._toolTip.height*.3;
                    var currQuantity = user.getAsset().getQuantityOfTwoStorageByProductId(rawMaterialList[1].rawMaterialId);
                    var rawMaterialInfo = new cc.LabelBMFont( currQuantity+"/"+rawMaterialList[1].quantity,res.FONT_OUTLINE_20);
                    if (currQuantity < rawMaterialList[1].quantity){
                        this._canProduce = false;
                        rawMaterialInfo.setColor(cc.color(244, 66, 66));
                    } else if (currQuantity == rawMaterialList[1].quantity && rawMaterialList[1].rawMaterialId.indexOf("crop_") >= 0){
                        this._lastSeed = true;
                    }
                    rawMaterialInfo.x = this._toolTip.width /4;
                    rawMaterialInfo.y = this._toolTip.height*.3;
                    this._toolTip.addChild(rawMaterialIcon);
                    this._toolTip.addChild(rawMaterialInfo);
                    rawMaterialInfo.runAction(new cc.moveBy(0.1, rawMaterialIcon.width/2 , 0));


                    var rawMaterialIcon3 = cc.Sprite(rawMaterialList[2].res_raw);
                    rawMaterialIcon3.setScale(.5);
                    rawMaterialIcon3.x = this._toolTip.width / 4 ;
                    rawMaterialIcon3.y = this._toolTip.height*3/5;
                    var currQuantity = user.getAsset().getQuantityOfTwoStorageByProductId(rawMaterialList[2].rawMaterialId);
                    var rawMaterialInfo3 = new cc.LabelBMFont( currQuantity+"/"+rawMaterialList[2].quantity,res.FONT_OUTLINE_20);
                    if (currQuantity < rawMaterialList[2].quantity){
                        this._canProduce = false;
                        rawMaterialInfo3.setColor(cc.color(244, 66, 66));
                    } else if (currQuantity == rawMaterialList[2].quantity && rawMaterialList[2].rawMaterialId.indexOf("crop_") >= 0){
                        this._lastSeed = true;
                    }
                    rawMaterialInfo3.x = this._toolTip.width /4;
                    rawMaterialInfo3.y = this._toolTip.height*3/5;
                    this._toolTip.addChild(rawMaterialIcon3);
                    this._toolTip.addChild(rawMaterialInfo3);
                    rawMaterialInfo3.runAction(new cc.moveBy(0.1, rawMaterialIcon3.width/2 , 0));

                    var rawMaterialIcon4 = cc.Sprite(rawMaterialList[3].res_raw);
                    rawMaterialIcon4.setScale(.5);
                    rawMaterialIcon4.x = this._toolTip.width  *3/5;
                    rawMaterialIcon4.y = this._toolTip.height * .3;
                    var currQuantity = user.getAsset().getQuantityOfTwoStorageByProductId(rawMaterialList[3].rawMaterialId);
                    var rawMaterialInfo4 = new cc.LabelBMFont( currQuantity+"/"+rawMaterialList[3].quantity,res.FONT_OUTLINE_20);
                    if (currQuantity < rawMaterialList[3].quantity){
                        this._canProduce = false;
                        rawMaterialInfo4.setColor(cc.color(244, 66, 66));
                    } else if (currQuantity == rawMaterialList[3].quantity && rawMaterialList[3].rawMaterialId.indexOf("crop_") >= 0){
                        this._lastSeed = true;
                    }
                    rawMaterialInfo4.x = this._toolTip.width *3/5;
                    rawMaterialInfo4.y = this._toolTip.height * .3;
                    this._toolTip.addChild(rawMaterialIcon4);
                    this._toolTip.addChild(rawMaterialInfo4);
                    rawMaterialInfo4.runAction(new cc.moveBy(0.1, rawMaterialIcon4.width/2 , 0));
                    break;


            };


            this._parent = this.getParent();
            var machine  = user.asset.getMachineById(this._parent._machineId);
            var machineConfig = MachineController.instance.getMachineConfigByType(machine.machineType);
            this._widthMachine = machineConfig.size.width;
            this._heightMachine = machineConfig.size.height;
            this._xMachine = machine.coordinate.x;
            this._yMachine  = machine.coordinate.y;


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
           this.setLocalZOrder(2);
           var delta = touch.getDelta();
           //var target = this;
           //todo check level before can move product
           this.x += delta.x;
           this.y += delta.y;

            if (this.checkDragIntheMachine() || this.checkDragInTheQueueSlot(touch)){
                cc.log("in produce zone!!!");
                if (this._touchInProduceZone == false){
                    this._touchInProduceZone = true;
                    this._parent.addTempProductInFirstNullSlot(this._productConfig.res_path);
                }
            } else {
                if (this._touchInProduceZone == true) {
                    cc.log("not in produce zone!!!");
                    this._touchInProduceZone = false;
                    this._parent.removeTempProductSprite();
                }
            }


       } else {
       }

        //call controller
        //var mouse = touch.getLocation();
        //todo controller jobs
        //MachineController.instance.onProductMove(productConfig, mouse.x, mouse.y);

    },
    checkDragIntheMachine:function(){
        var ret = false;
        var currLogicPosition =  MapValues.screenPositionToLogic(this.x, this.y);
        //cc.log("Prepare for producing!" + currLogicPosition.x + "===" +currLogicPosition.y);
        if (currLogicPosition.x>=this._xMachine
            && currLogicPosition.x <= (this._xMachine + this._widthMachine)
            && currLogicPosition.y >= this._yMachine
            && currLogicPosition.y <= this._yMachine + this._heightMachine){
            ret = true;
        }
        return ret;
    },
    checkDragInTheQueueSlot:function(touch){
        var locationInNode = this._parent._FirstSlotSprite.convertToNodeSpace(touch.getLocation());
        var s = this._parent._FirstSlotSprite.getContentSize();
        var rect = cc.rect(0, 0, s.width, s.height);
        if (cc.rectContainsPoint(rect, locationInNode)){
            return true;
        };
        //var locationInNode = this._parent._unlockSlotSprite.convertToNodeSpace(touch.getLocation());
        //var s = this._parent._unlockSlotSprite.getContentSize();
        //var rect = cc.rect(0, 0, s.width, s.height);
        //if (cc.rectContainsPoint(rect, locationInNode)){
        //    return true;
        //};

        for (var i = 0 ; i< this._parent._queueSpriteList.length; i ++){
            var locationInNode = this._parent._queueSpriteList[i].convertToNodeSpace(touch.getLocation());
            var s = this._parent._queueSpriteList[i].getContentSize();
            var rect = cc.rect(0, 0, s.width, s.height);
            if (cc.rectContainsPoint(rect, locationInNode)){
                return true;
            };
        }
       return false;
    },

    onTouchEndedJobs: function (touch) {
        if (user.getLevel() >= this._productConfig.levelUnlock) {
            var action1 = new cc.moveTo(0.01,0, this._defaultPosition.y);
            var action2 = new cc.moveTo(0.3,this._defaultPosition.x, this._defaultPosition.y).easing(cc.easeBackInOut);
            var seq = new  cc.Sequence(action1, action2);
            this.runAction(seq);
            this._muiten.setVisible(true);
            this.runAction(new cc.ScaleTo(0.1, 1, 1));

            if (this.checkDragIntheMachine() || this.checkDragInTheQueueSlot(touch)){
                cc.log("producinggggggggggggggggggggggggggg!!!");
                this._touchInProduceZone = false;
                this._parent.removeTempProductSprite();
                this.addProductToMachineQueue();
            } else {
                if (this._touchInProduceZone == true) {
                    cc.log("backuppppppppppppppppppppppp!!!");
                    this._touchInProduceZone = false;
                    this._parent.removeTempProductSprite();
                }
            }
        }

        this._toolTip.removeFromParent(true);
    },
    addProductToMachineQueue:function(){
        var machine  = user.asset.getMachineById(this._parent._machineId);
        if (machine.isFullSlot()){
            cc.log("full slottttttttttttttttttttttttttttttttttttttttttt");
            var rubyToUnlock;
            if (machine.slot == 2){
                rubyToUnlock = MACHINE_CONFIG.FIRST_PRICE_BUY_SLOT;
            } else {
                rubyToUnlock = MACHINE_CONFIG.NEXT_PRICE_BUY_SLOT;
            }
           if (machine.slot <9){
               BaseGUILayer.instance.showSuggestUnlockSlot(rubyToUnlock);
               BaseGUILayer.instance._layout._btnYes.addClickEventListener(function () {
                   SoundCtrl.instance.playSoundEffect(res.func_click_button_mp3, false);
                   this._parent.onUnlockSlotEvent();
                   //this.addProductToMachineQueue();
                   BaseGUILayer.instance.removeBlockListener();
               }.bind(this));
               BaseGUILayer.instance._layout._btnNo.addClickEventListener(function () {
                   SoundCtrl.instance.playSoundEffect(res.func_click_button_mp3, false);
                   BaseGUILayer.instance.removeBlockListener();
               }.bind(this));
           } else {

           }

        } else {
            if (this._canProduce == false){
                var neededList = [];
                var rawMaterialList = this._productConfig.rawMaterialList;
                cc.log("this._canProduce == false");
                for (var i = 0; i< rawMaterialList.length; i++){
                    var rawMaterialId = rawMaterialList[i].rawMaterialId;
                    var quantity = rawMaterialList[i].quantity;
                    var currQuantity = user.getAsset().getQuantityOfTwoStorageByProductId(rawMaterialList[i].rawMaterialId);
                    cc.log("411" + rawMaterialId+"===" + quantity + "====" + currQuantity);
                    if (currQuantity < quantity){
                        neededList.push(new StorageItem(rawMaterialId, -currQuantity + quantity));
                    }
                }
                BaseGUILayer.instance.showSuggestBuyRawMaterial(neededList);
                BaseGUILayer.instance._layout._btnBuy.addClickEventListener(function () {
                    SoundCtrl.instance.playSoundEffect(res.func_click_button_mp3, false);
                    var neededRuby = BaseGUILayer.instance._layout.rubiBuy;
                    if (user.getRuby() >= BaseGUILayer.instance._layout.rubiBuy){
                        cc.log("goooooooooooooooooooooooooooo onBuyRawMaterial");
                        this.onBuyRawMaterial(neededRuby);
                        BaseGUILayer.instance.removeBlockListener();
                    } else {
                        BaseGUILayer.instance._layout.msgContent.setString("Mua vật phẩm không thành công");
                    }
                }.bind(this));
            } else {
                if (this._lastSeed == true){
                    //cc.log("Show lastSeedpopUp!!! ?");
                    //todo notify lastSeed First
                    var lastSeedsList = [];
                    var rawMaterialList = this._productConfig.rawMaterialList;
                    cc.log("this._canProduce == false");
                    for (var i = 0; i< rawMaterialList.length; i++){
                        var rawMaterialId = rawMaterialList[i].rawMaterialId;
                        var quantity = rawMaterialList[i].quantity;
                        var currQuantity = user.getAsset().getQuantityOfTwoStorageByProductId(rawMaterialList[i].rawMaterialId);
                        cc.log("411" + rawMaterialId+"===" + quantity + "====" + currQuantity);
                        if (currQuantity == quantity){
                            lastSeedsList.push(new StorageItem(rawMaterialId, 0));
                        }
                    }
                    BaseGUILayer.instance.showSuggestLastSeeds(lastSeedsList);
                    BaseGUILayer.instance._layout._btnYes.addClickEventListener(function () {
                        SoundCtrl.instance.playSoundEffect(res.func_click_button_mp3, false);
                        this.onAddProduct();
                        BaseGUILayer.instance.removeBlockListener();
                    }.bind(this));
                    BaseGUILayer.instance._layout._btnNo.addClickEventListener(function () {
                        SoundCtrl.instance.playSoundEffect(res.func_click_button_mp3, false);
                        BaseGUILayer.instance.removeBlockListener();
                    }.bind(this));

                } else {
                    this.onAddProduct();
                }
            }
        }

    },
    renderMuiTen: function () {
        this._muiten = new cc.Sprite(res.ten);
        this._muiten.setPosition(new cc.p(this.width * 4 / 5, this.height / 5));
        this.addChild(this._muiten, -1);
    },
    onBuyRawMaterial:function(neededRuby){
        var machineId = this._parent._machineId;
        var i = MachineController.instance.getIndexMachineInListById(machineId);
        var ret = user.asset.machineList[i].addProductInQueue(this._productConfig.productType);
        if (ret){
            var rawMaterialList = this._productConfig.rawMaterialList;
            for (var i = 0; i< rawMaterialList.length; i++){
                var rawMaterialId = rawMaterialList[i].rawMaterialId;
                var quantity = rawMaterialList[i].quantity;
                if (rawMaterialId.indexOf("crop_") >= 0){
                    user.asset.foodStorage.takeItem(rawMaterialId, quantity);
                } else {
                    user.asset.warehouse.takeItem(rawMaterialId, quantity);
                }

            }
            user.reduceRuby(neededRuby);
            testnetwork.connector.sendBuyRawMaterial(machineId, this._productConfig.productType);
            this._parent.updatePopup();

            var j = MachineController.instance.getIndexInMachineSpriteList(machineId);
            MapLayer.instance.machineSpriteList[j].scheduleAnimation();
        }
    },
    onAddProduct:function(){
        var machineId = this._parent._machineId;
        var i = MachineController.instance.getIndexMachineInListById(machineId);
        var ret = user.asset.machineList[i].addProductInQueue(this._productConfig.productType);
        if (ret){
            cc.log("on AddProduct " + this._productConfig.name);
            var rawMaterialList = this._productConfig.rawMaterialList;
            for (var i = 0; i< rawMaterialList.length; i++){
                var rawMaterialId = rawMaterialList[i].rawMaterialId;
                var quantity = rawMaterialList[i].quantity;
                if (rawMaterialId.indexOf("crop_") >= 0){
                    user.asset.foodStorage.takeItem(rawMaterialId, quantity);
                } else {
                    user.asset.warehouse.takeItem(rawMaterialId, quantity);
                }

            }


            testnetwork.connector.sendAddProduct(machineId, this._productConfig.productType);

            this._parent.updatePopup();

            var j = MachineController.instance.getIndexInMachineSpriteList(machineId);
            MapLayer.instance.machineSpriteList[j].scheduleAnimation();
        }

    }
})