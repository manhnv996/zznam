package cmd.send.order;

import bitzero.server.extensions.data.BaseMsg;

import cmd.CmdDefine;

import java.nio.ByteBuffer;

import model.Order;
import model.StorageItem;

public class ResponseSyncOrder extends BaseMsg {
	
    private Order order;
    private ByteBuffer bf; // Buffer to send
	
    public ResponseSyncOrder(short error, Order order) {
        super(CmdDefine.RESPONSE_SYNC_ORDER, error);
        
        this.order = order;
    }
    
    @Override
    public byte[] createData() {
        this.bf = this.makeBuffer();
        
        this.packOrder(this.order);
		
        return packBuffer(bf);
    }
    
    /**
     * Put order
     */
    private void packOrder(Order order) {
        bf.putInt(order.getOrderId()); // ID
        
        if (order.getItemList() == null){
            bf.putInt(0);  //size
        } else {
            int typeNumber = order.getItemList().size();
            bf.putInt(typeNumber);  //size
            for (int j = 0; j < typeNumber; j++){
                this.packStorageItem(order.getItemList().get(j));
            }
        }
        
        bf.putInt(order.getOrderPrice());
        bf.putInt(order.getOrderExp());
        bf.putLong(order.getWaittingTime());
        
    }
    
    /**
     * Put storage item
     */
    private void packStorageItem(StorageItem item) {
        putStr(bf, item.getTypeItem());
        bf.putInt(item.getQuantity());
    }
}
