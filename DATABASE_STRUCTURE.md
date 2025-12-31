# Connect Hub - Database Structure Diagram

## 📊 Complete Database Architecture

### Entity Relationship Diagram (ERD)

```
                          ┌─────────────────────────────────────┐
                          │          USER COLLECTION            │
                          ├─────────────────────────────────────┤
                          │ _id: ObjectId (Primary Key)         │
                          │ username: String (unique)           │
                          │ email: String (unique)              │
                          │ password: String (hashed)           │
                          │ profilePicture: String (URL)        │
                          │ bio: String                         │
                          │ gender: String (male/female)        │
                          │ followers: [ObjectId] ◄─────────┐   │
                          │ following: [ObjectId] ◄────────┐│   │
                          │ posts: [ObjectId] ◄──────────┐││   │
                          │ bookmarks: [ObjectId] ◄──────┐│││   │
                          │ createdAt: Date             ││││   │
                          │ updatedAt: Date             ││││   │
                          └─────────────────────────────────────┘
                                    │        │
                    ┌───────────────┘        │
                    │                        │
                    │    ┌──────────────────┘
                    │    │
                    ▼    ▼
          ┌──────────────────────┐        ┌──────────────────────┐
          │   POST COLLECTION    │        │  COMMENT COLLECTION  │
          ├──────────────────────┤        ├──────────────────────┤
          │ _id: ObjectId (PK)   │        │ _id: ObjectId (PK)   │
          │ caption: String      │        │ text: String         │
          │ image: String (URL)  │────┐   │ author: ObjectId (FK)│
          │ author: ObjectId(FK) │    │   │ post: ObjectId (FK)  │
          │ likes: [ObjectId]    │    │   │ createdAt: Date      │
          │ comments: [ObjectId] │◄───┼───│ updatedAt: Date      │
          │ createdAt: Date      │    │   └──────────────────────┘
          │ updatedAt: Date      │    │
          └──────────────────────┘    │
                                      │
                                      └──────────► Post reference
                                                    in Comment

          ┌──────────────────────┐        ┌──────────────────────────┐
          │ MESSAGE COLLECTION   │        │ CONVERSATION COLLECTION  │
          ├──────────────────────┤        ├──────────────────────────┤
          │ _id: ObjectId (PK)   │        │ _id: ObjectId (PK)       │
          │ message: String      │        │ participants: [ObjectId] │
          │ senderId: ObjectId   │────┐   │   (2 Users)              │
          │   (FK → User)        │    │   │ messages: [ObjectId]     │
          │ receiverId: ObjectId │    │   │   (FK → Messages)        │
          │   (FK → User)        │    │   │ createdAt: Date          │
          │ createdAt: Date      │    │   │ updatedAt: Date          │
          │ updatedAt: Date      │    └───│                          │
          └──────────────────────┘        └──────────────────────────┘
```

---

## 🗄️ Database Collections Detailed Schema

### 1. USER Collection

```javascript
{
  "_id": ObjectId("507f1f77bcf86cd799439011"),
  "username": "john_doe",
  "email": "john@example.com",
  "password": "$2b$10$abcdefghijklmnopqrstuvwxyz123...", // bcrypt hashed
  "profilePicture": "https://cloudinary.com/image_url",
  "bio": "Photography enthusiast | Traveler",
  "gender": "male",
  
  // Array of ObjectIds referencing other Users (followers)
  "followers": [
    ObjectId("507f1f77bcf86cd799439012"),
    ObjectId("507f1f77bcf86cd799439013"),
    ObjectId("507f1f77bcf86cd799439014")
  ],
  
  // Array of ObjectIds referencing other Users (following)
  "following": [
    ObjectId("507f1f77bcf86cd799439015"),
    ObjectId("507f1f77bcf86cd799439016")
  ],
  
  // Array of ObjectIds referencing Posts
  "posts": [
    ObjectId("607f1f77bcf86cd799439017"),
    ObjectId("607f1f77bcf86cd799439018"),
    ObjectId("607f1f77bcf86cd799439019")
  ],
  
  // Array of ObjectIds referencing Bookmarked Posts
  "bookmarks": [
    ObjectId("607f1f77bcf86cd799439020"),
    ObjectId("607f1f77bcf86cd799439021")
  ],
  
  "createdAt": ISODate("2023-12-01T10:30:00.000Z"),
  "updatedAt": ISODate("2023-12-06T15:45:30.000Z")
}
```

**Key Relationships:**
- `followers[]` → Array of User IDs who follow this user
- `following[]` → Array of User IDs this user follows
- `posts[]` → Array of Post IDs created by this user
- `bookmarks[]` → Array of Post IDs bookmarked by this user

**Indexes (Recommended):**
```javascript
db.users.createIndex({ "username": 1 }, { unique: true })
db.users.createIndex({ "email": 1 }, { unique: true })
db.users.createIndex({ "createdAt": -1 })
```

---

### 2. POST Collection

```javascript
{
  "_id": ObjectId("607f1f77bcf86cd799439017"),
  
  "caption": "Beautiful sunset at the beach! 🌅",
  
  "image": "https://cloudinary.com/posts/sunset_image_url",
  
  // Reference to User who created the post
  "author": ObjectId("507f1f77bcf86cd799439011"),
  
  // Array of UserIds who liked this post
  "likes": [
    ObjectId("507f1f77bcf86cd799439012"),
    ObjectId("507f1f77bcf86cd799439013"),
    ObjectId("507f1f77bcf86cd799439014"),
    ObjectId("507f1f77bcf86cd799439015")
  ],
  
  // Array of CommentIds on this post
  "comments": [
    ObjectId("707f1f77bcf86cd799439022"),
    ObjectId("707f1f77bcf86cd799439023"),
    ObjectId("707f1f77bcf86cd799439024")
  ],
  
  "createdAt": ISODate("2023-12-05T08:20:00.000Z"),
  "updatedAt": ISODate("2023-12-06T12:15:30.000Z")
}
```

**Key Relationships:**
- `author` → Single User ID (1-to-Many: User → Posts)
- `likes[]` → Array of User IDs who liked
- `comments[]` → Array of Comment IDs

**Indexes (Recommended):**
```javascript
db.posts.createIndex({ "author": 1, "createdAt": -1 })
db.posts.createIndex({ "createdAt": -1 })
db.posts.createIndex({ "likes": 1 })
```

---

### 3. COMMENT Collection

```javascript
{
  "_id": ObjectId("707f1f77bcf86cd799439022"),
  
  "text": "Amazing shot! Love the colors! 📸",
  
  // Reference to User who commented
  "author": ObjectId("507f1f77bcf86cd799439012"),
  
  // Reference to Post being commented on
  "post": ObjectId("607f1f77bcf86cd799439017"),
  
  "createdAt": ISODate("2023-12-05T09:30:00.000Z"),
  "updatedAt": ISODate("2023-12-05T09:30:00.000Z")
}
```

**Key Relationships:**
- `author` → Single User ID (Many Comments per User)
- `post` → Single Post ID (Many Comments per Post)

**Indexes (Recommended):**
```javascript
db.comments.createIndex({ "post": 1, "createdAt": -1 })
db.comments.createIndex({ "author": 1 })
db.comments.createIndex({ "createdAt": -1 })
```

---

### 4. MESSAGE Collection

```javascript
{
  "_id": ObjectId("807f1f77bcf86cd799439025"),
  
  "message": "Hey! How are you doing?",
  
  // Reference to User sending the message
  "senderId": ObjectId("507f1f77bcf86cd799439011"),
  
  // Reference to User receiving the message
  "receiverId": ObjectId("507f1f77bcf86cd799439012"),
  
  "createdAt": ISODate("2023-12-06T14:20:00.000Z"),
  "updatedAt": ISODate("2023-12-06T14:20:00.000Z")
}
```

**Key Relationships:**
- `senderId` → Single User ID (Sender)
- `receiverId` → Single User ID (Receiver)
- Bidirectional: Messages between two users can go either way

**Indexes (Recommended):**
```javascript
db.messages.createIndex({ "senderId": 1, "receiverId": 1, "createdAt": -1 })
db.messages.createIndex({ "receiverId": 1, "createdAt": -1 })
db.messages.createIndex({ "createdAt": -1 })
```

**Query Example (Get all messages between two users):**
```javascript
db.messages.find({
  $or: [
    { senderId: userId1, receiverId: userId2 },
    { senderId: userId2, receiverId: userId1 }
  ]
}).sort({ createdAt: 1 })
```

---

### 5. CONVERSATION Collection

```javascript
{
  "_id": ObjectId("907f1f77bcf86cd799439026"),
  
  // Array of 2 User IDs participating in conversation
  "participants": [
    ObjectId("507f1f77bcf86cd799439011"),
    ObjectId("507f1f77bcf86cd799439012")
  ],
  
  // Array of Message IDs in this conversation
  "messages": [
    ObjectId("807f1f77bcf86cd799439025"),
    ObjectId("807f1f77bcf86cd799439027"),
    ObjectId("807f1f77bcf86cd799439028"),
    ObjectId("807f1f77bcf86cd799439029")
  ],
  
  "createdAt": ISODate("2023-12-01T12:00:00.000Z"),
  "updatedAt": ISODate("2023-12-06T14:20:00.000Z")
}
```

**Key Relationships:**
- `participants[]` → Array of 2 User IDs
- `messages[]` → Array of Message IDs

**Indexes (Recommended):**
```javascript
db.conversations.createIndex({ "participants": 1 })
db.conversations.createIndex({ "updatedAt": -1 })
```

**Query Example (Find conversation between two users):**
```javascript
db.conversations.findOne({
  participants: {
    $all: [userId1, userId2]
  }
})
```

---

## 📈 Relationship Matrix

| From | To | Type | Field | Cardinality |
|------|----|----|-------|-------------|
| User | User | Follower | followers[] | One-to-Many |
| User | User | Following | following[] | One-to-Many |
| User | Post | Author | posts[] | One-to-Many |
| User | Post | Bookmark | bookmarks[] | Many-to-Many |
| User | Comment | Author | (implicit) | One-to-Many |
| User | Message | Sender | senderId | One-to-Many |
| User | Message | Receiver | receiverId | One-to-Many |
| Post | User | Like | likes[] | Many-to-Many |
| Post | Comment | Reference | comments[] | One-to-Many |
| Comment | User | Author | author | Many-to-One |
| Comment | Post | Reference | post | Many-to-One |
| Conversation | User | Participant | participants[] | Many-to-Many |
| Conversation | Message | Reference | messages[] | One-to-Many |

---

## 🔗 Relationship Flows

### User Following Flow
```
User A                          User B
  │                               │
  └──── following: [User B] ◄──┬──┘
        followers: []        │
                            │
                 followers: [User A] ◄─── (bidirectional)
                 following: []
```

### Post Interaction Flow
```
         User (author)
              │
              ▼
         ┌─────────┐
         │  POST   │
         └─────────┘
         /    │    \
        /     │     \
       /      │      \
      ▼       ▼       ▼
   LIKE    COMMENT  BOOKMARK
   (User)  (Comment) (User)
    │         │        │
    │         │        │
    User      User  bookmarks[]
    in POST  creates
    likes[]  Comment
```

### Messaging Flow
```
User A (Sender)              User B (Receiver)
      │                            │
      └──── senderId ─────────────►└──── receiverId
            │                            │
            └──── MESSAGE ──────────────►└
                  (stored in DB)         └───► Received via Socket.io
```

---

## 💾 Sample Data Structure

### Complete User Document with Relationships

```javascript
db.users.insertOne({
  _id: ObjectId("user1"),
  username: "alex_singh",
  email: "alex@example.com",
  password: "$2b$10$...", // hashed
  profilePicture: "https://cloudinary.com/alex.jpg",
  bio: "Tech enthusiast | Food lover",
  gender: "male",
  
  // This user follows 2 people
  following: [
    ObjectId("user2"),
    ObjectId("user3")
  ],
  
  // 5 people follow this user
  followers: [
    ObjectId("user4"),
    ObjectId("user5"),
    ObjectId("user6"),
    ObjectId("user7"),
    ObjectId("user8")
  ],
  
  // This user created 3 posts
  posts: [
    ObjectId("post1"),
    ObjectId("post2"),
    ObjectId("post3")
  ],
  
  // This user bookmarked 2 posts
  bookmarks: [
    ObjectId("post4"),
    ObjectId("post5")
  ],
  
  createdAt: ISODate("2023-11-15T10:00:00.000Z"),
  updatedAt: ISODate("2023-12-06T15:30:00.000Z")
})
```

### Complete Post Document with Relationships

```javascript
db.posts.insertOne({
  _id: ObjectId("post1"),
  caption: "Lunch at my favorite restaurant! 🍜",
  image: "https://cloudinary.com/lunch.jpg",
  
  // Posted by alex_singh
  author: ObjectId("user1"),
  
  // 8 people liked this post
  likes: [
    ObjectId("user2"),
    ObjectId("user3"),
    ObjectId("user4"),
    ObjectId("user5"),
    ObjectId("user6"),
    ObjectId("user7"),
    ObjectId("user8"),
    ObjectId("user9")
  ],
  
  // 3 comments on this post
  comments: [
    ObjectId("comment1"),
    ObjectId("comment2"),
    ObjectId("comment3")
  ],
  
  createdAt: ISODate("2023-12-05T12:30:00.000Z"),
  updatedAt: ISODate("2023-12-06T14:15:00.000Z")
})
```

### Complete Comment Document

```javascript
db.comments.insertOne({
  _id: ObjectId("comment1"),
  text: "Looks delicious! Where is this?",
  author: ObjectId("user2"), // Comment by user2
  post: ObjectId("post1"),   // Comment on post1
  createdAt: ISODate("2023-12-05T13:00:00.000Z"),
  updatedAt: ISODate("2023-12-05T13:00:00.000Z")
})
```

---

## 🔍 Query Examples with Relationships

### 1. Get User Profile with Populated Data
```javascript
db.users.aggregate([
  { $match: { username: "alex_singh" } },
  {
    $lookup: {
      from: "users",
      localField: "following",
      foreignField: "_id",
      as: "followingUsers"
    }
  },
  {
    $lookup: {
      from: "users",
      localField: "followers",
      foreignField: "_id",
      as: "followerUsers"
    }
  },
  {
    $lookup: {
      from: "posts",
      localField: "posts",
      foreignField: "_id",
      as: "userPosts"
    }
  }
])
```

### 2. Get Post with Author and Comments
```javascript
db.posts.aggregate([
  { $match: { _id: ObjectId("post1") } },
  {
    $lookup: {
      from: "users",
      localField: "author",
      foreignField: "_id",
      as: "authorInfo"
    }
  },
  {
    $lookup: {
      from: "comments",
      localField: "comments",
      foreignField: "_id",
      as: "commentList"
    }
  },
  { $unwind: "$authorInfo" },
  {
    $lookup: {
      from: "users",
      localField: "commentList.author",
      foreignField: "_id",
      as: "commentAuthors"
    }
  }
])
```

### 3. Get All Messages Between Two Users
```javascript
db.messages.find({
  $or: [
    { senderId: ObjectId("user1"), receiverId: ObjectId("user2") },
    { senderId: ObjectId("user2"), receiverId: ObjectId("user1") }
  ]
}).sort({ createdAt: 1 })
```

### 4. Get User Feed (Posts from Following)
```javascript
db.users.aggregate([
  { $match: { _id: ObjectId("user1") } },
  {
    $lookup: {
      from: "posts",
      let: { following: "$following" },
      pipeline: [
        { $match: { $expr: { $in: ["$author", "$$following"] } } },
        { $sort: { createdAt: -1 } },
        { $limit: 20 }
      ],
      as: "feed"
    }
  }
])
```

### 5. Get Like Count and Comment Count for Post
```javascript
db.posts.aggregate([
  { $match: { _id: ObjectId("post1") } },
  {
    $addFields: {
      likeCount: { $size: "$likes" },
      commentCount: { $size: "$comments" }
    }
  }
])
```

---

## 📊 Database Statistics

### Collection Sizes (Example)
```
Collection      Documents    Indexes
─────────────────────────────────────
users           50           3
posts           250          3
comments        1,500        3
messages        5,000        3
conversations   45           2
─────────────────────────────────────
TOTAL           6,845        14
```

### Average Document Sizes
```
users       ~500 bytes
posts       ~600 bytes
comments    ~300 bytes
messages    ~200 bytes
conversations ~400 bytes
```

---

## 🔐 Data Validation Rules

### User Collection
```javascript
{
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
    maxlength: 30,
    match: /^[a-zA-Z0-9_]*$/
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    // Must be hashed before storage
  },
  bio: {
    type: String,
    maxlength: 500
  },
  gender: {
    type: String,
    enum: ['male', 'female'],
    required: false
  }
}
```

### Post Collection
```javascript
{
  caption: {
    type: String,
    maxlength: 2200,
    default: ""
  },
  image: {
    type: String,
    required: true,
    // Must be valid Cloudinary URL
  },
  author: {
    type: ObjectId,
    ref: 'User',
    required: true
  }
}
```

---

## 🔄 Data Consistency Patterns

### Cascade Operations

**When User is Deleted:**
```
1. Delete from other users' followers/following arrays
2. Delete all posts created by user
3. Delete all comments created by user
4. Delete user from likes arrays in posts
5. Delete all messages sent/received by user
6. Delete all conversations with user
```

**When Post is Deleted:**
```
1. Remove from user's posts array
2. Delete all comments on post
3. Remove from all users' bookmarks
4. Remove from all users' likes
```

**When User Follows Another:**
```
1. Add to follower's following array
2. Add to followee's followers array
```

---

## 📋 Collection Creation (MongoDB)

```javascript
// Create users collection with validation
db.createCollection("users", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["username", "email", "password"],
      properties: {
        _id: { bsonType: "objectId" },
        username: { bsonType: "string" },
        email: { bsonType: "string" },
        password: { bsonType: "string" },
        profilePicture: { bsonType: "string" },
        bio: { bsonType: "string" },
        gender: { enum: ["male", "female"] },
        followers: { bsonType: "array" },
        following: { bsonType: "array" },
        posts: { bsonType: "array" },
        bookmarks: { bsonType: "array" },
        createdAt: { bsonType: "date" },
        updatedAt: { bsonType: "date" }
      }
    }
  }
})

// Create posts collection with validation
db.createCollection("posts", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["image", "author"],
      properties: {
        _id: { bsonType: "objectId" },
        caption: { bsonType: "string" },
        image: { bsonType: "string" },
        author: { bsonType: "objectId" },
        likes: { bsonType: "array" },
        comments: { bsonType: "array" },
        createdAt: { bsonType: "date" },
        updatedAt: { bsonType: "date" }
      }
    }
  }
})

// Create comments collection
db.createCollection("comments", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["text", "author", "post"],
      properties: {
        _id: { bsonType: "objectId" },
        text: { bsonType: "string" },
        author: { bsonType: "objectId" },
        post: { bsonType: "objectId" },
        createdAt: { bsonType: "date" },
        updatedAt: { bsonType: "date" }
      }
    }
  }
})

// Create messages collection
db.createCollection("messages", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["message", "senderId", "receiverId"],
      properties: {
        _id: { bsonType: "objectId" },
        message: { bsonType: "string" },
        senderId: { bsonType: "objectId" },
        receiverId: { bsonType: "objectId" },
        createdAt: { bsonType: "date" },
        updatedAt: { bsonType: "date" }
      }
    }
  }
})

// Create conversations collection
db.createCollection("conversations", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["participants"],
      properties: {
        _id: { bsonType: "objectId" },
        participants: { bsonType: "array" },
        messages: { bsonType: "array" },
        createdAt: { bsonType: "date" },
        updatedAt: { bsonType: "date" }
      }
    }
  }
})

// Create indexes
db.users.createIndex({ username: 1 }, { unique: true })
db.users.createIndex({ email: 1 }, { unique: true })
db.users.createIndex({ createdAt: -1 })

db.posts.createIndex({ author: 1, createdAt: -1 })
db.posts.createIndex({ createdAt: -1 })
db.posts.createIndex({ likes: 1 })

db.comments.createIndex({ post: 1, createdAt: -1 })
db.comments.createIndex({ author: 1 })

db.messages.createIndex({ senderId: 1, receiverId: 1, createdAt: -1 })
db.messages.createIndex({ receiverId: 1, createdAt: -1 })

db.conversations.createIndex({ participants: 1 })
db.conversations.createIndex({ updatedAt: -1 })
```

---

## 🎯 Summary Table

| Collection | Purpose | Primary Key | Key Fields | Indexes |
|-----------|---------|------------|-----------|---------|
| users | User accounts & profiles | _id | username, email, followers, following, posts, bookmarks | username, email, createdAt |
| posts | Social posts/feed content | _id | caption, image, author, likes, comments | author+createdAt, createdAt, likes |
| comments | Post comments/discussions | _id | text, author, post | post+createdAt, author |
| messages | Direct messages | _id | message, senderId, receiverId | senderId+receiverId+createdAt, receiverId |
| conversations | Message threads | _id | participants, messages | participants, updatedAt |

---

**Database Name:** connecthub  
**Connection String:** mongodb+srv://instagramuser:odiJoKSCVq96rtcA@instagram-clone.tncychp.mongodb.net/connecthub  
**Total Collections:** 5  
**Relationships:** 12+ (Many-to-Many, One-to-Many, Many-to-One)
