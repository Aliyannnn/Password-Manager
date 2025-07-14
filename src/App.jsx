import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import SearchBar from './components/SearchBar';
import PasswordForm from './components/PasswordForm';
import PasswordList from './components/PasswordList';
import Footer from './components/Footer';
import './App.css';
import { toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const API_URL = 'http://localhost:3000/api/passwords'; // <-- Updated API endpoint

const App = () => {
  const [passwords, setPasswords] = useState([]);
  const [formData, setFormData] = useState({ site: '', user: '', password: '' });
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch passwords on load
  const fetchPasswords = async () => {
    try {
      const res = await fetch(API_URL, {
        credentials: 'include', // Ensure cookies/sessions are sent!
      });
      if (!res.ok) throw new Error('Failed to fetch passwords');
      const data = await res.json();
      setPasswords(data);
    } catch (error) {
      console.error('Error fetching passwords:', error);
    }
  };

  useEffect(() => {
    fetchPasswords();
  }, []);

  // Add or update password
  const handleAddOrEdit = async () => {
    if (!formData.site || !formData.user || !formData.password) return;

    try {
      if (editingIndex !== null && editingId) {
        // Editing existing entry
        const res = await fetch(`${API_URL}/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ site: formData.site, user: formData.user, password: formData.password }),
        });

        if (!res.ok) throw new Error('Failed to update password');
        const result = await res.json();

        const updated = [...passwords];
        updated[editingIndex] = { ...formData, _id: editingId };
        setPasswords(updated);

        toast.success('✏️ Password updated!', {
          position: 'top-right',
          autoClose: 3000,
          theme: 'dark',
          transition: Bounce,
        });
      } else {
        // Adding new entry
        const res = await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify(formData),
        });
        if (!res.ok) throw new Error('Failed to save password');
        const result = await res.json();
        setPasswords([...passwords, { ...formData, _id: result.result.insertedId }]);

        toast.success('✅ Password saved!', {
          position: 'top-right',
          autoClose: 3000,
          theme: 'dark',
          transition: Bounce,
        });
      }

      setFormData({ site: '', user: '', password: '' });
      setEditingIndex(null);
      setEditingId(null);
    } catch (error) {
      console.error('Error adding/updating password:', error);
      toast.error('Error saving password', {
        position: 'top-right',
        autoClose: 3000,
        theme: 'dark',
        transition: Bounce,
      });
    }
  };

  // Delete password
  const handleDelete = async (index) => {
    const entryToDelete = passwords[index];

    try {
      const res = await fetch(`${API_URL}/${entryToDelete._id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });
      if (!res.ok) throw new Error('Failed to delete password');
      const updated = passwords.filter((_, i) => i !== index);
      setPasswords(updated);

      toast.success('🗑️ Password deleted successfully!', {
        position: 'top-right',
        autoClose: 3000,
        theme: 'dark',
        transition: Bounce,
      });

      if (editingIndex === index) {
        setFormData({ site: '', user: '', password: '' });
        setEditingIndex(null);
        setEditingId(null);
      }
    } catch (error) {
      console.error('Error deleting password:', error);
      toast.error('Error deleting password', {
        position: 'top-right',
        autoClose: 3000,
        theme: 'dark',
        transition: Bounce,
      });
    }
  };


  const handleEdit = (index) => {
    setFormData({
      site: passwords[index].site,
      user: passwords[index].user,
      password: passwords[index].password,
    });
    setEditingIndex(index);
    setEditingId(passwords[index]._id);
  };

  const filteredPasswords = passwords.filter(
    (entry) =>
      entry.site.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.user.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative h-full w-full bg-slate-950">
      <div className="absolute bottom-0 left-[-20%] right-0 top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]"></div>
      <div className="absolute bottom-0 right-[-20%] top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]"></div>

      <div className="relative min-h-screen bg-slate-950 text-white pb-24">
        <Navbar />
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <PasswordForm
          formData={formData}
          setFormData={setFormData}
          handleSubmit={handleAddOrEdit}
          editingIndex={editingIndex}
        />
        <PasswordList
          passwords={filteredPasswords}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
        />
        <Footer />
      </div>
    </div>
  );
};

export default App;