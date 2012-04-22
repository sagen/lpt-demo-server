package no.sb1.lpt.resources;

import com.sun.jersey.api.ParamException;
import no.sb1.lpt.model.Agreement;
import no.sb1.lpt.model.Member;
import no.sb1.lpt.repository.DataStore;

import javax.ws.rs.*;
import javax.ws.rs.core.MultivaluedMap;

import java.util.Collection;
import java.util.Date;

import static no.sb1.lpt.Util.*;
import static no.sb1.lpt.model.Agreement.Status.valueOf;
import static no.sb1.lpt.repository.DataStore.agreement;
import static no.sb1.lpt.repository.DataStore.company;

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
