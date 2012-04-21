package no.sb1.lpt.model;

import org.codehaus.jackson.annotate.JsonIgnore;

import java.util.Map;
import java.util.Set;

public class Agreement extends Identifiable{
    @JsonIgnore
    public Map<Integer, Member> members;
    public String name;
    public Agreement(String name, Map<Integer, Member> members) {
        this.name = name;
        this.members = members;
    }

    public Set<Integer> getMembers(){
        return members.keySet();
    }

}
