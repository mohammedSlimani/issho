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
        searchSourceBuilder.query(QueryBuilders.matchPhraseQuery("email", email) );
        searchRequest.source(searchSourceBuilder);

        SearchHits searchHits = this.client.search(searchRequest, RequestOptions.DEFAULT).getHits();

        List<String> hits = new ArrayList<String>();
        for (SearchHit hit : searchHits) {
            hits.add(hit.getSourceAsString());
        }
        if (hits.size() == 0){
            return "{}";
        }
        return hits.get(0);
    }

    public String getByName(String name) throws IOException {

        SearchRequest searchRequest = new SearchRequest(this.index);
        SearchSourceBuilder searchSourceBuilder = new SearchSourceBuilder();
        searchSourceBuilder.query(QueryBuilders.matchPhraseQuery("name", name));
        searchRequest.source(searchSourceBuilder);

        SearchHits searchHits = this.client.search(searchRequest, RequestOptions.DEFAULT).getHits();
        List<String> hits = new ArrayList<String>();
        for (SearchHit hit : searchHits) {
            hits.add(hit.getSourceAsString());
        }

        if (hits.size() == 0){
            return "{}";
        }
        return hits.get(0);

    }
}
