import React from 'react';
import { Link } from '@inertiajs/react';

const Navbar = () => (
  <>
    <nav style={{ marginBottom: 20 }}>
      <Link href="/">Dashboard</Link> |{" "}
      <Link href="/dynamic-fetch">Dynamic Fetch</Link> |{" "}
      <Link href="/signup">Sign Up</Link>
    </nav>
  </>
);

export default Navbar;