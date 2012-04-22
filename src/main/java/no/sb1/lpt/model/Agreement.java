package no.sb1.lpt.model;

import org.codehaus.jackson.annotate.JsonIgnore;

import java.util.Date;
import java.util.Map;
import java.util.Set;

public class Agreement extends Entity {
    public enum Status{ACTIVE, SUSPENDED}

    @JsonIgnore
    public final Map<Integer, Member> members;

    public int agreementNumber;
    public Status status;
    public Date registered;
    public int minimumAge;


    public Agreement(Map<Integer, Member> members, int agreementNumber, Status status, Date registered, int minimumAge) {
        this.members = members;
        this.agreementNumber = agreementNumber;
        this.status = status;
        this.registered = registered;
        this.minimumAge = minimumAge;
    }

    public Set<Integer> getMembers(){
        return members.keySet();
    }

}
