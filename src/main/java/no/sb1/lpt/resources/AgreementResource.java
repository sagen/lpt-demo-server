package no.sb1.lpt.resources;

import static no.sb1.lpt.Util.JSON_CONTENT_TYPE;

import java.util.Map;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;

import no.sb1.lpt.model.Agreement;
import no.sb1.lpt.model.Company;
import no.sb1.lpt.model.DataStore;

@Path("/companies/{companyId}/agreements")
public class AgreementResource {
	

	@GET
	@Produces(JSON_CONTENT_TYPE)
    public Map<Integer, Agreement> getAgreements(@PathParam("companyId") Integer companyId){
        Company company = DataStore.company(companyId);
        return company == null ? null : company.agreements;
    }
	
	@GET
	@Produces(JSON_CONTENT_TYPE)
	@Path("/companies/{companyId}/agreements/{agreementId}")
    public Agreement getAgreement(@PathParam("companyId") Integer companyId,
    											@PathParam("agreementId") Integer agreementId){
        return DataStore.agreement(companyId, agreementId);
    }

}
