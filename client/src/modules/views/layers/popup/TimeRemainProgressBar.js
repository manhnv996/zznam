
var TimeRemainProgressBar = TablePopup.extend({

    isShowProgressBar: false,

    ctor: function (fieldId) {

        var index = MapLayer.instance.getIndexOfFieldList(fieldId);
        var fieldSelected = user.getAsset().getFieldById(MapLayer.instance.fieldList[index].fieldId);

        this._super(res.progressbar, fieldSelected.getCoordinate().getCurrX(), fieldSelected.getCoordinate().getCurrY(),
            null);


        this._bg.setScale(0.4);
        this.actionShow();

        //
        this.showProgressBarInprogress(fieldId);
    },

    ///
    actionShow: function () {
        var scaleUp = cc.scaleTo(0.15, 0.7);
        var scaleDown = cc.scaleTo(0.1, 0.6);
        this._bg.runAction(cc.sequence(scaleUp, scaleDown));
    },

    updateProgressBarInprogress: function () {
        //
        var fieldId = this.fieldId;
        var field = user.asset.fieldList.find(function(f) {
            return f.fieldId === fieldId;
        });
        var parsePlantTime = field.getPlantedTime().getTime();
        var parseCropTime = field.getCropTime().getTime();
        var currTime = new Date().getTime();

        var duration = parseCropTime - parsePlantTime;
        var curr = currTime - parsePlantTime;

        //
        if (curr > duration){
            this.disableProgressBarInprogress();
            return false;
        }
        this.progress.setPercent(curr / duration * 100);

        //
        var remain = new Date();
        remain.setTime(duration - curr);
        var timeRemainShow = "";
        if (duration - curr > 60 * 60 * 1000){
            timeRemainShow = remain.getHours() + ": " + remain.getMinutes() + ": " + remain.getSeconds();
        } else {
            timeRemainShow = remain.getMinutes() + ": " + remain.getSeconds();
        }
        this.timeRemain.setString(timeRemainShow);

    },

    showProgressBarInprogress: function (fieldId) {
        this.fieldId = fieldId;

        var fieldSelected = user.asset.fieldList.find(function(field) {
            return field.fieldId === fieldId;
        });

//
        this.progress = new ccui.LoadingBar();
        this.progress.loadTexture(res.progress);
        this.progress.setPosition(this._bg.width / 2 + 28, this._bg.height / 2);
        this.progress.setPercent(0);
        this._bg.addChild(this.progress);


        // crop name
        // this.timeRemain = new cc.LabelBMFont(getProductObjByType(fieldSelected.plantType).name, res.FONT_OUTLINE_50);
        this.timeRemain = new cc.LabelBMFont(fr.Localization.text(getProductConfigById(fieldSelected.plantType).name), res.FONT_OUTLINE_50);
        this.timeRemain.setPosition(cc.p(this._bg.width / 2, this._bg.height));
        this._bg.addChild(this.timeRemain);


        // time remain
        this.timeRemain = new cc.LabelBMFont("", res.FONT_OUTLINE_50);
        this.timeRemain.setPosition(cc.p(this._bg.width / 2, 0));
        this._bg.addChild(this.timeRemain);


        // button boost
        var btBoost = new ccui.Button(res.btBoost);
        btBoost.setPosition(cc.p(this._bg.width * 10 / 9, this._bg.height / 2));
        this._bg.addChild(btBoost);

        var rubi = new cc.Sprite(res.rubi);
        rubi.setPosition(cc.p(btBoost.width * 4 / 5, btBoost.height / 2));
        btBoost.addChild(rubi);


        var rubi_buy_seed = new cc.LabelBMFont("1", res.FONT_OUTLINE_30);
        rubi_buy_seed.setPosition(cc.p(btBoost.width / 2, btBoost.height / 2));
        btBoost.addChild(rubi_buy_seed);
        //
        btBoost.addClickEventListener(this.addBoostEvent.bind(this));


        //
        var field = user.asset.fieldList.find(function(f) {
            return f.fieldId === fieldId;
        });
        if (!field || field.getPlantedTime() == null){
            return false;
        }


        this.unschedule(this.updateProgressBarInprogress);
        this.updateProgressBarInprogress();
        this.schedule(this.updateProgressBarInprogress, 0.2);
    },

    disableProgressBarInprogress: function () {
        this.unschedule(this.updateProgressBarInprogress);
        // //
        // TablePopupLayer.instance._layout._isClose = true;
        TablePopupLayer.instance.removeUpdateDisableListener();
    },

    addBoostEvent: function (sender) {
        PlantCtrl.instance.boostPlant(this.fieldId);

    },

    //
    clearEventListeer: function () {
        this.disableProgressBarInprogress();
    },

});
