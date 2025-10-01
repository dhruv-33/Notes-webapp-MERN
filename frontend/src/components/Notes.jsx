import { useState, useEffect } from 'react';

const Notes = ({ token }) => {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (token) {
      fetchNotes();
    }
  }, [token]);

  const fetchNotes = async () => {
    try {
      const response = await fetch('/api/notes', {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch notes');
      }
      
      const data = await response.json();
      setNotes(data);
    } catch (error) {
      setError('Error fetching notes: ' + error.message);
      console.error('Error fetching notes:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!title.trim()) {
      setError('Title is required');
      return;
    }
    
    try {
      const url = editingId ? `/api/notes/${editingId}` : '/api/notes';
      const method = editingId ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ title, content })
      });
      
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to save note');
      }
      
      setTitle('');
      setContent('');
      setEditingId(null);
      fetchNotes();
    } catch (error) {
      setError('Error saving note: ' + error.message);
      console.error('Error saving note:', error);
    }
  };

  const deleteNote = async (id) => {
    try {
      const response = await fetch(`/api/notes/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to delete note');
      }
      
      fetchNotes();
    } catch (error) {
      setError('Error deleting note: ' + error.message);
      console.error('Error deleting note:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="mb-8">
        <h2 className="text-xl font-bold mb-4">{editingId ? 'Edit Note' : 'Add New Note'}</h2>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
          required
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full p-2 mb-4 border rounded h-32"
        />
        <div className="flex gap-2">
          <button type="submit" className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition cursor-pointer">
            {editingId ? 'Update Note' : 'Add Note'}
          </button>
          {editingId && (
            <button 
              type="button" 
              onClick={() => {
                setEditingId(null);
                setTitle('');
                setContent('');
              }}
              className="p-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <h2 className="text-2xl font-bold mb-4">Your Notes</h2>
      
      {notes.length === 0 ? (
        <p className="text-gray-500">You don't have any notes yet. Create one above!</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {notes.map(note => (
            <div key={note._id} className="p-4 border rounded bg-white shadow-sm">
              <h3 className="text-xl font-bold">{note.title}</h3>
              <p className="mt-2 text-gray-700">{note.content}</p>
              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => {
                    setEditingId(note._id);
                    setTitle(note.title);
                    setContent(note.content);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="p-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition cursor-pointer"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteNote(note._id)}
                  className="p-2 bg-red-500 text-white rounded hover:bg-red-600 transition cursor-pointer"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Notes;
