var CommonPopup = cc.Layer.extend({
    title: null,
    background: null,
    hasCloseButton: false,
    centerpos : null,
    ctor:function(title, background, hasCloseButton){
        this._super();
        this.title = title;
        this.background = background;
        this.hasCloseButton  = hasCloseButton;
        this.init();
    },
    init:function () {


        var size = cc.director.getVisibleSize();
        cc.log("visible size " + size.width+" "  + size.height);
        //3. calculate the center point
        this.centerpos = cc.p(size.width / 2, size.height / 2);



       ////set background
       // var spritebg = new cc.Sprite(this.background);
       // cc.log("spritebg " + spritebg.width + " " + spritebg.height);
       // //spritebg.setScale(fr.clientConfig.getResourceScale().)
       // spritebg.setPosition(this.centerpos);
       // this.addChild(spritebg);

        this.background.setPosition(this.centerpos);
        this.addChild(this.background);


        //set title
        var labelTitle = new cc.LabelBMFont(this.title, res.FONT_OUTLINE_30);
        //labelTitle.setPosition(size.width/2, size.height/2 + spritebg.height/2-50);
        //this.addChild(labelTitle);
        labelTitle.setPosition(this.background.width / 2, this.background.height - labelTitle.height * 4 / 3);
        this.background.addChild(labelTitle);


        if (this.hasCloseButton == true){
            var btnClose = new ccui.Button(res.TU_CHOI_PNG);
            var btnCloseSize = btnClose.getSize();
            cc.log("btnCloseSize " + btnCloseSize.width + "  " + btnCloseSize.height);
            //btnClose.setPosition(size.width/2 + spritebg.width/2 - btnCloseSize.width/2, size.height/2 + spritebg.height/2 - btnCloseSize.height/2);
            btnClose.setPosition(this.background.width - btnCloseSize.width / 2, this.background.height - btnCloseSize.height / 2);
            btnClose.addClickEventListener(this.onSelectClose.bind(this));
            //this.addChild(btnClose);
            this.background.addChild(btnClose);
        }

        //set animation
        var action1 = new cc.ScaleTo(0.13, 1.4);
        var action2 = new cc.ScaleTo(0.1, 1.25);
        this.runAction(cc.sequence(action1, cc.delayTime(0.01), action2));

        //add test button
        //var commonButton = new CommonButton("Login");
        //commonButton.setPosition(centerpos);
        //this.addChild(commonButton);

        // this.isShowBG = false;
    },
    onSelectClose:function(sender)
    {
        // if (this.isShowBG){
            this.removeFromParent(true);
            MainGuiLayer.instance.isShowPopup = false;
            // this.isShowBG = false;
        // }

    },
    showBG: function () {
        // this.onSelectClose();
        // // this.init();
        // // MainGuiLayer.instance.addChild(this);
        // this.isShowBG = true;
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

