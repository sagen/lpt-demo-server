package no.sb1.lpt.model;

import java.util.Date;

public class Member extends Entity {
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
