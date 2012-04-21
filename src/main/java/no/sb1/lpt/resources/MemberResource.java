package no.sb1.lpt.resources;


import no.sb1.lpt.model.Agreement;
import no.sb1.lpt.repository.DataStore;
import no.sb1.lpt.model.Member;

import javax.ws.rs.*;
import java.util.Collection;
import java.util.Map;

import static no.sb1.lpt.Util.JSON_CONTENT_TYPE;
import static no.sb1.lpt.repository.DataStore.member;

@Path("/companies/{companyId}/agreements/{agreementId}/members/")
public class MemberResource {

    @GET
    @Produces(JSON_CONTENT_TYPE)
    public Collection<Member> getMembers(@PathParam("companyId") Integer companyId, @PathParam("agreementId") Integer agreementId){
        Agreement agreement = DataStore.agreement(companyId, agreementId);
        return agreement == null ? null : agreement.members.values();
    }


    @GET
    @Produces(JSON_CONTENT_TYPE)
    @Path("/{memberId}")
    public Member getMembers(@PathParam("companyId") Integer companyId,
                                         @PathParam("agreementId") Integer agreementId,
                                         @PathParam("memberId") Integer memberId){
        return member(companyId, agreementId, memberId);
    }


}
