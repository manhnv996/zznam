package cmd.send.myshop;

import bitzero.server.extensions.data.BaseMsg;

import cmd.CmdDefine;

import java.nio.ByteBuffer;

import model.ProductSale;
import model.StorageItem;

public class ResponseSyncProductSale extends BaseMsg {
	
    private ProductSale product;
    private ByteBuffer bf; // Buffer to send
	
    public ResponseSyncProductSale(short error, ProductSale product) {
        super(CmdDefine.RESPONSE_SYNC_PRODUCT_SALE, error);
        
        this.product = product;
    }
    
    @Override
    public byte[] createData() {
        this.bf = this.makeBuffer();
        
        this.packProductSale(this.product);
		
        return packBuffer(this.bf);
    }
    
    
    
    private void packProductSale(ProductSale product){
        bf.putInt(product.getSlot());
        if (product.getProduct() == null){
            bf.putInt(0);
        } else {
            bf.putInt(1);
            this.packStorageItem(product.getProduct());
        }
        bf.putInt(product.getPrice());
        putBoolean(bf, product.isIsSold());
    }
    
    private void packStorageItem(StorageItem item) {
        putStr(this.bf, item.getTypeItem());
        this.bf.putInt(item.getQuantity());
    }
}
