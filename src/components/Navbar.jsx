
import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative w-full bg-slate-950  text-white">

 
      <div className="absolute bottom-0 left-[-20%] right-0 top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,0.15),rgba(255,255,255,0))]"></div>
      <div className="absolute bottom-0 right-[-20%] top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,0.15),rgba(255,255,255,0))]"></div>


      <nav className="relative z-10 top-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="text-3xl font-bold text-[#ffffff]"><h1 className='text-[30px]'>&lt; Password Manager /&gt;</h1></div>

 
            <h2 className="hidden md:flex space-x-8 font-bold items-center">
              {['Home', 'Vault', 'SafePass', 'PINN'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-white text-[20px] hover:text-pink-400 transition duration-300"
                >
                  {item}
                </a>
              ))}
            
              <button
                onClick={async () => {
                  try {
                    await fetch('http://localhost:3000/auth/logout', {
                      method: 'GET',
                      credentials: 'include',
                    });
                   
                    window.location.href = '/login'; 
                  } catch (error) {
                    console.error('Logout failed:', error);
                  }
                }}
                className="ml-6 px-4 py-2 bg-pink-500 hover:bg-pink-600 text-white rounded transition duration-300 text-[20px] font-bold"
              >
                Logout
              </button>
            </h2>


          
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-white hover:text-pink-400 focus:outline-none"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

      
        {isOpen && (
          <div className="md:hidden bg-slate-900 px-4 pb-4 space-y-2 rounded-b-md">
            {['Home', 'About', 'Services', 'Contact'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="block text-white hover:text-pink-400 transition duration-300"
              >
                {item}
              </a>
            ))}
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
