package no.sb1.lpt.resources;


import static javax.ws.rs.core.Response.ok;
import static no.sb1.lpt.Util.JSON_CONTENT_TYPE;
import static no.sb1.lpt.repository.DataStore.agreement;
import static no.sb1.lpt.repository.DataStore.member;

import java.util.Collection;

import javax.ws.rs.*;
import javax.ws.rs.core.Response;

import no.sb1.lpt.model.Member;
import no.sb1.lpt.repository.DataStore;

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

    @DELETE
    @Path("/{memberId}")
    public Response deleteMember(@PathParam("companyId") int companyId,
                                 @PathParam("agreementId") int agreementId,
                                 @PathParam("memberId") int memberId){
        DataStore.deleteMember(companyId, agreementId, memberId);
        return ok().build();
    }

}
