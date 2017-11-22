/**
 * Created by CPU60075_LOCAL on 16/11/2017.
 */

/*var Filter = {
    DEFAULT_VERTEX_SHADER:
    "attribute vec4 a_position; \n"
    + "attribute vec2 a_texCoord; \n"
    + "varying mediump vec2 v_texCoord; \n"
    + "void main() \n"
    + "{ \n"
    + "    gl_Position = (CC_PMatrix * CC_MVMatrix) * a_position;  \n"
    + "    v_texCoord = a_texCoord; \n"
    + "}",
    GRAY_SCALE_FRAGMENT_SHADER:
    "varying vec2 v_texCoord;   \n"
    + "uniform sampler2D CC_Texture0; \n"
    + "void main() \n"
    + "{  \n"
    + "    vec4 texColor = texture2D(CC_Texture0, v_texCoord);  \n"
    + "    float gray = texColor.r * 0.299 + texColor.g * 0.587 + texColor.b * 0.114; \n"
    + "    gl_FragColor = vec4(gray, gray, gray, texColor.a);  \n"
    + "}",
    programs:{},
    grayScale: function (sprite) {
        var program = Filter.programs["grayScale"];
        if(!program){
            program = new cc.GLProgram(Filter.DEFAULT_VERTEX_SHADER, Filter.GRAY_SCALE_FRAGMENT_SHADER);
            //program.initWithVertexShaderByteArray(Filter.DEFAULT_VERTEX_SHADER, Filter.GRAY_SCALE_FRAGMENT_SHADER);
            program.addAttribute(cc.ATTRIBUTE_NAME_POSITION, cc.VERTEX_ATTRIB_POSITION);
            program.addAttribute(cc.ATTRIBUTE_NAME_TEX_COORD, cc.VERTEX_ATTRIB_TEX_COORDS);
            program.link();
            program.updateUniforms();
            Filter.programs["grayScale"] = program;
        }
        gl.useProgram(program.getProgram());
        sprite.shaderProgram = program;
    }
}*/

var GameShopDetailLayout = ccui.Layout.extend({
    _bg_size: 0,
    _winSize: 0,
    _listView: null,
    _btnLodge: null,
    _btnAnimal: null,
    _btnMachine: null,
    _btnTree: null,
    _scaleBtn: 0,
    _item: null,
    _isHide: false,
    _maxField: 0,
    _level: 1,

    ctor: function (maxField) {
        this._super();

        this._maxField = maxField;

        // cc.log(user);
        this._level = user.getLevel();

        this._winSize = cc.director.getVisibleSize();
        var sizeWidthList = this._winSize.width / 3;
        this.setClippingEnabled(false);
        //background
        var bg = new cc.Sprite(res.shop_bg_png);
        this._bg_size = bg.getContentSize();
        var shop_size = cc.size(sizeWidthList, this._winSize.height);
        bg.setScale(shop_size.width / this._bg_size.width, shop_size.height / this._bg_size.height);
        bg.setAnchorPoint(0, 0);

        //menu button
        this._btnLodge = new ccui.Button(res.shop_btLodge_n_png);
        this._btnLodge.setName("Lodge");
        this._scaleBtn = (this._winSize.height / 6) / this._btnLodge.getContentSize().height;
        this._btnLodge.setScale(this._scaleBtn);
        this._btnLodge.x = this._bg_size.width - 5;
        this._btnLodge.y = this._winSize.height / 9 * 8 - this._btnLodge.getBoundingBox().height / 2;
        this._btnLodge.setZoomScale(0);
        this._btnLodge.addTouchEventListener(this.touchEvent, this);
        this._btnLodge.setAnchorPoint(0, 0.5);
        this.addChild(this._btnLodge);

        this._btnAnimal = new ccui.Button(res.shop_btAnimal_n_png);
        this._btnAnimal.setName("Animal");
        this._btnAnimal.setScale(this._scaleBtn);
        this._btnAnimal.x = this._bg_size.width - 5;
        this._btnAnimal.y = this._btnLodge.y - this._btnLodge.getBoundingBox().height;
        this._btnAnimal.setZoomScale(0);
        this._btnAnimal.addTouchEventListener(this.touchEvent, this);
        this._btnAnimal.setAnchorPoint(0, 0.5);
        this.addChild(this._btnAnimal);

        this._btnMachine = new ccui.Button(res.shop_btMachine_n_png);
        this._btnMachine.setName("Machine");
        this._btnMachine.setScale(this._scaleBtn);
        this._btnMachine.x = this._bg_size.width - 5;
        this._btnMachine.y = this._btnAnimal.y - this._btnAnimal.getBoundingBox().height;
        this._btnMachine.setZoomScale(0);
        this._btnMachine.addTouchEventListener(this.touchEvent, this);
        this._btnMachine.setAnchorPoint(0, 0.5);
        this.addChild(this._btnMachine);

        this._btnTree = new ccui.Button(res.shop_btTree_n_png);
        this._btnTree.setName("Tree");
        this._btnTree.setScale(this._scaleBtn);
        this._btnTree.x = this._bg_size.width - 5;
        this._btnTree.y = this._btnMachine.y - this._btnMachine.getBoundingBox().height;
        this._btnTree.setZoomScale(0);
        this._btnTree.addTouchEventListener(this.touchEvent, this);
        this._btnTree.setAnchorPoint(0, 0.5);
        this.addChild(this._btnTree);

        //add background
        this.addChild(bg);

        //list items
        this._listView = new ccui.ListView();
        this._listView.setDirection(ccui.ScrollView.DIR_VERTICAL);
        this._listView.setTouchEnabled(true);
        this._listView.setBounceEnabled(true);
        this._listView.setBackGroundImageScale9Enabled(true);
        this._listView.setContentSize(cc.size(this._bg_size.width, this._winSize.height / 9 * 8));
        this._listView.setScrollBarEnabled(false);
        this.addChild(this._listView);

        this.initData();
        this.setPosition(cc.p(-(this._winSize.width / 3 + this._winSize.width / 7), 0));
    },

    initData: function () {
        this._btnLodge.loadTextureNormal(res.shop_btLodge_s_png);
        var infoItem = res.infoShopItem;
        for(var i = 0; i < infoItem.length; i++){
            if(infoItem[i].type == 1) {
                if(infoItem[i].id == "field"){
                    this._item = this.addSlot(infoItem[i], user.getAsset().getFieldList().length, this._maxField);
                }
                else{
                    if(this._level >= infoItem[i].level3) {
                        this._item = this.addSlot(infoItem[i], this.getNumberLodge(infoItem[i].id), 3);
                    } else if (infoItem[i].level2 <= this._level && this._level < infoItem[i].level3) {
                        this._item = this.addSlot(infoItem[i], this.getNumberLodge(infoItem[i].id), 2);
                    } else if (infoItem[i].level <= this._level && this._level < infoItem[i].level2) {
                        this._item = this.addSlot(infoItem[i], this.getNumberLodge(infoItem[i].id), 1);
                    } else {
                        this._item = this.addSlot(infoItem[i], 0, 0);
                    }
                }
                this._listView.pushBackCustomItem(this._item);
            }
        }
    },

    touchEvent: function (sender, type) {
        switch (type) {
            case ccui.Widget.TOUCH_BEGAN:
                sender.runAction(cc.scaleTo(0.1, this._scaleBtn - 0.1, this._scaleBtn - 0.1));
                break;
            case ccui.Widget.TOUCH_ENDED:
                var infoItem = res.infoShopItem;
                this.setNormalButton();
                this._listView.removeAllChildren();
                switch (sender.name) {
                    case "Lodge":
                        for(var i = 0; i < infoItem.length; i++){
                            if(infoItem[i].type == 1) {
                                if(infoItem[i].id == "field"){
                                    this._item = this.addSlot(infoItem[i], user.getAsset().getFieldList().length, this._maxField);
                                }
                                else{
                                    if(this._level >= infoItem[i].level3) {
                                        this._item = this.addSlot(infoItem[i], this.getNumberLodge(infoItem[i].id), 3);
                                    } else if (infoItem[i].level2 <= this._level && this._level < infoItem[i].level3) {
                                        this._item = this.addSlot(infoItem[i], this.getNumberLodge(infoItem[i].id), 2);
                                    } else if (infoItem[i].level <= this._level && this._level < infoItem[i].level2) {
                                        this._item = this.addSlot(infoItem[i], this.getNumberLodge(infoItem[i].id), 1);
                                    } else {
                                        this._item = this.addSlot(infoItem[i], 0, 0);
                                    }
                                }
                                this._listView.pushBackCustomItem(this._item);
                            }
                        }
                        sender.loadTextureNormal(res.shop_btLodge_s_png);
                        break;
                    case "Animal":
                        for(var i = 0; i < infoItem.length; i++){
                            var id = infoItem[i].id + "_habitat";
                            if(infoItem[i].type == 2) {
                                this._item = this.addSlot(infoItem[i], this.getNumberAnimal(id), this.getNumberLodge(id) * infoItem[i].slot);
                                this._listView.pushBackCustomItem(this._item);
                            }
                        }
                        sender.loadTextureNormal(res.shop_btAnimal_s_png);
                        break;
                    case "Machine":
                        for(var i = 0; i < infoItem.length; i++){
                            if(infoItem[i].type == 3) {
                                this._item = this.addSlot(infoItem[i], this.getNumberMachine(infoItem[i].id), infoItem[i].number);
                                this._listView.pushBackCustomItem(this._item);
                            }
                        }
                        sender.loadTextureNormal(res.shop_btMachine_s_png);
                        break;
                    case "Tree":
                        for(var i = 0; i < infoItem.length; i++){
                            if(infoItem[i].type == 4) {
                                this._item = this.addSlot(infoItem[i], 1, 1);
                                this._listView.pushBackCustomItem(this._item);
                            }
                        }
                        sender.loadTextureNormal(res.shop_btTree_s_png);
                        break;
                }
                this.scaleAfterClickBtn(sender);
                break;
        }
    },

    scaleAfterClickBtn: function (btn) {
        var scale1 = cc.scaleTo(0.1, this._scaleBtn + 0.1, this._scaleBtn + 0.1);
        var scale2 = cc.scaleTo(0.05, this._scaleBtn, this._scaleBtn);
        btn.runAction(cc.sequence(scale1, cc.delayTime(0.1), scale2));
    },

    setNormalButton: function () {
        this._btnLodge.loadTextureNormal(res.shop_btLodge_n_png);
        this._btnAnimal.loadTextureNormal(res.shop_btAnimal_n_png);
        this._btnMachine.loadTextureNormal(res.shop_btMachine_n_png);
        this._btnTree.loadTextureNormal(res.shop_btTree_n_png);
    },

    addSlot: function (item, cslot, mslot) {
        var slotView = new ccui.ImageView(res.shop_slot_png);
        slotView.setTouchEnabled(true);
        slotView.setName("slotView");
        var scale = this._bg_size.width / slotView.getContentSize().width;
        slotView.setScale(scale);

        var layout = new ccui.Layout();
        layout.setTouchEnabled(true);
        layout.setContentSize(this._listView.width, slotView.getBoundingBox().height);
        slotView.x = layout.width / 2;
        slotView.y = layout.height / 2;
        layout.addChild(slotView);

        var image = new cc.Sprite(item.nameIconShop);
        image.setName("img");
        image.x = layout.width / 4 * 3;
        image.y = layout.height / 2;
        var scaleImg = slotView.getContentSize().height / image.getContentSize().height;
        image.setScale(scaleImg);
        //imgBtn.addTouchEventListener(this.onClickImg, this);
        //Filter.grayScale(imgBtn);
        layout.addChild(image);

        var listener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: false,
            self: this,
            check: false,
            sprite: null,
            lstP: { x: 0, y: 0 },
            //dragSprite: null,
            onTouchBegan: function (touch, event) {
                var target = event.getCurrentTarget();
                var locationInNode = target.convertToNodeSpace(touch.getLocation());
                var s = target.getContentSize();
                var rect = cc.rect(0, 0, s.width, s.height);
                if (cc.rectContainsPoint(rect, locationInNode)) {
                    cc.log("sprite began... x = " + locationInNode.x + ", y = " + locationInNode.y);
                    target.setScale(scaleImg + 0.2);
                    return true;
                }
                return false;
            },
            onTouchMoved: function (touch, event) {
                //var delta = touch.getDelta();
                var mouse = touch.getLocation();
                var p = MapValues.screenPositionToLogic(mouse.x, mouse.y);
                p.x = Math.floor(p.x);
                p.y = Math.floor(p.y);
                if(!this._isHide) {
                    cc.log(p.x + " " + p.y);
                    this.self.getParent().hide();
                    this._isHide = true;
                    if (item.id == "bakery_machine") {
                        cc.log(p);
                        this.sprite = new BakerySprite(p.x, p.y);
                        MapLayer.instance.addChild(this.sprite);
                        var bakeryMachine = new BakeryMachine(new Coordinate(p.x, p.y));
                        user.getAsset().addMachine(bakeryMachine);
                        this.check = true;
                    }
                }
                //var ps = MapValues.screenPositionToMapPosition(dragSprite.x + delta.x, dragSprite.y + delta.y);
                //var psl = MapValues.screenPositionToLogic(this.sprite.x + delta.x, this.sprite.y + delta.y);
                //cc.log(psl.x + " : " + psl.x);
                if (p.x !== this.lstP.x || p.y !== this.lstP.y) {
                    this.sprite.setLogicPosition(p.x, p.y);
                    this.lstP = p;
                    //cc.log(Math.floor(psl.x) + " : " + Math.floor(psl.y));
                    cc.log("Touch Moved");
                }
            },
            onTouchEnded: function (touch, event) {
                var target = event.getCurrentTarget();
/*                if (this.check){
                    this.self.getParent().updateData();
                    this.check = false;
                }*/
                this.self.getParent().show();
                target.setScale(scaleImg);
                this._isHide = false;
                //MapLayer.instance.removeChildByName("DragSprite");
                cc.log("Touch Ended");
            }
        });

        if(this._level >= item.level && cslot < mslot) {
            cc.eventManager.addListener(listener, image);
        }

/*        if(item.id = "chicken_habitat") {
            cc.log(this._level >= item.level + " : " + cslot);
        }*/

        var slot = new cc.LabelBMFont(cslot + "/" + mslot, "fonts/outline/30.fnt");
        slot.x = layout.width / 3 * 2;
        slot.y = layout.height / 5 * 4;
        layout.addChild(slot);

        var goldImg = new cc.Sprite(res.gold_png);
        goldImg.x = layout.width / 2;
        goldImg.y = 0;
        goldImg.setAnchorPoint(0.5, -0.5);
        layout.addChild(goldImg);

        var title = new cc.LabelBMFont(item.title, "fonts/outline/30.fnt");
        title.x = layout.width / 10 - 10;
        title.y = layout.height - 10;
        title.setAnchorPoint(0, 1);
        layout.addChild(title);

        var detail = new cc.LabelBMFont(item.detail, "fonts/normal/30.fnt");
        detail.x = layout.width / 3;
        detail.y = layout.height / 2;
        detail.color = cc.color(77, 41, 1);
        layout.addChild(detail);

        var price;
        if (item.type == 2){
            var numberLodge = mslot / item.slot;
            if (cslot < item.slot){
                price = new cc.LabelBMFont(item.price1, "fonts/outline/30.fnt");
            } else {
                if (numberLodge == 2) {
                    price = new cc.LabelBMFont(item.price2, "fonts/outline/30.fnt");
                } else if (numberLodge == 3) {
                    if (cslot < item.slot * 2) {
                        price = new cc.LabelBMFont(item.price2, "fonts/outline/30.fnt");
                    } else {
                        price = new cc.LabelBMFont(item.price3, "fonts/outline/30.fnt");
                    }
                } else {
                    price = new cc.LabelBMFont(item.price1, "fonts/outline/30.fnt");
                }
            }
        } else {
            price = new cc.LabelBMFont(item.price, "fonts/outline/30.fnt");
        }
        price.x = layout.width / 5 * 2;
        price.y = 0;
        price.setAnchorPoint(1, -0.5);
        layout.addChild(price);

        return layout;
    },

    getNumberLodge: function (id) {
        var number = 0;
        var listLodge = user.getAsset().getAnimalLodgeList();
        for(var i = 0; i < listLodge.length; i++){
            if(listLodge[i].getType() == id) number++;
        }
        return number;
    },

    getNumberAnimal: function (id) {
        var number = 0;
        var listLodge = user.getAsset().getAnimalLodgeList();
        for(var i = 0; i < listLodge.length; i++){
            if(listLodge[i].getType() == id)
                number += listLodge[i].getCurrentSlot();
        }
        return number;
    },

    getNumberMachine: function (id) {
        var number = 0;
        var listMachine = user.getAsset().getMachineList();
        for(var i = 0; i < listMachine.length; i++){
            if(listMachine[i].getType() == id) number++;
        }
        return number;
    }

});
