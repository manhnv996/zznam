/**
 * Created by CPU60075_LOCAL on 12/4/2017.
 */


var LoadingBarLayout = ccui.Layout.extend({
    totalTime : 0,
    startTime: 0,
    _isClose: false,

   ctor: function (totalTime, startTime, name, ruby, remainTime) {
       this._super();

       this.totalTime = totalTime * 1000;
       this.startTime = startTime;
       //this._isClose = false;

       //this.totalTime = 9000 * 1000;
       //this.startTime = new Date().getTime() - 5000 * 1000;

       this.progressBar = new cc.Sprite(res.progressbar);
       this.progressBar.x = 0;
       this.progressBar.y = 0;
       this.progressBar.setAnchorPoint(0, 0);

       this.progress = new ccui.LoadingBar();
       this.progress.loadTexture(res.progress);
       this.progress.x = this.progressBar.width * 0.145;
       this.progress.y = this.progressBar.height / 10 * 3;
       this.progress.setAnchorPoint(0, 0);

       this.nameProgess = new cc.LabelBMFont(name, res.FONT_OUTLINE_30);
       this.nameProgess.x = this.progressBar.width / 2;
       this.nameProgess.y = this.progressBar.height / 16 * 11;
       this.nameProgess.setAnchorPoint(0.5, 0);

       this.timeRemain = new cc.LabelBMFont("", res.FONT_OUTLINE_30);
       this.timeRemain.x = this.progressBar.width / 2;
       this.timeRemain.y = this.progressBar.height / 3;
       this.timeRemain.setAnchorPoint(0.5, 0.7);

       this.boostBtn = new ccui.Button(res.btBoost);
       this.boostBtn.x = this.progressBar.width;
       this.boostBtn.y = this.progressBar.height / 2;
       this.boostBtn.setAnchorPoint(0, 0.5);

       this.rubyNumber = new cc.LabelBMFont(ruby, res.FONT_OUTLINE_30);
       this.rubyNumber.x = this.boostBtn.width / 25 * 15;
       this.rubyNumber.y = this.boostBtn.height / 2;
       this.boostBtn.addChild(this.rubyNumber);

       this.rubyImg = new cc.Sprite(res.ruby_small);
       this.rubyImg.x = this.boostBtn.width / 25 * 22;
       this.rubyImg.y = this.boostBtn.height / 2;
       this.boostBtn.addChild(this.rubyImg);

       this.setContentSize(this.progressBar.getContentSize().width + this.boostBtn.width,
                            this.progressBar.getContentSize().height);
       //this.setPosition(cc.p(cc.winSize.width / 2, cc.winSize.height / 2));
       this.setAnchorPoint(0.5, 0.5);


       this.addChild(this.progressBar);
       this.addChild(this.progress);
       this.addChild(this.nameProgess);
       this.addChild(this.timeRemain);
       this.addChild(this.boostBtn);

       this.setScale(0.4);
       //
       //this.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
       //this.setBackGroundColor(cc.color.BLACK);

       //cc.log("total time", this.totalTime);
       //cc.log("start time", this.startTime);
       // cc.log("Remain time", this.remainTime);
       //this.remainTime = this.totalTime - (new Date().getTime() - this.startTime) + 1000;
       //cc.log("Remain time", this.remainTime);

       this.actionShow();

       if (remainTime) {
           this.remainTime = remainTime;
           //this.progress.setPercent(0);
           //this.setTimeString(this.remainTime);
           this.progress.setPercent((this.totalTime - (this.remainTime * 1000)) / this.totalTime * 100);
           this.schedule(this.updateRemainTime ,0.1);
           cc.log("this.remainTime progress bar", this.remainTime);
       } else {
           this.remainTime = this.totalTime - (new Date().getTime() - this.startTime) + 1000;
           this.scheduleUpdate();
       }
       //this.scheduleUpdate();



       this.disableLoadingBar();
   },

    actionShow: function () {
        var scaleUp = cc.scaleTo(0.2, 0.9);
        var scaleDown = cc.scaleTo(0.15, 0.8);
        this.runAction(cc.sequence(scaleUp, scaleDown));
    },

    disableLoadingBar: function () {
        this.listener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: false,
            onTouchBegan: function (touch, event) {
                //this.closeLoadingBar();
                //var target = event.getCurrentTarget();
                //var target = this;

                //var locationInNode = target.convertToNodeSpace(touch.getLocation());
                //var s = target.getContentSize();
                //var rect = cc.rect(0, 0, s.width, s.height);

                //if (!cc.rectContainsPoint(rect, locationInNode)) {
                    this._isClose = true;
                    //return true;
                //}
                //cc.log("Touch Close Loading Bar ");

                return true;
            }.bind(this)
        });

        cc.eventManager.addListener(this.listener, 4);
    },

    update: function (dt) {
        //cc.log("remainTime " + dt);
        this.remainTime -= dt * 1000;

        //var curTime = new Date().getTime();
        //var cur = curTime - this.startTime;
        //
        //cc.log("curTime " + curTime + " " + cur);

        this.progress.setPercent((this.totalTime - this.remainTime) / this.totalTime * 100);
        //this.progress.setPercent(50);


        //var remain = new Date();
        //remain.setTime(this.totalTime - cur);
        //var timeRemainShow = "";
        var time = this.remainTime / 1000;
        //cc.log("remainTime " + time);

        var hour = 0;
        var min = 0;
        var sec = 0;
        if (time > 3600) {
            hour = Math.floor(time / 3600);
        }
        min = Math.floor((time - hour * 3600) / 60);
        sec = Math.floor(time - hour * 3600 - min * 60);

        this.setTimeString(hour, min, sec);

        if (hour === 0 && min === 0 && sec === 0) {
            this.closeLoadingBar();
        }

        //if (this.remainTime > 60 * 60 * 1000){
        //    var hour = Math.ceil(this.remainTime / 3600000);
        //    var min = Math.ceil((this.remainTime - hour * 3600000) / 60000);
        //    var sec = Math.ceil(this.remainTime - hour * 3600000 - min * 60000);
        //    timeRemainShow = hour + ": " + min + ": " + sec;
        //} else {
        //    var min = Math.ceil((this.remainTime - hour * 3600000) / 60000);
        //    var sec = Math.ceil(this.remainTime - hour * 3600000 - min * 60000);
        //    timeRemainShow = min + ": " + sec;
        //}

        //
        if(this._isClose) {
            this.closeLoadingBar();
        }
    },

    updateRemainTime: function (dt) {
        this.remainTime -= dt;

        //cc.log("((this.totalTime - this.remainTime) / this.totalTime * 100)",
        //    ((this.totalTime - (this.remainTime * 1000)) / this.totalTime * 100));
        this.progress.setPercent((this.totalTime - (this.remainTime * 1000)) / this.totalTime * 100);

        var hour = 0;
        var min = 0;
        var sec = 0;
        if (this.remainTime > 3600) {
            hour = Math.floor(this.remainTime / 3600);
        }
        min = Math.floor((this.remainTime - hour * 3600) / 60);
        sec = Math.floor(this.remainTime - hour * 3600 - min * 60);

        this.setTimeString(hour, min, sec);

        //this.setTimeString(this.remainTime);

        if ((hour === 0 && min === 0 && sec === 0) || this._isClose) {
            this.closeProgressBar();
        }
        //
        //if(this._isClose) {
        //    this.closeProgressBar();
        //}
    },

    setTimeString: function (hour, min, sec) {

        if (hour && min) {
            this.timeRemain.setString(hour + fr.Localization.text("Text_time_hour")
                + min + fr.Localization.text("Text_time_minute")
                + sec + fr.Localization.text("Text_time_second"));
        } else if (min) {
            this.timeRemain.setString(min + fr.Localization.text("Text_time_minute")
                + sec + fr.Localization.text("Text_time_second"));
        } else {
            this.timeRemain.setString(sec + fr.Localization.text("Text_time_second"));
        }
    },

    closeProgressBar: function (){
        this.unschedule(this.updateRemainTime);
        if (this.parent) {
            this.removeFromParent(true);
            // cc.log("removeFromParent");
        }
        this._isClose = false;
        //_loadingBarConstructed.removeFromParent(true);
        _loadingBarConstructed = null;
        cc.eventManager.removeListener(this.listener);
    },

    closeLoadingBar: function () {
        this.unscheduleUpdate();
        if (this.parent) {
            this.removeFromParent(true);
            // cc.log("removeFromParent");
        }
        this._isClose = false;
        //_loadingBarConstructed.removeFromParent(true);
        _loadingBarConstructed = null;
        cc.eventManager.removeListener(this.listener);
    }
});
