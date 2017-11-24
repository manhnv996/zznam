package model;

import config.utils.ConfigContainer;

import util.database.DataModel;

public class MapAlias{
    private int[][] map;
    
    public MapAlias() {
        this.map = new int[32][32];
        for (int i = 0; i < 32; i++) {
            for (int j = 0; j < 32; j++) {
                this.map[i][j] = ConfigContainer.defaultMap[i][j];
            }
        }
    }
    
    public int[][] getMap() {
        return this.map;    
    }
}
