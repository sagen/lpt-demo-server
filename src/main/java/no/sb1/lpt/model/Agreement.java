package no.sb1.lpt.model;

import org.codehaus.jackson.annotate.JsonIgnore;

import java.util.Date;
import java.util.Map;
import java.util.Set;

import static no.sb1.lpt.Util.map;
import static no.sb1.lpt.Util.nullValue;

public class Agreement extends Entity {
    public enum Status{ACTIVE("Aktiv"), SUSPENDED("Venter på endring");
    	
    	private String name; 
    
    	Status(String name){
    		this.name = name;
    	}
    
    	String getName(){
    		return name;
    	}
    	
    }

    @JsonIgnore
    public final Map<Integer, Member> members;
    
    public String type;
    public Integer agreementNumber;
    @JsonIgnore
    public Status status;
    public Date registered;
    public Integer minimumAge;

    public Agreement(){
        members = map();
    }

    public Agreement(Map<Integer, Member> members, String type, Integer agreementNumber, Status status, Date registered, Integer minimumAge) {
        this.members = members;
        this.type = type;
        this.agreementNumber = agreementNumber;
        this.status = status;
        this.registered = registered;
        this.minimumAge = minimumAge;
    }

    public Agreement copyFrom(Agreement other){
        agreementNumber = nullValue(other.agreementNumber, agreementNumber);
        type = nullValue(other.type, type);
        status = nullValue(other.status, status);
        registered = nullValue(other.registered, registered);
        status = nullValue(other.status, status);
        return this;
    }

    public Set<Integer> getMembers(){
        return members.keySet();
    }
    
    public String getStatus(){
    	return status.getName();
    }

}
