package no.sb1.lpt.model;

import java.util.Date;

import static no.sb1.lpt.Util.generateId;

public class Member extends Identifiable{
    public String fnr;
    public String name;
    public Integer salary;
    public Date registered;

    public Member(String fnr, String name, Integer salary, Date registered) {
        this.fnr = fnr;
        this.name = name;
        this.salary = salary;
        this.registered = registered;
    }

}
