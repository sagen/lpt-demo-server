package no.sb1.lpt.resources;

import no.sb1.lpt.model.Agreement;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;

import static no.sb1.lpt.Util.JSON_CONTENT_TYPE;

@Path("agreement")
public class AgreementResource {

    @GET
    @Produces(JSON_CONTENT_TYPE)
    public Agreement getAgreements(){
        return new Agreement("Avtale");
    }

}
