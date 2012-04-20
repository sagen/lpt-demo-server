package no.sb1.lpt.resources;

import no.sb1.lpt.model.Company;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import java.util.ArrayList;
import java.util.List;

import static no.sb1.lpt.Util.JSON_CONTENT_TYPE;

@Path("/companies")
public class CompanyResource {

    @GET
    @Produces(JSON_CONTENT_TYPE)
    public List<Company> getCompanies(){

        return new ArrayList<Company>(){{
            add(new Company("Blomsterbutikk"));
            add(new Company("Snekker"));
            add(new Company("Rørlegger"));
            add(new Company("Kakedekoratør"));
        }};
    }
}
