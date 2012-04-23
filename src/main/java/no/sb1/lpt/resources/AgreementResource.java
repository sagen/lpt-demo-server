package no.sb1.lpt.resources;

import static no.sb1.lpt.Util.JSON_CONTENT_TYPE;
import static no.sb1.lpt.Util.JSONP_CONTENT_TYPE;
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
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.GenericEntity;

import com.sun.jersey.api.json.JSONWithPadding;

import no.sb1.lpt.model.Agreement;
import no.sb1.lpt.repository.DataGenerator;
import no.sb1.lpt.repository.DataStore;

@Path("/companies/{companyId}/agreements")
@Consumes(JSON_CONTENT_TYPE)
public class AgreementResource {

    @GET
    @Produces(JSONP_CONTENT_TYPE)
    public JSONWithPadding getAgreements(@PathParam("companyId") Integer companyId, @QueryParam("callback") String callback) {
        return new JSONWithPadding(new GenericEntity<Collection<Agreement>>(company(companyId).agreements.values()) {}, callback);
    }

    @GET
    @Produces(JSONP_CONTENT_TYPE)
    @Path("/{agreementId}")
    public JSONWithPadding getAgreement(@PathParam("companyId") int companyId, @PathParam("agreementId") int agreementId, @QueryParam("callback") String callback) {
        return new JSONWithPadding(new GenericEntity<Agreement>(agreement(companyId, agreementId)) {}, callback);
    }
    
    @GET
    @Produces(JSONP_CONTENT_TYPE)
    @Path("/types")
    public JSONWithPadding getAgreementTypes(@PathParam("companyId") int companyId, @PathParam("agreementId") int agreementId, @QueryParam("callback") String callback) {
        return new JSONWithPadding(new GenericEntity<Collection<String>>(Arrays.asList(DataGenerator.agreementTypes)) {}, callback);
    }

    @POST
    @Produces(JSON_CONTENT_TYPE)
    @Path("/{agreementId}")
    public Agreement editAgreement(@PathParam("companyId") int companyId,
                                   @PathParam("agreementId") int agreementId,
                                   Agreement edited){
        return agreement(companyId, agreementId).copyFrom(edited);
    }


    @POST
    @Produces(JSON_CONTENT_TYPE)
    public Agreement addAgreement(@PathParam("companyId") int companyId,
                                  Agreement agreement){
        return DataStore.addAgreement(companyId, agreement);
    }
}
