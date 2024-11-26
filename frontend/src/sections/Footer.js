import React from 'react';

function Footer() {
  return (
    <footer className="bg-gray-700 text-white text-center py-4">
      <p className="text-sm">
        &copy; {new Date().getFullYear()} All rights reserved. <br />
        <span className="font-semibold">Hanz Menzi Martinez</span> | 
        <span className="font-semibold">Pro Animal Welfare System (PAWS)</span>
      </p>
    </footer>
  );
}

export default Footer;
