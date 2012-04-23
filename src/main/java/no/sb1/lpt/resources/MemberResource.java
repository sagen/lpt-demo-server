package no.sb1.lpt.resources;


import no.sb1.lpt.model.Member;
import no.sb1.lpt.repository.DataStore;

import javax.ws.rs.*;
import java.util.Collection;

import static no.sb1.lpt.Util.*;
import static no.sb1.lpt.repository.DataStore.agreement;
import static no.sb1.lpt.repository.DataStore.member;

@Path("/companies/{companyId}/agreements/{agreementId}/members/")
@Produces(JSON_CONTENT_TYPE)
@Consumes(JSON_CONTENT_TYPE)
public class MemberResource {

    @GET
    public Collection<Member> getMembers(@PathParam("companyId") int companyId, @PathParam("agreementId") int agreementId){
        return agreement(companyId, agreementId).members.values();
    }


    @GET
    @Path("/{memberId}")
    public Member getMember(@PathParam("companyId") Integer companyId,
                                         @PathParam("agreementId") Integer agreementId,
                                         @PathParam("memberId") Integer memberId){
        return member(companyId, agreementId, memberId);
    }

    @POST
    @Path("/{memberId}")
    public Member editMember(@PathParam("companyId") int companyId,
                             @PathParam("agreementId") int agreementId,
                             @PathParam("memberId") int memberId,
                             Member edited){
        return member(companyId, agreementId, memberId).copyFrom(edited);
    }

    @POST
    public Member addMember(@PathParam("companyId") int companyId,
                            @PathParam("agreementId") int agreementId,
                            Member member){
        return DataStore.addMember(companyId, agreementId, member);
    }

}
