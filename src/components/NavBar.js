/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';
import { signOut } from '../utils/auth';

export default function NavBar() {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Link passHref href="/" className="navbar-brand">
          <Navbar.Brand>
            <Image style={{ width: '6.5rem' }} src="/images/PODLOGO.png" />
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {/* CLOSE NAVBAR ON LINK SELECTION: https://stackoverflow.com/questions/72813635/collapse-on-select-react-bootstrap-navbar-with-nextjs-not-working */}
            <Link className="nav-link" href="/">
              <Navbar.Brand>
                <Image style={{ width: '5.3rem' }} src="/images/HOMELOGO.png" />
              </Navbar.Brand>
            </Link>
            <Link className="nav-link" href="/favorite-podcasts">
              <Navbar.Brand>
                <Image style={{ width: '5.4rem' }} src="/images/FAVORITESLOGO.png" />
              </Navbar.Brand>
            </Link>
            <Link className="nav-link" href="/showdown">
              <Navbar.Brand>
                <Image style={{ width: '6rem' }} src="/images/SHOWDOWNLOGO.png" />
              </Navbar.Brand>
            </Link>
            <Link className="nav-link" href="/leaderboard">
              <Navbar.Brand>
                <Image style={{ width: '7rem' }} src="/images/LEADERBOARDLOGO.png" />
              </Navbar.Brand>
            </Link>
          </Nav>
          <Button variant="danger" onClick={signOut}>
            Sign Out
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
