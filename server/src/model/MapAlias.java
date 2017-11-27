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
    
    public void addMapAlias(int x, int y, int width, int height, int type) {
        for (int i = 0; i < width; i++) {
            for (int j = 0; j < height; j++) {
                this.map[x + i][y + j] = type;
            }
        }
    }
    
    public void removeMapAlias(int x, int y, int width, int height) {
        for (int i = 0; i < width; i++) {
            for (int j = 0; j < height; j++) {
                this.map[x + i][y + j] = 0;
            }
        }
    }
    
    public boolean checkValidBlock(int x, int y, int width, int height) {
        for (int i = 0; i < width; i++) {
            for (int j = 0; j < height; j++) {
                if (this.map[x + i][y + j] != 0) {
                    return false;    
                }
            }
        }
        return true;
    }
}
