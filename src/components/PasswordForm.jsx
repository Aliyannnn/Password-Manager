import React, { useState, useRef } from 'react';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PasswordForm = ({ formData, setFormData, handleSubmit, editingIndex }) => {
    const [showPassword, setShowPassword] = useState(false);
    const eyeRef = useRef(null);

    const handleReset = () => {
        setFormData({ site: '', user: '', password: '' });
        setShowPassword(false);
    };

    const togglePassword = () => {
        setShowPassword((prev) => !prev);
        eyeRef.current?.play();
    };

    // New local wrapper for handleSubmit + toast
    const onSubmitClick = () => {
        handleSubmit(); // Call the parent handler

        toast(editingIndex !== null ? '🔁 Password updated!' : '✅ Password saved!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
        });


        
    };

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Bounce}
            />

            <div className="relative bg-slate-900/60 backdrop-blur-sm rounded-xl p-6 max-w-xl mx-auto mt-10 shadow-lg border border-white/10 z-10">
                <button
                    type="button"
                    onClick={handleReset}
                    className="absolute top-4 right-4 text-xs px-2 py-1 border border-pink-500 text-pink-400 hover:bg-pink-600 hover:text-white transition rounded"
                >
                    Reset
                </button>

                <h2 className="text-2xl font-semibold text-white mb-4">
                    {editingIndex !== null ? 'Edit Password' : 'Add New Password'}
                </h2>

                <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                    <input
                        type="text"
                        name="site"
                        value={formData.site}
                        onChange={(e) => setFormData({ ...formData, site: e.target.value })}
                        placeholder="Website"
                        className="w-full p-3 rounded bg-slate-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
                    />
                    <input
                        type="text"
                        name="user"
                        value={formData.user}
                        onChange={(e) => setFormData({ ...formData, user: e.target.value })}
                        placeholder="Username or Email"
                        className="w-full p-3 rounded bg-slate-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
                    />

                    <div className="relative">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            placeholder="Password"
                            className="w-full p-3 pr-12 rounded bg-slate-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
                        />
                        <div
                            className="absolute top-2.5 right-3 cursor-pointer"
                            onClick={togglePassword}
                        >
                            <lord-icon
                                ref={eyeRef}
                                src="https://cdn.lordicon.com/dicvhxpz.json"
                                trigger="click"
                                stroke="bold"
                                colors="primary:#ffffff,secondary:#ffffff"
                                style={{ width: '28px', height: '28px' }}
                            ></lord-icon>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={onSubmitClick}
                        className="w-full bg-pink-600 hover:bg-pink-700 transition text-white py-3 rounded font-semibold"
                    >
                        {editingIndex !== null ? 'Update Password' : 'Save Password'}
                    </button>
                </form>
            </div>
        </>
    );
};

export default PasswordForm;
