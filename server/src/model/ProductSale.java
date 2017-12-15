package model;

public class ProductSale {
    
    private int slot;
    private StorageItem product;
    private int price;
    private boolean isSold;
    
    public ProductSale(StorageItem product, int price) {
        super();
        
        this.product = product;
        this.price = price;
        this.isSold = false;
    }


    public void setSlot(int slot) {
        this.slot = slot;
    }

    public int getSlot() {
        return slot;
    }

    public void setProduct(StorageItem product) {
        this.product = product;
    }

    public StorageItem getProduct() {
        return product;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    public int getPrice() {
        return price;
    }

    public void setIsSold(boolean isSold) {
        this.isSold = isSold;
    }

    public boolean isIsSold() {
        return isSold;
    }
}
