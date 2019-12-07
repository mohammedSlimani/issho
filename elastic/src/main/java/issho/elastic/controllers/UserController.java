package issho.elastic.controllers;


import issho.elastic.services.UserService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
public class UserController {


    UserService userService = new UserService("users");

    @GetMapping("/users/all")
    public String getAll() throws IOException {
        return userService.read().toString();
    }

    @GetMapping("/users/id")
    public String getById(@RequestParam(name = "id") String id) throws IOException {
        return  userService.getById(id);
    }

    @GetMapping("/users/email")
    public String getByEmail(@RequestParam(name = "email") String email) throws IOException {
        return  userService.getByEmail(email);
    }

    @GetMapping("/users/name")
    public String getByName(@RequestParam(name = "name") String name) throws IOException {
        return  userService.getByName(name);
    }



}
