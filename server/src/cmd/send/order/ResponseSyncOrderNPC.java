package cmd.send.order;

import bitzero.server.extensions.data.BaseMsg;

import cmd.CmdDefine;

import java.nio.ByteBuffer;

import model.Order;
import model.StorageItem;

public class ResponseSyncOrderNPC extends BaseMsg {
	
    private Order order;
    private ByteBuffer bf; // Buffer to send
	
    public ResponseSyncOrderNPC(short error, Order order) {
        super(CmdDefine.RESPONSE_SYNC_ORDER_NPC, error);
        
        this.order = order;
    }
    
    @Override
    public byte[] createData() {
        this.bf = this.makeBuffer();
        
        this.packOrder(this.order);
		
        return packBuffer(this.bf);
    }
    
    /**
     * Put order
     */
    private void packOrder(Order order) {
        this.bf.putInt(order.getOrderId()); // ID
        
        if (order.getItemList() == null){
            this.bf.putInt(0);  //size
        } else {
            int typeNumber = order.getItemList().size();
            this.bf.putInt(typeNumber);  //size
            for (int j = 0; j < typeNumber; j++){
                this.packStorageItem(order.getItemList().get(j));
            }
        }
        
        this.bf.putInt(order.getOrderPrice());
        this.bf.putInt(order.getOrderExp());
        this.bf.putLong(order.getWaittingTime());
        
    }
    
    /**
     * Put storage item
     */
    private void packStorageItem(StorageItem item) {
        putStr(this.bf, item.getTypeItem());
        this.bf.putInt(item.getQuantity());
    }
}
