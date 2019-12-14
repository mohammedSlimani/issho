package issho.elastic.helpers;



import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import java.util.HashMap;
import java.util.Map;

public class Processor {



    public static void errorHandler(String resp) throws JsonProcessingException {
        JsonNode node = toJson(resp);
        if ( node.path("status").asInt() == 503 ){
            throw new ResponseStatusException(HttpStatus.SERVICE_UNAVAILABLE, node.path("message").toString());
        }
    }


    public static JsonNode toJson(String resp) throws JsonProcessingException {
        return  new ObjectMapper().readTree((resp));
    }

    public static String constructResp(Integer status, Object message) throws JsonProcessingException {
        Map<String,Object> resp = new HashMap<>();
        resp.put("status",status);
        resp.put("message",message);
        String json = new ObjectMapper().writeValueAsString(resp);
        return  json;
    }

}
