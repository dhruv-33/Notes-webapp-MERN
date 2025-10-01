# Simple Notes App

A simple MERN stack application that allows users to register, log in, and create/view/edit/delete notes.

## Features

- User authentication (register/login)
- Create, read, update, and delete notes
- Notes are private to each user
- Form validation and error handling
- Token-based authentication with JWT

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

## Contributing
1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

🚀 Happy Coding! 🎉