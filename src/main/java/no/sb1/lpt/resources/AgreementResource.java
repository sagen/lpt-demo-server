package no.sb1.lpt.resources;

import static no.sb1.lpt.Util.JSON_CONTENT_TYPE;

import java.util.ArrayList;
import java.util.List;

import javax.ws.rs.FormParam;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;

import no.sb1.lpt.model.Agreement;

@Path("/agreements")
@Produces(JSON_CONTENT_TYPE)
public class AgreementResource {
	
	private static ArrayList<Agreement> agreements;
	
	public static void fillAgreements(){
		agreements = new ArrayList<Agreement>();
		
		for(int i = 0; i<100; i++){
			agreements.add(new Agreement(i,"avtale "+i));
		}
		
	}

    @GET
    public List<Agreement> getAgreements(){
    	if(agreements==null) fillAgreements();
    	
        return agreements;
    }
    
    @GET
	@Path("/{id}")
    public Agreement getAgreement(@PathParam("id") int id){
		if( agreements == null ) fillAgreements();
		
		return agreements.remove(id);
    }
    
    @POST
	@Path("/{id}")
    public void deleteAgreement(@PathParam("id") int id){
		if( agreements == null ) fillAgreements();
		
		System.out.println("Deleting "+id+" "+agreements.size());
		agreements.remove(id);
		System.out.println("Deleted "+agreements.size());
    }
	
	@POST
    public Agreement registerAgreement(@FormParam("name") String name){
		if( agreements == null ) fillAgreements();
		
		Agreement newAgreement = new Agreement(agreements.size(),name);
		agreements.add(newAgreement);
		
		return newAgreement;
    }

}
