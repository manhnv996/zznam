/**
 * Created by CPU60135_LOCAL on 12/8/2017.
 */
var MachineProductSprite = ProductSprite.extend({
    ctor:function(_productConfig){
        this._super(_productConfig.res_path);
        this.addDragEventListener();
        this.renderMuiTen();
    },
    addDragEventListener:function(){
        this.dragListener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function (touch, event){
                var target = this;
                var locationInNode = target.convertToNodeSpace(touch.getLocation());
                var s = target.getContentSize();
                var rect = cc.rect(0, 0, s.width, s.height);
                if (cc.rectContainsPoint(rect, locationInNode)){

                    //this._defaultPosition = new cc.p(this.x, this.y);
                    //cc.log(MA_LOG_TAG+ this._defaultPosition.x+"======="+ this._defaultPosition.y);
                    //
                    //target.runAction(new cc.ScaleTo(0.1, 1.5, 1.5));
                    //this.dragListener._isFirstMove = false;
                    //this._muiten.setVisible(false);
                    //return true;

                    this.onClickBegan();

                    return true;
                };

                //target.slot.runAction(new cc.MoveBy(0.1, target.width / 4, target.height / 4));
                return false;
            }.bind(this),
            onTouchMoved: function (touch, event){
                //var delta = touch.getDelta();
                //var target = this;
                ////todo check level before can move product
                //this.x += delta.x;
                //this.y += delta.y;
                ////call controller
                //var mouse = touch.getLocation();

                this.onMoveBegan(touch);

                //todo controller jobs
                //MachineController.instance.onProductMove(productConfig, mouse.x, mouse.y);

            }.bind(this),
            onTouchEnded:function (touch, event){
                var target = this;

                //todo move productSprite back to popup bg

                //var action1 = new cc.moveTo(0.05,0, this._defaultPosition.y);
                //var action2 = new cc.moveTo(0.3,this._defaultPosition.x, this._defaultPosition.y);
                //var seq = new  cc.Sequence(action1, action2);
                //this.runAction(seq);
                //this._muiten.setVisible(true);
                //this.setScale(1);

                this.onEndBegan();

            }.bind(this)
        });
        cc.eventManager.addListener(this.dragListener, this);
    },


    onClickBegan: function () {
        this._defaultPosition = new cc.p(this.x, this.y);
        cc.log(MA_LOG_TAG+ this._defaultPosition.x+"======="+ this._defaultPosition.y);

        target.runAction(new cc.ScaleTo(0.1, 1.5, 1.5));
        this.dragListener._isFirstMove = false;
        this._muiten.setVisible(false);
    },

    onMoveBegan: function (touch) {
        var delta = touch.getDelta();
        //var target = this;
        //todo check level before can move product
        this.x += delta.x;
        this.y += delta.y;
        //call controller
        //var mouse = touch.getLocation();

    },

    onEndBegan: function () {
        var action1 = new cc.moveTo(0.05,0, this._defaultPosition.y);
        var action2 = new cc.moveTo(0.3,this._defaultPosition.x, this._defaultPosition.y);
        var seq = new  cc.Sequence(action1, action2);
        this.runAction(seq);
        this._muiten.setVisible(true);
        this.setScale(1);
    },
    renderMuiTen: function () {
        this._muiten = new cc.Sprite(res.ten);
        this._muiten.setPosition(new cc.p(this.width * 4 / 5, this.height / 5));
        this.addChild(this._muiten);
    }
})