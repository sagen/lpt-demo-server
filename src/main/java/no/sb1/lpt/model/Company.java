package no.sb1.lpt.model;

import org.codehaus.jackson.annotate.JsonIgnore;

import java.util.Map;
import java.util.Set;

    
public class Company extends Identifiable{
    @JsonIgnore
    public Map<Integer, Agreement> agreements;

    public final String name;
    public Company(String name, Map<Integer, Agreement> agreements) {
        this.name = name;
        this.agreements = agreements;
    }

    public Set<Integer> getAgreements(){
        return agreements.keySet();
    }
}
