import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full text-center text-sm text-gray-400 py-4 z-20 relative ">
      <div className="max-w-4xl mx-auto px-4 mt-15">
        <p>
          &copy; {new Date().getFullYear()} SecurePass by <span className="text-pink-500 font-medium">Aliyan</span>. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
