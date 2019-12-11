package issho.elastic.services;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.http.HttpHost;
import org.apache.http.auth.AuthScope;
import org.apache.http.auth.UsernamePasswordCredentials;
import org.apache.http.client.CredentialsProvider;
import org.apache.http.impl.client.BasicCredentialsProvider;
import org.apache.http.impl.nio.client.HttpAsyncClientBuilder;
import org.elasticsearch.action.admin.indices.refresh.RefreshRequest;
import org.elasticsearch.action.delete.DeleteRequest;
import org.elasticsearch.action.delete.DeleteResponse;
import org.elasticsearch.action.get.GetRequest;
import org.elasticsearch.action.index.IndexRequest;
import org.elasticsearch.action.index.IndexResponse;
import org.elasticsearch.action.search.SearchRequest;
import org.elasticsearch.client.RequestOptions;
import org.elasticsearch.client.RestClient;
import org.elasticsearch.client.RestClientBuilder;
import org.elasticsearch.client.RestHighLevelClient;
import org.elasticsearch.common.xcontent.XContentType;
import org.elasticsearch.index.query.QueryBuilders;
import org.elasticsearch.search.SearchHit;
import org.elasticsearch.search.SearchHits;
import org.elasticsearch.search.builder.SearchSourceBuilder;
import org.elasticsearch.search.fetch.subphase.FetchSourceContext;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public abstract class ElasticCrud {

    // config to be imported
    String host = "kafka-course-8169368270.eu-west-1.bonsaisearch.net";
    Integer port = 443;
    String user = "mrgm7glbc3";
    String password = "2wl1bgvk9f";

    String index;

    RestHighLevelClient client;


    public ElasticCrud(String index) throws IOException {
        this.index = index;
        this.Init();
    }

    public void refresh() throws IOException {
        RefreshRequest request = new RefreshRequest(this.index);
        this.client.indices().refresh(request, RequestOptions.DEFAULT);
    }


    public void Init() throws IOException {
        // read from config.json
        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode rootNode = objectMapper.readTree(new File("config.json")).path("dev_1");
        this.host = rootNode.path("host").toString().replace("\"", "");
        this.port = rootNode.path("port").asInt();
        this.user = rootNode.path("user").toString().replace("\"", "");
        this.password = rootNode.path("password").toString().replace("\"", "");

        // credentials
        final CredentialsProvider credentialsProvider = new BasicCredentialsProvider();
        credentialsProvider.setCredentials(AuthScope.ANY,
                new UsernamePasswordCredentials(this.user, this.password));

        // host:port
        RestClientBuilder builder = RestClient.builder(new HttpHost(this.host, this.port, "https"))
                .setHttpClientConfigCallback(new RestClientBuilder.HttpClientConfigCallback() {
            @Override
            public HttpAsyncClientBuilder customizeHttpClient(HttpAsyncClientBuilder httpAsyncClientBuilder) {
                return httpAsyncClientBuilder.setDefaultCredentialsProvider(credentialsProvider);
            }
        });
        this.client = new RestHighLevelClient(builder);
    }

    public void Destroy() throws IOException {
        this.client.close();
    }

    public String create(String object) throws IOException {
        IndexRequest request = new IndexRequest(this.index);
        request.source(object, XContentType.JSON);
        IndexResponse res =  this.client.index(request, RequestOptions.DEFAULT);
        this.refresh();
        if (res.getResult().toString() == "CREATED"){
            return  object;
        }
        return "ERROR 503: " + res;
    }

    public String create(String object, String id) throws IOException {
        IndexRequest request = new IndexRequest(this.index).id(id);
        request.source(object, XContentType.JSON);
        IndexResponse res =  this.client.index(request, RequestOptions.DEFAULT);
        this.refresh();
        if (res.getResult().toString() == "CREATED"){
            return  object;
        }
        return "ERROR 503: " + res;
    }

    public List<String> read() throws IOException {
        SearchRequest searchRequest = new SearchRequest(this.index);
        SearchSourceBuilder searchSourceBuilder = new SearchSourceBuilder();
        searchSourceBuilder.query(QueryBuilders.matchAllQuery()).size( 100 );
        searchRequest.source(searchSourceBuilder);
        SearchHits searchHits = this.client.search(searchRequest, RequestOptions.DEFAULT).getHits();
        List<String> hits = new ArrayList<String>();
        for (SearchHit hit : searchHits) {
            hits.add(hit.getSourceAsString());
        }
        return hits;
    }

    public String update(String id, String object) throws IOException {
        IndexRequest request = new IndexRequest(this.index).id(id);
        request.source(object, XContentType.JSON);
        this.client.index(request, RequestOptions.DEFAULT);
        IndexResponse res =  this.client.index(request, RequestOptions.DEFAULT);
        this.refresh();
        if (res.getResult().toString() == "UPDATED"){
            return  object;
        }
        return "ERROR 503: " + res;
    }


    public String delete(String id) throws IOException {
        DeleteRequest request = new DeleteRequest(
                this.index,
                id);
        DeleteResponse res = this.client.delete(request, RequestOptions.DEFAULT);
        this.refresh();
        if (res.getResult().toString() == "DELETED"){
            return "DELETED";
        }
        return "ERROR 503: " + res;
    }

    public String getById(String id) throws IOException {
        GetRequest getRequest = new GetRequest(
                this.index,
                id);
        return this.client.get(getRequest, RequestOptions.DEFAULT).getSourceAsString();
    }


    public String exists(String id) throws  IOException{
        GetRequest getRequest = new GetRequest( this.index, id);
        getRequest.fetchSourceContext(new FetchSourceContext(false));
        return  Boolean.toString(this.client.exists(getRequest, RequestOptions.DEFAULT));
    }









}
