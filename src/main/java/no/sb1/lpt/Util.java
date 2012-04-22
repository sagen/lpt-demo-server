package no.sb1.lpt;

import com.sun.jersey.api.ParamException;
import no.sb1.lpt.model.Entity;

import javax.ws.rs.core.MultivaluedMap;
import java.util.HashMap;
import java.util.Map;

import static java.lang.Integer.parseInt;
import static java.lang.Long.parseLong;
import static java.util.Collections.synchronizedMap;
import static javax.ws.rs.core.MediaType.APPLICATION_JSON;

public class Util {
    public static final String JSON_CONTENT_TYPE = APPLICATION_JSON + ";charset=UTF-8";

    private static int idGenerated = 0;
    public static synchronized int generateId(){
        return idGenerated++;
    }

    public static <V extends Entity> Map<Integer, V> map(V... values) {
        Map<Integer, V> map = synchronizedMap(new HashMap<Integer, V>());
        for (V value : values) {
            map.put(value.id, value);
        }
        return map;
    }

    public static <T> T nullValue(T possiblyNull, T retIfNull){
        return possiblyNull == null ? retIfNull : possiblyNull;
    }
}
