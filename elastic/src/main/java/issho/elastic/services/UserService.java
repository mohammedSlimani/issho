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

public class UserService extends ElasticCrud {

    public UserService(String index) {
        super(index);
    }


    public String getByEmail(String email) throws IOException {

        SearchRequest searchRequest = new SearchRequest(this.index);
        SearchSourceBuilder searchSourceBuilder = new SearchSourceBuilder();

        BoolQueryBuilder query = QueryBuilders.boolQuery()
                .filter(QueryBuilders.termsQuery("email", email));

        searchSourceBuilder.query(query);
        searchRequest.source(searchSourceBuilder);

        SearchHits searchHits = this.client.search(searchRequest, RequestOptions.DEFAULT).getHits();
        List<String> hits = new ArrayList<String>();
        for (SearchHit hit : searchHits) {
            hits.add(hit.getSourceAsString());
        }
        return hits.get(0);
    }

    public String getByName(String name) throws IOException {

        SearchRequest searchRequest = new SearchRequest(this.index);
        SearchSourceBuilder searchSourceBuilder = new SearchSourceBuilder();

        BoolQueryBuilder query = QueryBuilders.boolQuery()
                .filter(QueryBuilders.termsQuery("name", name));

        searchSourceBuilder.query(query);
        searchRequest.source(searchSourceBuilder);

        SearchHits searchHits = this.client.search(searchRequest, RequestOptions.DEFAULT).getHits();
        List<String> hits = new ArrayList<String>();
        for (SearchHit hit : searchHits) {
            hits.add(hit.getSourceAsString());
        }
        return hits.get(0);

    }
}
