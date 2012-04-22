package no.sb1.lpt.resources;


import no.sb1.lpt.Util;
import no.sb1.lpt.repository.DataStore;
import no.sb1.lpt.model.Member;

import javax.ws.rs.*;
import javax.ws.rs.core.MultivaluedMap;
import java.util.Collection;
import java.util.Date;

import static java.lang.Integer.parseInt;
import static java.lang.Long.parseLong;
import static no.sb1.lpt.Util.JSON_CONTENT_TYPE;
import static no.sb1.lpt.repository.DataStore.agreement;
import static no.sb1.lpt.repository.DataStore.member;

@Path("/companies/{companyId}/agreements/{agreementId}/members/")
@Produces(JSON_CONTENT_TYPE)
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
    public Member addMember(@PathParam("companyId") int companyId,
                            @PathParam("agreementId") int agreementId,
                            MultivaluedMap<String, String> post) throws WebApplicationException{

        Date registered = new Date(Util.tryToParseLong(post, "registered"));
        int salary = Util.tryToParseLong(post, "salary").intValue();
        Member member = new Member(post.getFirst("fnr"), post.getFirst("name"), salary, registered);
        return DataStore.addMember(companyId, agreementId, member);
    }


}
