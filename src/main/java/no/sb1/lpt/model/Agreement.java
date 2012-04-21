package no.sb1.lpt.model;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class Agreement {
	
	public int id;
	public String navn;
	public Company bedrift;
	public String status;
	public Date etablert;
	public Date endret;
	public boolean avtaleGiro;
	public int minStillingsprosent;
	public int opptjeningsalder;
	public int utbetalingsperiode;
	public String hovedforfall;
	public int trekkdag;
	public String betalingsfrekvens;
	public List<Member> medlemmer;
	
	
    public Agreement(int id, String navn) {
    	this.id = id;
        this.navn = navn;
        
        Member member1 = new Member();
        member1.navn = "Anders";
        Member member2 = new Member();
        member2.navn = "Sagen";
        
        medlemmer = new ArrayList<Member>();
        medlemmer.add(member1);
        medlemmer.add(member2);
    }

    
}
