package no.sb1.lpt.resources;

import static no.sb1.lpt.Util.JSONP_CONTENT_TYPE;
import static no.sb1.lpt.repository.DataStore.companies;
import static no.sb1.lpt.repository.DataStore.company;

import java.util.Collection;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.GenericEntity;

import com.sun.jersey.api.json.JSONWithPadding;

import no.sb1.lpt.model.Company;

@Path("/companies")
@Produces(JSONP_CONTENT_TYPE)
public class CompanyResource {

    @GET
    public JSONWithPadding getCompanies(@QueryParam("callback") String callback){
        return new JSONWithPadding(new GenericEntity<Collection<Company>>(companies()) {}, callback);
    }

    @GET
    @Path("/{companyId}")
    public JSONWithPadding getCompany(@PathParam("companyId") int companyId, @QueryParam("callback") String callback){
        return new JSONWithPadding(new GenericEntity<Company>(company(companyId)) {}, callback);
    }

}
