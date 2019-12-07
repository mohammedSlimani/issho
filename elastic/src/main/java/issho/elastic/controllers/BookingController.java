package issho.elastic.controllers;


import issho.elastic.services.BookingService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
public class BookingController {

    BookingService bookingService = new BookingService("bookings");

    @GetMapping("bookings/userId")
    public String getByUser(@RequestParam(name = "userId") String userId) throws IOException {
        return bookingService.getByUser(userId);
    }

    @GetMapping("bookings/postId")
    public String getByPost(@RequestParam(name = "postId") String postId) throws IOException {
        return bookingService.getByPost(postId);
    }


}
