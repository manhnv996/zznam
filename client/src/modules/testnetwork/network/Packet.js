/**
 * Created by KienVN on 10/2/2017.
 */

gv.CMD = gv.CMD ||{};
gv.CMD.HAND_SHAKE = 0;
gv.CMD.USER_LOGIN = 1;

gv.CMD.USER_INFO = 1001;
gv.CMD.MOVE = 2001;


//
gv.CMD.PLANT = 5001;
gv.CMD.CROP = 5002;
gv.CMD.PLANT_BOOST = 5003;
gv.CMD.BUY_ITEM_BY_RUBI = 5004;

gv.CMD.RECEIVE_FIELD_STATUS = 5011;




testnetwork = testnetwork||{};
testnetwork.packetMap = {};

/** Outpacket */

//Handshake
CmdSendHandshake = fr.OutPacket.extend(
    {
        ctor:function()
        {
            this._super();
            this.initData(100);
            this.setControllerId(gv.CONTROLLER_ID.SPECIAL_CONTROLLER);
            this.setCmdId(gv.CMD.HAND_SHAKE);
        },
        putData:function(){
            //pack
            this.packHeader();
            //update
            this.updateSize();
        }
    }
);
CmdSendUserInfo = fr.OutPacket.extend(
    {
        ctor:function()
        {
            this._super();
            this.initData(100);
            this.setCmdId(gv.CMD.USER_INFO);
        },
        pack:function(){
            this.packHeader();
            this.updateSize();
        }
    }
);

CmdSendLogin = fr.OutPacket.extend(
    {
        ctor:function()
        {
            this._super();
            this.initData(100);
            this.setCmdId(gv.CMD.USER_LOGIN);
        },
        pack:function(user){
            this.packHeader();
            this.putString(user);
            this.updateSize();
        }
    }
);

CmdSendMove = fr.OutPacket.extend(
    {
        ctor:function()
        {
            this._super();
            this.initData(100);
            this.setCmdId(gv.CMD.MOVE);
        },
        pack:function(direction){
            this.packHeader();
            this.putShort(direction);
            this.updateSize();
        }
    }
);


//
CmdSendPlant = fr.OutPacket.extend(
    {
        ctor:function()
        {
            this._super();
            this.initData(100);
            this.setCmdId(gv.CMD.PLANT);
        },
        pack:function(fieldId, productType){
            this.packHeader();

            this.putShort(fieldId);
            this.putString(productType);

            this.updateSize();
        }
    }
);

CmdSendCrop = fr.OutPacket.extend(
    {
        ctor:function()
        {
            this._super();
            this.initData(100);
            this.setCmdId(gv.CMD.CROP);
        },
        pack:function(fieldId){
            this.packHeader();

            this.putShort(fieldId);
            // this.putString(productType);

            this.updateSize();
        }
    }
);

CmdSendPlantBoost = fr.OutPacket.extend(
    {
        ctor:function()
        {
            this._super();
            this.initData(100);
            this.setCmdId(gv.CMD.PLANT_BOOST);
        },
        pack:function(fieldId){
            this.packHeader();

            this.putShort(fieldId);
            // this.putString(productType);

            this.updateSize();
        }
    }
);

CmdSendBuyItemByRubi = fr.OutPacket.extend(
    {
        ctor:function()
        {
            this._super();
            this.initData(100);
            this.setCmdId(gv.CMD.BUY_ITEM_BY_RUBI);
        },
        pack:function(productType){
            this.packHeader();

            this.putString(productType);

            this.updateSize();
        }
    }
);



/**
 * InPacket
 */

//Handshake
testnetwork.packetMap[gv.CMD.HAND_SHAKE] = fr.InPacket.extend(
    {
        ctor:function()
        {
            this._super();
        },
        readData:function(){
            this.token = this.getString();
        }
    }
);

testnetwork.packetMap[gv.CMD.USER_LOGIN] = fr.InPacket.extend(
    {
        ctor:function()
        {
            this._super();
        },
        readData:function(){
        }
    }
);


testnetwork.packetMap[gv.CMD.USER_INFO] = fr.InPacket.extend(
    {
        ctor:function()
        {
            this._super();
        },
        readData:function(){
            this.token = this.getInt();
            this.name = this.getString();
            this.x = this.getInt();
            this.y = this.getInt();
        }
    }
);

testnetwork.packetMap[gv.CMD.MOVE] = fr.InPacket.extend(
    {
        ctor:function()
        {
            this._super();
        },
        readData:function(){
            this.x = this.getInt();
            this.y = this.getInt();
        }
    }
);


//
testnetwork.packetMap[gv.CMD.PLANT] = fr.InPacket.extend(
    {
        ctor:function()
        {
            this._super();
        },
        readData:function(){

            /*
             CLOSED, not used
             */
            // this.errorLog = this.getShort();
        }
    }
);

testnetwork.packetMap[gv.CMD.CROP] = fr.InPacket.extend(
    {
        ctor:function()
        {
            this._super();
        },
        readData:function(){

            /*
             CLOSED, not used
             */
            // this.errorLog = this.getShort();
        }
    }
);

testnetwork.packetMap[gv.CMD.PLANT_BOOST] = fr.InPacket.extend(
    {
        ctor:function()
        {
            this._super();
        },
        readData:function(){

            /*
             CLOSED, not used
             */
            // this.errorLog = this.getShort();
        }
    }
);

testnetwork.packetMap[gv.CMD.RECEIVE_FIELD_STATUS] = fr.InPacket.extend(
    {
        ctor:function()
        {
            this._super();
        },
        readData:function(){

            /*
             DONE
             */
            this.errorLog = this.getShort();

            if (this.errorLog != 0){    //not success

                this.fieldId = this.getInt();
                this.plantType = this.getString();
                this.plantedTime = this.getLong();
            }
        }
    }
);

testnetwork.packetMap[gv.CMD.BUY_ITEM_BY_RUBI] = fr.InPacket.extend(
    {
        ctor:function()
        {
            this._super();
        },
        readData:function(){

            /*
             DONE
             */
            this.errorLog = this.getShort();
            this.productType = this.getString();

        }
    }
);


