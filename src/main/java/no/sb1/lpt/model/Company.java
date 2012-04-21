package no.sb1.lpt.model;

import org.codehaus.jackson.annotate.JsonIgnore;

import java.util.Map;
import java.util.Set;

import static no.sb1.lpt.Util.generateId;

public class Company {
<<<<<<< HEAD
    public String name;
    public int id;

    public Company(int id, String name) {
    	this.id = id;
=======

    public final String name;
    public final Integer id;
    @JsonIgnore
    public Map<Integer, Agreement> agreements;
    public Company(String name, Map<Integer, Agreement> agreements) {
        this.id = generateId();
>>>>>>> f5146af5a6c27ed053be5311e52c4c8ae987785c
        this.name = name;
        this.agreements = agreements;
    }

    public Set<Integer> getAgreementIds(){
        return agreements.keySet();

    }
}
