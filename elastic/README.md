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