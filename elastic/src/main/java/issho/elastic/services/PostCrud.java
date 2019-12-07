package issho.elastic.services;


import org.springframework.stereotype.Service;

import java.io.IOException;


@Service
public class PostCrud extends ElasticCrud{


    public PostCrud(String host, Integer port, String user, String password, String index) {
        super(host, port, user, password, index);
        this.Init();
    }

    public String getAll() throws IOException {
        System.out.println(this.read().toString());
        return this.read().toString();
    }

}
