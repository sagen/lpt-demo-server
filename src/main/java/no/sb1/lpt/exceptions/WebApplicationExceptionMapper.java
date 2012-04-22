package no.sb1.lpt.exceptions;


import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.Response;
import javax.ws.rs.ext.ExceptionMapper;
import javax.ws.rs.ext.Provider;

import static javax.ws.rs.core.Response.fromResponse;
import static no.sb1.lpt.Util.JSON_CONTENT_TYPE;

@Provider
public class WebApplicationExceptionMapper implements ExceptionMapper<WebApplicationException> {
    public Response toResponse(WebApplicationException exception) {
        return fromResponse(exception.getResponse()).type(JSON_CONTENT_TYPE).build();
    }
}
