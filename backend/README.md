# Instagram Clone Backend

A complete backend API for an Instagram clone built with Node.js, Express, and MongoDB.

## Features

- User authentication (register, login, logout)
- User profile management
- Post creation and management
- Like/unlike posts
- Comment system
- Follow/unfollow users
- Image upload with Cloudinary
- JWT-based authentication

## Setup Instructions

### 1. Environment Variables

Create a `.env` file in the backend directory with the following variables:

```env
# Database Configuration
MONGO_URI=mongodb://localhost:27017/instagram-clone

# JWT Secret Key (Change this to a secure random string in production)
SECRET_KEY=your-super-secret-jwt-key-change-this-in-production

# Server Configuration
PORT=3000

# Cloudinary Configuration (for image uploads)
CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
CLOUDINARY_API_KEY=your-cloudinary-api-key
CLOUDINARY_API_SECRET=your-cloudinary-api-secret
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start the Server

```bash
npm run dev
```

## API Endpoints

### User Routes (`/api/user`)

- `POST /register` - Register a new user
- `POST /login` - Login user
- `GET /logout` - Logout user
- `GET /profile/:id` - Get user profile
- `PUT /edit-profile` - Edit user profile (with image upload)
- `GET /suggested-users` - Get suggested users to follow
- `POST /follow/:id` - Follow/unfollow a user

### Post Routes (`/api/post`)

- `POST /create` - Create a new post (with image upload)
- `GET /following` - Get posts from followed users
- `GET /:id` - Get a specific post
- `POST /like/:id` - Like/unlike a post
- `DELETE /:id` - Delete a post
- `POST /comment/:id` - Add a comment to a post
- `DELETE /comment/:id` - Delete a comment

## Database Models

### User
- username, email, password
- profilePicture, bio, gender
- followers, following arrays
- posts, bookmarks arrays

### Post
- caption, image
- author (User reference)
- likes, comments arrays

### Comment
- text
- author (User reference)
- post (Post reference)

### Message & Conversation
- For future messaging functionality

## Technologies Used

- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- Cloudinary for image storage
- Multer for file uploads
- bcryptjs for password hashing
- CORS for cross-origin requests

## Security Features

- Password hashing with bcrypt
- JWT token authentication
- Protected routes with middleware
- Input validation
- File upload security

## Development

The server runs on port 3000 by default. Make sure MongoDB is running locally or update the MONGO_URI to point to your MongoDB instance.

For production deployment:
1. Change the SECRET_KEY to a secure random string
2. Update CORS origin to your frontend domain
3. Use a production MongoDB instance
4. Set up proper environment variables

