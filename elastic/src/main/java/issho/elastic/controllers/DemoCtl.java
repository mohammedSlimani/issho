package issho.elastic.controllers;


import issho.elastic.services.PostCrud;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.List;

@RestController
public class DemoCtl {

    private PostCrud postCrud = new PostCrud("kafka-course-8169368270.eu-west-1.bonsaisearch.net", 443, "mrgm7glbc3", "2wl1bgvk9f", "posts");

    @GetMapping("/posts")
    public String getAll() throws IOException {
        return postCrud.getAll();
    }
}
