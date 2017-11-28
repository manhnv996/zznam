/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package config.utils;


/**
 *
 * @author nguyenvanmanh
 */
public class OrderUtil {
    
    public static int randomTypeNumber(int level){
        
        int random = (int) Math.floor(Math.random() * 2) + 1;
        
        return random;
    }
    
}
