/**
 * Created by CPU60075_LOCAL on 12/21/2017.
 */

var MyShopLayout = BaseLayout.extend({
    //cartStatus: 1,
    cartStatus: 2,
    //cartStatus: 3,

    ctor: function (id) {
        this._super(res.roadshop_bg_in, id, true, true, true);

        this._title.y = this.height / 10 * 9;
        this._btnClose.y = this.height / 10 * 9;


        var bangten = new cc.Sprite(res.bangten);
        bangten.x = this.width / 2;
        bangten.y = this.height;
        bangten.setAnchorPoint(0.5, 0.9);

        var bg2 = new cc.Sprite(res.roadshop_bg_out);
        bg2.x = this.width / 2;
        bg2.y = this.height / 2;

        this._listCart = new cc.TableView(this, cc.size(this.width, this.height / 5 * 2));
        this._listCart.setDirection(cc.SCROLLVIEW_DIRECTION_HORIZONTAL);
        this._listCart.x = 0;
        this._listCart.y = this.height / 10 * 3;
        this._listCart.setDelegate(this);
        this._listCart.reloadData();

        this._bg.addChild(this._listCart);
        this._bg.addChild(bg2);
        this._bg.addChild(bangten);
    },

    tableCellTouched: function (table, cell) {
        cc.log("tableCellTouched", cell.getIdx());
    },

    tableCellSizeForIndex: function (table, idx) {
        return cc.size(this.width / 3.5, this.height / 5 * 2);
    },

    tableCellAtIndex: function (table, idx) {
        var cell = table.dequeueCell();

        cell = new cc.TableViewCell();

        var cartLayout = new ccui.Layout();
        cartLayout.setContentSize(cc.size(this.width / 3.5, this.height / 5 * 2));

        var cart = new cc.Sprite(res.roadshop_cart);
        cart.x = cartLayout.width / 2;
        cart.y = cartLayout.height / 2;
        cart.setScaleY(cartLayout.height / cart.height);
        cartLayout.addChild(cart);

        switch (this.cartStatus) {
            case 1:
                var string = fr.Localization.text("text_create_new_sale");
                string = string.replace("\\n", "\n");
                var sellLabel = new cc.LabelBMFont(string, res.FONT_NORMAL_30);
                sellLabel.x = cartLayout.width / 2;
                sellLabel.y = cartLayout.height / 3 * 2;
                sellLabel.color = cc.color(72, 38, 0);
                sellLabel.setLineBreakWithoutSpace(false);
                sellLabel.setAlignment(cc.TEXT_ALIGNMENT_CENTER);
                cartLayout.addChild(sellLabel);
                break;
            case 2:
                var numberLabel = new cc.LabelBMFont("8x", res.FONT_OUTLINE_30);
                numberLabel.x = cartLayout.width / 4;
                numberLabel.y = cartLayout.height / 25 * 22;
                cartLayout.addChild(numberLabel);

                var productImg = new cc.Sprite(res.storage_apple);
                productImg.setScale(0.7);
                productImg.x = cartLayout.width / 2;
                productImg.y = cartLayout.height / 3 * 2;
                cartLayout.addChild(productImg);

                var priceImg = new cc.Sprite(res.price_table);
                priceImg.setScale(0.8);
                priceImg.x = cartLayout.width / 3 * 2;
                priceImg.y = cartLayout.height / 10 * 2;

                var goldImg = new cc.Sprite(res.gold_png);
                goldImg.x = priceImg.getBoundingBox().width / 5 * 4;
                goldImg.y = priceImg.getBoundingBox().height / 5 * 3;
                var priceLabel = new cc.LabelBMFont("320", res.FONT_OUTLINE_30);
                priceLabel.x = priceImg.getBoundingBox().width / 2;
                priceLabel.y = priceImg.getBoundingBox().height / 2;
                priceLabel.rotation = 0;
                priceImg.addChild(goldImg);
                priceImg.addChild(priceLabel);
                cartLayout.addChild(priceImg);
                break;
            case 3:
                break;
        }

        cartLayout.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
        if(idx % 2) {
            cartLayout.setBackGroundColor(cc.color.GREEN);
        } else {
            cartLayout.setBackGroundColor(cc.color.YELLOW);
        }

        cell.addChild(cartLayout);

        return cell;
    },

    numberOfCellsInTableView: function (table) {
        return 7;
    },

    actionShow: function () {
        var scaleX = cc.winSize.width * 0.9 / this.width;
        var scaleY = cc.winSize.height / this.height;
        var scaleUp = cc.scaleTo(0.2, scaleX + 0.1, scaleY + 0.1);
        var scaleDown = cc.scaleTo(0.2, scaleX, scaleY);
        this.runAction(cc.sequence(scaleUp, cc.delayTime(0.05), scaleDown));

        this._title.setScaleY(scaleX / scaleY);
        this._btnClose.setScaleY(scaleX / scaleY);
    }
});