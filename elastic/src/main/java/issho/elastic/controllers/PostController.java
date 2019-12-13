package issho.elastic.controllers;


import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import issho.elastic.services.PostService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import issho.elastic.helpers.Processor;
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

    @GetMapping("posts/id")
    public String getById(@RequestParam(name = "id") String id) throws IOException {
        String resp =  postService.getById(id);
        Processor.errorHandler(resp);
        return  resp;
    }

    @GetMapping("/posts/userId")
    public String getByUser(@RequestParam(name="userId") String userId) throws IOException {
        String resp = postService.getByUser(userId);
        Processor.errorHandler(resp);
        return  resp;
    }

    //----------------------
    //----------POST------------
    //----------------------
    @PostMapping("posts/create")
    public String create(@RequestBody String post) throws IOException {
        JsonNode rootNode = Processor.toJson(post);
        String id = rootNode.path("id").toString().replace("\"", "");
        String resp ="";
        if (! StringUtils.isEmpty(id)){
            resp =  postService.create(post, id);
        }else {
            resp = postService.create(post);
        }
        Processor.errorHandler(resp);
        return  resp;
    }

    @PostMapping("posts/update")
    public String update(@RequestBody String post) throws IOException {
        JsonNode rootNode = Processor.toJson(post);
        String resp =  postService.update(rootNode.path("id").toString().replace("\"", ""), rootNode.toString());
        Processor.errorHandler(resp);
        return  resp;
    }


    //----------------------
    //----------DELETE------------
    //----------------------
    @DeleteMapping("/posts/delete")
    public String delete(@RequestParam(name = "id") String id) throws IOException {
        String resp = postService.delete(id);
        Processor.errorHandler(resp);
        return  resp;
    }




}
