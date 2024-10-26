import PropTypes from 'prop-types';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
// import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { registerUser } from '../api/userData'; // Update with path to registerUser

function RegisterForm({ user, updateUser }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    imageUrl: '',
    uid: user.uid,
  });
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    registerUser(formData).then(() => updateUser(user.uid).then(() => router.push('/')));
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Sign Up</Form.Label>

        <Form.Control as="textarea" name="username" required placeholder="Username" onChange={({ target }) => setFormData((prev) => ({ ...prev, [target.name]: target.value }))} />

        <Form.Control as="textarea" name="firstName" required placeholder="First Name" onChange={({ target }) => setFormData((prev) => ({ ...prev, [target.name]: target.value }))} />

        <Form.Control as="textarea" name="lastName" required placeholder="Last Name" onChange={({ target }) => setFormData((prev) => ({ ...prev, [target.name]: target.value }))} />

        <Form.Control as="textarea" name="imageUrl" placeholder="Enter Image URL" onChange={({ target }) => setFormData((prev) => ({ ...prev, [target.name]: target.value }))} />
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

RegisterForm.propTypes = {
  user: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    username: PropTypes.string.isRequired,
    imageUrl: PropTypes.string,
    uid: PropTypes.string.isRequired,
  }).isRequired,
  updateUser: PropTypes.func.isRequired,
};

export default RegisterForm;
