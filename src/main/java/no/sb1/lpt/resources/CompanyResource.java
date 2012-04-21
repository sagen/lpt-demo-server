package no.sb1.lpt.resources;

import no.sb1.lpt.model.Company;
import no.sb1.lpt.model.DataStore;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Map;

import static no.sb1.lpt.Util.JSON_CONTENT_TYPE;
import static no.sb1.lpt.model.DataStore.companies;

@Path("/companies")
public class CompanyResource {

    @GET
    @Produces(JSON_CONTENT_TYPE)
    public Map<Integer, Company> getCompanies(){
        return companies;
    }
}
