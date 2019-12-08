# Elasticsearch - Spring Boot
## how to run the server

- package the project into a single jar
```
mvn package
```
### on your local machine ?
- Run the server
```
java -jar elastic-1.0.jar
```

### in a docker container ?
- this builds a docker image containing the jar
```
docker build -t elasticspring .
```
- Run
```
docker run -p 8080:8080 elasticspring
```


#### test
- gets all posts from bonsai
```
curl -X GET localhost:8080/posts/all
```

#### config.json
- contains hosting config on the cloud
- I recommend u use the dev_2 configuration
``` 
Kibana_link: https://05afd5b9ac8f4cb885d44ba7c7dfbfd8.us-east-1.aws.found.io:9243/
username: elastic
password: qNysViGBcEkKjV0j5jUBvTlt
```

