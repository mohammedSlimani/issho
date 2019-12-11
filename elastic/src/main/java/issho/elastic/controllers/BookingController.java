package issho.elastic.controllers;


import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import issho.elastic.services.BookingService;
import org.apache.commons.lang3.StringUtils;
import org.mockito.internal.util.StringUtil;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
public class BookingController {

    BookingService bookingService = new BookingService("bookings");

    public BookingController() throws IOException {
    }

    //----------------------
    //----------GET------------
    //----------------------

    @GetMapping("bookings/all")
    public String getAll() throws IOException {
        return bookingService.read().toString();
    }

    @GetMapping("bookings/userId")
    public String getByUser(@RequestParam(name = "userId") String userId) throws IOException {
        return bookingService.getByUser(userId);
    }

    @GetMapping("bookings/postId")
    public String getByPost(@RequestParam(name = "postId") String postId) throws IOException {
        return bookingService.getByPost(postId);
    }


    @GetMapping("bookings/countByPost")
    public String getCountByPost(@RequestParam(name = "postId") String postId) throws IOException {
        return bookingService.getCountByPost(postId);
    }

    //----------------------
    //----------POST------------
    //----------------------


    @PostMapping("/bookings/create")
    public String create(@RequestBody String booking) throws IOException {
        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode rootNode = objectMapper.readTree(booking);
        String id = rootNode.path("id").toString().replace("\"", "");
        if (! StringUtils.isEmpty(id)){
            return bookingService.create(booking, id);
        }else {
            return bookingService.create(booking);
        }
    }


    @PostMapping("/bookings/update")
    public String update(@RequestBody String booking) throws IOException {
        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode rootNode = objectMapper.readTree(booking);
        String id = rootNode.path("id").toString().replace("\"", "");
        return bookingService.update(id, rootNode.toString());
    }


    //----------------------
    //----------DELETE------------
    //----------------------

    @DeleteMapping("/bookings/delete")
    public String delete(@RequestParam(name = "id") String id) throws IOException {
        return bookingService.delete(id);
    }


}
