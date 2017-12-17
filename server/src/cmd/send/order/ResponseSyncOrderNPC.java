package cmd.send.order;

import bitzero.server.extensions.data.BaseMsg;

import cmd.CmdDefine;

import java.nio.ByteBuffer;

import model.Order;
import model.OrderNPC;
import model.StorageItem;

public class ResponseSyncOrderNPC extends BaseMsg {
	
    private OrderNPC order;
    private ByteBuffer bf; // Buffer to send
	
    public ResponseSyncOrderNPC(short error, OrderNPC order) {
        super(CmdDefine.RESPONSE_SYNC_ORDER_NPC, error);
        
        this.order = order;
    }
    
    @Override
    public byte[] createData() {
        this.bf = this.makeBuffer();
        
        this.packOrderNPC(this.order);
		
        return packBuffer(this.bf);
    }
    
     /**
      * Put orderNPC
      */
     private void packOrderNPC(OrderNPC order) {
         bf.putInt(order.getOrderId()); // ID
         
         if (order.getOrderItem() == null){
             bf.putInt(0);
         } else {
             bf.putInt(1);
             this.packStorageItem(order.getOrderItem());
         }
         
         bf.putInt(order.getOrderPrice());
         bf.putInt(order.getOrderExp());
         bf.putLong(order.getWaittingTime());
         putStr(bf, order.getNpcResAni());
     }
     
    
    /**
     * Put storage item
     */
    private void packStorageItem(StorageItem item) {
        putStr(this.bf, item.getTypeItem());
        this.bf.putInt(item.getQuantity());
    }
}
