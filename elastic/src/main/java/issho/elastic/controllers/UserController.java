package issho.elastic.controllers;


import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import issho.elastic.services.UserService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.awt.*;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.Map;
import issho.elastic.helpers.*;

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
        JsonNode rootNode = Processor.toJson(user);
        String id = rootNode.path("id").toString().replace("\"", "");
        String resp = "";
        if (StringUtils.isEmpty(id)){
            resp =  userService.create(user, id);
        }else {
            resp = userService.create(user);
        }
        Processor.errorHandler(resp);
        return resp;
    }


    @PostMapping("/users/update")
    public String update(@RequestBody String user) throws IOException {
        JsonNode rootNode = Processor.toJson(user);
        String resp = userService.update(rootNode.path("id").toString().replace("\"", ""), rootNode.toString());
        Processor.errorHandler(resp);
        return resp;
    }




}
