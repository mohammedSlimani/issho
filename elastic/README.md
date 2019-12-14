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



#### about POST/create requests
```
if u send an object with its id defined { id:"smsmsms".. } it s goin to be inserted using that same id,
otherwise elasticsearch will define its own id
```



---
#### - users

---

### `GET` 

| root  | description |
| ------ | ------------- |
| ` /users/all `  | get all users  |
| ` /users/id{id} `  | get user by id  |
| ` /users/email{email} `  | get user by email  |
| ` /users/name{name} `  | get user by name  |
| ` /users/exists{id} `  | return if user exists or not  |

### `POST`

| root  | description |
| ------------- | ------------- |
| ` /users/create `  | create user  |
| ` /users/update `  | update user  |

### `DELETE`

| root  | description |
| ------------- | ------------- |




---
#### - posts

---

### `GET`

| root  | description |
| ------------- | ------------- |
| ` /posts/all `  | get all posts  |
| ` /posts/id{id} `  | returns post by id  |
| ` /posts/userId{userId} `  | get posts by userId  |


### `POST`

| root  | description |
| ------------- | ------------- |
| ` /posts/create `  | creates a post  |
| ` /posts/update `  | updates a post  |

### `DELETE`

| root  | description |
| ------------- | ------------- |
| ` /users/delete{id} `  | deletes a post  |


---
#### - bookings

---

### `GET`

| root  | description |
| ------------- | ------------- |
| ` /bookings/all `  | returns all bookings  |
| ` /bookings/id{id} `  | returns booking by id  |
| ` /bookings/userId{userId} `  | return all bookings of a specific user by userId  |
| ` /bookings/userId{postId} `  | return all bookings of a specific post postId  |
| ` /bookings/countByPost{postId} `  | returns the count of bookings on a specific post  |

### `POST`

| root  | description |
| ------------- | ------------- |
| ` /bookings/create `  | creates a booking  |
| ` /bookings/update `  | updates a booking  |

### `DELETE`

| root  | description |
| ------------- | ------------- |
| ` /bookings/delete{id} `  | deletes the booking with id  |
