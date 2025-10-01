# Simple Notes App

A simple MERN stack application that allows users to register, log in, and create/view/edit/delete notes.

## Features

- User authentication (register/login)
- Create, read, update, and delete notes
- Notes are private to each user
- Responsive UI with modern design
- Form validation and error handling
- Token-based authentication with JWT
- Password hashing for security

## Tech Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **cors** - Cross-Origin Resource Sharing
- **dotenv** - Environment variable management

### Frontend
- **React** - UI library
- **Fetch API** - For HTTP requests
- **localStorage** - For token persistence
- **TailwindCSS** - Styling with responsive design

## Project Structure

```
NoteApp
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Note.js
│   │   └── userModel.js
│   ├── routes/
│   │   ├── userRoutes.js
│   │   └── noteRoutes.js
│   ├── .env
│   ├── package.json
│   └── server.js
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Notes.jsx
│   │   │   └── Auth.jsx
│   │   ├── config/
│   │   │   └── api.js
│   │   ├── utils/
│   │   │   └── debug.js
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   └── package.json
│
└── README.md
```

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn package manager

### Backend Setup

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the backend directory with the following variables:
   ```
   PORT=5000
   MONGODB_URI=your_mongoodb_url
   JWT_SECRET=your_jwt_secret
   ```

4. Start the backend server:
   ```
   node server.js
   ```
   The server will run on http://localhost:5000

### Frontend Setup

1. Navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the frontend development server:
   ```
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173` (or the port shown in your terminal)

## API Endpoints

### Authentication
- `POST /api/users/register` - Register a new user
  - Request body: `{ username, password }`
  - Response: `{ token, user: { id, username } }`

- `POST /api/users/login` - Login a user
  - Request body: `{ username, password }`
  - Response: `{ token, user: { id, username } }`

### Notes
- `GET /api/notes` - Get all notes for the logged-in user
  - Headers: `Authorization: Bearer <token>`
  - Response: Array of note objects

- `POST /api/notes` - Create a new note
  - Headers: `Authorization: Bearer <token>`
  - Request body: `{ title, content }`
  - Response: Created note object

- `PUT /api/notes/:id` - Update a specific note
  - Headers: `Authorization: Bearer <token>`
  - Request body: `{ title, content }`
  - Response: Updated note object

- `DELETE /api/notes/:id` - Delete a specific note
  - Headers: `Authorization: Bearer <token>`
  - Response: `{ message: 'Note removed' }`

## Security Features

- JWT authentication with expiration
- Protected routes for notes
- User-specific note access (users can only access their own notes)
- Input validation to prevent malicious data

## Contributing
1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

🚀 Happy Coding! 🎉