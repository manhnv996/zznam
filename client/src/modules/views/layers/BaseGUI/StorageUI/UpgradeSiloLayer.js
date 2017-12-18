/**
 * Created by CPU60075_LOCAL on 24/11/2017.
 */

var UpgradeSiloLayer = cc.Layer.extend({
    _level: null,
    _check_nail: false,
    _check_screw: false,
    _check_woodpanel: false,
    _buttonV: null,

    ctor: function (level) {
        this._super();

        this._level = level;

        //cc.log("Level SILO " + this._level);

        var layoutT = ccui.Layout();
        //layoutT.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
        //layoutT.setBackGroundColor(cc.color.BLUE);
        layoutT.setContentSize(cc.winSize.width / 2, cc.winSize.height / 5 * 2);
        layoutT.x = 0;
        layoutT.y = cc.winSize.height / 10;
        this.addChild(layoutT);

        this.backBtn = new ccui.Button(res.storage_btn_png);
        this.backBtn.x = cc.winSize.width / 4;
        this.backBtn.y = cc.winSize.width / 10 - cc.winSize.width / 12;
        this.backBtn.addTouchEventListener(this.touchBackBtn, this);
        this.backBtn.setZoomScale(0.0);
        this.addChild(this.backBtn);

        var labelUpgrade = new cc.LabelBMFont(fr.Localization.text("text_btn_back"), res.FONT_OUTLINE_50);
        labelUpgrade.x = this.backBtn.width / 2;
        labelUpgrade.y = this.backBtn.height / 2;
        labelUpgrade.setScale(0.7);
        this.backBtn.addChild(labelUpgrade);

        //NAIL...........................................................
        var layout = new ccui.Layout();
        layout.x = 0;
        layout.y = layoutT.height;
        layout.setAnchorPoint(0, 1);
        //layout.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
        //layout.setBackGroundColor(cc.color.RED);
        layout.setContentSize(layoutT.width * 2 / 9, layoutT.height / 4 * 3);

        var sprite = new cc.Sprite(res.upgrade_silo_nail);
        sprite.x = layout.width / 2;
        sprite.y = layout.height / 4 * 3;

        //cc.log("Product Type : " + ProductTypes.TOOL_NAIL);
        var numberItem = 0;
        var numberNeed = res.upgradeSilo[this._level + 1].tool_nail;
        var numberRuby = 0;
        if (user.getAsset().getWarehouse().getItem(ProductTypes.TOOL_NAIL)){
            numberItem = user.getAsset().getWarehouse().getItem(ProductTypes.TOOL_NAIL).quantity;
        }

        var label = new cc.LabelBMFont(numberItem + "/" + numberNeed, res.FONT_OUTLINE_20);
        label.tag = 21;
        label.x = layout.width / 2;
        //label.y = sprite.y - sprite.height / 2 - label.height / 2;
        label.y = sprite.y - sprite.height / 2 - label.height / 4;

        var layoutBtn = new ccui.Layout();
        //layoutBtn.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
        //layoutBtn.setBackGroundColor(cc.color.BLACK);

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
            this._check_nail = true;
        } else {
            numberRuby = (numberNeed - numberItem) * ProductResource.TOOL_NAIL[5];
            //numberRuby.tag = 11;
            //layoutBtn.addChild(numberRuby);
        }

        var numberRubyLabel = new cc.LabelBMFont(numberRuby, res.FONT_OUTLINE_20);
        numberRubyLabel.x = layoutBtn.width / 3;
        numberRubyLabel.y = layoutBtn.height / 4;
        numberRubyLabel.tag = 11;
        layoutBtn.addChild(numberRubyLabel);
        cc.log("numberRuby" + numberRuby);

        cc.log("numberRubyLabel" + numberRubyLabel.getString());

        layout.addChild(sprite);
        layout.addChild(label);
        layout.addChild(layoutBtn);
        layoutT.addChild(layout);

        //SCREW.....................................................................
        layout = new ccui.Layout();
        layout.x = layoutT.width * 2 / 9;
        layout.y = layoutT.height;
        layout.setAnchorPoint(0, 1);
        //layout.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
        //layout.setBackGroundColor(cc.color.GREEN);
        layout.setContentSize(layoutT.width * 2 / 9, layoutT.height / 4 * 3);
        sprite = new cc.Sprite(res.upgrade_silo_screw);
        sprite.x = layout.width / 2;
        sprite.y = layout.height / 4 * 3;

        numberItem = 0;
        numberNeed = res.upgradeSilo[this._level + 1].tool_screw;
        numberRuby = 0;
        if (user.getAsset().getWarehouse().getItem(ProductTypes.TOOL_SCREW)){
            numberItem = user.getAsset().getWarehouse().getItem(ProductTypes.TOOL_SCREW).quantity;
        }

        label = new cc.LabelBMFont(numberItem + "/" + numberNeed, res.FONT_OUTLINE_20);
        label.tag = 22;
        label.x = layout.width / 2;
        //label.y = sprite.y - sprite.height / 2 - label.height / 2;
        label.y = sprite.y - sprite.height / 2 - label.height / 4;

        layoutBtn = new ccui.Layout();
        //layoutBtn.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
        //layoutBtn.setBackGroundColor(cc.color.BLACK);

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
            this._check_screw = true;
        } else {
            numberRuby = (numberNeed - numberItem) * ProductResource.TOOL_SCREW[5];
        }

        numberRubyLabel = new cc.LabelBMFont(numberRuby, res.FONT_OUTLINE_20);
        numberRubyLabel.x = layoutBtn.width / 3;
        numberRubyLabel.y = layoutBtn.height / 4;
        numberRubyLabel.tag = 12;
        layoutBtn.addChild(numberRubyLabel);

        layout.addChild(sprite);
        layout.addChild(label);
        layout.addChild(layoutBtn);
        layoutT.addChild(layout);

        //WOODPANEL............................................................................
        layout = new ccui.Layout();
        layout.x = layoutT.width * 4 / 9;
        layout.y = layoutT.height;
        layout.setAnchorPoint(0, 1);
        //layout.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
        //layout.setBackGroundColor(cc.color.WHITE);
        layout.setContentSize(layoutT.width * 2 / 9, layoutT.height / 4 * 3);

        sprite = new cc.Sprite(res.upgrade_silo_woodPanel);
        sprite.x = layout.width / 2;
        sprite.y = layout.height / 4 * 3;

        numberItem = 0;
        numberNeed = res.upgradeSilo[this._level + 1].tool_woodPanel;
        numberRuby = 0;
        if (user.getAsset().getWarehouse().getItem(ProductTypes.TOOL_WOODPANEL)){
            numberItem = user.getAsset().getWarehouse().getItem(ProductTypes.TOOL_WOODPANEL).quantity;
        }

        label = new cc.LabelBMFont(numberItem.toString() + "/" + numberNeed.toString(), res.FONT_OUTLINE_20);
        label.tag = 23;
        label.x = layout.width / 2;
        //label.y = sprite.y - sprite.height / 2 - label.height / 2;
        label.y = sprite.y - sprite.height / 2 - label.height / 4;

        layoutBtn = new ccui.Layout();
        //layoutBtn.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
        //layoutBtn.setBackGroundColor(cc.color.BLACK);

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
            this._check_woodpanel = true;
        } else {
            numberRuby = (numberNeed - numberItem) * ProductResource.TOOL_WOODPANEL[5];
        }

        numberRubyLabel = new cc.LabelBMFont(numberRuby, res.FONT_OUTLINE_20);
        numberRubyLabel.x = layoutBtn.width / 3;
        numberRubyLabel.y = layoutBtn.height / 4;
        numberRubyLabel.tag = 13;
        layoutBtn.addChild(numberRubyLabel);

        layout.addChild(sprite);
        layout.addChild(label);
        layout.addChild(layoutBtn);
        layoutT.addChild(layout);
        //cc.log("upgrade silo");

        //Label Next Capacity
        var nextCapacity = new cc.LabelBMFont(fr.Localization.text("Text_Detail_Upgrade_Inv") +  " " + res.upgradeSilo[this._level + 1].capacity, res.FONT_NORMAL_30);
        //var nextCapacity = new cc.LabelBMFont(fr.Localization.text("text_unlock_detail") +  " " + res.upgradeSilo[this._level + 1].capacity, res.FONT_NORMAL_30);
        nextCapacity.color = cc.color(77, 41, 1);
        nextCapacity.setBoundingWidth(layoutT.width / 3);
        nextCapacity.setAlignment(cc.TEXT_ALIGNMENT_CENTER);
        nextCapacity.x = layoutT.width / 6 * 5;
        nextCapacity.y = layoutT.height / 5 * 3;
        layoutT.addChild(nextCapacity);

        //Label....
        var infoLable = new cc.LabelBMFont("(*) " + fr.Localization.text("text_detail_have_item_upgrade"), res.FONT_NORMAL_20);
        infoLable.color = cc.color(77, 41, 1);
        infoLable.setBoundingWidth(layoutT.width / 3 * 2);
        infoLable.setAlignment(cc.TEXT_ALIGNMENT_CENTER);
        infoLable.x = layoutT.width / 3;
        infoLable.y = layoutT.height / 10;
        layoutT.addChild(infoLable);

        //Button V
        this._buttonV = new ccui.Button(res.storage_V_png);
        this._buttonV.x = layoutT.width / 6 * 5;
        this._buttonV.y = layoutT.height / 5;
        this._buttonV.setScale(0.9);
        //buttonV.setTouchEnabled(false);
        layoutT.addChild(this._buttonV);

        this.checkButtonV();
    },

    checkButtonV: function () {
        if (this._check_nail && this._check_screw && this._check_woodpanel) {
            this._buttonV.setTouchEnabled(true);
            this._buttonV.addTouchEventListener(this.touchUpgradeSilo, this);
        } else {
            this._buttonV.setTouchEnabled(false);
        }
    },

    touchBuyTool: function (sender, type) {
        switch (type) {
            case ccui.Widget.TOUCH_BEGAN:
                cc.audioEngine.playEffect(res.func_click_button_mp3, false);
                break;
            case ccui.Widget.TOUCH_ENDED:
            case ccui.Widget.TOUCH_CANCELED:
                cc.log("Touch Buy Item");
                var ruby = parseInt(sender.parent.getChildByTag(sender.tag + 10).getString());
                if (ruby > user.ruby) {
                    BaseGUILayer.instance.removeBlockListener();
                    BaseGUILayer.instance.notifyNotEnoughRuby((ruby - user.ruby), true);
                } else {
                    user.reduceRuby(ruby);
                    sender.parent.setVisible(false);
                    var label = sender.parent.parent.getChildByTag(sender.tag + 20);
                    //cc.log("Label " + label.getString());
                    var productType;
                    var numberAdd;
                    switch (sender.tag) {
                        case 1: //nail
                            cc.log("Buy Nail " + ruby);
                            label.setString(res.upgradeSilo[this._level + 1].tool_nail + "/" + res.upgradeSilo[this._level + 1].tool_nail);
                            productType = ProductTypes.TOOL_NAIL;
                            numberAdd = ruby / ProductResource.TOOL_NAIL[5];
                            this._check_nail = true;
                            break;
                        case 2: //screw
                            cc.log("Buy Screw" + ruby);
                            label.setString(res.upgradeSilo[this._level + 1].tool_screw + "/" + res.upgradeSilo[this._level + 1].tool_screw);
                            productType = ProductTypes.TOOL_SCREW;
                            numberAdd = ruby / ProductResource.TOOL_SCREW[5];
                            this._check_screw = true;
                            break;
                        case 3: //woodpanel
                            cc.log("Buy Woodpanel" + ruby);
                            label.setString(res.upgradeSilo[this._level + 1].tool_woodPanel + "/" + res.upgradeSilo[this._level + 1].tool_woodPanel);
                            productType = ProductTypes.TOOL_WOODPANEL;
                            numberAdd = ruby / ProductResource.TOOL_WOODPANEL[5];
                            this._check_woodpanel = true;
                            break;
                    }
                    //add Item to Storage
                    //cc.log("product type " + productType);
                    //cc.log("number add " + numberAdd);
                    user.getAsset().getWarehouse().addItem(productType, numberAdd);
                    //send server
                    testnetwork.connector.sendBuyTool(productType, numberAdd);

                    //Unlock button V
                    this.checkButtonV();
                }
                break;
        }
    },

    touchUpgradeSilo: function (sender, type) {
        cc.log("touchUpgradeSilo");
        switch (type) {
            case ccui.Widget.TOUCH_BEGAN:
                audioEngine.playEffect(res.func_click_button_mp3, false);
                break;
            case ccui.Widget.TOUCH_ENDED:
            case ccui.Widget.TOUCH_CANCELED:
                StorageCtrl.instance.upgrageSilo(this._level);
                break;
        }
    },

    touchBackBtn: function (sender, type){
        switch (type) {
            case ccui.Widget.TOUCH_BEGAN:
                audioEngine.playEffect(res.func_click_button_mp3, false);
                var scaleByBtn = cc.scaleTo(0.1, 0.9);
                sender.runAction(scaleByBtn);
                break;
            case ccui.Widget.TOUCH_ENDED:
            case ccui.Widget.TOUCH_CANCELED:
                //cc.log("this.parent.switchTo(0) " + this.parent.switchTo(0));
                this.parent.switchTo(0);
                var scaleByBtn = cc.scaleTo(0.1, 1.0);
                StorageLayout.instance.itemListLayer.upgradeBtn.runAction(scaleByBtn);
                break;
        }
    }
});