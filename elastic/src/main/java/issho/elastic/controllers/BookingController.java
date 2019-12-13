package issho.elastic.controllers;


import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import issho.elastic.services.BookingService;
import org.apache.commons.lang3.StringUtils;
import org.mockito.internal.util.StringUtil;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import issho.elastic.helpers.Processor;

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

    @GetMapping("bookings/id")
    public String getById(@RequestParam(name = "id") String id) throws IOException {
        String resp = bookingService.getById(id);
        Processor.errorHandler(resp);
        return resp;
    }

    @GetMapping("bookings/userId")
    public String getByUser(@RequestParam(name = "userId") String userId) throws IOException {
        String resp=  bookingService.getByUser(userId);
        Processor.errorHandler(resp);
        return  resp;
    }

    @GetMapping("bookings/postId")
    public String getByPost(@RequestParam(name = "postId") String postId) throws IOException {
        String resp = bookingService.getByPost(postId);
        Processor.errorHandler(resp);
        return  resp;
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
        JsonNode rootNode = Processor.toJson(booking);
        String id = rootNode.path("id").toString().replace("\"", "");
        String resp = "";
        if (! StringUtils.isEmpty(id)){
             resp = bookingService.create(booking, id);
        }else {
            resp = bookingService.create(booking);
        }
        Processor.errorHandler(resp);
        return resp;
    }


    @PostMapping("/bookings/update")
    public String update(@RequestBody String booking) throws IOException {
        JsonNode rootNode = Processor.toJson(booking);
        String id = rootNode.path("id").toString().replace("\"", "");
        String resp = bookingService.update(id, rootNode.toString());
        Processor.errorHandler(resp);
        return  resp;
    }


    //----------------------
    //----------DELETE------------
    //----------------------

    @DeleteMapping("/bookings/delete")
    public String delete(@RequestParam(name = "id") String id) throws IOException {
        String resp = bookingService.delete(id);
        Processor.errorHandler(resp);
        return  resp;
    }


}
