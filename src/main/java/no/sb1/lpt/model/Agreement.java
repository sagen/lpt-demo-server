package no.sb1.lpt.model;

import org.codehaus.jackson.annotate.JsonIgnore;

import java.util.Map;
import java.util.Set;

import static no.sb1.lpt.Util.generateId;

public class Agreement {
    @JsonIgnore
    public Map<Integer, Member> members;
    public int id;
    public String name;
    public Agreement(String name, Map<Integer, Member> members) {
        this.id = generateId();
        this.name = name;
        this.members = members;
    }

    public Set<Integer> getMemberIds(){
        return members.keySet();
    }

}
