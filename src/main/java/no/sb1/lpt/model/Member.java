package no.sb1.lpt.model;

import java.util.Date;

import static no.sb1.lpt.Util.nullValue;

public class Member extends Entity {
    public String fnr;
    public String name;
    public Integer salary;
    public Date registered;

    public Member(){}
    public Member(String fnr, String name, Integer salary, Date registered) {
        this.fnr = fnr;
        this.name = name;
        this.salary = salary;
        this.registered = registered;
    }

    public Member copyFrom(Member other){
        fnr = nullValue(other.fnr, fnr);
        name = nullValue(other.name, name);
        salary = nullValue(other.salary, salary);
        registered = nullValue(other.registered, registered);
        return this;
    }

}