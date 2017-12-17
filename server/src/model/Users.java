package model;

import java.util.ArrayList;
import java.util.List;

import util.database.DataModel;

public class Users extends DataModel {
    public List<Integer> userIdList;
    
    public Users() {
        super();
        this.userIdList = new ArrayList<>();
    }
    
    public void save() {
        try {
            this.saveModel(0);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
    
    public static Users getUsers() {
        try {
            return (Users)Users.getModel(0, Users.class);
        } catch (Exception e) {
            e.printStackTrace();    
        }
        return null;
    }
    
    public void findAndAdd(int id) {
        for (int i = 0; i < userIdList.size(); i++) {
            if (userIdList.get(i) == id) {
                return;
            }    
        }
        userIdList.add(id);
    }
    
    public List<Integer> getIdList() {
        return this.userIdList;    
    }
}
