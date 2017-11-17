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
        if(!sprite){
            var shader = new cc.GLProgram(Filter.DEFAULT_VERTEX_SHADER, Filter.GRAY_SCALE_FRAGMENT_SHADER);
            shader.retain();
            //program.addAttribute(Filter.DEFAULT_VERTEX_SHADER, Filter.GRAY_SCALE_FRAGMENT_SHADER);
            shader.addAttribute(cc.ATTRIBUTE_NAME_POSITION, cc.VERTEX_ATTRIB_POSITION);
            shader.addAttribute(cc.ATTRIBUTE_NAME_TEX_COORD, cc.VERTEX_ATTRIB_TEX_COORDS);
            shader.addAttribute(cc.ATTRIBUTE_NAME_COLOR, cc.VERTEX_ATTRIB_COLOR);
            shader.link();
            shader.updateUniforms();
            shader.use();

            sprite.setShaderProgram(shader);
        }
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
        var infoItem = res.infoCoopItem;
        for(var i = 0; i < infoItem.length; i++){
            this._item = this.addSlot(infoItem[i].title, infoItem[i].detail, 1, 1, infoItem[i].price, infoItem[i].nameIconShop);
            this._listView.pushBackCustomItem(this._item);
        }
    },

    touchEvent: function (sender, type) {
        switch (type) {
            case ccui.Widget.TOUCH_BEGAN:
                sender.runAction(cc.scaleTo(0.1, this._scaleBtn - 0.1, this._scaleBtn - 0.1));
                break;
            case ccui.Widget.TOUCH_ENDED:
                var infoItem = null;
                this.setNormalButton();
                this._listView.removeAllChildren();
                switch (sender.name) {
                    case "Lodge":
                        infoItem = res.infoCoopItem;
                        sender.loadTextureNormal(res.shop_btLodge_s_png);
                        break;
                    case "Animal":
                        infoItem = res.infoAnimalItem;
                        sender.loadTextureNormal(res.shop_btAnimal_s_png);
                        break;
                    case "Machine":
                        infoItem = res.infoMachineItem;
                        sender.loadTextureNormal(res.shop_btMachine_s_png);
                        break;
                    case "Tree":
                        infoItem = res.infoMachineItem;
                        sender.loadTextureNormal(res.shop_btTree_s_png);
                        break;
                }
                for(var i = 0; i < infoItem.length; i++){
                    this._item = this.addSlot(infoItem[i].title, infoItem[i].detail, 1, 1, infoItem[i].price, infoItem[i].nameIconShop);
                    this._listView.pushBackCustomItem(this._item);
                }
                this.scaleSequenceBtn(sender);
                break;
        }
    },

    scaleSequenceBtn: function (btn) {
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
        //Filter.grayScale(imgBtn);
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
    }
});
