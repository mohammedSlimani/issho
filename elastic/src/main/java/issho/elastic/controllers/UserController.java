package issho.elastic.controllers;


import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import issho.elastic.services.UserService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.web.bind.annotation.*;

import java.awt.*;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.Map;

@RestController
public class UserController {


    UserService userService = new UserService("users");

    public UserController() throws IOException {
    }

    //----------------------
    //----------GET------------
    //----------------------

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

    @GetMapping("/users/exists")
    public String getExists(@RequestParam(name = "userId") String userId) throws IOException {
        return  userService.exists(userId);
    }


    //----------------------
    //----------POST------------
    //----------------------

    @PostMapping("/users/create")
    public String create(@RequestBody String user) throws IOException {
        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode rootNode = objectMapper.readTree(user);
        String id = rootNode.path("id").toString().replace("\"", "");
        if (StringUtils.isEmpty(id)){
            return userService.create(user, id);
        }else {
            return userService.create(user);
        }
    }


    @PostMapping("/users/update")
    public String update(@RequestBody String object) throws IOException {
        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode rootNode = objectMapper.readTree(object);
        return userService.update(rootNode.path("id").toString().replace("\"", ""), rootNode.toString());
    }




}
