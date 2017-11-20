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

    ERROR_RUBY_NOT_REDUCE((short) 30);


    private final short value;
    private ErrorLog(short value){
        this.value = value;
    }

    public short getValue(){
        return this.value;
    }
}
