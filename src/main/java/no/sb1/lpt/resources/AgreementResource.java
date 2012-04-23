package no.sb1.lpt.resources;

import static no.sb1.lpt.Util.JSON_CONTENT_TYPE;
import static no.sb1.lpt.repository.DataStore.agreement;
import static no.sb1.lpt.repository.DataStore.company;

import java.util.Arrays;
import java.util.Collection;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;

import no.sb1.lpt.model.Agreement;
import no.sb1.lpt.repository.DataGenerator;
import no.sb1.lpt.repository.DataStore;

@Path("/companies/{companyId}/agreements")
@Produces(JSON_CONTENT_TYPE)
@Consumes(JSON_CONTENT_TYPE)
public class AgreementResource {

    @GET
    public Collection<Agreement> getAgreements(@PathParam("companyId") Integer companyId) {
        return company(companyId).agreements.values();
    }

    @GET
    @Path("/{agreementId}")
    public Agreement getAgreement(@PathParam("companyId") int companyId, @PathParam("agreementId") int agreementId) {
        return agreement(companyId, agreementId);
    }

    @GET
    @Path("/types")
    public Collection<String> getAgreementTypes(@PathParam("companyId") int companyId, @PathParam("agreementId") int agreementId) {
        return Arrays.asList(DataGenerator.agreementTypes);
    }

    @POST
    @Path("/{agreementId}")
    public Agreement editAgreement(@PathParam("companyId") int companyId,
                                   @PathParam("agreementId") int agreementId,
                                   Agreement edited){
        return agreement(companyId, agreementId).copyFrom(edited);
    }


    @POST
    public Agreement addAgreement(@PathParam("companyId") int companyId,
                                  Agreement agreement){
        return DataStore.addAgreement(companyId, agreement);
    }
}
