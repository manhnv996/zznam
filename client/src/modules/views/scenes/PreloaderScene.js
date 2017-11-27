/**
 * Created by CPU60135_LOCAL on 10/27/2017.
 */
var PreloaderLayer = cc.Layer.extend({
    percent: 0,
    loadingBar: null,
    ctor : function(){
        // call super class's ctor fuction
        this._super();
        var size = cc.director.getVisibleSize();
        cc.log(size.width+" "  + size.height);
        //3. calculate the center point
        var centerpos = cc.p(size.width / 2, size.height / 2);
        var center_bottom_pos = cc.p(size.width / 2, 40);

        // create a background image and set it's position at the center of the screensize

        var spritebg = new cc.Sprite(res.PRELOADER_CHRISTMAS_PNG);
        cc.log(spritebg.width+" "  +spritebg.height);
        spritebg.setScale(size.width/spritebg.width,size.height/spritebg.height);
        //spritebg.setScale(fr.clientConfig.getResourceScale().)
        spritebg.setPosition(centerpos);
        this.addChild(spritebg);




        var loadingBarFrame = new cc.Sprite(res.EXP_111_PNG);
        loadingBarFrame.setPosition(center_bottom_pos);
        this.addChild(loadingBarFrame);

        this.loadingBar = new ccui.LoadingBar();
        this.loadingBar.setName("PreloadingBar");
        this.loadingBar.loadTexture(res.EXP_221_PNG);
        this.loadingBar.setPercent(0);
        this.loadingBar.setPosition(center_bottom_pos);
        this.addChild(this.loadingBar);

        this.scheduleUpdate();
    },
    onEnter:function(){
        this._super();
    },
    onPlay : function(){
        cc.log("==onplay clicked");
        cc.director.runScene(new LoginScene());
    },
    update:function(dt){
        this.percent+=10;
        if (this.percent >=100){
            cc.director.runScene(new LoginScene());
        }
        this.loadingBar.setPercent(this.percent);
    }
});

var PreloaderScene = cc.Scene.extend({
    onEnter: function(){
        this._super();
        var layer = new PreloaderLayer();
        this.addChild(layer);
    }
});

//});

