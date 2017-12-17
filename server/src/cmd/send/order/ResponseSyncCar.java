package cmd.send.order;

import bitzero.server.extensions.data.BaseMsg;

import cmd.CmdDefine;

import java.nio.ByteBuffer;

import model.Car;

public class ResponseSyncCar extends BaseMsg {
        
    private Car car;
    private ByteBuffer bf; // Buffer to send
        
    public ResponseSyncCar(short error, Car car) {
        super(CmdDefine.RESPONSE_SYNC_CAR, error);
        
        this.car = car;
    }
    
    @Override
    public byte[] createData() {
        this.bf = this.makeBuffer();
        
        bf.putInt(car.getDeliveryPrice());
        bf.putInt(car.getDeliveryExp());
        
        return packBuffer(this.bf);
    }
    
}
