import React from 'react';
import { Button , Image } from 'react-bootstrap';
import { signIn } from '../utils/auth';

function Signin() {
  return (
    <div
      className="text-center d-flex flex-column justify-content-center align-content-center"
      style={{
        backgroundImage: 'https://i.ibb.co/5T2WCRF/PodLogo.jpg',
        height: '90vh',
        padding: '30px',
        maxWidth: '400px',
        margin: '0 auto',
      }}
    >
      <Image style={{ width: '22rem' }} src="/images/PODLOGO.png" />
      <Button type="button" size="lg" className="copy-btn" onClick={signIn}>
        Sign In
      </Button>
    </div>
  );
}

export default Signin;
