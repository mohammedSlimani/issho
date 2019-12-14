package issho.elastic.services;


import issho.elastic.helpers.Processor;
import org.elasticsearch.action.search.SearchRequest;
import org.elasticsearch.client.RequestOptions;
import org.elasticsearch.index.query.BoolQueryBuilder;
import org.elasticsearch.index.query.QueryBuilders;
import org.elasticsearch.search.SearchHit;
import org.elasticsearch.search.SearchHits;
import org.elasticsearch.search.builder.SearchSourceBuilder;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;


public class PostService extends ElasticCrud{

    public PostService(String index) throws IOException {
        super(index);
        this.Init();
    }

    public String getAll() throws IOException {
        return this.read().toString();
    }


    public String getByUser(String userId) throws IOException {
        SearchRequest searchRequest = new SearchRequest(this.index);
        SearchSourceBuilder searchSourceBuilder = new SearchSourceBuilder();
        searchSourceBuilder.query(QueryBuilders.matchPhraseQuery("userId", userId));
        searchRequest.source(searchSourceBuilder);
        SearchHits searchHits = this.client.search(searchRequest, RequestOptions.DEFAULT).getHits();
        List<Map> hits = new ArrayList<Map>();
        for (SearchHit hit : searchHits) {
            hits.add(hit.getSourceAsMap());
        }
        return Processor.constructResp(200, hits);
    }


}
