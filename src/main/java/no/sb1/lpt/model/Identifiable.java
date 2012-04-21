package no.sb1.lpt.model;


import static no.sb1.lpt.Util.generateId;

public abstract class Identifiable {
    public int id;

    protected Identifiable() {
        this.id = generateId();
    }
}
