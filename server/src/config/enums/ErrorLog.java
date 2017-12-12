/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package config.enums;

/**
 *
 * @author nguyenvanmanh
 */
public enum ErrorLog {
    SUCCESS((short) 0),
    ERROR_USER_NOT_FOUND((short) 1),

    ERROR_FIELD_STATUS_NOT_EMPTY((short) 10),
    ERROR_FIELD_STATUS_NOT_GROWING((short) 11),
    ERROR_FIELD_STATUS_NOT_DONE((short) 12),

    ERROR_STORAGE_NOT_REDUCE((short) 20),
    ERROR_STORAGE_NOT_ADD((short) 21),

    ERROR_RUBY_NOT_REDUCE((short) 30),
    ERROR_RUBY_NOT_ENOUGH((short) 31),
    ERROR_RUBY_NOT_INCREASE((short) 32),
    ERROR_GOLD_NOT_INCREASE((short) 33),

    ERROR_ORDER_NOT_COMPLETE((short) 40),
    
    ERROR_BUY_FAIL((short) 70),
    ERROR_BUY_MAP_OBJECT_COLLISION((short) 71),
    ERROR_GOLD_NOT_ENOUGH((short) 72),
    ERROR_CANT_ADD_FIELD((short) 73),
    ERROR_GOLD_NOT_REDUCE((short) 74),
    
    ERROR_CANT_ADD_TOOL((short) 82),
    
    ERROR_UPGRADE_FAIL((short)  83),
    
    ERROR_COMPLETED_BUIDING_FAIL((short) 90);
                                    


    private final short value;
    private ErrorLog(short value){
        this.value = value;
    }

    public short getValue(){
        return this.value;
    }
}
