package no.sb1.lpt;

import static javax.ws.rs.core.MediaType.APPLICATION_JSON;

public class Util {
    public static final String JSON_CONTENT_TYPE = APPLICATION_JSON + ";charset=UTF-8";

    private static int idGenerated = 0;
    public static synchronized int generateId(){
        return idGenerated++;
    }
}
