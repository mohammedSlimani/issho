package issho.elastic.controllers;


import issho.elastic.services.PostService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
public class PostController {

    PostService postService = new PostService("posts");

    @GetMapping("/posts/all")
    public String getAll() throws IOException {
        return  postService.getAll();
    }

    @GetMapping("/posts/userId")
    public String getByUser(@RequestParam(name="userId") String userId) throws IOException {
        return postService.getByUser(userId);
    }



}
