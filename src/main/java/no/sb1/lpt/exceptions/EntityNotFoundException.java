package no.sb1.lpt.exceptions;

import javax.ws.rs.WebApplicationException;

import static com.sun.jersey.api.Responses.NOT_FOUND;
import static javax.ws.rs.core.Response.status;
import static no.sb1.lpt.Util.JSON_CONTENT_TYPE;

public class EntityNotFoundException extends WebApplicationException{
    public EntityNotFoundException(final Class entity){
        super(status(NOT_FOUND).entity(entity.getSimpleName() + " not found").build());
    }
}
