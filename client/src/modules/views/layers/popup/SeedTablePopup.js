
var SeedTablePopup = TablePopup.extend({

    popupItemList: [],
    fieldList: [],

    ctor: function (fieldId, seedList) {
        
        var index = MapLayer.instance.getIndexOfFieldList(fieldId);

        var fieldSelected = user.getAsset().getFieldById(MapLayer.instance.fieldList[index].fieldId);

        this._super(res.popup5, fieldSelected.getCoordinate().getCurrX(), fieldSelected.getCoordinate().getCurrY(),
            MapLayer.instance.fieldList[index]);

        //
        this.pageCurr = LastPageUtil.instance.lastIndexOfPageSeedTableClick;
        //
        this.showSeedPopup(fieldId, seedList);
    },


    ////
    showSeedPopup: function(fieldId, seedList){

        this.popupItemList = [];
        //
        if (seedList != null){
            //
            for (var i = 0; i < seedList.length; i++){
                var seed_type = seedList[i].getTypeItem();
                var seed_img = getSeedImgBySeedTypeAndQuantity(seed_type, seedList[i].getQuantityItem());

                var seed = new SeedSprite(this, seed_img, seed_type);
                seed.quantity = seedList[i].getQuantityItem();

                //
                seed.addQuantityInfo();
                this.popupItemList.push(seed);
            }

            for (var i = this.popupItemList.length - 1; i >= 0; i--){
                this.addChild(this.popupItemList[i]);
            }

            var pageNumber = Math.ceil(this.popupItemList.length / 5);
            if (pageNumber > 1){
                this.btTurnPage = new ccui.Button(res.btTurnPage);
                this.btTurnPage.setPosition(cc.p(this._bg.x - this._bg.width / 2,
                    this._bg.y - this._bg.height / 2));
                this.addChild(this.btTurnPage);
                //
                this.btTurnPage.addClickEventListener(this.turnPageEvent.bind(this));

                this.pageListNumber = [];
                for (var i = 0; i < pageNumber; i++){
                    var page;
                    if (i == this.pageCurr){
                        page = new cc.Sprite(res.pageSelected);
                    } else {
                        page = new cc.Sprite(res.page);
                    }
                    page.setPosition(this.btTurnPage.width + page.width * 4 / 3 * (i + 1), this.btTurnPage.height * 3 / 4);
                    this.btTurnPage.addChild(page);

                    this.pageListNumber.push(page);
                }
            }

            this.setSeedListPosition(this.pageCurr, seedList);
        }
    },

    //
    disableItemOfPopupByListIndex: function (pageIndex, seedShowNumber) {
        for (var i = 0; i < this.popupItemList.length; i++){
            if (i >= (5 * pageIndex) && i < (5 * pageIndex + seedShowNumber)) {
                this.popupItemList[i].setVisible(true);
                this.popupItemList[i].resume();

            } else {
                this.popupItemList[i].setVisible(false);
                this.popupItemList[i].pause();
            }

        }
    },

    setSeedListPosition: function (pageIndex, seedList) {
        var pageNumber = Math.ceil(this.popupItemList.length / 5);
        var seedShowNumber = 5;
        if (pageNumber > 1) {
            if (pageIndex < pageNumber - 1){
                seedShowNumber = 5;
            } else {
                seedShowNumber = seedList.length - (pageNumber - 1) * 5;
            }
        } else {
            seedShowNumber = seedList.length;
        }

        this.disableItemOfPopupByListIndex(pageIndex, seedShowNumber);

        //setPosition
        switch (seedShowNumber % 5){
            case 1:
                this.popupItemList[5 * pageIndex + 0].setPosition(cc.p(this._bg.x, this._bg.y));
                //
                break;
            case 2:
                this.popupItemList[5 * pageIndex + 1].setPosition(cc.p(this._bg.x, this._bg.y));
                this.popupItemList[5 * pageIndex + 0].setPosition(cc.p(this._bg.x, this._bg.y));
                //
                this.popupItemList[5 * pageIndex + 1].runAction(new cc.moveBy(0.1, - (this.popupItemList[0].width / 2), - (this.popupItemList[5 * pageIndex + 1].height / 4)));
                this.popupItemList[5 * pageIndex + 0].runAction(new cc.moveBy(0.1, (this.popupItemList[1].height / 2), (this.popupItemList[5 * pageIndex + 0].height / 4)));
                break;
            case 3:
                this.popupItemList[5 * pageIndex + 2].setPosition(cc.p(this._bg.x, this._bg.y));
                this.popupItemList[5 * pageIndex + 1].setPosition(cc.p(this._bg.x, this._bg.y));
                this.popupItemList[5 * pageIndex + 0].setPosition(cc.p(this._bg.x, this._bg.y));
                //
                this.popupItemList[5 * pageIndex + 2].runAction(new cc.moveBy(0.1, - (this.popupItemList[5 * pageIndex + 2].width), - (this.popupItemList[5 * pageIndex + 2].height / 4)));
                // this.popupItemList[5 * pageIndex + 1].runAction(new cc.moveBy(0.1, 0, 0));
                this.popupItemList[5 * pageIndex + 0].runAction(new cc.moveBy(0.1, (this.popupItemList[5 * pageIndex + 0].width), (this.popupItemList[5 * pageIndex + 2].height / 4)));

                break;
            case 4:
                this.popupItemList[5 * pageIndex + 3].setPosition(cc.p(this._bg.x, this._bg.y));
                this.popupItemList[5 * pageIndex + 2].setPosition(cc.p(this._bg.x, this._bg.y));
                this.popupItemList[5 * pageIndex + 1].setPosition(cc.p(this._bg.x, this._bg.y));
                this.popupItemList[5 * pageIndex + 0].setPosition(cc.p(this._bg.x, this._bg.y));
                //
                this.popupItemList[5 * pageIndex + 3].runAction(new cc.moveBy(0.1, - (this.popupItemList[5 * pageIndex + 3].width), 0));
                this.popupItemList[5 * pageIndex + 2].runAction(new cc.moveBy(0.1, 0, (this.popupItemList[5 * pageIndex + 2].height / 4)));
                this.popupItemList[5 * pageIndex + 1].runAction(new cc.moveBy(0.1, (this.popupItemList[5 * pageIndex + 1].width), (this.popupItemList[5 * pageIndex + 1].height / 2)));

                this.popupItemList[5 * pageIndex + 0].runAction(new cc.moveBy(0.1, (this.popupItemList[5 * pageIndex + 0].width * 2 / 4), - (this.popupItemList[5 * pageIndex + 0].height / 2)));

                break;
            case 0:
                this.popupItemList[5 * pageIndex + 4].setPosition(cc.p(this._bg.x, this._bg.y));
                this.popupItemList[5 * pageIndex + 3].setPosition(cc.p(this._bg.x, this._bg.y));
                this.popupItemList[5 * pageIndex + 2].setPosition(cc.p(this._bg.x, this._bg.y));
                this.popupItemList[5 * pageIndex + 1].setPosition(cc.p(this._bg.x, this._bg.y));
                this.popupItemList[5 * pageIndex + 0].setPosition(cc.p(this._bg.x, this._bg.y));
                //
                this.popupItemList[5 * pageIndex + 4].runAction(new cc.moveBy(0.1, - (this.popupItemList[5 * pageIndex + 4].width * 5 / 4), (this.popupItemList[5 * pageIndex + 4].width / 4)));
                this.popupItemList[5 * pageIndex + 3].runAction(new cc.moveBy(0.1, - (this.popupItemList[5 * pageIndex + 3].width / 4), (this.popupItemList[5 * pageIndex + 3].height / 2)));
                this.popupItemList[5 * pageIndex + 2].runAction(new cc.moveBy(0.1, (this.popupItemList[5 * pageIndex + 2].width * 3 / 4), (this.popupItemList[5 * pageIndex + 2].height * 3 / 4)));

                this.popupItemList[5 * pageIndex + 1].runAction(new cc.moveBy(0.1, - (this.popupItemList[5 * pageIndex + 1].width / 4), - (this.popupItemList[5 * pageIndex + 1].height / 2)));
                this.popupItemList[5 * pageIndex + 0].runAction(new cc.moveBy(0.1, (this.popupItemList[5 * pageIndex + 0].width * 3 / 4), - (this.popupItemList[5 * pageIndex + 0].height / 4)));

                break;
        }
    },

    turnPageEvent: function () {
        audioEngine.playEffect(res.func_click_button_mp3, false);
        this.pageListNumber[this.pageCurr].setTexture(res.page);

        this.pageCurr = (this.pageCurr + 1) % (Math.ceil(this.popupItemList.length / 5));
        LastPageUtil.instance.lastIndexOfPageSeedTableClick = this.pageCurr;
        this.setSeedListPosition(this.pageCurr, this.popupItemList);

        this.pageListNumber[this.pageCurr].setTexture(res.pageSelected);
    },

    disablePopup: function(seedId){
        this.disablePopupBackground();
        this.disableItemOfPopup(seedId);
    },

    //
    disablePopupBackground: function () {
        if (this._bg != null) {
            this._bg.setVisible(false);
        }
        if (this.btTurnPage != null){
            this.btTurnPage.setVisible(false);
            this.btTurnPage.removeFromParent(true);
            this.btTurnPage = null;
        }
    },
    //
    disableItemOfPopup: function(seedId){
        var index = this.getIndexSeedOfPopupItemList(seedId);
        if (index == null){
            for (var i = 0; i < this.popupItemList.length; i++){
                if (this.popupItemList[i] != null){
                    if (this.popupItemList[i].isVisible()){
                        this.popupItemList[i].setVisible(false);
                        // this.popupItemList[i].pause();
                        this.popupItemList[i].removeFromParent(true);
                        this.popupItemList[i].clearListener();
                    }
                }
            }
            this.popupItemList = [];
        } else {
            for (var i = 0; i < this.popupItemList.length; i++){
                if (index != i){
                    if (this.popupItemList[i] != null){
                        if (this.popupItemList[i].isVisible()){
                            this.popupItemList[i].setVisible(false);
                            // this.popupItemList[i].pause();
                            this.popupItemList[i].removeFromParent(true);
                            this.popupItemList[i].clearListener();
                        }
                    }
                }
            }
            this.popupItemList = [];

        }

    },
    getIndexSeedOfPopupItemList: function (seedId) {
        if (seedId == null){    //

            return null;
        }
        for (var i = 0; i < this.popupItemList.length; i++){    //seed list
            if (this.popupItemList[i].seedType == seedId){
                return i;
            }
        }
        return null;
    },



});