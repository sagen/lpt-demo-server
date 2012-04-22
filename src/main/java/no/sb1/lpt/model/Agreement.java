package no.sb1.lpt.model;

import org.codehaus.jackson.annotate.JsonIgnore;

import java.util.Date;
import java.util.Map;
import java.util.Set;

import static no.sb1.lpt.Util.map;
import static no.sb1.lpt.Util.nullValue;

public class Agreement extends Entity {
    public enum Status{ACTIVE, SUSPENDED}

    @JsonIgnore
    public final Map<Integer, Member> members;

    public Integer agreementNumber;
    public Status status;
    public Date registered;
    public Integer minimumAge;

    public Agreement(){
        members = map();
    }

    public Agreement(Map<Integer, Member> members, Integer agreementNumber, Status status, Date registered, Integer minimumAge) {
        this.members = members;
        this.agreementNumber = agreementNumber;
        this.status = status;
        this.registered = registered;
        this.minimumAge = minimumAge;
    }

    public Agreement copyFrom(Agreement other){
        agreementNumber = nullValue(other.agreementNumber, agreementNumber);
        status = nullValue(other.status, status);
        registered = nullValue(other.registered, registered);
        status = nullValue(other.status, status);
        return this;
    }

    public Set<Integer> getMembers(){
        return members.keySet();
    }

}
