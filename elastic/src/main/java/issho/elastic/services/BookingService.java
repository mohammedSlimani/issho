package issho.elastic.services;

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

public class BookingService extends ElasticCrud{

    public BookingService(String index) {
        super(index);
    }

    public String getByPost(String postId) throws IOException {
        SearchRequest searchRequest = new SearchRequest(this.index);
        SearchSourceBuilder searchSourceBuilder = new SearchSourceBuilder();

        BoolQueryBuilder query = QueryBuilders.boolQuery()
                .filter(QueryBuilders.termsQuery("postId", postId));

        searchSourceBuilder.query(query);
        searchRequest.source(searchSourceBuilder);

        SearchHits searchHits = this.client.search(searchRequest, RequestOptions.DEFAULT).getHits();
        List<String> hits = new ArrayList<String>();
        for (SearchHit hit : searchHits) {
            hits.add(hit.getSourceAsString());
        }
        return hits.toString();
    }


    public String getByUser(String userId) throws IOException {
        SearchRequest searchRequest = new SearchRequest(this.index);
        SearchSourceBuilder searchSourceBuilder = new SearchSourceBuilder();

        BoolQueryBuilder query = QueryBuilders.boolQuery()
                .filter(QueryBuilders.termsQuery("userId", userId));

        searchSourceBuilder.query(query);
        searchRequest.source(searchSourceBuilder);

        SearchHits searchHits = this.client.search(searchRequest, RequestOptions.DEFAULT).getHits();
        List<String> hits = new ArrayList<String>();
        for (SearchHit hit : searchHits) {
            hits.add(hit.getSourceAsString());
        }
        return hits.toString();
    }


}
