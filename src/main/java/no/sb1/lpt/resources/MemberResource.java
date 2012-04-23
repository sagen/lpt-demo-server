package no.sb1.lpt.resources;


import static no.sb1.lpt.Util.JSON_CONTENT_TYPE;
import static no.sb1.lpt.repository.DataStore.agreement;
import static no.sb1.lpt.repository.DataStore.member;

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

import no.sb1.lpt.model.Member;
import no.sb1.lpt.repository.DataStore;

@Path("/companies/{companyId}/agreements/{agreementId}/members/")
@Consumes(JSON_CONTENT_TYPE)
public class MemberResource {

    @GET
    @Produces("application/x-javascript")
    public JSONWithPadding getMembers(@PathParam("companyId") int companyId,
                                      @PathParam("agreementId") int agreementId,
                                      @QueryParam("callback") String callback) {
        return new JSONWithPadding(new GenericEntity<Collection<Member>>(agreement(companyId, agreementId).members.values()) {}, callback);
    }


    @GET
    @Produces("application/x-javascript")
    @Path("/{memberId}")
    public JSONWithPadding getMember(@PathParam("companyId") Integer companyId,
                                     @PathParam("agreementId") Integer agreementId,
                                     @PathParam("memberId") Integer memberId,
                                     @QueryParam("callback") String callback){
        return new JSONWithPadding(new GenericEntity<Member>(member(companyId, agreementId, memberId)) {}, callback);
    }

    @POST
    @Produces(JSON_CONTENT_TYPE)
    @Path("/{memberId}")
    public Member editMember(@PathParam("companyId") int companyId,
                             @PathParam("agreementId") int agreementId,
                             @PathParam("memberId") int memberId,
                             Member edited){
        return member(companyId, agreementId, memberId).copyFrom(edited);
    }

    @POST
    @Produces(JSON_CONTENT_TYPE)
    public Member addMember(@PathParam("companyId") int companyId,
                            @PathParam("agreementId") int agreementId,
                            Member member){
        return DataStore.addMember(companyId, agreementId, member);
    }

}
