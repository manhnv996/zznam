package config.enums;

public enum DeliveryStatus {
    EMPTY((short) 0),
    DELIVERY((short) 1),
    RECEIVABLE((short) 2);
    


    private final short value;
    private DeliveryStatus(short value){
        this.value = value;
    }

    public short getValue(){
        return this.value;
    }
}
