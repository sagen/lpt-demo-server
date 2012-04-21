package no.sb1.lpt.resources;

import no.sb1.lpt.model.Company;

import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.FormParam;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;

import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.List;

import static no.sb1.lpt.Util.JSON_CONTENT_TYPE;

@Path("/companies")
@Produces(JSON_CONTENT_TYPE)
public class CompanyResource {
	
	private static ArrayList<Company> comps;
	
	public static void fillComps(){
		comps = new ArrayList<Company>();
		
		for(int i = 0; i<100; i++){
			comps.add(new Company(i,"selskap "+i));
		}
		
	}

	@GET
    public List<Company> getCompanies() throws InterruptedException{
		if( comps == null ) fillComps();
		return comps;
    }
	
	@GET
	@Path("/{id}")
    public Company getCompany(@PathParam("id") int id) throws InterruptedException{
		if( comps == null ) fillComps();
		return comps.get(id);
    }
	
	@POST
    public Company registerCompany(@FormParam("name") String name, @Context HttpServletRequest req) throws URISyntaxException{
		if( comps == null ) fillComps();
		
		Company newCompany = new Company(comps.size(),name);
		comps.add(newCompany);
		
		return newCompany;
    }
}
