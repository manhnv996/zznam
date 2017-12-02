/**
 * Created by CPU60075_LOCAL on 20/11/2017.
 */

var GSDetailLayout = ccui.Layout.extend({
    _btnLodge: null,
    _btnAnimal: null,
    _btnMachine: null,
    _btnTree: null,
    _bg_size: 0,
    _scaleBtn: 0,
    _layout: null,
    _multiLayer: null,

    ctor: function () {
        this._super();

        var sizeWidthList = cc.winSize.width / 3;

        this._bg = new cc.Sprite(res.shop_bg_png);
        this._bg_size = this._bg.getContentSize();
        this._bg.setScale(sizeWidthList / this._bg_size.width, cc.winSize.height / this._bg_size.height);
        this._bg.setAnchorPoint(0, 0);

        //menu button
        this._btnLodge = new ccui.Button(res.shop_btLodge_n_png);
        this._btnLodge.setName("Lodge");
        this._scaleBtn = (cc.winSize.height / 6) / this._btnLodge.getContentSize().height;
        this._btnLodge.setScale(this._scaleBtn);
        this._btnLodge.x = this._bg_size.width - 5;
        this._btnLodge.y = cc.winSize.height / 9 * 8 - this._btnLodge.getBoundingBox().height / 2;
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
        this.addChild(this._bg);

        this.setPosition(cc.p(0, 0));
        this.init();
        this._btnLodge.loadTextureNormal(res.shop_btLodge_s_png);
    },

    init: function () {
        //Item Table
        this._layout = new ccui.Layout();
        this._layout.setContentSize(cc.size(this._bg_size.width, cc.winSize.height / 9 * 8));
        this.addChild(this._layout);

        this.lodgeTable = new LodgeTable();
        this.animalTable = new AnimalTable();
        this.machineTable = new MachineTable();
        this.treeTable = new TreeTable();

        this._multiLayer = new cc.LayerMultiplex(this.lodgeTable, this.animalTable, this.machineTable, this.treeTable);
        this._multiLayer.switchTo(0);

        this._layout.addChild(this._multiLayer);
        cc.log("GSDetail");
    },

    touchEvent: function (sender, type) {
        switch (type) {
            case ccui.Widget.TOUCH_BEGAN:
                sender.runAction(cc.scaleTo(0.1, this._scaleBtn - 0.1, this._scaleBtn - 0.1));
                break;
            case ccui.Widget.TOUCH_ENDED:
            case ccui.Widget.TOUCH_CANCELED:
                this.setNormalButton();
                switch (sender.name) {
                    case "Lodge":
                        this._multiLayer.switchTo(0);
                        sender.loadTextureNormal(res.shop_btLodge_s_png);
                        break;
                    case "Animal":
                        this._multiLayer.switchTo(1);
                        sender.loadTextureNormal(res.shop_btAnimal_s_png);
                        break;
                    case "Machine":
                        this._multiLayer.switchTo(2);
                        sender.loadTextureNormal(res.shop_btMachine_s_png);
                        break;
                    case "Tree":
                        this._multiLayer.switchTo(3);
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

    lockGameShop: function () {
        this._btnAnimal.setTouchEnabled(false);
        this._btnLodge.setTouchEnabled(false);
        this._btnMachine.setTouchEnabled(false);
        this._btnTree.setTouchEnabled(false);
        //this.lodgeTable.setTouchEnabled(false);
        //this.animalTable.setInertiaScrollEnabled(false);
        //this.machineTable.setTouchEnabled(false);
        //this.treeTable.setInertiaScrollEnabled(false);
    },

    unlockGameShop: function () {
        this._btnAnimal.setTouchEnabled(true);
        this._btnLodge.setTouchEnabled(true);
        this._btnMachine.setTouchEnabled(true);
        this._btnTree.setTouchEnabled(true);
        //this.lodgeTable.setTouchEnabled(false);
        //this.animalTable.setInertiaScrollEnabled(false);
        //this.machineTable.setTouchEnabled(false);
        //this.treeTable.setInertiaScrollEnabled(false);
    }
});
