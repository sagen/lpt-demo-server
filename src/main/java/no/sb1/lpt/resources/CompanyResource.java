package no.sb1.lpt.resources;

import static no.sb1.lpt.Util.JSON_CONTENT_TYPE;
import static no.sb1.lpt.repository.DataStore.companies;
import static no.sb1.lpt.repository.DataStore.company;

import java.util.Collection;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;

import no.sb1.lpt.model.Company;

@Path("/companies")
@Produces(JSON_CONTENT_TYPE)
public class CompanyResource {
	
    @GET
    public Collection<Company> getCompanies(){
        return companies();
    }

    @GET
    @Path("/{companyId}")
    public Company getCompany(@PathParam("companyId") int companyId){
        return company(companyId);
    }
        
}
