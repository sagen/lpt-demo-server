package no.sb1.lpt.model;

import static no.sb1.lpt.Util.generateId;

public class Member {
    public String name;
    public int id;

    public Member(String name) {
        this.id = generateId();
        this.name = name;
    }
}
