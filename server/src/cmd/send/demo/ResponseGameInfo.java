package cmd.send.demo;

import bitzero.server.extensions.data.BaseMsg;

import cmd.CmdDefine;

import config.utils.ProductUtil;

import java.nio.ByteBuffer;

import java.util.ArrayList;
import java.util.List;

import model.ZPUserInfo;

public class ResponseGameInfo extends BaseMsg {
    
    public ZPUserInfo gameInfo;
    
    public ResponseGameInfo(ZPUserInfo gameInfo) {
        super(CmdDefine.GAME_INFO);
        this.gameInfo = gameInfo;
    }
    
    @Override
    public byte[] createData() {
        ByteBuffer bf = makeBuffer();
        
        //put jsonstring
        String gameInfoJson = ProductUtil.convertGameInfoToJsonString(gameInfo);
        System.out.println("gameInfo" + gameInfoJson);
        putStr(bf, gameInfoJson);
        
        return packBuffer(bf);
    }
}
