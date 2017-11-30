var CommonPopup = cc.Layer.extend({
    title: null,
    background: null,
    hasCloseButton: false,
    centerpos : null,
    spritebg: null,
    labelTitle: null,
    btnClose: null,

    ctor:function(title, background, hasCloseButton){
        this._super();
        this.title = title;
        this.background = background;
        this.hasCloseButton  = hasCloseButton;
        this.init();
    },

    init:function () {
        var size = cc.director.getVisibleSize();
        //cc.log("visible size " + size.width+" "  + size.height);
        //3. calculate the center point
        this.centerpos = cc.p(size.width / 2, size.height / 2);

       //set background
        this.spritebg = new cc.Sprite(this.background);
        //cc.log("spritebg " + this.spritebg.width + " " + this.spritebg.height);
        //spritebg.setScale(fr.clientConfig.getResourceScale().)
        this.spritebg.setPosition(this.centerpos);
        this.addChild(this.spritebg);

        //set title
        this.labelTitle = new cc.LabelBMFont(this.title, res.FONT_OUTLINE_50);
        this.labelTitle.setPosition(size.width/2, size.height/2 + this.spritebg.height/2-50);
        this.addChild(this.labelTitle);


        if (this.hasCloseButton == true){
            this.btnClose = new ccui.Button(res.TU_CHOI_PNG);
            var btnCloseSize = this.btnClose.getSize();
            cc.log("btnCloseSize " + btnCloseSize.width + "  " + btnCloseSize.height);
            this.btnClose.setPosition(size.width/2 + this.spritebg.width/2 - btnCloseSize.width/2, size.height/2 + this.spritebg.height/2 - btnCloseSize.height/2);
            this.btnClose.addClickEventListener(this.onSelectClose.bind(this));
            this.addChild(this.btnClose);
        }

        //set animation
/*        var action1 = new cc.ScaleTo(0.1, 1.25);
        var action2 = new cc.ScaleTo(0.1, 1.15);
        this.runAction(cc.sequence(action1, cc.delayTime(0.01), action2));*/

        //add test button
        //var commonButton = new CommonButton("Login");
        //commonButton.setPosition(centerpos);
        //this.addChild(commonButton);

    },

    displayEffect: function (height) {
        var scale = (cc.winSize.height - 20) / height;
        var scaleTo1 = cc.scaleTo(0.2, scale + 0.15, scale + 0.15);
        var scaleTo2 = cc.scaleTo(0.15, scale, scale);
        this.runAction(cc.sequence(scaleTo1, scaleTo2));
    },

    onSelectClose:function(sender)
    {
        this.removeFromParent(true);
        MainGuiLayer.instance.isShowPopup = false;
    }
});


var CommonButton =  ccui.Scale9Sprite.extend(
    {
        title: null,
        ctor: function (title) {
            this._super(res.LAYER_24_PNG);
            this.title = title;
            this.init();
        },
        init: function(){
            var height = this.getOriginalSize().height;
            var width = this.getOriginalSize().width;
            cc.log(height + "===========" + width);
            var centerpos = cc.p(width / 2, height / 2);

            var title = cc.LabelBMFont(this.title, res.FONT_OUTLINE_30);
            title.setPosition(centerpos);
            this.addChild(title);
        }

    }
)

