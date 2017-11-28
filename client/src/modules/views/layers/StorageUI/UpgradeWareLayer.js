/**
 * Created by CPU60075_LOCAL on 24/11/2017.
 */

var UpgradeWareLayer = cc.Layer.extend({
    _level: null,
    _check_bolt: false,
    _check_ductTape: false,
    _check_plank: false,

    ctor: function (level) {
        this._super();

        this._level = level;

        var layoutT = ccui.Layout();
        layoutT.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
        layoutT.setBackGroundColor(cc.color.BLUE);
        layoutT.setContentSize(cc.winSize.width / 2, cc.winSize.height / 5 * 2);
        layoutT.x = 0;
        layoutT.y = cc.winSize.height / 10;
        this.addChild(layoutT);

        var backBtn = new ccui.Button(res.storage_back_png);
        backBtn.x = cc.winSize.width / 4;
        backBtn.y = cc.winSize.width / 10 - cc.winSize.width / 12;
        backBtn.addTouchEventListener(this.touchBackBtn, this);
        this.addChild(backBtn);

        //BOLT....................................................................................
        var layout = new ccui.Layout();
        layout.x = 0;
        layout.y = layoutT.height;
        layout.setAnchorPoint(0, 1);
        layout.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
        layout.setBackGroundColor(cc.color.RED);
        layout.setContentSize(layoutT.width * 2 / 9, layoutT.height / 4 * 3);

        var sprite = new cc.Sprite(res.upgrade_ware_bolt);
        sprite.x = layout.width / 2;
        sprite.y = layout.height / 4 * 3;

        var numberItem = 0;
        var numberNeed = res.upgradeWarehouse[level + 1].tool_bolt;
        var numberRuby = 0;
        if (user.getAsset().getWarehouse().getItem(ProductTypes.TOOL_BOLT)){
            numberItem = user.getAsset().getWarehouse().getItem(ProductTypes.TOOL_BOLT).quantity;
        }

        var label = new cc.LabelBMFont(numberItem + "/" + numberNeed, res.FONT_OUTLINE_20);
        label.x = layout.width / 2;
        label.y = sprite.y - sprite.height / 2 - label.height / 4;

        var layoutBtn = new ccui.Layout();
        layoutBtn.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
        layoutBtn.setBackGroundColor(cc.color.BLACK);

        var btn = new ccui.Button(res.storage_buy_tool);
        btn.tag = 1;
        //btn.setZoomScale(-0.1);
        layoutBtn.setContentSize(btn.getContentSize().width, btn.getContentSize().height);
        layoutBtn.x = layout.width / 2;
        layoutBtn.y = label.y - label.height / 2 - btn.getContentSize().height / 2;
        layoutBtn.setAnchorPoint(0.5, 0.5);
        btn.x = layoutBtn.width / 2;
        btn.y = layoutBtn.height / 2;
        btn.addTouchEventListener(this.touchBuyTool, this);
        layoutBtn.addChild(btn);

        var ruby = new cc.Sprite(res.ruby_small);
        ruby.x = layoutBtn.width / 4 * 3;
        ruby.y = layoutBtn.height / 4;
        //cc.log("ruby" + ruby);
        layoutBtn.addChild(ruby);

        if (numberItem >= numberNeed) {
            layoutBtn.setVisible(false);
            this._check_bolt = true;
        } else {
            numberRuby = (numberNeed - numberItem) * ProductResource.TOOL_BOLT[4];
        }

        var numberRubyLabel = new cc.LabelBMFont(numberRuby, res.FONT_OUTLINE_20);
        numberRubyLabel.x = layoutBtn.width / 3;
        numberRubyLabel.y = layoutBtn.height / 4;
        layoutBtn.addChild(numberRubyLabel);

        layout.addChild(sprite);
        layout.addChild(label);
        layout.addChild(layoutBtn);
        layoutT.addChild(layout);

        //DUCTTAPE...................................................................................
        layout = new ccui.Layout();
        layout.x = layoutT.width * 2 / 9;
        layout.y = layoutT.height;
        layout.setAnchorPoint(0, 1);
        layout.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
        layout.setBackGroundColor(cc.color.GREEN);
        layout.setContentSize(layoutT.width * 2 / 9, layoutT.height / 4 * 3);
        sprite = new cc.Sprite(res.upgrade_ware_ductTape);
        sprite.x = layout.width / 2;
        sprite.y = layout.height / 4 * 3;

        numberItem = 0;
        numberNeed = res.upgradeWarehouse[level + 1].tool_ductTape;
        numberRuby = 0;
        if (user.getAsset().getWarehouse().getItem(ProductTypes.TOOL_DUCTTAPE)){
            numberItem = user.getAsset().getWarehouse().getItem(ProductTypes.TOOL_DUCTTAPE).quantity;
        }

        label = new cc.LabelBMFont(numberItem + "/" + numberNeed, res.FONT_OUTLINE_20);
        label.x = layout.width / 2;
        label.y = sprite.y - sprite.height / 2 - label.height / 4;

        layoutBtn = new ccui.Layout();
        layoutBtn.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
        layoutBtn.setBackGroundColor(cc.color.BLACK);

        btn = new ccui.Button(res.storage_buy_tool);
        btn.tag = 2;
        //btn.setZoomScale(-0.1);
        layoutBtn.setContentSize(btn.getContentSize().width, btn.getContentSize().height);
        layoutBtn.x = layout.width / 2;
        layoutBtn.y = label.y - label.height / 2 - btn.getContentSize().height / 2;
        layoutBtn.setAnchorPoint(0.5, 0.5);
        btn.x = layoutBtn.width / 2;
        btn.y = layoutBtn.height / 2;
        btn.addTouchEventListener(this.touchBuyTool, this);
        layoutBtn.addChild(btn);

        ruby = new cc.Sprite(res.ruby_small);
        ruby.x = layoutBtn.width / 4 * 3;
        ruby.y = layoutBtn.height / 4;
        //cc.log("ruby" + ruby);
        layoutBtn.addChild(ruby);

        if (numberItem >= numberNeed) {
            layoutBtn.setVisible(false);
            this._check_ductTape = true;
        } else {
            numberRuby = (numberNeed - numberItem) * ProductResource.TOOL_DUCTTAPE[4];
        }

        numberRubyLabel = new cc.LabelBMFont(numberRuby, res.FONT_OUTLINE_20);
        numberRubyLabel.x = layoutBtn.width / 3;
        numberRubyLabel.y = layoutBtn.height / 4;
        layoutBtn.addChild(numberRubyLabel);

        layout.addChild(sprite);
        layout.addChild(label);
        layout.addChild(layoutBtn);
        layoutT.addChild(layout);

        //PLANK................................................................................
        layout = new ccui.Layout();
        layout.x = layoutT.width * 4 / 9;
        layout.y = layoutT.height;
        layout.setAnchorPoint(0, 1);
        layout.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
        layout.setBackGroundColor(cc.color.WHITE);
        layout.setContentSize(layoutT.width * 2 / 9, layoutT.height / 4 * 3);

        sprite = new cc.Sprite(res.upgrade_ware_plank);
        sprite.x = layout.width / 2;
        sprite.y = layout.height / 4 * 3;

        numberItem = 0;
        numberNeed = res.upgradeWarehouse[level + 1].tool_plank;
        numberRuby = 0;
        if (user.getAsset().getWarehouse().getItem(ProductTypes.TOOL_PLANK)){
            numberItem = user.getAsset().getWarehouse().getItem(ProductTypes.TOOL_PLANK).quantity;
        }

        label = new cc.LabelBMFont(numberItem + "/" + numberNeed, res.FONT_OUTLINE_20);
        label.x = layout.width / 2;
        label.y = sprite.y - sprite.height / 2 - label.height / 4;

        layoutBtn = new ccui.Layout();
        layoutBtn.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
        layoutBtn.setBackGroundColor(cc.color.BLACK);

        btn = new ccui.Button(res.storage_buy_tool);
        btn.tag = 3;
        //btn.setZoomScale(-0.1);
        layoutBtn.setContentSize(btn.getContentSize().width, btn.getContentSize().height);
        layoutBtn.x = layout.width / 2;
        layoutBtn.y = label.y - label.height / 2 - btn.getContentSize().height / 2;
        layoutBtn.setAnchorPoint(0.5, 0.5);
        btn.x = layoutBtn.width / 2;
        btn.y = layoutBtn.height / 2;
        btn.addTouchEventListener(this.touchBuyTool, this);
        layoutBtn.addChild(btn);

        ruby = new cc.Sprite(res.ruby_small);
        ruby.x = layoutBtn.width / 4 * 3;
        ruby.y = layoutBtn.height / 4;
        //cc.log("ruby" + ruby);
        layoutBtn.addChild(ruby);

        if (numberItem >= numberNeed) {
            layoutBtn.setVisible(false);
            this._check_plank = true;
        } else {
            numberRuby = (numberNeed - numberItem) * ProductResource.TOOL_PLANK[4];
        }

        numberRubyLabel = new cc.LabelBMFont(numberRuby, res.FONT_OUTLINE_20);
        numberRubyLabel.x = layoutBtn.width / 3;
        numberRubyLabel.y = layoutBtn.height / 4;
        layoutBtn.addChild(numberRubyLabel);

        layout.addChild(sprite);
        layout.addChild(label);
        layout.addChild(layoutBtn);
        layoutT.addChild(layout);
        //cc.log("upgrade silo");

        //Label Next Capacity
        var nextCapacity = new cc.LabelBMFont("Sức chứa sau nâng cấp : " + res.upgradeSilo[this._level + 1].capacity, res.FONT_NORMAL_30);
        nextCapacity.color = cc.color(77, 41, 1);
        nextCapacity.setBoundingWidth(layoutT.width / 3);
        nextCapacity.setAlignment(cc.TEXT_ALIGNMENT_CENTER);
        nextCapacity.x = layoutT.width / 6 * 5;
        nextCapacity.y = layoutT.height / 5 * 3;
        layoutT.addChild(nextCapacity);

        //Label....
        var infoLable = new cc.LabelBMFont("(*) Vật phẩm nâng cấp có được từ thu hoạch cây trồng, nhà máy, vật nuôi ...", res.FONT_NORMAL_20);
        infoLable.color = cc.color(77, 41, 1);
        infoLable.setBoundingWidth(layoutT.width / 3 * 2);
        infoLable.setAlignment(cc.TEXT_ALIGNMENT_CENTER);
        infoLable.x = layoutT.width / 3;
        infoLable.y = layoutT.height / 10;
        layoutT.addChild(infoLable);

        //Button V
        var  buttonV = new ccui.Button(res.storage_V_png);
        buttonV.x = layoutT.width / 6 * 5;
        buttonV.y = layoutT.height / 5;
        buttonV.setScale(0.9);
        buttonV.setTouchEnabled(false);
        layoutT.addChild(buttonV);

        if (this._check_nail && this._check_screw && this._check_woodpanel) {
            buttonV.addTouchEventListener(this.touchUpgradeWare, this);
        }
    },

    touchUpgradeWare: function (sender, type) {

    },

    touchBuyTool: function (sender, type) {
        switch (type) {
            case ccui.Widget.TOUCH_ENDED:
                cc.log("Touch Buy Item");
                break;
            case ccui.Widget.TOUCH_CANCELED:
                break;
        }
    },

    touchBackBtn: function (sender, type){
        switch (type) {
            case ccui.Widget.TOUCH_ENDED:
                this.parent.switchTo(0);
                break;
            case ccui.Widget.TOUCH_CANCELED:
                this.parent.switchTo(0);
                break;
        }
    }
});