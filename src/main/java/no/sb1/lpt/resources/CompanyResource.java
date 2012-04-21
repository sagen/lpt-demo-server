package no.sb1.lpt.resources;

import static no.sb1.lpt.Util.JSON_CONTENT_TYPE;
import static no.sb1.lpt.model.DataStore.companies;

import java.util.Map;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;

import no.sb1.lpt.model.Company;
import no.sb1.lpt.model.DataStore;

@Path("/companies")
@Produces(JSON_CONTENT_TYPE)
public class CompanyResource {
	
    @GET
    @Produces(JSON_CONTENT_TYPE)
    public Map<Integer, Company> getCompanies(){
        return companies;
    }
    
	@GET
	@Produces(JSON_CONTENT_TYPE)
	@Path("/{companyId}")
    public Company getCompany(@PathParam("companyId") Integer companyId){
        Company company = DataStore.company(companyId);
        return company == null ? null : company;
    }
    
}
