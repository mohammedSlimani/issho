package issho.elastic.services;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.elasticsearch.action.search.SearchRequest;
import org.elasticsearch.client.RequestOptions;
import org.elasticsearch.index.query.BoolQueryBuilder;
import org.elasticsearch.index.query.QueryBuilders;
import org.elasticsearch.search.SearchHit;
import org.elasticsearch.search.SearchHits;
import org.elasticsearch.search.builder.SearchSourceBuilder;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import issho.elastic.helpers.*;
public class UserService extends ElasticCrud {

    public UserService(String index) throws IOException {
        super(index);
    }


    public String getByEmail(String email) throws IOException {

        SearchRequest searchRequest = new SearchRequest(this.index);
        SearchSourceBuilder searchSourceBuilder = new SearchSourceBuilder();
        searchSourceBuilder.query(QueryBuilders.matchPhraseQuery("email", email) );
        searchRequest.source(searchSourceBuilder);

        SearchHits searchHits = this.client.search(searchRequest, RequestOptions.DEFAULT).getHits();

        List<Map> hits = new ArrayList<Map>();
        for (SearchHit hit : searchHits) {
            hits.add(hit.getSourceAsMap());
        }
        if (hits.size() == 0){
            return  Processor.constructResp(200, new ObjectMapper().readTree("{}") );
        }
        return  Processor.constructResp(200, hits.get(0) );
    }

    public String getByName(String name) throws IOException {

        SearchRequest searchRequest = new SearchRequest(this.index);
        SearchSourceBuilder searchSourceBuilder = new SearchSourceBuilder();
        searchSourceBuilder.query(QueryBuilders.matchQuery("name", name)  );
        searchRequest.source(searchSourceBuilder);

        SearchHits searchHits = this.client.search(searchRequest, RequestOptions.DEFAULT).getHits();
        List<Map> hits = new ArrayList<Map>();
        for (SearchHit hit : searchHits) {
            hits.add(hit.getSourceAsMap());
        }

        if (hits.size() == 0){
            return  Processor.constructResp(200, new ObjectMapper().readTree("{}") );
        }
        return  Processor.constructResp(200, hits );

    }
}
