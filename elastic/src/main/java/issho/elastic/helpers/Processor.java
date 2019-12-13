package issho.elastic.helpers;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.jayway.jsonpath.internal.filter.ValueNode;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public class Processor {



    public static void errorHandler(String resp){
        if ( resp.contains("ERROR 503") ){
            throw new ResponseStatusException(HttpStatus.SERVICE_UNAVAILABLE, resp.replace("ERROR 503:", ""));
        }
    }


    public static JsonNode toJson(String resp) throws JsonProcessingException {
        return  new ObjectMapper().readTree((resp));
    }
}
