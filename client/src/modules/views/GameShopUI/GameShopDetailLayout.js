/**
 * Created by CPU60075_LOCAL on 16/11/2017.
 */

var GameShopDetailLayout = ccui.Layout.extend({
    _bg_size: 0,
    _winSize: 0,
    _listView: null,
    _item: null,
    _isHide: false,

    ctor: function () {
        this._super();

        this._winSize = cc.director.getVisibleSize();
        var sizeWidthList = this._winSize.width / 3;

        //background
        var bg = new cc.Sprite(res.shop_bg_png);
        this._bg_size = bg.getContentSize();
        var shop_size = cc.size(sizeWidthList, this._winSize.height);
        bg.setScale(shop_size.width / this._bg_size.width, shop_size.height / this._bg_size.height);
        bg.setAnchorPoint(0, 0);

        //menu list sprite
        var btnLodge = this.addMenuItem(res.shop_btLodge_n_png, res.shop_btLodge_s_png, res.shop_btLodge_n_png);
        btnLodge.setName("Lodge");
        var btnAnimal = this.addMenuItem(res.shop_btAnimal_n_png, res.shop_btAnimal_s_png, res.shop_btAnimal_n_png);
        btnAnimal.setName("Animal");
        var btnMachine = this.addMenuItem(res.shop_btMachine_n_png, res.shop_btMachine_s_png, res.shop_btMachine_n_png);
        btnMachine.setName("Machine");
        var btnTree = this.addMenuItem(res.shop_btTree_n_png, res.shop_btTree_s_png, res.shop_btTree_n_png);
        btnTree.setName("Tree");

        var menu = new cc.Menu(btnLodge, btnAnimal, btnMachine, btnTree);
        menu.alignItemsVertically();
        menu.x = this._winSize.width / 8 * 3;
        menu.y = this._winSize.height / 2;
        this.addChild(menu);

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

        this.initData(menu);
        this.setPosition(cc.p(-(this._winSize.width / 3 + this._winSize.width / 7), 0));
    },

    initData: function (menu) {
        this.onMenuCallback(menu.children[0]);
    },

    addMenuItem: function (res_n, res_s, res_d) {
        var spriteNormal = new cc.Sprite(res_n);
        var spriteSelected = new cc.Sprite(res_s);
        var spriteDisabled = new cc.Sprite(res_d);

        var item = new cc.MenuItemSprite(spriteNormal, spriteSelected, spriteDisabled, this.onMenuCallback, this);
        item.setScale((this._winSize.height / 6) / item.getContentSize().height);
        return item;
    },

    addSlot: function (title, detail, cslot, mslot, price, res_img) {
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

        var imgBtn = new ccui.Button(res_img);
        imgBtn.x = layout.width / 4 * 3;
        imgBtn.y = layout.height / 2;
        var scaleBtn = slotView.getContentSize().height / imgBtn.getContentSize().height;
        imgBtn.setScale(scaleBtn);
        imgBtn.addTouchEventListener(this.onClickImg, this);
        layout.addChild(imgBtn);

        var goldImg = new cc.Sprite(res.gold_png);
        goldImg.x = layout.width / 2;
        goldImg.y = 0;
        goldImg.setAnchorPoint(0.5, -0.5);
        layout.addChild(goldImg);

        var title = new cc.LabelBMFont(title, "fonts/outline/30.fnt");
        title.x = layout.width / 10 - 10;
        title.y = layout.height - 10;
        title.setAnchorPoint(0, 1);
        layout.addChild(title);

        var detail = new cc.LabelBMFont(detail, "fonts/normal/30.fnt");
        detail.x = layout.width / 3;
        detail.y = layout.height / 2;
        detail.color = cc.color(77, 41, 1);
        layout.addChild(detail);

        var price = new cc.LabelBMFont(price, "fonts/outline/30.fnt");
        price.x = layout.width / 5 * 2;
        price.y = 0;
        price.setAnchorPoint(1, -0.5);
        layout.addChild(price);

        var slot = new cc.LabelBMFont(cslot + "/" + mslot, "fonts/outline/30.fnt");
        slot.x = layout.width / 3 * 2;
        slot.y = layout.height / 5 * 4;
        layout.addChild(slot);

        return layout;
    },

    onClickImg: function (sender, type) {
        switch (type) {
            case ccui.Widget.TOUCH_BEGAN:
                cc.log("Touch Began");
                break;
            case ccui.Widget.TOUCH_MOVED:
                if(!this._isHide){
                    this.getParent().hide();
                    this._isHide = true;
                }
                cc.log("Touch Moved");
                break;
            case ccui.Widget.TOUCH_ENDED:
                cc.log("Touch Ended");
                break;
            case ccui.Widget.TOUCH_CANCELED:
                this.getParent().show();
                this._isHide = false;
                cc.log("Touch Cancelled");
            default:
                break;
        }
    },

    onTouchBegan: function (touch, event) {
        var target = event.getCurrentTarget();
        cc.log("Touch Began");

        var locationInNode = target.convertToNodeSpace(touch.getLocation());
        var s = target.getContentSize();
        var rect = cc.rect(0, 0, s.width, s.height);

        if (cc.rectContainsPoint(rect, locationInNode)) {
            cc.log("sprite began... x = " + locationInNode.x + ", y = " + locationInNode.y);
            target.setScale(1.0);
            return true;
        }
        return false;
    },

    onMenuCallback: function (sender) {
        cc.log("onMenuCallback");
        this._listView.removeAllChildren();
        switch (sender.getName()) {
            case "Lodge":
                var infoItem = res.infoCoopItem;
                for(var i = 0; i < infoItem.length; i++){
                    this._item = this.addSlot(infoItem[i].title, infoItem[i].detail, 1, 1, infoItem[i].price, infoItem[i].nameIconShop);
                    this._listView.pushBackCustomItem(this._item);
                }
                break;
            case "Animal":
                var infoItem = res.infoAnimalItem;
                for(var i = 0; i < infoItem.length; i++){
                    this._item = this.addSlot(infoItem[i].title, infoItem[i].detail, 1, 1, infoItem[i].price, infoItem[i].nameIconShop);
                    this._listView.pushBackCustomItem(this._item);
                }
                break;
            case "Machine":
                var infoItem = res.infoMachineItem;
                for(var i = 0; i < infoItem.length; i++){
                    this._item = this.addSlot(infoItem[i].title, infoItem[i].detail, 1, 1, infoItem[i].price, infoItem[i].nameIconShop);
                    this._listView.pushBackCustomItem(this._item);
                }
                break;
        }
        var children = sender.getParent().children;
        for(var i = 0; i < children.length; i++){
            children[i].unselected();
        }
        sender.selected();
    }
});
