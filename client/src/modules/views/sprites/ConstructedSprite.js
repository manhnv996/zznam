/**
 * Created by CPU60075_LOCAL on 03/12/2017.
 */

var ConstructedSprite = AnimationSprite.extend({
    typeBuilding: null,
    id: null,

    ctor: function (id, w, h, x, y, typeBuilding) {
        var aniId;
        var nameAni;
        if (w === 2 && h === 2){
            aniId = resAniId.Nhadangxay2x2;
            nameAni = "2";
        } else if (w === 3 && h === 3) {
            aniId = resAniId.Nhadangxay3x3;
            nameAni = "3";
        } else {
            aniId = resAniId.Nhdangxay4x4;
            nameAni = "4";
        }
        this._super(aniId, w, h, x, y ,typeBuilding);


        this.id = id;
        this.typeBuilding = typeBuilding;
        this.buildExpress = ConstructedCtrl.instance.getBuildExpress(id);
        this.play(nameAni);

        this.registerTouchEvents();

        this.schedule(this.updateTime, 1);
    },

    onBeginClick: function () {
    },

    onClick: function () {
        //cc.log("Click nha dang xay " + this.id);
        SoundCtrl.instance.playSoundEffect(res.func_click_button_mp3, false);
        this.selectConstructedObject();
    },

    selectConstructedObject: function() {
        this.machine = user.asset.getMachineById(this.id);
        this.machineConfig = getMachineConfigByType(this.machine.machineType);

        var py = this.machine.coordinate.y;
        var px = this.machine.coordinate.x;
        var p = MapValues.logicToScreenPosition(px, py);
        //this.progressBar.setPosition(p.x, p.y);

        this.progressBar = new LoadingBarLayout(p.x, p.y, this.machineConfig.time,
            this.machine.startBuildTime,
            this.machineConfig.name,
            this.buildExpress.toString(),
            this.machine.remainBuildTime, true);

        BaseGUILayer.instance.addChild(this.progressBar);

        this.progressBar.setOnClick(function () {
            ConstructedCtrl.instance.boostBuild(this);
            this.progressBar.closeLoadingBar();
            this.progressBar = null;
        }.bind(this));
    },

    _offset: function() {
        var p = MapValues.logicToPosition(- this.blockSizeX, 0);
        if (this.blockSizeX === 2) {
            p.y += 53;
        } else if (this.blockSizeX === 3) {
            p.y += 20;
        } else {
            p.y -= 15;
        }
        return p;
    },

    updateTime: function (dt) {
        //if (ConstructedCtrl.instance.checkBuildTime(this, dt)) {
            //this.progressBar = null;
        //    this.removeFromParent(true);
        //}
        ConstructedCtrl.instance.checkBuildTime(this, dt);
    },

    onFinishMove: function (lx, ly) {
        user.asset.getMachineById(this.id).coordinate.x = lx;
        user.asset.getMachineById(this.id).coordinate.y = ly;
        testnetwork.connector.sendMoveMapBlock(MapItemEnum.MACHINE, this.id, lx, ly);
    }
});
