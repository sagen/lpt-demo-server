package no.sb1.lpt.model;


import static no.sb1.lpt.Util.generateId;

public abstract class Entity {
    public int id;

    protected Entity() {
        this.id = generateId();
    }
}
