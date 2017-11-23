package cmd.send.demo;

import bitzero.server.extensions.data.BaseMsg;

import cmd.CmdDefine;

import config.utils.ProductUtil;

import java.nio.ByteBuffer;

import model.ZPUserInfo;

public class ResponseRequestUserInfo extends BaseMsg {
    
    public ZPUserInfo gameInfo;
    
    public ResponseRequestUserInfo(ZPUserInfo gameInfo) {
        super(CmdDefine.GET_USER_INFO);
        this.gameInfo = gameInfo;
    }
    
    @Override
    public byte[] createData() {
        ByteBuffer bf = makeBuffer();
//        bf.putInt(info.id);     
        
        //put jsonstring
//        String gameInfoJson = ProductUtil.convertGameInfoToJsonString(gameInfo);
//        System.out.println("gameInfo" + gameInfoJson);
//        putStr(bf, gameInfoJson);
        
        return packBuffer(bf);
    }
}
