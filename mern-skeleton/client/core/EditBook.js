import React, { useState, useEffect } from 'react';
import { useParams, useHistory, Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Footer from './footer';
import auth from './../auth/auth-helper';
import { Redirect } from 'react-router-dom';


const EditBook = () => {
  const { id } = useParams();
  const history = useHistory();

  const [formData, setFormData] = useState({
    title: '',
    author: '',
    price: '',
    category: '',
    description: '',
  });

  const [isUpdated, setIsUpdated] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (id) {
      const fetchBookData = async () => {
        try {
          const response = await fetch(`/api/books/${id}`);
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }

          const bookData = await response.json();
          setFormData(bookData);
        } catch (error) {
          console.error('Error fetching book data:', error.message);
          setError('Error fetching book data');
        }
      };

      fetchBookData();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/books/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      setIsUpdated(true);
    } catch (error) {
      console.error('Error editing book:', error.message);
      setError('Error editing book');
    }
  };
  if (!auth.isAuthenticated()) {
    // Redirect to the sign-in page if not logged in
    return <Redirect to="/signin" />;
  }
  if (!id) {
    return <div>Book ID is undefined</div>;
  }
  return (
    <div>
      <Container maxWidth="sm">
      <Card
          style={{ margin: '20px', padding: '20px', border: '1px solid #343a40' }}
        >
          <CardContent>
            <Typography variant="h5" component="div" align="center">
              Editing the Book
            </Typography>
            {error && (
              <Typography variant="body1" color="error" align="center">
                {error}
              </Typography>
            )}
            {isUpdated ? (
              <Typography
                variant="body1"
                color="textSecondary"
                align="center"
                style={{ marginTop: '20px', color: 'darkblue' }}
              >
                Book updated successfully!
              </Typography>
            ) : (
              <form onSubmit={handleSubmit}>
                <TextField
                  label="Title"
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Author"
                  type="text"
                  name="author"
                  value={formData.author}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Price"
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Category"
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  fullWidth
                  multiline
                  rows={4}
                  margin="normal"
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  style={{ marginTop: '20px' }}
                >
                  Update book
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
        <Typography variant="body2" color="textSecondary" align="center" style={{ marginTop: '10px' }}>
        <Button
          component={Link}
          to="/"
          variant="contained"
          color="primary"
          style={{ marginTop: '20px', backgroundColor: '#2c3e50' }}
        >
          Back to Home
        </Button>
        </Typography>
      </Container>
      <Footer />
    </div>
  );
};

export default EditBook;