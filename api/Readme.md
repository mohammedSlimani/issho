# Api Microservice

## How to run the server on your machine

- First make sure you are on the directory API then install the dependencies:
```
yarn install
```
- Run the server of the elastic search, Check the readme under the directory ``elastic`` then start the server:
```
yarn start
```

- That's it!! You can use Postman, or insomnia to Test the routes

# Routes:
- The root of the api is the address where it is deployed
- For example, When you are running localy it is localhost:3000 
- the parametres under brackets are sent in the POST body as JSON
## User Routes:
- Signup
```
POST $API_ROOT/users/signup
{
  name,
  email,
  pwd
}
```

- Signin
```
POST $API_ROOT/users/signin
{
 pwd,
 email
}
```

- Edit Profile Info
```
PATCH $ROOT_API/users/:id
{
  name, //optional
  pwd, //optional
}
```

- GOOGLE OUATH (these information can be obtained after you authenticate with google in the FrontEnd )
```
POST $API_ROOT/users/googleouath
{
  email,
  name,
  googleId,
  image
}
```

- Delete User (Not fully implemented)
```
DELETE $API_ROOT/users/:id
```

- Search Users 
```
POST $API_ROOT/users
{
  name, // optional
  email // optional
}
```

## POSTS
- Add Post
```
POST $API_ROOT/posts
{
  authorId,
  title,
  des
}
```

- Approve User
```
POST $API_ROOT/posts/approve
{
  postId,
  userId
}
```

- Reject User
```
POST $API_ROOT/posts/reject
{
  postId,
  userId
}
```

- Subscribe User
```
POST $API_ROOT/posts/subscribe
{
  postId,
  userId
}
```


- Unsubscribe User
```
POST $API_ROOT/posts/unsubscribe
{
  postId,
  userId
}
```

- Delete POST
```
DELETE $API_ROOT/delete
{
  id, //of the post
  userId, // of the user who made the post just for security 
}
```

- Edit POST
```
PATCH $API_ROOT/posts/:id
{
  authorId, //of the one who made the post just for security check
  title, //optional
  des, //optional
}
```
