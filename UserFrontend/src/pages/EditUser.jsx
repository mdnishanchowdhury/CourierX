import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1';

export default function EditUser() {
  const { id } = useParams(); // Changed from userId to id to match your route
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState({
    fullname: '',
    email: '',
    age: '',
    country: '',
    address: '',
    phoneNumber: '',
    password: '',
    status: '1',
    role: 'user'
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const response = await fetch(`${API_BASE_URL}/users/${id}`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        setUser({
          ...data,
          password: '' // Never pre-fill password
        });
      } catch (err) {
        console.error('Fetch error:', err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await fetch(`${API_BASE_URL}/user/${id}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
        },
        body: JSON.stringify(user)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      navigate('/users');
    } catch (err) {
      console.error('Update error:', err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="edit-user-container">
      {/* Your form JSX here */}
    </div>
  );
}