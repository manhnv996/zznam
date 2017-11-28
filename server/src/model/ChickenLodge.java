package model;

public class ChickenLodge extends AnimalLodge {
    public ChickenLodge(int id, long startBuildTime, boolean completed, int x, int y) {
        super(id, startBuildTime, completed, x, y);
    }

    public void addChicken(Chicken chicken) {
        this.addAnimal(chicken);
    }
}
