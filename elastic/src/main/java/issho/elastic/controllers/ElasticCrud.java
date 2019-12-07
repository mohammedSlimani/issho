package issho.elastic.controllers;

import org.apache.http.HttpHost;
import org.elasticsearch.action.delete.DeleteRequest;
import org.elasticsearch.action.get.GetRequest;
import org.elasticsearch.action.index.IndexRequest;
import org.elasticsearch.action.search.SearchRequest;
import org.elasticsearch.action.update.UpdateRequest;
import org.elasticsearch.client.RequestOptions;
import org.elasticsearch.client.RestClient;
import org.elasticsearch.client.RestClientBuilder;
import org.elasticsearch.client.RestHighLevelClient;
import org.elasticsearch.common.xcontent.XContentType;
import org.elasticsearch.index.query.QueryBuilders;
import org.elasticsearch.search.SearchHit;
import org.elasticsearch.search.SearchHits;
import org.elasticsearch.search.builder.SearchSourceBuilder;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public abstract class ElasticCrud {

    String host;
    Integer port;
    String index;
    RestHighLevelClient client;


    public ElasticCrud(String host, Integer port, String index) {
        this.host = host;
        this.port = port;
        this.index = index;
    }


    public void Init(){
        RestClientBuilder builder = RestClient.builder(new HttpHost(this.host, this.port, "http"));
        this.client = new RestHighLevelClient(builder);
    }

    public void Destroy() throws IOException {
        this.client.close();
    }

    public String getById(String id) throws IOException {
        GetRequest getRequest = new GetRequest(
                this.index,
                id);
        return this.client.get(getRequest, RequestOptions.DEFAULT).getSource().toString();
    }

    public void create(String object) throws IOException {
        IndexRequest request = new IndexRequest(this.index);
        request.source(object, XContentType.JSON);
        this.client.index(request, RequestOptions.DEFAULT);
    }

    public List<String> read() throws IOException {
        SearchRequest searchRequest = new SearchRequest(this.index);
        SearchSourceBuilder searchSourceBuilder = new SearchSourceBuilder();
        searchSourceBuilder.query(QueryBuilders.matchAllQuery());
        searchRequest.source(searchSourceBuilder);

        SearchHits searchHits = this.client.search(searchRequest, RequestOptions.DEFAULT).getHits();
        List<String> hits = new ArrayList<String>();
        for (SearchHit hit : searchHits) {
            hits.add(hit.getSourceAsString());
        }
        return hits;
    }

    public void update(String id, String object) throws IOException {
        UpdateRequest request = new UpdateRequest(this.index, id);
        request.doc(object, XContentType.JSON);
        this.client.update(request, RequestOptions.DEFAULT);
    }


    public void delete(String id) throws IOException {
        DeleteRequest request = new DeleteRequest(
                this.index,
                id);
        this.client.delete(request, RequestOptions.DEFAULT);
    }









}
