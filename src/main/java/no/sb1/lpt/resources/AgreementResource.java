package no.sb1.lpt.resources;

import com.sun.jersey.api.ParamException;
import no.sb1.lpt.Util;
import no.sb1.lpt.model.Agreement;
import no.sb1.lpt.model.Company;
import no.sb1.lpt.model.Member;
import no.sb1.lpt.repository.DataGenerator;
import no.sb1.lpt.repository.DataStore;

import javax.ws.rs.*;
import javax.ws.rs.core.MultivaluedMap;

import java.util.Collection;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import static no.sb1.lpt.Util.*;
import static no.sb1.lpt.model.Agreement.Status.valueOf;
import static no.sb1.lpt.repository.DataStore.agreement;
import static no.sb1.lpt.repository.DataStore.company;

@Path("/companies/{companyId}/agreements")
@Produces(JSON_CONTENT_TYPE)
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
    public Agreement addAgreement(@PathParam("companyId") int companyId,
                                  MultivaluedMap<String, String> post){

        int agrNum = tryToParseInt(post, "agreementNumber");
        Agreement.Status status = parseStatus(post);
        Date registered = new Date(tryToParseLong(post, "registered"));
        int minAge = tryToParseInt(post, "minimumAge");
        Agreement agreement = new Agreement(map(Member.class), agrNum, status, registered, minAge);
        return DataStore.addAgreement(companyId, agreement);

    }

    private Agreement.Status parseStatus(MultivaluedMap<String, String> post) {
        try{
            return valueOf(post.getFirst("status"));
        }catch(NullPointerException npEx){
            throw new ParamException.FormParamException(npEx, "Status required", "");
        }catch(IllegalArgumentException iaEx){
            throw new ParamException.FormParamException(iaEx, "Invalid status provided", "");
        }
    }

}
