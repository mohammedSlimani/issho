package issho.elastic.controllers;


import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import issho.elastic.services.PostService;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
public class PostController {

    PostService postService = new PostService("posts");

    public PostController() throws IOException {
    }


    //----------------------
    //----------GET------------
    //----------------------

    @GetMapping("/posts/all")
    public String getAll() throws IOException {
        return  postService.getAll();
    }

    @GetMapping("/posts/userId")
    public String getByUser(@RequestParam(name="userId") String userId) throws IOException {
        return postService.getByUser(userId);
    }

    //----------------------
    //----------POST------------
    //----------------------
    @PostMapping("posts/create")
    public void create(@RequestBody String post) throws IOException {
        postService.create(post);
    }

    @PostMapping("posts/update")
    public void update(@RequestBody String post) throws IOException {
        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode rootNode = objectMapper.readTree(post);
        postService.update(rootNode.path("id").toString().replace("\"", ""), rootNode.toString());
    }


    //----------------------
    //----------DELETE------------
    //----------------------
    @DeleteMapping("/posts/delete")
    public void delete(@RequestParam(name = "id") String id) throws IOException {
        postService.delete(id);
    }




}
