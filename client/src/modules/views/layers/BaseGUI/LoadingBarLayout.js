/**
 * Created by CPU60075_LOCAL on 12/4/2017.
 */

var LoadingBarLayout = ccui.Layout.extend({
   ctor: function (totalTime, startTime, name, ruby) {
       this._super();

       this.totalTime = totalTime;
       this.startTime = startTime;

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

       this.nameProgess = new cc.LabelBMFont("hoa qua", res.FONT_OUTLINE_30);
       this.nameProgess.x = this.progressBar.width / 2;
       this.nameProgess.y = this.progressBar.height / 16 * 11;
       this.nameProgess.setAnchorPoint(0.5, 0);

       this.timeRemain = new cc.LabelBMFont("time Remain", res.FONT_OUTLINE_30);
       this.timeRemain.x = this.progressBar.width / 2;
       this.timeRemain.y = this.progressBar.height / 3;
       this.timeRemain.setAnchorPoint(0.5, 0.7);

       this.boostBtn = new ccui.Button(res.btBoost);
       this.boostBtn.x = this.progressBar.width;
       this.boostBtn.y = this.progressBar.height / 2;
       this.boostBtn.setAnchorPoint(0, 0.5);

       this.rubyNumber = new cc.LabelBMFont(23, res.FONT_OUTLINE_30);
       this.rubyNumber.x = this.boostBtn.width / 25 * 15;
       this.rubyNumber.y = this.boostBtn.height / 2;
       this.boostBtn.addChild(this.rubyNumber);

       this.rubyImg = new cc.Sprite(res.ruby_small);
       this.rubyImg.x = this.boostBtn.width / 25 * 22;
       this.rubyImg.y = this.boostBtn.height / 2;
       this.boostBtn.addChild(this.rubyImg);

       this.setContentSize(this.progressBar.getContentSize().width + this.boostBtn.width,
                            this.progressBar.getContentSize().height);
       this.setPosition(cc.p(cc.winSize.width / 2, cc.winSize.height / 2));
       this.setAnchorPoint(0.5, 0.5);


       this.addChild(this.progressBar);
       this.addChild(this.progress);
       this.addChild(this.nameProgess);
       this.addChild(this.timeRemain);
       this.addChild(this.boostBtn);

       this.setScale(0.8);




       //this.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
       //this.setBackGroundColor(cc.color.BLACK);

       cc.log("total time", this.totalTime);
       cc.log("start time", this.startTime);
       this.remainTime = this.totalTime - (new Date().getTime() - this.startTime);
       cc.log("Remain time", this.remainTime);

       this.scheduleUpdate();

   },

    update: function (dt) {
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
        var hour = 0;
        var min = 0;
        var sec = 0;
        if (time > 3600) {
            var hour = Math.floor(time / 3600);
        }
        var min = Math.floor((time - hour * 3600) / 60);
        var sec = Math.floor(time - hour * 3600 - min * 60);

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
    }
});
