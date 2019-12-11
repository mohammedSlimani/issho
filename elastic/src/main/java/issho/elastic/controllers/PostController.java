package issho.elastic.controllers;


import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import issho.elastic.services.PostService;
import org.apache.commons.lang3.StringUtils;
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
    public String create(@RequestBody String post) throws IOException {
        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode rootNode = objectMapper.readTree(post);
        String id = rootNode.path("id").toString().replace("\"", "");
        if (! StringUtils.isEmpty(id)){
            return postService.create(post, id);
        }else {
            return postService.create(post);
        }
    }

    @PostMapping("posts/update")
    public String update(@RequestBody String post) throws IOException {
        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode rootNode = objectMapper.readTree(post);
        return postService.update(rootNode.path("id").toString().replace("\"", ""), rootNode.toString());
    }


    //----------------------
    //----------DELETE------------
    //----------------------
    @DeleteMapping("/posts/delete")
    public String delete(@RequestParam(name = "id") String id) throws IOException {
        return postService.delete(id);
    }




}
