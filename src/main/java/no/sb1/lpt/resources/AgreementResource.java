package no.sb1.lpt.resources;

import no.sb1.lpt.model.Agreement;
import no.sb1.lpt.model.Company;
import no.sb1.lpt.repository.DataStore;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;


import java.util.Collection;

import static no.sb1.lpt.Util.JSON_CONTENT_TYPE;
import static no.sb1.lpt.repository.DataStore.agreement;

@Path("/companies/{companyId}/agreements")
public class AgreementResource {
	

    @Produces(JSON_CONTENT_TYPE)
    public Collection<Agreement> getAgreements(@PathParam("companyId") Integer companyId) {
        Company company = DataStore.company(companyId);
        return company == null ? null : company.agreements.values();
    }

    @GET
    @Produces(JSON_CONTENT_TYPE)
    @Path("/{agreementId}")
    public Agreement getAgreement(@PathParam("companyId") Integer companyId, @PathParam("agreementId") Integer agreementId) {
        return agreement(companyId, agreementId);
    }

}
