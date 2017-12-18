/**
/**
 * Created by CPU60075_LOCAL on 20/11/2017.
 */

var GSDetailLayout = ccui.Layout.extend({
    _btnLodge: null,
    _btnAnimal: null,
    _btnMachine: null,
    _btnTree: null,
    _bgSize: 0,
    _scaleBtn: 0,
    _layout: null,
    _multiLayer: null,

    ctor: function () {
        this._super();

        this._bg = new cc.Sprite(res.shop_bg_png);
        this._bgSize = this._bg.getContentSize();
        this._bg.setScale((cc.winSize.width / 3) / this._bgSize.width, cc.winSize.height / this._bgSize.height);
        this._bg.setAnchorPoint(0, 0);

        //menu button
        this.listButton = new ccui.Layout();
        this.listButton.x = this._bgSize.width - 5;
        this.listButton.y = cc.winSize.height / 9 * 8;
        var linearLayout = new ccui.LinearLayoutParameter();
        this.listButton.setLayoutParameter(linearLayout);
        this.listButton.setLayoutType(ccui.Layout.LINEAR_VERTICAL);
        //linearLayout.setMargin(new ccui.Margin(0, 5, 0, 0));

        this._btnLodge = new ccui.Button(res.shop_btLodge_n_png);
        this._btnLodge.setName("Lodge");
        this._btnLodge.setZoomScale(0);
        this._btnLodge.addTouchEventListener(this.touchEvent, this);
        this._btnLodge.setAnchorPoint(0, 0.5);

        this._btnAnimal = new ccui.Button(res.shop_btAnimal_n_png);
        this._btnAnimal.setName("Animal");
        this._btnAnimal.setZoomScale(0);
        this._btnAnimal.addTouchEventListener(this.touchEvent, this);
        this._btnAnimal.setAnchorPoint(0, 0.5);

        this._btnMachine = new ccui.Button(res.shop_btMachine_n_png);
        this._btnMachine.setName("Machine");
        this._btnMachine.setZoomScale(0);
        this._btnMachine.addTouchEventListener(this.touchEvent, this);
        this._btnMachine.setAnchorPoint(0, 0.5);

        this._btnTree = new ccui.Button(res.shop_btTree_n_png);
        this._btnTree.setName("Tree");
        this._btnTree.setZoomScale(0);
        this._btnTree.addTouchEventListener(this.touchEvent, this);
        this._btnTree.setAnchorPoint(0, 0.5);

        this._scaleBtn = (cc.winSize.height / 6) / this._btnLodge.getContentSize().height;
        this.listButton.setScale(this._scaleBtn);
        this.listButton.addChild(this._btnLodge);
        this.listButton.addChild(this._btnAnimal);
        this.listButton.addChild(this._btnMachine);
        this.listButton.addChild(this._btnTree);

        this.addChild(this.listButton);

        //add background
        this.addChild(this._bg);

        this.setPosition(cc.p(0, 0));
        this.init();
        this._btnLodge.loadTextureNormal(res.shop_btLodge_s_png);
    },

    init: function () {
        this._layout = new ccui.Layout();
        this._layout.setContentSize(cc.size(this._bgSize.width, cc.winSize.height / 9 * 8));
        this.addChild(this._layout);

        //Item Table
        this._lodgeTable = new LodgeTable();
        this._animalTable = new AnimalTable();
        this._machineTable = new MachineTable();
        this._treeTable = new TreeTable();

        this._multiLayer = new cc.LayerMultiplex(this._lodgeTable, this._animalTable, this._machineTable, this._treeTable);
        this._multiLayer.switchTo(0);

        this._layout.addChild(this._multiLayer);
        //cc.log("GSDetail");
    },

    touchEvent: function (sender, type) {
        switch (type) {
            case ccui.Widget.TOUCH_BEGAN:
                cc.audioEngine.playEffect(res.func_click_button_mp3, false);
                sender.runAction(cc.scaleTo(0.1, 0.9));
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
        var scale1 = cc.scaleTo(0.1, 1.1);
        var scale2 = cc.scaleTo(0.05, 1.0);
        btn.runAction(cc.sequence(scale1, cc.delayTime(0.1), scale2));
    },

    setNormalButton: function () {
        this._btnLodge.loadTextureNormal(res.shop_btLodge_n_png);
        this._btnAnimal.loadTextureNormal(res.shop_btAnimal_n_png);
        this._btnMachine.loadTextureNormal(res.shop_btMachine_n_png);
        this._btnTree.loadTextureNormal(res.shop_btTree_n_png);
    },

    openAnimalTable: function () {
        this.parent.show();
        this._multiLayer.switchTo(1);
        this.setNormalButton();
        this._btnAnimal.loadTextureNormal(res.shop_btAnimal_s_png);
    },

    reloadShopData: function () {
        this._lodgeTable._tableView.reloadData();
        this._animalTable._tableView.reloadData();
        this._machineTable._tableView.reloadData();
        //this._treeTable._tableView.reloadData();
    }
});
