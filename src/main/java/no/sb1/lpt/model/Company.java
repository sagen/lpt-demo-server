package no.sb1.lpt.model;

import org.codehaus.jackson.annotate.JsonIgnore;

import java.util.Map;
import java.util.Set;

import static no.sb1.lpt.Util.generateId;

public class Company {

    public final String name;
    public final Integer id;
    @JsonIgnore
    public Map<Integer, Agreement> agreements;
    public Company(String name, Map<Integer, Agreement> agreements) {
        this.id = generateId();
        this.name = name;
        this.agreements = agreements;
    }

    public Set<Integer> getAgreementIds(){
        return agreements.keySet();

    }
}
