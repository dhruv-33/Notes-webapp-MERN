import { useState, useEffect } from 'react';
import Notes from './components/Notes';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [registerMode, setRegisterMode] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Check if user is already logged in
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      setIsLoggedIn(true);
    }
  }, []);

  const handleAuth = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      const endpoint = registerMode ? '/api/users/register' : '/api/users/login';
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Authentication failed');
      }
      
      // Store token and update state
      localStorage.setItem('token', data.token);
      setToken(data.token);
      setIsLoggedIn(true);
      setUsername('');
      setPassword('');
    } catch (error) {
      setError(error.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken('');
    setIsLoggedIn(false);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="p-4 bg-white shadow-md flex justify-between items-center">
        <h1 className="text-2xl font-bold">Notes App</h1>
        {isLoggedIn ? (
          <button 
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition cursor-pointer"
          >
            Logout
          </button>
        ) : (
          <div className="space-x-4">
            <button 
              onClick={() => setRegisterMode(false)}
              className={`px-4 py-2 ${!registerMode ? 'bg-blue-500' : 'bg-gray-300'} text-white rounded hover:bg-blue-600 transition cursor-pointer`}
            >
              Login
            </button>
            <button 
              onClick={() => setRegisterMode(true)}
              className={`px-4 py-2 ${registerMode ? 'bg-green-500' : 'bg-gray-300'} text-white rounded hover:bg-green-600 transition cursor-pointer`}
            >
              Register
            </button>
          </div>
        )}
      </div>
      
      <div className="container mx-auto p-4">
        {isLoggedIn ? (
          <Notes token={token} />
        ) : (
          <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6">
              {registerMode ? 'Register' : 'Login'}
            </h2>
            
            {error && (
              <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
                {error}
              </div>
            )}
            
            <form onSubmit={handleAuth}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="username">
                  Username
                </label>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              
              <div className="mb-6">
                <label className="block text-gray-700 mb-2" htmlFor="password">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              
              <button
                type="submit"
                className={`w-full p-2 text-white rounded ${registerMode ? 'bg-green-500 hover:bg-green-600' : 'bg-blue-500 hover:bg-blue-600'} transition`}
              >
                {registerMode ? 'Register' : 'Login'}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;