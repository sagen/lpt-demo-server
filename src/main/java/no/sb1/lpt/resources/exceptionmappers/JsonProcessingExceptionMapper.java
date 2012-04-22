package no.sb1.lpt.resources.exceptionmappers;


import org.codehaus.jackson.JsonProcessingException;

import javax.ws.rs.core.Response;
import javax.ws.rs.ext.ExceptionMapper;
import javax.ws.rs.ext.Provider;

import static com.sun.jersey.api.Responses.CLIENT_ERROR;
import static javax.ws.rs.core.Response.status;
import static no.sb1.lpt.Util.JSON_CONTENT_TYPE;

@Provider
public class JsonProcessingExceptionMapper implements ExceptionMapper<JsonProcessingException> {
    public Response toResponse(JsonProcessingException exception) {
        return status(CLIENT_ERROR).entity("Unable to process JSON").type(JSON_CONTENT_TYPE).build();
    }
}
