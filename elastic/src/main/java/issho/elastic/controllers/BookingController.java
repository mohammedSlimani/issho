package issho.elastic.controllers;


import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import issho.elastic.services.BookingService;
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

    //----------------------
    //----------POST------------
    //----------------------


    @PostMapping("/bookings/create")
    public void create(@RequestBody String booking) throws IOException {
        bookingService.create(booking);
    }


    @PostMapping("/bookings/update")
    public void update(@RequestBody String booking) throws IOException {
        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode rootNode = objectMapper.readTree(booking);
        bookingService.update(rootNode.path("id").toString().replace("\"", ""), rootNode.toString());
    }





    //----------------------
    //----------DELETE------------
    //----------------------

    @DeleteMapping("/bookings/delete")
    public void delete(@RequestParam(name = "id") String id) throws IOException {
        bookingService.delete(id);
    }


}
