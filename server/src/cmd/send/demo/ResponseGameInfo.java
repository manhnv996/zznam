package cmd.send.demo;

import bitzero.server.extensions.data.BaseMsg;

import cmd.CmdDefine;

import config.utils.ProductUtil;

import java.nio.ByteBuffer;

import model.ZPUserInfo;

public class ResponseGameInfo extends BaseMsg {
    
    public ZPUserInfo gameInfo;
    
    public ResponseGameInfo(ZPUserInfo gameInfo) {
        super(CmdDefine.GAME_INFO);
        this.gameInfo = gameInfo;
    }
    
    @Override
    public byte[] createData() {
        //put jsonstring
        String gameInfoJson = ProductUtil.convertGameInfoToJsonString(gameInfo);
//        System.out.println("gameInfo" + gameInfoJson);
        ByteBuffer bf = ByteBuffer.allocate(gameInfoJson.length() + 3);
        bf.put(Byte.valueOf((byte)0).byteValue());
//        System.out.println("Length " + gameInfoJson.length());
        putStr(bf, gameInfoJson);
        
        return packBuffer(bf);
    }
}
