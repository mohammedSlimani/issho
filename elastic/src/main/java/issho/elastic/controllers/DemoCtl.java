package issho.elastic.controllers;


import issho.elastic.services.PostService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
public class DemoCtl {

    private PostService postService = new PostService("posts");

    @GetMapping("/posts")
    public String getAll() throws IOException {
        return "lots of posts";
    }
}
