package issho.elastic.services;

import issho.elastic.helpers.Processor;
import org.elasticsearch.action.search.SearchRequest;
import org.elasticsearch.client.RequestOptions;
import org.elasticsearch.client.core.CountRequest;
import org.elasticsearch.index.query.BoolQueryBuilder;
import org.elasticsearch.index.query.QueryBuilders;
import org.elasticsearch.search.SearchHit;
import org.elasticsearch.search.SearchHits;
import org.elasticsearch.search.builder.SearchSourceBuilder;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class BookingService extends ElasticCrud{

    public BookingService(String index) throws IOException {
        super(index);
    }

    public String getByPost(String postId) throws IOException {
        SearchRequest searchRequest = new SearchRequest(this.index);
        SearchSourceBuilder searchSourceBuilder = new SearchSourceBuilder();
        searchSourceBuilder.query(QueryBuilders.matchPhraseQuery("postId", postId));
        searchRequest.source(searchSourceBuilder);
        SearchHits searchHits = this.client.search(searchRequest, RequestOptions.DEFAULT).getHits();
        List<Map> hits = new ArrayList<Map>();
        for (SearchHit hit : searchHits) {
            hits.add(hit.getSourceAsMap());
        }
        return Processor.constructResp(200, hits);
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



    public String getCountByPost(String postId) throws IOException {
        CountRequest countRequest = new CountRequest();
        SearchSourceBuilder searchSourceBuilder = new SearchSourceBuilder();
        searchSourceBuilder.query(QueryBuilders.matchPhraseQuery("postId", postId));
        countRequest.source(searchSourceBuilder);
        long count =   this.client.count(countRequest, RequestOptions.DEFAULT).getCount();
        return Processor.constructResp(200, count);

    }


}
