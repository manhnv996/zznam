/**
 * Created by KienVN on 9/29/2017.
 */

var gv = gv||{};

gv.commonButton = function(w, h, x, y, text){
    if(text === undefined)
        text = "";
    var btn = new ccui.Button(res.base.img_btn_normal, res.base.img_btn_normal, res.base.img_btn_disable);
    if(x === undefined)
        x = 0;
    if(y === undefined)
        y = 0;
    btn.attr({
        x: x,
        y: y
    });

    btn.setTitleText(text);
    btn.setTitleFontSize(32);
    btn.setTitleColor(cc.color(65,65,65,255));
    btn.setZoomScale(0.1);
    btn.setPressedActionEnabled(true);

    btn.setScale9Enabled(true);
    btn.setUnifySizeEnabled(false);
    btn.ignoreContentAdaptWithSize(false);
    var capInsets = cc.rect(15,15, 15, 15);
    btn.setCapInsets(capInsets);
    btn.setContentSize(cc.size(w,h));
    return btn;
};

gv.commonText = function(text, x, y){
        var _lb = new ccui.Text(text,'', 30);
        if(x === undefined)
            x = 0;
        if(y === undefined)
            y = 0;
        _lb.attr({
            x: x,
            y: y
        });
        _lb.setColor(cc.color(220,220,220,255));
        return _lb;
};

gv.commonDialog = function(name, message){
    var CommonDialog =  cc.Layer.extend({
            ctor:function(){
                this._super();
                this.init();
            },
            init:function(){
                var size = cc.director.getVisibleSize();
                cc.log("visible size " + size.width+" "  + size.height);
                //3. calculate the center point
                var centerpos = cc.p(size.width / 2, size.height / 2);


                var spritebg = new cc.Sprite(res.BG_SETTING_PNG);
                cc.log("spritebg " + spritebg.width + " " + spritebg.height);
                //spritebg.setScale(fr.clientConfig.getResourceScale().)
                spritebg.setPosition(centerpos);
                this.addChild(spritebg);

                var labelTitle = new cc.LabelTTF(name, res.domcasua_ttf, 40);
                labelTitle.setPosition(size.width/2, size.height/2 + spritebg.height/2-50);
                this.addChild(labelTitle);

                var labelMessenge = new cc.LabelTTF(message,res.domcasua_ttf, 40);
                labelMessenge.setPosition(centerpos);
                this.addChild(labelMessenge);

                var btnTuChoi = new ccui.Button(res.tuchoi_png);
                var btnTuChoiSize = btnTuChoi.getSize();
                cc.log("btnTuChoiSize " + btnTuChoiSize.width + "  " + btnTuChoiSize.height);
                btnTuChoi.setPosition(size.width/2 + spritebg.width/2 - btnTuChoiSize.width/2, size.height/2 + spritebg.height/2 - btnTuChoiSize.height/2);
                btnTuChoi.addClickEventListener(this.onSelectClose.bind(this));
                this.addChild(btnTuChoi);
            },
            onSelectClose:function(sender)
            {
                this.removeFromParent(true);
            }
        }
    );
    return new CommonDialog();
};
